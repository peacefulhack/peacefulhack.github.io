<?php
 
namespace App\Models;
use Core\Model;
use PDO;
use PDOException;

class Mhs extends Model
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
                                        jurusan     as tiga,
                                        fakultas    as empat,
                                        nrp         as lima
                                FROM mahasiswa ORDER BY jurusan');
            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
 
            return $results;
            
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
}
