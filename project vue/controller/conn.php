<?php

$conn = new mysqli("localhost", "root", "", "crud_vue");
if($conn->connect_error){
    die("Koneksi Error!".$conn->connect_error);
}
$result = array('error'=>false);
$action = '';
if(isset($_GET['action'])){
    $action = $_GET['action'];
}

if($action == 'read'){
    $sql = $conn->query("SELECT * FROM users");
    $users = array();
    while($row = $sql->fetch_assoc()){
        array_push($users, $row);
    }
    $result['users'] = $users;
}

if($action == 'create'){
    $name = $_POST['name'];
    $nrp = $_POST['nrp'];
    $email = $_POST['email'];
    $sql = $conn->query("INSERT INTO `users` (`name`, `nrp`, `email`) VALUES ('$name','$nrp','$email')");
    
    if($sql){
        $result['message'] = "user telah ditambah";
    }
    else{
        $result['error'] = true;
        $result['message'] = "gagal menambahkan user";
    }
}

if($action == 'update'){
    $id = $_POST['id'];
    $name = $_POST['name'];
    $nrp = $_POST['nrp'];
    $email = $_POST['email'];
    $sql = $conn->query("UPDATE users SET name='$name' , nrp='$nrp' , email='$email' WHERE id='$id'");
    
    if($sql){
        $result['message'] = "user telah diupdate";
    }
    else{
        $result['error'] = true;
        $result['message'] = "gagal mengupdate user";
    }
}

if($action == 'delete'){
    $id = $_POST['id'];
    $sql = $conn->query("DELETE FROM users WHERE id='$id'");
    
    if($sql){
        $result['message'] = "user telah dihapus";
    }
    else{
        $result['error'] = true;
        $result['message'] = "gagal menghapus user";
    }
}

$conn->close();
echo json_encode($result);
?>