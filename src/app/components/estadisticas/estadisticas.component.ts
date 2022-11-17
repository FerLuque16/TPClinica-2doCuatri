import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Turno } from 'src/app/interfaces/turno.interface';
import { TurnosService } from 'src/app/services/turnos.service';
import { Chart, registerables } from 'chart.js/auto';
import { Log } from 'src/app/interfaces/log.interface';
import { LogService } from 'src/app/services/log.service';
import { PdfService } from 'src/app/services/pdf.service';

Chart.register(...registerables)


@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

  canvas:any;
  ctx:any;
  @ViewChild('myChart') mychart!: ElementRef;
  @ViewChild('chartMedicos') chartMedicos!: ElementRef;
  @ViewChild('chartMedicosFinalizados') chartMedicosFinalizados!: ElementRef;
  @ViewChild('chartEspecialidades') chartEspecialidades!: ElementRef;


  hoy:Date = new Date();

  fechaFutura:Date = new Date(this.hoy.getFullYear(),this.hoy.getMonth(), this.hoy.getDate() + 14);


  todosLosTurnos: Turno[] = [];
  totalDeTurnos: number = 0;
  especialidades: string[] = [];

  turnosPorEspecialidad: any[] = [];

  fechas: string[] = [];
  turnosPorFechas :any[] = [];
  
  idsMedico: string[] = [];

  turnosPorMedico: any[] = [];

  turnosFiltradosFecha: Turno[]= [];
  turnosFiltradosFechaFinalizados: Turno[] = [];
  turnosPorMedicoFinalizados: any[] = [];

  logs: Log[] = [];
  columnasLog: string[] = ['email','fecha'];

  graficoTurnoPorEspecialidad:any;
  graficoTurnoPorFecha:any;
  graficoTurnoPorMedico:any;
  graficoTurnoPorMedicoFinalizado:any;


  chartTurnosPorFechaBase64:string ='';
  chartTurnoPorMedicoBase64:string ='';
  chartTurnoPorMedicoFinalizadoBase64:string ='';
  chartTurnoPorEspecialidadBase64:string ='';

  constructor(private turnoService: TurnosService, private logService : LogService, private pdfService:PdfService) { }

  ngOnInit(): void {
    this.traerTurnos();
    
    
  }

  traerTurnos(){
    this.turnoService.traerTurnos().subscribe( t =>{
      this.todosLosTurnos = t;

      this.totalDeTurnos = this.todosLosTurnos.length;

      this.todosLosTurnos.forEach(turno =>{
        if(!this.especialidades.includes(turno.especialidad)){
          this.especialidades.push(turno.especialidad)
        }

        if(!this.fechas.includes(turno.fecha)){
          this.fechas.push(turno.fecha)
        }
        //guardo id medico
        if(!this.idsMedico.includes(turno.especialista.uid)){
          this.idsMedico.push(turno.especialista.uid)
        }
      })
      this.logService.traerLogs().subscribe(data =>{
        this.logs = data;
      })
      console.log(this.logs);

      this.contarTurnosPorEspecialidad();
      this.contarTurnosPorMedico();
      this.contarTurnosPorFecha();

      
      this.chartTurnosPorFecha();
      this.chartTurnoPorMedico();
      this.chartTurnoPorMedicoFinalizado();
      this.chartTurnoPorEspecialidad();
      

    })
  }

  traerLogs(){
    this.logService.traerLogs().subscribe(data =>{
      this.logs = data;
    })
  }

  contarTurnosPorEspecialidad(){
    for(let i=0; i<this.especialidades.length;i++){
      let contador = 0;
      let especialidad = {
        especialidad: this.especialidades[i],
        cantidad: contador
      }

      for (let j = 0; j < this.todosLosTurnos.length; j++) {
        if(this.todosLosTurnos[j].especialidad == this.especialidades[i]){
          contador++;
        }
        
      }

      especialidad.cantidad = contador;
      this.turnosPorEspecialidad.push(especialidad);
    }
  }

  contarTurnosPorMedico(){
    let hoy = new Date();

    let fechaFutura = new Date(hoy.getFullYear(),hoy.getMonth(), hoy.getDate() + 14);

    this.todosLosTurnos.forEach(t =>{
      let fechaTurno = this.formatearFecha(t.fecha);
      if(fechaTurno > hoy && fechaTurno < fechaFutura){
        this.turnosFiltradosFecha.push(t);
        if(t.estado == 'realizado'){
          this.turnosFiltradosFechaFinalizados.push(t)
        }

      }
    })

    for (let i = 0; i < this.idsMedico.length; i++) {
      let contador = 0;
      let medico ={
        nombre: '',
        cantidad: contador
      }
      
      for (let j = 0; j < this.turnosFiltradosFecha.length; j++) {
        if(this.turnosFiltradosFecha[j].especialista.uid == this.idsMedico[i]){
          if(contador == 0){
            medico.nombre = `${this.turnosFiltradosFecha[j].especialista.nombre} ${this.turnosFiltradosFecha[j].especialista.apellido}`
          }

          contador++;
        }
        
      }
      medico.cantidad = contador;
      this.turnosPorMedico.push(medico);

    }

    for (let i = 0; i < this.idsMedico.length; i++) {
      let contador = 0;
      let medico = {
        nombre : '',
        cantidad: contador
      }

      for (let j = 0; j < this.turnosFiltradosFechaFinalizados.length; j++) {
        if(this.turnosFiltradosFechaFinalizados[j].especialista.uid == this.idsMedico[i]){
          if(contador == 0){
            medico.nombre = `${this.turnosFiltradosFechaFinalizados[j].especialista.nombre} ${this.turnosFiltradosFechaFinalizados[j].especialista.apellido}`
          }
          contador++;
        }
        
      }

      if(contador > 0){
        medico.cantidad = contador;
        this.turnosPorMedicoFinalizados.push(medico);
      }
      
    }



  }

  contarTurnosPorFecha(){
    for (let i = 0; i < this.fechas.length; i++) {
      let contador = 0;
      let fecha = {
        "fecha" : this.fechas[i],
        "cantidad":contador
      }
      for (let j = 0; j < this.todosLosTurnos.length; j++) {
        if(this.todosLosTurnos[j].fecha == this.fechas[i]){
          contador++
        }
      }
      fecha.cantidad = contador;
      this.turnosPorFechas.push(fecha);
      
    }
    //console.log(this.turnosPorFechas);
  }


  formatearFecha(fecha :string){
    let anio = fecha.split('/')[2]
    let mes = fecha.split('/')[1]
    let dia = fecha.split('/')[0]
    let fechaParseada = new Date(anio+'/'+mes+'/'+dia);
    return fechaParseada;
  }

  
  chartTurnosPorFecha(){
    this.canvas = this.mychart.nativeElement;
    this.ctx = this.canvas.getContext('2d');

    
    
    this.graficoTurnoPorFecha = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: [...this.crearDatosFecha()[0]],
        datasets: [{
          label: '# de Turnos',
          data: [...this.crearDatosFecha()[1]],
          backgroundColor:[
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor:[
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    // this.chartTurnosPorFechaBase64 = this.graficoTurnoPorFecha.toBase64Image();

    

    // this.pdfService.descargarChart(this.chartTurnosPorFechaBase64)

    // console.log(miGrafico.toBase64Image('image/jpeg', 1));
  }

  chartTurnoPorEspecialidad(){
    this.canvas = this.chartEspecialidades.nativeElement;
    this.ctx = this.canvas.getContext('2d');

    // let miGrafico:any;
    
    this.graficoTurnoPorEspecialidad = new Chart(this.ctx, {
      type: 'doughnut',
      data: {
        labels: [...this.crearDatosEspecialidad()[0]],
        datasets: [{
          label: 'Cantidad de turnos solicitados de esta especialidad',
          data: [...this.crearDatosEspecialidad()[1]],
          backgroundColor:[
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      },
      options: {
        
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
      
    });

    // this.chartTurnoPorEspecialidadBase64 = this.graficoTurnoPorEspecialidad.toBase64Image('image/jpeg', 1);
  }
  chartTurnoPorMedico(){
    this.canvas = this.chartMedicos.nativeElement;
    this.ctx = this.canvas.getContext('2d');

    
    
    this.graficoTurnoPorMedico = new Chart(this.ctx, {
      type: 'doughnut',
      data: {
        labels: [...this.crearDatosTurnosMedico()[0]],
        datasets: [{
          label: 'Turnos solicitados a este medico',
          data: [...this.crearDatosTurnosMedico()[1]],
          backgroundColor:[
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      },
      options: {
        
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
      
    });

  }
  chartTurnoPorMedicoFinalizado(){
    this.canvas = this.chartMedicosFinalizados.nativeElement;
    this.ctx = this.canvas.getContext('2d');

    
    this.graficoTurnoPorMedicoFinalizado = new Chart(this.ctx, {
      type: 'doughnut',
      data: {
        labels: [...this.crearDatosTurnosMedicoRealizados()[0]],
        datasets: [{
          label: 'Turnos realizados por este medico',
          data: [...this.crearDatosTurnosMedicoRealizados()[1]],
          backgroundColor:[
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      },
      options: {
        
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
      
    });

  }

  crearDatosEspecialidad(){
    let arrayHeaderFechas:string[] = [];
    let arrayValuesFechas:string[] = [];
    
    

    this.turnosPorEspecialidad.forEach(t =>{
      arrayHeaderFechas.push(t.especialidad);
      arrayValuesFechas.push(t.cantidad)
    })

    
    return [arrayHeaderFechas,arrayValuesFechas];
  }

  crearDatosFecha(){
    let arrayHeaderFechas:string[] = [];
    let arrayValuesFechas:string[] = [];
    
    

    this.turnosPorFechas.forEach(t =>{
      arrayHeaderFechas.push(t.fecha);
      arrayValuesFechas.push(t.cantidad)
    })

    return [arrayHeaderFechas,arrayValuesFechas];
  }

  crearDatosTurnosMedico(){
    let arrayHeader:string[] = [];
    let arrayValues:string[] = [];

    this.turnosPorMedico.forEach( m =>{
      arrayHeader.push(m.nombre);
      arrayValues.push(m.cantidad)
    })

    return [arrayHeader,arrayValues]
  }
  crearDatosTurnosMedicoRealizados(){
    let arrayHeader:string[] = [];
    let arrayValues:string[] = [];

    this.turnosPorMedicoFinalizados.forEach( m =>{
      arrayHeader.push(m.nombre);
      arrayValues.push(m.cantidad)
    })

    return [arrayHeader,arrayValues]
  }

  descargarGraficoTurnoPorFecha(){
    this.chartTurnosPorFechaBase64 = this.graficoTurnoPorFecha.toBase64Image('image/png', 1);
    this.pdfService.descargarChartTabla(this.chartTurnosPorFechaBase64, 'Turnos por fecha');
  }

  descargarGraficoEspecialidades(){
    this.chartTurnoPorEspecialidadBase64 = this.graficoTurnoPorEspecialidad.toBase64Image('image/png', 1);
    this.pdfService.descargarChart(this.chartTurnoPorEspecialidadBase64, 'Turnos por especialidades')
  }

  
  descargarGraficoMedico(){
    this.chartTurnoPorMedicoBase64 = this.graficoTurnoPorMedico.toBase64Image('image/png', 1);
    this.pdfService.descargarChart(this.chartTurnoPorMedicoBase64,'Turnos solicitados por especialista')
  }
  descargarGraficoMedicoRealizado(){
    this.chartTurnoPorMedicoFinalizadoBase64 = this.graficoTurnoPorMedicoFinalizado.toBase64Image('image/png', 1);
    this.pdfService.descargarChart(this.chartTurnoPorMedicoFinalizadoBase64,'Turnos realizados por especialista')

  }
  


}
