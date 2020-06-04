<?php
 
namespace App\Controllers;
 
use App\Models\Lingkaran as ModelsLingkaran;
use Core\View;

class Lingkaran extends \Core\Controller
{
    public function index()
    {
        View::renderTemplate("lingkaran/index.html"); 
    }
    public function hitung()
    {
        // dapatkan input dari form
        $radius = $_POST['radius'];
        
        // buat objek bertipe lingkaran
        $lingkaran1 = new ModelsLingkaran($radius);
 
        // tampilkan luas lingkaran
        View::renderTemplate("lingkaran/hasil.html", [
            'name' => 'Lingkaran',
            'luas' => $lingkaran1->get_area(),
            'keliling' => $lingkaran1->get_circumference()
        ]);
    }
}
