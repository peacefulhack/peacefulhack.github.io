<?php
 
namespace App\Models;
use Core\Model;
use PDO;
use PDOException;

class Post extends Model
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
            $stmt = $db->query('SELECT id, title, content FROM posts
                                ORDER BY created_at');
            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
 
            return $results;
            
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
}
