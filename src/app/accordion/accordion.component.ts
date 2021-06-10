import { Component, OnInit } from '@angular/core';

export type Config = {
  // selector?: String,
  multi?: boolean
};

export type Menu = {
  name: string, 
  iconClass: string, 
  active: boolean,
  submenu: { name: string, url: string }[]
}

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css']
})



export class AccordionComponent implements OnInit {
  config: Config; 

  options: Config = { multi: false };
  
  menus: Menu[] = [
    { 
      name: 'Solicitudes',
      iconClass: 'request_quote',
      active: false,
      submenu: [
        { name: 'Solicitudes nuevas', url: '/solicitudes'},
        { name: 'Cotizaciones', url: "/cotizacion" },
        
      ]
    },
    { 
      name: 'Empresas',
      iconClass: 'business',
      active: false,
      submenu: [
        { name: 'Registrar empresa', url: '/empresa' },
        
      ]
    }
    /*
    { 
      name: 'Web Browser',
      iconClass: 'fa fa-globe',
      active: false,
      submenu: [
        { name: 'Chrome', url: '#' },
        { name: 'Firefox', url: '#' },
        { name: 'Desktop', url: '#' }
      ]
    },*/
    
  ];
  constructor() { }

  ngOnInit(): void {
    this.config = this.mergeConfig(this.options);
  }



  mergeConfig(options: Config) {
    // 기본 옵션
    const config = {
      // selector: '#accordion',
      multi: true
    };

    return { ...config, ...options };
  }


  toggle(index: number) {

    if (!this.config.multi) {
      this.menus.filter(
        (menu, i) => i !== index && menu.active
      ).forEach(menu => menu.active = !menu.active);
    }

    this.menus[index].active = !this.menus[index].active;
  }
}
