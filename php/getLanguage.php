<?php
    require_once "db.php";
    
    $res = getCol("SELECT `name` 
                   FROM `Language` 
                   ORDER BY (
                       SELECT COUNT(*) 
                       FROM `UserClick` 
                       WHERE `UserClick`.`language` = `Language`.`id`
                   ), `importance` DESC");
    
    echo json_encode($res);
?>
