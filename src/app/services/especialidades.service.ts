import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Especialidad } from '../interfaces/especialidad.interface';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService {

  itemsCollection !: AngularFirestoreCollection<Especialidad>;
  todasLasEspecialidades !: Observable<Especialidad[]>;

  constructor(private firestore : AngularFirestore) { }

  guardarEspecialidad(nuevaEspecialidad : Especialidad){
    this.firestore.collection('especialidades').add(nuevaEspecialidad);
  }

  traerTodasLasEspecialidades(){
    this.itemsCollection = this.firestore.collection<Especialidad>('especialidades');
    return this.todasLasEspecialidades = this.itemsCollection.valueChanges();
  }
}
