<?php
require_once 'db_conn.php';
require_once 'classes.php';

if ($_SERVER["REQUEST_METHOD"] == "GET") {
	echo "Error: This script only allows POST requests.";
	http_response_code(400);
	exit;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
	$json = file_get_contents('php://input');
	$data = json_decode($json, true);

	if(!isset($data["username"])) {
		echo "Error: Missing Username.";
		http_response_code(400);
		exit;
	}

	if(!isset($data["game_id"])) {
		echo "Error: Missing Game ID.";
		http_response_code(400);
		exit;
	}

	if(!isset($data["score"])) {
		echo "Error: Missing Score.";
		http_response_code(400);
		exit;
	}

	$name = $data["username"];
	$game_id = $data["game_id"];
	$score = $data["score"];

	if (empty($name)) {
		echo "Error: Username must not be empty.";
		http_response_code(400);
		exit;
	}

	$scores = new Scores();
	$results = $scores->selectUser($name);
	$gamer_id = $results;
	$scores->submitScore($gamer_id, $game_id, $score);

	echo "Successfully pushed score.";
	http_response_code(200);
	exit;
}
?>