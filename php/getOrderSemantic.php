<?php
    require_once "db.php";
    
    $res = getCol("SELECT `name` FROM `Semantic`");
    
    echo json_encode($res);
?>
