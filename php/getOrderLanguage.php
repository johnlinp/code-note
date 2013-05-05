<?php
    require_once "db.php";
    
    $res = getCol("SELECT `name` FROM `Language`");
    
    echo json_encode($res);
?>
