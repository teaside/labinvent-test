import { Component, NgModule, ElementRef, ViewChild, OnInit } from '@angular/core';
// import {  }      from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { Setting } from './shared/models/setting.model';
import { NetworkService } from './shared/services/network.service';
import { AccessPoint } from './shared/models/accessPoint.model';
import { Error } from './shared/models/error.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  constructor(
    private networkService: NetworkService
  ) {}
  title = 'app';

  IP = 'auto';
  DNS = 'auto';
  IPwifi = 'auto';
  DNSwifi = 'auto';
  accessPoints: any[];
  filteredAccessPoints: any[] = [];
  wifiEnable = false;
  securityEnable = false;
  error = {ethernetSettings: {ip: false, mask: false, dns: false}, wirelessSettings: {name: false, securityKey: false, ip: false, mask: false, dns: false}};
  setting = {ethernetSettings: {followingIp: {ip:'', mask:'',gateway:''},followingDns: {alternativeDns:'',prefferedDns:''}},wirelessSettings: {name: '', securityKey: '', followingIp: {ip: '', mask: '', gateway: ''}, followingDns: {prefferedDns: '',alternativeDns: ''}}};
  
  ngOnInit() {
    this.networkService.getSetting()
    .subscribe(res => {
      console.log(res);
      this.setting = JSON.parse(res['_body']);
      console.log('asdasd ',this.setting);
      this.filteredAccessPoints.push({favorite: false, name: this.setting.wirelessSettings.name, strength: 0, security: ['a']});
    });
    
  }

  getAccessPoints() {
    this.networkService.getAccessPoints()
    .subscribe(res => {
      this.accessPoints = JSON.parse(res['_body']);
      console.log(this.accessPoints);
      this.accessPoints.sort((a,b) => 
      { 
        return (a.strength < b.strength) ? 1 : (b.strength < a.strength) ? -1 : 0;
      });
      this.filteredAccessPoints = this.accessPoints.filter(a => a.favorite === true);
      this.filteredAccessPoints = this.filteredAccessPoints.concat(this.accessPoints.filter(a => a.favorite === false));
      this.setting.wirelessSettings.name = this.filteredAccessPoints[0].name;
    });
    
  }

  save() {
    let check = false;
    this.error = {ethernetSettings: {ip: false, mask: false, dns: false}, wirelessSettings: {name: false, securityKey: false, ip: false, mask: false, dns: false}};
    if(this.IP !== 'use') {
      this.setting.ethernetSettings.followingIp.ip = '';
      this.setting.ethernetSettings.followingIp.mask = '';
      this.setting.ethernetSettings.followingIp.gateway = '';
    } else {
      if(this.setting.ethernetSettings.followingIp.ip.trim().length < 1) {
        this.error.ethernetSettings.ip = true;
        check = true;
      }
      if(this.setting.ethernetSettings.followingIp.mask.trim().length < 1) {
        this.error.ethernetSettings.mask = true;
        check = true;
      }
    }
    if(this.DNS !== 'use') {
      this.setting.ethernetSettings.followingDns.prefferedDns = '';
      this.setting.ethernetSettings.followingDns.alternativeDns = '';
    } else {
      if(this.setting.ethernetSettings.followingDns.prefferedDns.trim().length < 1) {
        this.error.ethernetSettings.dns = true;
        check = true;
      }
    }
    if(!this.wifiEnable) {
        this.setting.wirelessSettings.name = '';
        this.setting.wirelessSettings.followingIp.ip = '';
        this.setting.wirelessSettings.followingIp.mask = '';
        this.setting.wirelessSettings.followingIp.gateway = '';
        this.setting.wirelessSettings.followingDns.prefferedDns = '';
        this.setting.wirelessSettings.followingDns.alternativeDns = '';
    } else {
      if(!this.securityEnable) {
        this.setting.wirelessSettings.securityKey = '';
      } else {
        if(this.setting.wirelessSettings.securityKey.trim().length < 1) {
          this.error.wirelessSettings.securityKey = true;
          check = true;
        }
      }
      if(this.IPwifi !== 'use') {
        this.setting.wirelessSettings.followingIp.ip = '';
        this.setting.wirelessSettings.followingIp.mask = '';
        this.setting.wirelessSettings.followingIp.gateway = '';
      } else {
        if(this.setting.wirelessSettings.followingIp.ip.trim().length < 1) {
          this.error.wirelessSettings.ip = true;
          check = true;
        }
        if(this.setting.wirelessSettings.followingIp.mask.trim().length < 1) {
          this.error.wirelessSettings.mask = true;
          check = true;
        }
      }
      if(this.DNSwifi !== 'use') {
        this.setting.wirelessSettings.followingDns.prefferedDns = '';
        this.setting.wirelessSettings.followingDns.alternativeDns = '';
      } else {
        if(this.setting.wirelessSettings.followingDns.prefferedDns.trim().length < 1) {
          this.error.wirelessSettings.dns = true;
          check = true;
        }
      }
    }
    
    if(!check){
      console.log(!check);
      this.networkService.saveSetting(this.setting)
      .subscribe(res => console.log(res));
    }
  }

  setName(name) {
    this.setting.wirelessSettings.name = name;
  }
  clear() {
    this.setting = {ethernetSettings: {followingIp: {ip:'', mask:'',gateway:''},followingDns: {alternativeDns:'',prefferedDns:''}},wirelessSettings: {name: '', securityKey: '', followingIp: {ip: '', mask: '', gateway: ''}, followingDns: {prefferedDns: '',alternativeDns: ''}}};
    this.filteredAccessPoints = []
  }
}
