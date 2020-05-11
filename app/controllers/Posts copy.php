<?php

namespace App\Controllers;
use App\Models\Post;
use Core\View;

class Posts extends \Core\Controller
{
    public function index()
    {
        $posts = Post::getAll();
         View::renderTemplate('posts/index.html', [
             'posts' => $posts
         ]);

    } 
}