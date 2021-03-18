import { Cliente, ClienteService } from './../../servico/cliente.service';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-modalcliente',
  templateUrl: './modalcliente.page.html',
  styleUrls: ['./modalcliente.page.scss'],
})
export class ModalclientePage implements OnInit {
@Input() cliente: Cliente;
atualizar = false;
dados = {
  nome: '',
  cidade: '',
  email: ''
}

  constructor(private modalCtrl: ModalController, private service: ClienteService) { }

  ngOnInit() {
    if(this.cliente){
      this.atualizar = true;
      this.dados = this.cliente;

    }

  }


  fecharModal(){
    this.modalCtrl.dismiss();
  }
  enviando(form: NgForm){
    // console.log(form.value);
   
    const cliente = form.value;
    if(this.atualizar == false){
      this.service.create(cliente).subscribe(response =>{
        this.modalCtrl.dismiss(response);
      });
    }else{
      console.log(this.cliente.id_cliente);
     this.service.update(cliente, this.cliente.id_cliente).subscribe(response =>{
       this.modalCtrl.dismiss(response);
     })
    }
    
  }
}
