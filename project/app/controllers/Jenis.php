<?php

namespace App\Controllers;
use Core\View;
use App\Models\sumbang;
class Jenis extends \Core\Controller
{
    public function index()
    {
        $hasil = sumbang::getName();
        $data = sumbang::getSumbangan();
        View::renderTemplate("home/rekap.html", [
            'judul' => 'List Sumbangan COVID-19',
            'jenis' => $hasil,
            'data' => $data,
            'nav' => FALSE
        ]);

    }
    public function filter()
    {
        if(!isset($_GET['submit'])) return;
        $hasil = sumbang::getName();
        $data = sumbang::getFilterSumbangan($_GET['submit']);
        View::renderTemplate("home/rekap.html", [
            'judul' => 'List Sumbangan ' . $_GET['submit'] . ' COVID-19',
            'jenis' => $hasil,
            'data' => $data,
            'nav' => FALSE
        ]);

    }
}