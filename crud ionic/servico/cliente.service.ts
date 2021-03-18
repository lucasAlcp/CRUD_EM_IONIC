import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Cliente{
  id_cliente: number;
  nome: string;
  cidade: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private url = 'http://192.168.15.9/api/cliente';

  constructor(private http: HttpClient) {}

  getAll(){
    return this.http.get<[Cliente]>(this.url);

  }
  remove( id: number){
    return this.http.delete(this.url+'/'+id);
  }
  create(cliente: Cliente){
    return this.http.post(this.url, cliente);
  }
  update(cliente: Cliente, id: number){
    return this.http.put(this.url+'/'+id,cliente);
  }


}
