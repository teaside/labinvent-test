export class Error {
    constructor(
        public ethernetSettings: {
              ip:  boolean,
              mask: boolean,
              dns: boolean            
          }, 
          public wirelessSettings: {
            name: boolean,
            securityKey: boolean,
              ip: boolean,
              mask: boolean,
              dns: boolean,
          }
    ) {}
}