<?php
require_once 'db_conn.php';
require_once 'classes.php';

if ($_SERVER["REQUEST_METHOD"] == "GET") {
	$name = $_GET['username'];
	$game_id = $_GET['game_id'];
	$score = $_GET['score'];
	if (!empty($name)) {
		$scores = new Scores();
		$results = $scores->selectUser($name);
		$gamer_id = $results;
		$scores->submitScore($gamer_id, $game_id, $score);
	}
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
	$name = $_POST['username'];
	$game_id = $_POST['game_id'];
	$score = $_POST['score'];
	if (!empty($name)) {
		$scores = new Scores();
		$results = $scores->selectUser($name);
		$gamer_id = $results;
		$scores->submitScore($gamer_id, $game_id, $score);
	}
}
?>