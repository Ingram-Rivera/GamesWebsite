<?php
require_once 'db_conn.php';
require_once 'classes.php';

$display = new Games();
$results = $display->displayScores();

$output = "";
if (count($results)) {
    // set table
    $output = "<table style=\"margin-left:auto;margin-right:auto;margin-top:50px;\">";
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