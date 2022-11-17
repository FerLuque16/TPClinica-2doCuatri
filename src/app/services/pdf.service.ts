import { Injectable } from '@angular/core';
import { HistoriaClinica } from '../interfaces/historiaClinica.interface';
import { Turno } from '../interfaces/turno.interface';
import { Usuario } from '../interfaces/usuario.interface';
import { TurnosService } from './turnos.service';
var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class PdfService {

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

  todosLosTurnos: Turno[] = [];

  todosLosTurnosRealizados: Turno[] = [];

  constructor(private turnoService: TurnosService) {
    this.turnoService.traerTurnos().subscribe(turnos =>{
      this.todosLosTurnos = turnos;
      this.todosLosTurnosRealizados = turnos.filter(t => t.estado === 'realizado');
    })
  }

  async descargarHistoriaClinica(historiaClinica:HistoriaClinica){

    let dataHistoria = this.crearHeader(historiaClinica);
    

    this.TDocumentDefinitions = {
      content: [
        {
          // you can also fit the image inside a rectangle
          image:'snow' ,
          fit: [100, 100]
        },
        {
          toc: {
            id: 'mainToc',
            title: {text: 'TITULO: HISTORIAL CLINICO', style: 'header'}
          }
        },
        {
          layout: 'lightHorizontalLines', // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: dataHistoria.widthBasico,
    
            //Para agregar los datos dinamicos, crear un array y recorrer la historia clinica y pushear las keys al array creado.
            //Hacer lo mismo con los values
            //Leer el largo del array creado para asi colocarle los widths a las filas
            body: [  
              dataHistoria.headerBasico,
              dataHistoria.valuesBasico
            ]
          }
        },
        {
          layout: 'lightHorizontalLines', // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: dataHistoria.widthDinamico,
    
            //Para agregar los datos dinamicos, crear un array y recorrer la historia clinica y pushear las keys al array creado.
            //Hacer lo mismo con los values
            //Leer el largo del array creado para asi colocarle los widths a las filas
            body: [  
              dataHistoria.headerDinamico,
              dataHistoria.valuesDinamico
            ]
          }
        },
        {
          text: 'Fecha de emision: ' + this.hoy + '/' + this.mesActual + '/' + this.añoActual,
          style: 'header'
        }
      ],
      images: {
        // in browser is supported loading images via url (https or http protocol) (minimal version: 0.1.67)
        snow: await this.getBase64ImageFromURL('./assets//img//hospital.png'),
  
      }
    }

    // this.crearHeader(historiaClinica)
    const pdf = pdfMake.createPdf(this.TDocumentDefinitions);
    pdf.download();
  }

  async descargarAtencionesFiltradas(turnos:Turno[]){
    

    // turnosDelPaciente.map( t =>{
    //   delete t.historiaClinica;
    // })

    let columns = this.setearColumnas(turnos);

    this.TDocumentDefinitions = {
      content: [
        {
          // you can also fit the image inside a rectangle
          image:'snow' ,
          fit: [100, 100]
        },
        {
          toc: {
            id: 'mainToc',
            title: {text: 'TURNOS REALIZADOS AL PACIENTE', style: 'header'}
          }
        },
        {
          layout: 'lightHorizontalLines', // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: ['auto','auto','auto','auto','auto'],
    
            body: [  
              [ 'Especialista', 'Especialidad', 'Fecha', 'Hora','Estado'],
              ...columns
            ]
          }
        },
        {
          text: 'Fecha de emision: ' + this.hoy + '/' + this.mesActual + '/' + this.añoActual,
          style: 'header'
        }
      ],
      images: {
        // in browser is supported loading images via url (https or http protocol) (minimal version: 0.1.67)
        snow: await this.getBase64ImageFromURL('./assets//img//hospital.png'),
  
      }
    }

    const pdf = pdfMake.createPdf(this.TDocumentDefinitions);
    pdf.download();
    //console.log(turnosDelPaciente);
  }
  async descargarAtenciones(paciente:Usuario){
    let turnosDelPaciente: Turno[];

    turnosDelPaciente = this.todosLosTurnos.filter(t => t.paciente.uid == paciente.uid);

    

    // turnosDelPaciente.map( t =>{
    //   delete t.historiaClinica;
    // })

    let columns = this.setearColumnas(turnosDelPaciente);

    this.TDocumentDefinitions = {
      content: [
        {
          // you can also fit the image inside a rectangle
          image:'snow' ,
          fit: [100, 100]
        },
        {
          toc: {
            id: 'mainToc',
            title: {text: 'TURNOS REALIZADOS AL PACIENTE', style: 'header'}
          }
        },
        {
          layout: 'lightHorizontalLines', // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: ['auto','auto','auto','auto', 'auto'],
    
            body: [  
              [ 'Especialista', 'Especialidad', 'Fecha', 'Hora', 'Estado'],
              ...columns
            ]
          }
        },
        {
          text: 'Fecha de emision: ' + this.hoy + '/' + this.mesActual + '/' + this.añoActual,
          style: 'header'
        }
      ],
      images: {
        // in browser is supported loading images via url (https or http protocol) (minimal version: 0.1.67)
        snow: await this.getBase64ImageFromURL('./assets//img//hospital.png'),
  
      }
    }

    const pdf = pdfMake.createPdf(this.TDocumentDefinitions);
    pdf.download();
    //console.log(turnosDelPaciente);
  }

  async descargarDatos(usuario: Usuario){
    this.TDocumentDefinitions = {
      content: [
        {
          // you can also fit the image inside a rectangle
          image:'snow' ,
          fit: [100, 100]
        },
        {
          toc: {
            id: 'mainToc',
            title: {text: 'DATOS DEL PACIENTE', style: 'header'}
          }
        },
        {
          layout: 'lightHorizontalLines', // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: [ '*', 'auto', 100, '*','auto' ],
    
            body: [  
              [ 'Nombre', 'Apellido', 'Dni', 'Edad', 'Email' ],
              [  usuario.nombre, usuario.apellido, usuario.dni, usuario.edad, usuario.email ]
            ]
          }
        },
        {
          text: 'Fecha de emision: ' + this.hoy + '/' + this.mesActual + '/' + this.añoActual,
          style: 'header'
        }
      ],
      images: {
        // in browser is supported loading images via url (https or http protocol) (minimal version: 0.1.67)
        snow: await this.getBase64ImageFromURL('./assets//img//hospital.png')
      }
    }

    const pdf = pdfMake.createPdf(this.TDocumentDefinitions);
    pdf.download();
  }

  async descargarChartTabla(urlChart:string, info:string){
    this.TDocumentDefinitions = {
      content: [
        {
          // you can also fit the image inside a rectangle
          image:'snow' ,
          fit: [100, 100]
        },
        {
          toc: {
            id: 'mainToc',
            title: {text: `Grafico de ${info}`, style: 'header'}
          }
        },
        {
           // optional
          image:'chart',
          width:500,
          height:300

        },
        {
          text: 'Fecha de emision: ' + this.hoy + '/' + this.mesActual + '/' + this.añoActual,
          style: 'header'
        }
      ],
      images: {
        // in browser is supported loading images via url (https or http protocol) (minimal version: 0.1.67)
        snow: await this.getBase64ImageFromURL('./assets//img//hospital.png'),
        chart: urlChart
  
      }
    }

    // this.crearHeader(historiaClinica)
    const pdf = pdfMake.createPdf(this.TDocumentDefinitions);
    pdf.download();
  }
  async descargarChart(urlChart:string, info:string){
    this.TDocumentDefinitions = {
      content: [
        {
          // you can also fit the image inside a rectangle
          image:'snow' ,
          fit: [100, 100]
        },
        {
          toc: {
            id: 'mainToc',
            title: {text: `Grafico de ${info}`, style: 'header'}
          }
        },
        {
           // optional
          image:'chart'

        },
        {
          text: 'Fecha de emision: ' + this.hoy + '/' + this.mesActual + '/' + this.añoActual,
          style: 'header'
        }
      ],
      images: {
        // in browser is supported loading images via url (https or http protocol) (minimal version: 0.1.67)
        snow: await this.getBase64ImageFromURL('./assets//img//hospital.png'),
        chart: urlChart
  
      }
    }

    // this.crearHeader(historiaClinica)
    const pdf = pdfMake.createPdf(this.TDocumentDefinitions);
    pdf.download();
  }

  setearColumnas(turnos:Turno[]){
    let tableData = [];

    for (const t of turnos) {
      tableData.push([
        {text:`${t.especialista.nombre} ${t.especialista.apellido}`},
        {text: `${t.especialidad}`},
        {text:t.fecha},
        {text:t.hora},
        {text:this.primerLetraMayuscula(t.estado)}
      ])
    }
    return tableData;
  }

  getBase64ImageFromURL(url:string) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
  
      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
  
        var ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0);
  
        var dataURL = canvas.toDataURL("image/png");
  
        resolve(dataURL);
      };
  
      img.onerror = error => {
        reject(error);
      };
  
      img.src = url;
    });
  }

  primerLetraMayuscula(str:string) {
    return str[0].toUpperCase() + str.slice(1);
  }

  crearHeader(historiaClinica:HistoriaClinica){
    let arrayHeaderBasico = [];
    let arrayValuesBasico = [];
    let arrayHeaderDinamico = [];
    let arrayValuesDinamico = [];
    let arrayWidthBasico = [];
    let arrayWidthDinamico = [];

    for (const key in historiaClinica) {

      if(key != 'turno'){
        if(key != 'datosDinamicos'){
          arrayHeaderBasico.push(this.primerLetraMayuscula(key));
          arrayValuesBasico.push(historiaClinica[key as keyof HistoriaClinica])
          
        }
        else{
          for (const clave in historiaClinica[key]){
            arrayHeaderDinamico.push(this.primerLetraMayuscula(clave))
            arrayValuesDinamico.push(historiaClinica[key][clave as keyof HistoriaClinica])
          }
        }
      }
    }


    for (let i = 0; i < arrayHeaderBasico.length; i++) {
      arrayWidthBasico.push('auto')
      
    }

    for (let i = 0; i < arrayHeaderDinamico.length; i++) {
      arrayWidthDinamico.push('auto');
      
    }



    return {
      headerBasico:arrayHeaderBasico,
      headerDinamico:arrayHeaderDinamico,
      valuesBasico: arrayValuesBasico,
      valuesDinamico:arrayValuesDinamico,
      widthBasico: arrayWidthBasico,
      widthDinamico: arrayWidthDinamico
    };
  }

  //Para agregar los datos dinamicos, crear un array y recorrer la historia clinica y pushear las keys al array creado.
  //         //Hacer lo mismo con los values
  //         //Leer el largo del array creado para asi colocarle los widths a las filas





}
