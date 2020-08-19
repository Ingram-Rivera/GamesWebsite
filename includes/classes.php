<?php

class Gamer {
    private $pdo;
 	private $id;
 	public $gamer_name;
 	public $games_played;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function create($username) {
        $sql = "INSERT INTO `uat_game_app`.`gamer` (`gamer_name`) VALUES (:username)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindParam(':username', $username);
        $stmt->execute();
        return $stmt->rowCount();
    }

	function load_game_scores() {
		return $games_played;
	}
}

class Games {
    // attributes
    private $id;
    private $game_name;
    private $scores;

    // methods
    public function displayScores() {
        $db = new Database();
        $sql="SELECT id_scores, user_id, game_id, score,id_games, game_name, id_gamer, gamer_name 
           FROM `uat_game_app`.`scores`
           INNER JOIN `uat_game_app`.`games`
           ON `uat_game_app`.`scores`.game_id = `uat_game_app`.`games`.id_games
           INNER JOIN `uat_game_app`.`gamer`
           ON `uat_game_app`.`scores`.user_id = `uat_game_app`.`gamer`.id_gamer";
        $query=$db->query($sql);
        $results=$query->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        return $results;
    }
}

class Scores {
    private $pdo;
    private $id;
    public $gamer_name;
    public $games_played;

    public function selectUser($username) {
        $db = new Database();
        $sql="select id_gamer, gamer_name, gamer_secret from `uat_game_app`.`gamer` where gamer_name = '" . $username . "'";
        $query=$db->query($sql);
        $query->execute();
        $results=$query->fetchAll(PDO::FETCH_OBJ);

        if($query->rowCount()>0)
        {
            foreach ($results as $row ) 
            {
             /* cycle through entries get last one as we are only concerned with last entry if multiple entries */
            }
        }
        $gamerID = (int) $row->id_gamer;
        $db = null;
        return $gamerID;
    }

    public function submitScore($gamer_id,$game_id,$score) {
        $db = new Database();
        $sql="insert into scores(user_id,game_id,score) value(" . $gamer_id . "," . $game_id ."," . $score . ")";
        $query=$db->query($sql);
        $lastinsertid=$db->lastInsertId();
        $db = null;
    }
}
?>