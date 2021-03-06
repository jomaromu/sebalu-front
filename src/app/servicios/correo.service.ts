import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CorreoService {

  constructor(
    private http: HttpClient
  ) { }

  enviarCorreo(data): Observable<any> {

    const url = 'https://correo.sebalulogistics.com/envio';
    // const url = 'http://172.31.62.232:3000/envio';
    // const url = 'http://localhost:3000/envio';
    return this.http.post<any>(url, data )
      .pipe(
        map((resp: any) => {
          return resp;
        })
      );
  }
}
