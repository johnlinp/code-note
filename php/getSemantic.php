<?php
    require_once "db.php";
    
    $res = getCol("SELECT `name` 
                   FROM `Semantic` 
                   ORDER BY (
                       SELECT COUNT(*) 
                       FROM `UserClick` 
                       WHERE `UserClick`.`semantic` = `Semantic`.`id`
                   ), `importance` DESC");
    
    echo json_encode($res);
?>
