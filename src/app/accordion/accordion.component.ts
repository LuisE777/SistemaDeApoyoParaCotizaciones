import { Component, Input, OnInit } from '@angular/core';

export type Config = {
  // selector?: String,
  multi?: boolean
};

export type Menu = {
  //
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
  @Input() public menuEspecifico: string;
  @Input() public privilegios: any = window.localStorage.getItem("privilegios");
  privilegios_json: any = JSON.parse("{\"admin\":false,\"jefe\":false,\"cotizador\":false,\"usuario\":false}");

  link: string = "";
  config: Config; 

  options: Config = { multi: false };
  
  menus: Menu[] = [];

  menuAdmin: Menu[] = [
    { 
      name: 'Registros',
      iconClass: 'save',
      active: false,
      submenu: [
        { name: 'Registrar usuario', url: '/registrousuario'},
        { name: 'Registrar rol', url: "/registroRol" },
        { name: 'Registrar unidad', url: "/registrounidades" },
        { name: 'Registrar presupuesto ', url: "/registropresupuesto" },
        { name: 'Registrar item especifico', url: "/registroitem" },
        { name: 'Registrar item general', url: "/registroitemsup" },
        { name: 'Registrar facultad', url: "/registroFacultad" },
        { name: 'Habilitar fecha de registro de presupuestos', url: "/fechaPresupuesto" },
        
      ]
    },
    { 
      name: 'Listas',
      iconClass: 'list',
      active: false,
      submenu: [
        { name: 'Lista de usuarios ', url: '/listausuarios' },
        { name: 'Lista de roles ', url: '/listarol' },
        { name: 'Lista de unidades de gasto ', url: '/unidades' },
        { name: 'Lista de items especificos ', url: '/items' },
        { name: 'Lista de items generales', url: '/itemsuperiores' },
        { name: 'Lista de presupuestos', url: '/presupuestos' },    
        { name: 'Lista de facultades', url: '/listaFacultades' },           
      ]
    },{
      name: 'Registros del sistema',
      iconClass: 'file_present',
      active: false,
      submenu: [ 
        {name:'Bitacora & Restauracion', url: '/log-records'},
        {name:'Habilitación de datos eliminados', url: '/restaurar'}
      ]
    }
  ];
  menuJefe: Menu[] = [
    { 
      name: 'Solicitudes',
      iconClass: 'request_quote',
      active: false,
      submenu: [
        { name: 'Realizar solicitud', url: '/form-solicitud'},
        { name: 'Ver mis solicitudes', url: "/misSolicitudes" },                              
      ]
    },
    { 
      name: 'Unidades',
      iconClass: 'business',
      active: false,
      submenu: [
        { name: 'Registrar unidad', url: '/registrounidades' },                        
      ]
    }
  ];
  menuCotizador: Menu[] = [
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
        { name: 'Lista de empresas', url: "/listaEmpresas" },
        
      ]
    }
  ];
  menuAdministrativo: Menu[] = [
    { 
      name: 'Solicitudes',
      iconClass: 'request_quote',
      active: false,
      submenu: [
        { name: 'Realizar solicitud', url: '/form-solicitud'},
        { name: 'Ver mis solicitudes', url: "/misSolicitudes" },  
      ]
    }];

  constructor() { 
    this.getPrivilegios();
    this.config = this.mergeConfig(this.options);
    this.privilegios = window.localStorage.getItem("privilegios");
  }

  ngOnInit(): void {
    //this.getPrivilegios();
    //this.config = this.mergeConfig(this.options);
    //this.fillMenus();
    //this.getMenu();
    //console.log(this.menuEspecifico);
    //window.location.reload;
  }

  loop(){
    this.getPrivilegios();
    return false;
  }

  getPrivilegios(){
    if(localStorage.getItem('privilegios')){
      try {
        this.privilegios = localStorage.getItem('privilegios');
        this.privilegios_json = JSON.parse(this.privilegios);
      } catch (error) {
        console.log(error)
      }
    } else {

    }
    
  }

  /*fillMenus(){
    if(this.privilegios_json.admin){
      this.menus.push(
        { 
          //user: 'Administrador',
          name: 'Registros',
          iconClass: 'save',
          active: false,
          submenu: [
            { name: 'Registrar usuario', url: '/registrousuario'},
            { name: 'Registrar rol', url: "/registroRol" },
            { name: 'Registrar unidad', url: "/registrounidades" },
            { name: 'Registrar presupuesto ', url: "/registropresupuesto" },
            { name: 'Registrar item especifico', url: "/registroitem" },
            { name: 'Registrar item general', url: "/registroitemsup" },
            { name: 'Habilitar fecha de registro de presupuestos', url: "/fechaPresupuesto" },
            
          ]
        },
        { //user: 'Administrador',
          name: 'Listas',
          iconClass: 'list',
          active: false,
          submenu: [
            { name: 'Lista de usuarios ', url: '/listausuarios' },
            { name: 'Lista de roles ', url: '/listarol' },
            { name: 'Lista de unidades de gasto ', url: '/unidades' },
            { name: 'Lista de items especificos ', url: '/items' },
            { name: 'Lista de items generales', url: '/itemsuperiores' },
            { name: 'Lista de presupuestos', url: '/presupuestos' },              
          ]
        },{
          //user: 'Administrador',
          name: 'Registros del sistema',
          iconClass: 'file_present',
          active: false,
          submenu: [ 
            {name:'Bitacora & Restauracion', url: '/log-records'}
          ]
        }
      );
    }
    if(this.privilegios_json.jefe){
      this.menus.push(
        { 
          //user: 'Jefe de unidad',
          name: 'Solicitudes',
          iconClass: 'request_quote',
          active: false,
          submenu: [
            { name: 'Realizar solicitud', url: '/form-solicitud'},
            { name: 'Ver mis solicitudes', url: "/misSolicitudes" },                              
          ]
        },
        { 
          //user: 'Jefe de unidad',
          name: 'Unidades',
          iconClass: 'business',
          active: false,
          submenu: [
            { name: 'Registrar unidad', url: '/registrounidades' },                        
          ]
        }  
      );
    }
    if(this.privilegios_json.cotizador){
      this.menus.push(
        { 
          //user: 'Cotizador',
          name: 'Solicitudes',
          iconClass: 'request_quote',
          active: false,
          submenu: [
            { name: 'Solicitudes nuevas', url: '/solicitudes'},
            
            { name: 'Cotizaciones', url: "/cotizacion" },              
            
          ]
        },
        { 
          //user: 'Cotizador',
          name: 'Empresas',
          iconClass: 'business',
          active: false,
          submenu: [
            { name: 'Registrar empresa', url: '/empresa' },
            { name: 'Lista de empresas', url: "/listaEmpresas" },
            
          ]
        }
      );
    }
    if(this.privilegios_json.usuario){
      this.menus.push(
        { 
          //user: 'Administrativo',
          name: 'Solicitudes',
          iconClass: 'request_quote',
          active: false,
          submenu: [
            { name: 'Realizar solicitud', url: '/form-solicitud'},
            { name: 'Ver mis solicitudes', url: "/misSolicitudes" },                                              
            { name: 'Solicitudes nuevas', url: '/solicitudes'},
          { name: 'Cotizaciones', url: "/cotizacion" }, 

          ]
        },
        { 
          //user: 'Administrativo',
          name: 'Unidades',
          iconClass: 'business',
          active: false,
          submenu: [
            { name: 'Registrar unidad', url: '/registrounidades' },                                      
          ]
        },{ 
          //user: 'Administrativo',
          name: 'Registros',
          iconClass: 'save',
          active: false,
          submenu: [
            { name: 'Registrar unidad', url: '/registrounidades' },    
            { name: 'Registrar item especifico', url: "/registroitem" },
            { name: 'Registrar item general', url: "/registroitemsup" },                    
          ]
        }
      );
    }
  }*/
  /*getMenu(){
    switch (this.menuEspecifico) {
      case "cotizador":
        this.link="/cotizador";
        this.menus=[
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
              { name: 'Lista de empresas', url: "/listaEmpresas" },
              
            ]
          }
        ]
        break;
      case "administrador":
        this.link="/administrador";
        this.menus=[
          { 
            name: 'Registros',
            iconClass: 'save',
            active: false,
            submenu: [
              { name: 'Registrar usuario', url: '/registrousuario'},
              { name: 'Registrar rol', url: "/registroRol" },
              { name: 'Registrar unidad', url: "/registrounidades" },
              { name: 'Registrar presupuesto ', url: "/registropresupuesto" },
              { name: 'Registrar item especifico', url: "/registroitem" },
              { name: 'Registrar item general', url: "/registroitemsup" },
              { name: 'Habilitar fecha de registro de presupuestos', url: "/fechaPresupuesto" },
              
            ]
          },
          { 
            name: 'Listas',
            iconClass: 'list',
            active: false,
            submenu: [
              { name: 'Lista de usuarios ', url: '/listausuarios' },
              { name: 'Lista de roles ', url: '/listarol' },
              { name: 'Lista de unidades de gasto ', url: '/unidades' },
              { name: 'Lista de items especificos ', url: '/items' },
              { name: 'Lista de items generales', url: '/itemsuperiores' },
              { name: 'Lista de presupuestos', url: '/presupuestos' },              
            ]
          },{
            name: 'Registros del sistema',
            iconClass: 'file_present',
            active: false,
            submenu: [ 
              {name:'Bitacora & Restauracion', url: '/log-records'}
            ]
          }
        ]
        break;
        case "jefe":
          this.link="/jefe";
          this.menus=[
            { 
              name: 'Solicitudes',
              iconClass: 'request_quote',
              active: false,
              submenu: [
                { name: 'Realizar solicitud', url: '/form-solicitud'},
                { name: 'Ver mis solicitudes', url: "/misSolicitudes" },                              
              ]
            },
            { 
              name: 'Unidades',
              iconClass: 'business',
              active: false,
              submenu: [
                { name: 'Registrar unidad', url: '/registrounidades' },                        
              ]
            }
          ]
          break
          case "usuario":
            this.link="/usuario";
          this.menus=[
            { 
              name: 'Solicitudes',
              iconClass: 'request_quote',
              active: false,
              submenu: [
                { name: 'Realizar solicitud', url: '/form-solicitud'},
                { name: 'Ver mis solicitudes', url: "/misSolicitudes" },                                              
                { name: 'Solicitudes nuevas', url: '/solicitudes'},
              { name: 'Cotizaciones', url: "/cotizacion" }, 

              ]
            },
            { 
              name: 'Unidades',
              iconClass: 'business',
              active: false,
              submenu: [
                { name: 'Registrar unidad', url: '/registrounidades' },                                      
              ]
            },{ 
              name: 'Registros',
              iconClass: 'save',
              active: false,
              submenu: [
                { name: 'Registrar unidad', url: '/registrounidades' },    
                { name: 'Registrar item especifico', url: "/registroitem" },
                { name: 'Registrar item general', url: "/registroitemsup" },                    
              ]
            }
          ]
            break;
          case "usuarios":
            this.link="/usuarios";
            this.menus=[
              { 
                name: 'Solicitudes',
                iconClass: 'request_quote',
                active: false,
                submenu: [
                  { name: 'Realizar solicitud', url: '/form-solicitud'},
                  { name: 'Ver mis solicitudes', url: "/misSolicitudes" },  
                ]
              }]
            break;
      default:
        break;
    }
  }*/

  mergeConfig(options: Config) {
    // 기본 옵션
    const config = {
      // selector: '#accordion',
      multi: true
    };

    return { ...config, ...options };
  }


  toggle(index: number, menus:Menu[]) {

    if (!this.config.multi) {
      menus.filter(
        (menu, i) => i !== index && menu.active
      ).forEach(menu => menu.active = !menu.active);
    }

    menus[index].active = !menus[index].active;
  }
}
