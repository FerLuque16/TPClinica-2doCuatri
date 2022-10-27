import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  url!:Observable<string | null>
  constructor(private storage: AngularFireStorage) { }

  subirArchivo(file: File, filePath:string, file2?:File, filePath2?:string){
    if(file2 && filePath2){
      let task1 = this.storage.upload(filePath, file);
      let task2 = this.storage.upload(filePath2, file2);
    }
    else{
      let task = this.storage.upload(filePath, file);
    }
  }

  descargarImagen(urlImg:any){
      const ref = this.storage.ref(urlImg);
      return this.url = ref.getDownloadURL();
  }
}
