<?php

    header('Access-Control-Allow-Origin: *');
    header('Content-type: application/json');
    header('Access-Control-Allow-Methods: POST, GET, PUT, DELETE');
    header('Access-Control-Allow-Headers: Access-Control-Allow_Headers,Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

    $con = new mysqli('localhost', 'root', '','crud_ionic');

    if($_SERVER['REQUEST_METHOD'] === 'GET'){
    //Recuperando do banco de dados

        if(isset($_GET['id'])){
            //Se existir um id na URL

            $id = $_GET['id'];
            $sql = $con->query("SELECT * FROM clientes WHERE id_cliente =".$id.";");
            $data = $sql->fetch_assoc();
        }else{
            //Caso não tenha nenhum id
            $data = array();
            $sql = $con->query('SELECT * FROM clientes');
            while($d = $sql->fetch_assoc()){
                $data[] = $d;
            }
        }
        exit(json_encode($data));
    }

    if($_SERVER['REQUEST_METHOD'] === 'PUT'){
        //Alterar os dados

        if(isset($_GET['id'])){
            $id = $_GET['id'];
            $data = json_decode(file_get_contents("php://input"));
            $sql = $con->query("UPDATE clientes SET 
             nome = '".$data->nome."',
             cidade = '".$data->cidade."',
             email = '".$data->email."'
             WHERE id_cliente = ".$id);

            if($sql){
                exit(json_encode(array('status' => 'Sucesso, cliente atualizado na tabela')));
            }else{
                exit(json_encode(array('status'=>'Erro ao atualizar o cliente')));
            }
        }
    }
    if($_SERVER['REQUEST_METHOD'] === 'DELETE'){
        //Alterar os dados

        if(isset($_GET['id'])){
            $id = $_GET['id'];
            $data = json_decode(file_get_contents("php://input"));
            $sql = $con->query("DELETE FROM clientes 
             WHERE id_cliente = ".$id);

            if($sql){
                exit(json_encode(array('status' => 'Sucesso, cliente deletado na tabela')));
            }else{
                exit(json_encode(array('status'=>'Erro ao deletar o cliente')));
            }
        }
    }
    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        //Inserir dados

            $data = json_decode(file_get_contents("php://input"));
            $sql = $con->query("INSERT INTO clientes(nome,cidade,email) values (
           '".$data->nome."',
            '".$data->cidade."',
            '".$data->email."') ;");

            if($sql){
                $data->id_contato = $con->insert_id;
                exit(json_encode($data));
            }else{
                exit(json_decode(array('status'=>'Erro ao inserir o cliente')));
            }
        }
    
?>