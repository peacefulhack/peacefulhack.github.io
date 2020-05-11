<?php
 
namespace Core;
 
use PDO;
use PDOException;
 
abstract class Model
{
 
    /**
     * Get the PDO database connection
     *
     * @return mixed
     */
    protected static function getDB()
    {
        static $db = null;
 
        if ($db === null) {
            $host = 'localhost';
            $dbname = 'integratif';
            $username = 'integratif1';
            $password = 'whe1UEu5HCbRS4uL';
    
            try {
                $db = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", 
                              $username, $password);
 
            } catch (PDOException $e) {
                echo $e->getMessage();
            }
        }
 
        return $db;
    }
}
