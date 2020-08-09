<?php
require_once 'db_conn.php';
require_once 'classes.php';

if ($_SERVER["REQUEST_METHOD"] == "GET") {
	$name = $_GET['username'];
	if (!empty($name)) {
		$db = new Database();
		$username = new Gamer($db);
		$username->create($name);
	}
}
if ($_SERVER["REQUEST_METHOD"] == "POST") {
	$name = $_POST['username'];
	if (!empty($name)) {
		$db = new Database();
		$username = new Gamer($db);
		$username->create($name);
		setcookie('player',$_POST['username'],time() + (86400 * 30), "/");
	}
}