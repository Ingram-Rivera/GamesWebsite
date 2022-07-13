CREATE TABLE `gamer` (
	`id_gamer` INT(11) NOT NULL AUTO_INCREMENT,
	`gamer_name` TINYTEXT NOT NULL,
	`games_played` INT(11) NOT NULL DEFAULT '0',
	PRIMARY KEY (`id_gamer`) USING BTREE
);

CREATE TABLE `games` (
	`id_games` INT(11) NOT NULL AUTO_INCREMENT,
	`game_name` TINYTEXT NOT NULL,
	PRIMARY KEY (`id_games`) USING BTREE
);

CREATE TABLE `scores` (
	`id_scores` INT(11) NOT NULL AUTO_INCREMENT,
	`user_id` INT(11) NOT NULL,
	`game_id` INT(11) NOT NULL,
	`score` INT(11) NOT NULL,
	PRIMARY KEY (`id_scores`) USING BTREE
);
