import { Component, OnInit } from '@angular/core';
import { HistoriaClinica } from 'src/app/interfaces/historiaClinica.interface';
import { Turno } from 'src/app/interfaces/turno.interface';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { ImagenService } from 'src/app/services/imagen.service';
import { PdfService } from 'src/app/services/pdf.service';
import { TurnosService } from 'src/app/services/turnos.service';
import { UsuarioService } from 'src/app/services/usuario.service';
var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  especialistas : Usuario[] = [];
  pacientes: Usuario[]=[];
  todosLosUsuarios: Usuario[] = [];

  columnasPacientes: string[] = ['nombre','apellido','dni','email','obraSocial'];
  columnasEspecialistas : string[] = ['nombre', 'apellido', 'dni', 'email','especialidad','habilitado'];

  columnasUsuarios: string[] = ['nombre', 'apellido', 'dni','edad', 'email','rol']

  items:any;
  peso:any;
  altura:any;
  temperatura:any;
  presion:any;
  fecha = new Date();
  hoy:any = this.fecha.getDate();
  mesActual:any = this.fecha.getMonth() + 1
  añoActual = this.fecha.getFullYear()

  TDocumentDefinitions: any;

  todosLosTurnosRealizados: Turno[] = [];





  constructor(private userService:UsuarioService, private imagenService: ImagenService, private turnoService: TurnosService,
              private pdfService: PdfService) { }

  ngOnInit(): void {
    this.userService.traerUsuarios().subscribe( users =>{
      
      this.todosLosUsuarios = users;
      this.todosLosUsuarios.forEach(
        usuario=>{
          this.imagenService.descargarImagen(usuario.imagen1).subscribe(
            url=>{
              usuario.imagen1 = url;
            }
          )
        }
      )
      this.pacientes = users.filter( pac => pac.rol === 'paciente');
      this.especialistas = users.filter( med => med.rol === 'especialista');

      // console.log(this.pacientes)
    })

    this.turnoService.traerTurnos().subscribe(turnos =>{
      this.todosLosTurnosRealizados = turnos.filter(t => t.estado === 'realizado');
    })
    
  }

  cambiarEstados(event:any,id:string){
    let atributo = event.source.name;
    let valor = event.checked;
    const data = {
      [atributo]:valor
    };

    this.userService.actualizarUsuario(data,id);
  }

  
  descargarHistoriaClinica(historiaClinica:HistoriaClinica){
    // this.TDocumentDefinitions = {
    //   content: [
    //     {
    //       // you can also fit the image inside a rectangle
    //       image:'snow' ,
    //       fit: [100, 100]
    //     },
    //     {
    //       toc: {
    //         id: 'mainToc',
    //         title: {text: 'TITULO: HISTORIAL CLINICO', style: 'header'}
    //       }
    //     },
    //     {
    //       layout: 'lightHorizontalLines', // optional
    //       table: {
    //         // headers are automatically repeated if the table spans over multiple pages
    //         // you can declare how many rows should be treated as headers
    //         headerRows: 1,
    //         widths: ...[ 'auto'],
              
    
    //         //Para agregar los datos dinamicos, crear un array y recorrer la historia clinica y pushear las keys al array creado.
    //         //Hacer lo mismo con los values
    //         //Leer el largo del array creado para asi colocarle los widths a las filas
    //         body: [  
    //           [ 'Altura', 'Peso', 'Presion', 'Temperatura' ],
    //           [  historiaClinica.peso, historiaClinica.altura, historiaClinica.temperatura, historiaClinica.presion ]
    //         ]
    //       }
    //     },
    //     {
    //       text: 'Fecha de emision: ' + this.hoy + '/' + this.mesActual + '/' + this.añoActual,
    //       style: 'header'
    //     }
    //   ],
    //   images: {
    //     // in browser is supported loading images via url (https or http protocol) (minimal version: 0.1.67)
    //     snow: 'https://picsum.photos/id/870/200/300?grayscale&blur=2',
  
    //   }
    // }

    // const pdf = pdfMake.createPdf(this.TDocumentDefinitions);
    // pdf.download();

    this.pdfService.descargarHistoriaClinica(historiaClinica)
  }

  descargarAtenciones(paciente:Usuario){
    // let turnosDelPaciente: Turno[];

    // turnosDelPaciente = this.todosLosTurnosRealizados.filter(t => t.paciente.uid == paciente.uid);

    // // turnosDelPaciente.map( t =>{
    // //   delete t.historiaClinica;
    // // })

    // let columns = this.setearColumnas(turnosDelPaciente);

    // this.TDocumentDefinitions = {
    //   content: [
    //     {
    //       // you can also fit the image inside a rectangle
    //       image:'snow' ,
    //       fit: [100, 100]
    //     },
    //     {
    //       toc: {
    //         id: 'mainToc',
    //         title: {text: 'TURNOS REALIZADOS AL PACIENTE', style: 'header'}
    //       }
    //     },
    //     {
    //       layout: 'lightHorizontalLines', // optional
    //       table: {
    //         // headers are automatically repeated if the table spans over multiple pages
    //         // you can declare how many rows should be treated as headers
    //         headerRows: 1,
    //         widths: ['auto','auto','auto','auto'],
    
    //         body: [  
    //           [ 'Especialista', 'Especialidad', 'Fecha', 'Hora'],
    //           ...columns
    //         ]
    //       }
    //     },
    //     {
    //       text: 'Fecha de emision: ' + this.hoy + '/' + this.mesActual + '/' + this.añoActual,
    //       style: 'header'
    //     }
    //   ],
    //   images: {
    //     // in browser is supported loading images via url (https or http protocol) (minimal version: 0.1.67)
    //     snow: 'https://picsum.photos/id/870/200/300?grayscale&blur=2',
  
    //   }
    // }

    // const pdf = pdfMake.createPdf(this.TDocumentDefinitions);
    // pdf.download();
    //console.log(turnosDelPaciente);

    this.pdfService.descargarAtenciones(paciente);
  }

  descargarDatos(usuario: Usuario){
    // this.TDocumentDefinitions = {
    //   content: [
    //     {
    //       // you can also fit the image inside a rectangle
    //       image:'snow' ,
    //       fit: [100, 100]
    //     },
    //     {
    //       toc: {
    //         id: 'mainToc',
    //         title: {text: 'DATOS DEL PACIENTE', style: 'header'}
    //       }
    //     },
    //     {
    //       layout: 'lightHorizontalLines', // optional
    //       table: {
    //         // headers are automatically repeated if the table spans over multiple pages
    //         // you can declare how many rows should be treated as headers
    //         headerRows: 1,
    //         widths: [ '*', 'auto', 100, '*','auto' ],
    
    //         body: [  
    //           [ 'Nombre', 'Apellido', 'Dni', 'Edad', 'Email' ],
    //           [  usuario.nombre, usuario.apellido, usuario.dni, usuario.edad, usuario.email ]
    //         ]
    //       }
    //     },
    //     {
    //       text: 'Fecha de emision: ' + this.hoy + '/' + this.mesActual + '/' + this.añoActual,
    //       style: 'header'
    //     }
    //   ],
    //   images: {
    //     // in browser is supported loading images via url (https or http protocol) (minimal version: 0.1.67)
    //     snow: 'https://picsum.photos/id/870/200/300?grayscale&blur=2',
  
    //   }
    // }

    // const pdf = pdfMake.createPdf(this.TDocumentDefinitions);
    // pdf.download();

    this.pdfService.descargarDatos(usuario)
  }

  setearColumnas(turnos:Turno[]){
    let tableData = [];

    for (const t of turnos) {
      tableData.push([
        {text:`${t.especialista.nombre} ${t.especialista.apellido}`},
        {text: `${t.especialidad}`},
        {text:t.fecha},
        {text:t.hora}
      ])
    }
    return tableData;
  }
}
