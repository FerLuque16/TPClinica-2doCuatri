import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Disponibilidad } from '../interfaces/disponibilidad.interface';


@Injectable({
  providedIn: 'root'
})
export class DisponibilidadService {

  itemsCollection !: AngularFirestoreCollection<Disponibilidad>;
  disponibilidades !: Observable<Disponibilidad[]>
  constructor(private firestore : AngularFirestore) { }

  guardarDisponibilidad(disponibilidad: Disponibilidad){
    this.firestore.collection('disponibilidades').add(disponibilidad);
  }

  traerDisponibilidades(){
    this.itemsCollection = this.firestore.collection<Disponibilidad>('disponibilidades');
    return this.disponibilidades = this.itemsCollection.valueChanges();
  }
}
