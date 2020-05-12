<?php

namespace App\Controllers;

use App\Models\Kot;
use Core\View;

class Kota extends \Core\Controller
{
    public function index()
    {
        $posts = Kot::getAll();
         View::renderTemplate('tabel/index.html', [
            'nama' => "Kota",
             'posts' => $posts,
             'judul' => ["id","name","daerah","negara","status"]
         ]);

    }
}