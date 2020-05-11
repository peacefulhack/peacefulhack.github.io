<?php
 
namespace App\Models;
use Core\Model;
use PDO;
use PDOException;

class sumbang extends Model
{
 
    /**
     * Get all the posts as an associative array
     *
     * @return array
     */
    public static function getName()
    {
        try {
            $db = static::getDB();
            $stmt = $db->query('SELECT `name` FROM `jenis_sumbangan` ORDER BY `name`');
            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
 
            return $results;
            
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    public static function setUser($name, $gender)
    {
        try {
            $db = static::getDB();

            $sql = "INSERT INTO `user`( `name`, `gender`) VALUES (:name , :gender)";

            $stmt = $db->prepare($sql);

            $stmt->bindParam(":name", $name);
            $stmt->bindParam(":gender", $gender);

            $stmt->execute();

            return $db->lastInsertId();
            
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }

    public static function isThere($jsumbang)
    {
        try {
            $db = static::getDB();

            $sql = "SELECT `id` FROM `jenis_sumbangan` WHERE `name`=:jsumbang LIMIT 1";

            $stmt = $db->prepare($sql);
            
            $stmt->bindParam(":jsumbang", $jsumbang);

            $stmt->execute();

            if($stmt->rowCount() < 1) return FALSE;
            $hasil = $stmt->fetch(PDO::FETCH_ASSOC);
            return $hasil["id"];
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    public static function setJS($jsumbang)
    {
        try {
            $db = static::getDB();

            $sql = "INSERT INTO `jenis_sumbangan`(`name`) VALUES ( :jsumbang )";

            $stmt = $db->prepare($sql);

            $stmt->bindParam(":jsumbang", $jsumbang);

            $stmt->execute();

            return $db->lastInsertId();
            
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    public static function setSumbangan($userid,$jenisid,$jumlah)
    {
        try {
            $db = static::getDB();

            $sql = "INSERT INTO `sumbangan`(`userid`, `jenis`, `jumlah`) VALUES (:userid , :jenisid , :jumlah)";

            $stmt = $db->prepare($sql);

            $stmt->bindParam(":userid", $userid);
            $stmt->bindParam(":jenisid", $jenisid);
            $stmt->bindParam(":jumlah", $jumlah);

            $stmt->execute();
            
            $hasil = $stmt->fetch(PDO::FETCH_ASSOC);
            return $hasil["id"];
            
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    public static function getSumbangan()
    {
        try {
            $sql = "SELECT (@cnt := @cnt + 1) AS rowNumber, b.name,\n"

                    . "b.gender, \n"
                    . "c.name AS jenis, a.jumlah \n"
                    . "FROM `sumbangan` AS a\n"
                    . "CROSS JOIN (SELECT @cnt := 0) AS dummy\n"
                    . "INNER JOIN user AS b ON b.id=a.userid\n"
                    . "INNER JOIN jenis_sumbangan AS c ON c.id=a.jenis\n"
                    . "WHERE 1";
            $db = static::getDB();
            $stmt = $db->query($sql);
            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
 
            return $results;
            
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    public static function getFilterSumbangan($name)
    {
        try {
            $sql = "SELECT (@cnt := @cnt + 1) AS rowNumber, b.name,\n"
                    . "b.gender, \n"
                    . "c.name AS jenis, a.jumlah \n"
                    . "FROM `sumbangan` AS a\n"
                    . "CROSS JOIN (SELECT @cnt := 0) AS dummy\n"
                    . "INNER JOIN user AS b ON b.id=a.userid\n"
                    . "INNER JOIN jenis_sumbangan AS c ON c.id=a.jenis\n"
                    . "WHERE c.name=:name";
            $db = static::getDB();
            $stmt = $db->prepare($sql);
            $stmt->bindParam(":name", $name);
            $stmt->execute();
            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $results;
            
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
}
