import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { merge, Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario.interface';
import { tap,first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private itemsCollection!: AngularFirestoreCollection<Usuario>;
  items!: Observable<Usuario[]>;

  idUsuario: string | undefined = '';

  rolUsuario :string = '';

  todosLosPacientes:Usuario[] = [];

  constructor(private firestore: AngularFirestore, private afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(user => {
      this.idUsuario= user?.uid;
    })
  }

  // Guarda un usuario en la coleccion usuarios, con el id pasado
  // por parametros
  guardarUsuario(usuario: Usuario | any,id:string){
    return this.firestore.collection('usuarios').doc(id).set(usuario,{merge:true});
  }

  // Guarda un dato pasado por prametro en el usuario con el id pasado
  // por parametros
  actualizarUsuario(data: any, id: string){
    this.firestore.collection('usuarios').doc(id).set(data,{merge:true});
  }

  traerUsuarios(){
    this.itemsCollection = this.firestore.collection<Usuario>('usuarios');

    return this.itemsCollection.valueChanges();
  }

  async obtenerUsuario(id:string | undefined){
    return this.firestore.collection<Usuario>('usuarios').doc(id)
            .valueChanges()
            .pipe(
              tap( (data) => data),
              first()
            )
            .toPromise();
  }

  devolverPacientes(){
    this.traerUsuarios().subscribe(usuarios =>{
      usuarios.forEach( user =>{
        if(user.rol == 'paciente'){
          this.todosLosPacientes.push(user);
        }
      })
    })

    return this.todosLosPacientes;
  }
}
