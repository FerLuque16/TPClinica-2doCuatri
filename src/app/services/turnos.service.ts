import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Turno } from '../interfaces/turno.interface';
import { first, tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  itemsCollection !: AngularFirestoreCollection<Turno>;
  turnos !: Observable<Turno[]>
  constructor(private firestore : AngularFirestore) { }

  guardarTurno(turno: Turno){
    this.firestore.collection('turnos').doc(turno.id.toString()).set(turno,{merge:true});
  }

  traerTurnos(){
    this.itemsCollection = this.firestore.collection<Turno>('turnos');
    return this.turnos = this.itemsCollection.valueChanges();
  }

  

  modificarTurno(data: any, id: string){
    this.firestore.collection('turnos').doc(id).set(data,{merge:true});
  }

  public async devolverTurnoDB(id:string | undefined){
    return this.firestore
      .collection<Turno>('turnos').doc(id)
      .valueChanges()
      .pipe(
        tap((data) => data),
        first()
      )
      .toPromise();
  }

  crearIntervalos (n:any, desde:any, hasta:any){
    var result = [];    
    for(var hours = desde; hours <= hasta; hours++){
        for(var minutes = 0; minutes < 60; minutes = minutes+n){
              var h:any = '';
              var m:any = '';
              if(hours<10){
                 h = '0' + hours;
              }else{
                  h = hours;
              }
              if(minutes<10){
                 m = '0' + minutes;
              }else{
                  m = minutes;
              }

              let ampm = h >= 12 ? 'pm' : 'am';
            result.push(h + ':' + m + ampm);
        }
    }
    result.pop();
    result.pop();
    return result;
  }
}
