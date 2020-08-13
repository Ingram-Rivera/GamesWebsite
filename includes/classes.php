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
    function load_game($game_name) {}
    function play_game($game_name) {}
    function record_score($game_name) {}
    function quit_game($game_name) {}
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