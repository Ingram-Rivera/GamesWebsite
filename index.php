<?php
	// http://mini-gameswebpage.xyz/
	require_once 'includes/db_conn.php';
	require_once 'includes/classes.php';
?>

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8"/>
		<meta name="viewport" content="width=device-width, initial-scale=1.0"/>

		<title>UAT Multi-Game App</title>
	</head>
	<body class="container">
		<?php include_once 'html_header.php'; ?>
		<?php include_once 'header.php'; ?>

		<div id="game_loads_here" class="clearfix">
			<img src="/assets/img/splash-screen.jpg" style="width: 100%; height: 100%" />
		</div>

		<div id="game_choice" class="text-center">
			<h2 id="choose_game" style="display:none;">Choose a Game</h2>
			<h2 id="quit_game" onclick="quit_game(); quitToggle();" style="display:none;">Quit Game</h2>
			<h2 id="show_scores" onclick="show_scores();" style="display: none;">Show Scores</h2>
			<div id="game_selection" class="row" style="display:none;">
				<div class="col-4">
					<h3 class="game" onclick="load_game('blackjack'); startToggle();">Black Jack</h3>
				</div>
				<div class="col-4">
					<h3 class="game" onclick="load_game('checkers'); startToggle();">Checkers</h3>
				</div>
				<div class="col-4">
					<h3 class="game" onclick="load_game('minesweeper'); startToggle();">Minesweeper</h3>
				</div>
				<div class="col-4">
					<h3 class="game" onclick="load_game('2048'); startToggle();">2048</h3>
				</div>
				<div class="col-4">
					<h3 class="game" onclick="load_game('space_invaders'); startToggle();">Space Invaders</h3>
				</div>
				<div class="col-4">
					<h3 class="game" onclick="load_game('hangman'); startToggle();">Hangman</h3>
				</div>
				<div class="col-4">
					<h3 class="game" onclick="load_game('tetris'); startToggle();">Tetris</h3>
				</div>
			</div>
		</div>

		<form id="gameNameCreate" action="" class="text-center">
			<h3 class="text-center">Enter Name to Start</h3>
			<input id="username" type="text" name="username" placeholder="Name">
			<div class="message_box" style="margin:10px 0px;"></div>
			<input id="submit" type="submit" name="Submit">
		</form>

		<div id="player_scores"></div>

		<?php include_once 'footer.php'; ?>
		<?php include_once 'html_footer.php'; ?>
	</body>
</html>
