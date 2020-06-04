<?php

namespace App\Controllers;
use Core\View;
use App\Models\sumbang;
class Home extends \Core\Controller
{
    public function index()
    {
        $hasil = sumbang::getName();
        View::renderTemplate("home/index.html", [
            'judul' => 'Sumbangan COVID-19',
            'jenis' => $hasil,
            'nav' => TRUE
        ]);

    }
    public function setData()
    {   
        if(!isset($_POST['submit'])) return;
        $userid = sumbang::setUser( $_POST['name'], $_POST['gender'] );
        
        $jsumbang = $_POST['jenisSumbangan'];
        $iter = 0;
        $jumlah = $_POST['jumlah'];
        foreach($jsumbang as $js){
            $jsid = sumbang::isThere($js);
            //return print_r($jsid);
            if( $jsid >= 1){
                $done = sumbang::setSumbangan($userid,$jsid,$jumlah[$iter]);
            }
            else{
                $jsid = sumbang::setJS($js);
                $done = sumbang::setSumbangan($userid, $jsid[0], $jumlah[$iter]);
            }
            $iter++;
        }
        $hasil = sumbang::getName();
        View::renderTemplate("home/index.html", [
            'judul' => 'Sumbangan COVID-19',
            'jenis' => $hasil,
            'pesan' => 'Data berhasil di masukkan!',
            'nav' => TRUE
        ]);

    }
}