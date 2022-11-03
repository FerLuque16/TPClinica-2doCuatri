import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  itemsCollection !: AngularFirestoreCollection<any>;
  turnos !: Observable<any>
  constructor(private firestore : AngularFirestore) { }

  guardarTURNO(turno: any){
    this.firestore.collection('turnos').add(turno);
  }

  traerTurnos(){
    this.itemsCollection = this.firestore.collection<any>('turnos');
    return this.turnos = this.itemsCollection.valueChanges();
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
            result.push(h + ':' + m);
        }
    }
    result.pop();
    result.pop();
    return result;
  }
}
