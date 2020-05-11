<?php

namespace App\Controllers;
use App\Models\Bio;
use Core\View;

class Biodata extends \Core\Controller
{
    public function index()
    {
        $posts = Bio::getAll();
        
         View::renderTemplate('tabel/index.html', [
             'nama' => "Biodata",
             'posts' => $posts,
             'judul' => ["id","name","pendidikan","passion","status"]
         ]);

    }
}