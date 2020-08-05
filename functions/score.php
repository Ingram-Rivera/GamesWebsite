<?php
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    
    require_once(__DIR__ . "/mysql.config.php");
    $_POST = json_decode(file_get_contents('php://input'), true);
    
    if(isset($_POST["game"]) && isset($_POST["user"]) && isset($_POST["score"])) {
        $gameName = $_POST["game"];
        $userID = $_POST["user"];
        $score = $_POST["score"];
        submitScore($gameName, $userID, $score);
    }

    function submitScore($gameName, $userID, $score) {
        $connection = getMySQL();
        if(!$connection) {
            die("MySQL Connection Failed: " . mysqli_connect_error());
            return;
        }
        
        $tableName = getTable($gameName);
        if($tableName == null) {
            mysqli_close($connection);
            return;
        }
        
        createGameTable($gameName);
        
        $sqlCode = "INSERT INTO `" . $tableName . "` (`user_id`, `score`) VALUES (?, ?);";
        $statement = $connection->prepare($sqlCode);
        $statement->bind_param("si", $userID, $score);
        $statement->execute();
        
        mysqli_close($connection);
    }
    
    function getMySQL() {
        $hostName = DatabaseSettings::host;
        $port = DatabaseSettings::port;
        $url = ($hostName . ":" . $port);
        
        $username = DatabaseSettings::username;
        $password = DatabaseSettings::password;
        $database = DatabaseSettings::database;
        
        return mysqli_connect($url, $username, $password, $database);
    }
    
    function createGameTable($gameName) {
        $connection = getMySQL();
        if(!$connection) {
            die("MySQL Connection Failed: " . mysqli_connect_error());
            return;
        }
        
        $tableName = getTable($gameName);
        if($tableName == null) {
            mysqli_close($connection);
            return;
        }
        
        $sqlCode = "CREATE TABLE IF NOT EXISTS `" . $tableName . "` (`user_id` VARCHAR(256), `score` INTEGER, `timestamp` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP);";
        $result = mysqli_query($connection, $sqlCode);
        
        mysqli_close($connection);
        return $result;
    }
    
    function getTable($gameName) {
        switch($gameName) {
            case "minesweeper": return "minesweeper";
            case "2048": return "2048";
            
            case "blackjack":
            case "21":
            case "21cardgame":
                return "blackjack";
                
            default: break;
        }
        
        return null;
    }
?>