<?php

namespace App\Controllers;
use App\Models\Mhs;
use Core\View;

class Mahasiswa extends \Core\Controller
{
    public function index()
    {
        $posts = Mhs::getAll();
         View::renderTemplate('tabel/index.html', [
            'nama' => "Mahasiswa",
             'posts' => $posts,
             'judul' => ["id","name","jurusan","fakultas","nrp"]
         ]);

    }
}