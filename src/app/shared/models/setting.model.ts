export class Setting {
    constructor(
        public _id: string,
        public ethernetSettings: {
            followingIp: {
              ip:  string,
              mask: string,
              gateway: string
            },
            followingDns: {
              prefferedDns: string,
              alternativeDns: string
            }
          }, 
          public wirelessSettings: {
            name: string,
            securityKey: string,
            followingIp: {
              ip: string,
              mask: string,
              gateway: string
            },
            followingDns: {
              prefferedDns: string,
              alternativeDns: string
            }
          }
    ) {}
}