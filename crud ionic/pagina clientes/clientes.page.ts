import { ModalclientePage } from './../modalcliente/modalcliente.page';
import { ClienteService } from './../../servico/cliente.service';
import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/servico/cliente.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {
clientes: Cliente[];

  constructor(private service: ClienteService, private modalCtrl: ModalController ) { }
  atualizarLista(){
    this.service.getAll().subscribe(response => {
      this.clientes = response;
    });
  }
  ngOnInit() {
    this.atualizarLista();
  }
  remover(id:number){
    this.service.remove(id).subscribe(() =>{
      this.service.getAll().subscribe(response => {
        this.clientes = response;

      });
    })
  }

atualizar(cliente: Cliente){
  // console.log(cliente);
  this.modalCtrl.create({
    component: ModalclientePage,
    componentProps:{cliente}
    //Abre o modal e quando retornar fecha o mesmo
  }).then(modal=>{modal.present();
    return modal.onDidDismiss();
    //Atualiza a lista fazendo uma consulta novamente
  }).then(({data}) =>{
    this.atualizarLista();
  });
}
  cadastrar(){
      this.modalCtrl.create({
        component: ModalclientePage
      }).then(modal=>{modal.present();
        return modal.onDidDismiss();
      
      }).then(({data}) =>{
        this.atualizarLista(); 
      });
      
      
  }

}
