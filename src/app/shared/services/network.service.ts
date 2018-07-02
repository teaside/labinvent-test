import { Injectable, Query } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../../environments/environment.prod' 
import { Setting } from '../models/setting.model';
import { Observable } from 'rxjs';
import { AccessPoint } from '../models/accessPoint.model';
// import { Promise } from '';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor(
    private http: Http,
  ) { }

  accessPoints = [
    {
      "favorite": true,
      "name": "atari98",
      "strength": 32,
      "security": ["psk"]
    },
    {
      "favorite": false,
      "name": "olson",
      "strength": 91,
      "security": ["psk"]
    },
    {
      "favorite": false,
      "name": "1990Wiley",
      "strength": 64,
      "security": ["psk", "wps"]
    },
    {
      "favorite": false,
      "name": "Guzman",
      "strength": 12,
      "security": ["wps"]
    },
    {
      "favorite": true,
      "name": "KPetersen86",
      "strength": 95,
      "security": ["wps"]
    },
    {
      "favorite": false,
      "name": "GillespIE",
      "strength": 84,
      "security": ["psk"]
    },
    {
      "favorite": false,
      "name": "patton",
      "strength": 40,
      "security": ["psk", "wps"]
    }
  ];

  getSetting() {
  //   return {
  //     ethernetSettings: {
  //     followingIp: {
  //       ip:'2', 
  //       mask:'3',
  //       gateway:'4'
  //     }, 
  //     followingDns: {
  //       alternativeDns:'5',
  //       prefferedDns:'6'
  //     }
  // },
  // wirelessSettings: {
  //     name: '7', 
  //     securityKey: '8', 
  //     followingIp: {
  //       ip: '0', 
  //       mask: '10', 
  //       gateway: '11'
  //     }, 
  //       followingDns: {
  //         prefferedDns: '12',
  //         alternativeDns: '13'
  //       }
  //   }};
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    let requestOptions = new RequestOptions({headers: header} );
    return this.http.get(`${environment.apiUrl}/setting`, requestOptions);
  }
  
  saveSetting(setting) {
      let header = new Headers();
      header.append('Content-Type', 'application/json');
      let requestOptions = new RequestOptions({headers: header} );
      return this.http.post(`${environment.apiUrl}/setting`, JSON.stringify(setting), requestOptions);
  }

  get() {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    let requestOptions = new RequestOptions({headers: header} );
    return this.http.get(`${environment.apiUrl}/`, requestOptions);
  }

  getAccessPoints() {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    let requestOptions = new RequestOptions({headers: header} );
    return this.http.get(`${environment.apiUrl}/getAccessPoints`, requestOptions);
    // return this.accessPoints;
  }
}





// {
//   _id: '',
//   ethernetSettings: {
//     followingIp: {
//       ip: '',
//       mask: '',
//       gateway: ''
//     },
//     followingDns: {
//       prefferedDns: '',
//       alternativeDns: ''
//     }
//   }, 
//   wirelessSettings: {
//     name: '',
//     securityKey: '',
//     followingIp: {
//       ip: '',
//       mask: '',
//       gateway: ''
//     },
//     followingDns: {
//       prefferedDns: '',
//       alternativeDns: ''
//     }
//   }
// };