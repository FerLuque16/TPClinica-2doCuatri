import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Log } from '../interfaces/log.interface';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  itemsCollection !: AngularFirestoreCollection<Log>
  todosLosLogs !: Observable<Log[]>;

  constructor(private firestore : AngularFirestore) { }

  guardarLog(nuevoLog:Log){
    this.firestore.collection('logs').add(nuevoLog);
  }
}
