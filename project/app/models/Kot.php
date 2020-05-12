<?php
 
namespace App\Models;
use Core\Model;
use PDO;
use PDOException;

class Kot extends Model
{
 
    /**
     * Get all the posts as an associative array
     *
     * @return array
     */
    public static function getAll()
    {
        try {
            $db = static::getDB();
            $stmt = $db->query('SELECT  id          as satu,
                                        name        as dua,
                                        daerah      as tiga,
                                        negara      as empat,
                                        status      as lima
                                FROM kota ORDER BY id');
            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
 
            return $results;
            
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
}
