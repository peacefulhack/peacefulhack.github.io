<?php
 
namespace App\Models;
 
class Lingkaran {
    // property
    public $radius;
 
    function __construct($radius) {
        $this->radius = $radius;
    }
 
    // methods
    public function get_area() {
        return 3.14 * $this->radius * $this->radius;
    }
 
    public function get_circumference() {
        return 2 * 3.14 * $this->radius;
    }
 
}
