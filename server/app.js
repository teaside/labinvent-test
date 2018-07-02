var express         = require('express');
const bodyParser    = require('body-parser');
var mongoClient     = require('mongodb').MongoClient;
var assert          = require('assert');
var cors            = require('cors');
var fs              = require('fs');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(cors());

function errorHandler(err, req, res, next) {
    console.error(err.message);
    console.error(err.stack);
    res.status(500);
    res.render('error_template', { error: err });
}

app.get('/', function  (req, res) {
    console.log('+');
    res.send('hello');
});

app.get('/getAccessPoints', function  (req, res) {
    fs.readFile('mock.json', 'utf8', function (err,data) {
        if (err) {
          return console.log(err);
        }
        data = JSON.parse(data);
        res.json(data);
        console.log('json');
      });
});

app.route('/setting')
  .get((req, res) => {
            mongoClient.connect('mongodb://localhost:27017', function(err, client) {

                assert.equal(null, err);
                const db = client.db('labinent');
                db.collection("setting").find().limit(1).sort({ $natural : -1 }).toArray(function(err, results) {
                    if (err) {
                        console.log(err);
                        res.status(402);
                    } else {
                        console.log(results[0]);
                        res.json(results[0]);
                    }
                });
            });
  })
  .post(function(req, res) {
            if(typeof req.body == 'undefined') {
                next(Error('Please enter the data'));
            }
            else {
                mongoClient.connect('mongodb://localhost:27017', function(err, client) {
                    assert.equal(null, err);
                    const db = client.db('labinent');
                    db.collection('setting').insertOne(
                        {
                            ethernetSettings: {   
                            followingIp: {
                              ip:               req.body.ethernetSettings.followingIp.ip, 
                              mask:             req.body.ethernetSettings.followingIp.mask,
                              gateway:          req.body.ethernetSettings.followingIp.gateway
                            }, 
                            followingDns: {
                              alternativeDns:   req.body.ethernetSettings.followingDns.alternativeDns,
                              prefferedDns:     req.body.ethernetSettings.followingDns.prefferedDns
                            }
                        },
                        wirelessSettings: {
                            name:               req.body.wirelessSettings.name, 
                            securityKey:        req.body.wirelessSettings.securityKey, 
                            followingIp: {
                              ip:               req.body.wirelessSettings.followingIp.ip, 
                              mask:             req.body.wirelessSettings.followingIp.mask,
                              gateway:          req.body.wirelessSettings.followingIp.gateway
                            }, 
                            followingDns: {
                              alternativeDns:   req.body.wirelessSettings.followingDns.alternativeDns,
                              prefferedDns:     req.body.wirelessSettings.followingDns.prefferedDns
                            }
                          }},
                    function (err, r) {
                        assert.equal(null, err);
                        res.send("Document inserted with _id: " + r.insertedId);
                    }
                    );
                });
                
            }
         

  })


app.use(errorHandler);

process.on('unchaughtException', (err) => console.log('piy', err))

app.listen(3000);
console.log('Express listening on port 3000');