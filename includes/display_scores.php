<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8"/>

        <link rel="stylesheet" type="text/css" href="/assets/css/scores.css"/>
    </head>
    <body>
        <h1>Game Scores</h1>
        <?php
            require_once 'db_conn.php';
            require_once 'classes.php';

            $display = new Games();
            $results = $display->displayScores();
            $output = "";

            if (count($results)) {
                // set table
                $output = "<table>";

                // Add Headers
                $output .= "<tr>";
                $output .= "<th>Gamer</th>";
                $output .= "<th>Score</th>";
                $output .= "<th>Game</th>";
                $output .= "</tr>";

                // cycle through the array
                foreach ($results as $idx => $value) {
                    // Output a row
                    $output .= "<tr>";
                    $output .= "<td style=\"width:125px\">$value->gamer_name</td>";
                    $output .= "<td style=\"width:50px\">$value->score</td>";
                    $output .= "<td>$value->game_name</td>";
                    $output .= "</tr>";
                }

                // table close
                $output .= "</table>";
            }

            echo $output;
        ?>
    </body>
</html>