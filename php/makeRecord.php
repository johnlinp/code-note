<?php
    if(!isset($_POST['language']) OR !isset($_POST['semantic']))
        exit();
    $language = $_POST['language'];
    $semantic = $_POST['semantic'];
    
    require_once "db.php";
    require_once "tools.php";

    $ip = getIp();
    
    putOne("INSERT INTO `UserClick` 
            (`ip`, `language`, `semantic`) VALUES ('$ip', (
                SELECT `id` FROM `Language` WHERE `name` = '$language'
            ), (
                SELECT `id` FROM `Semantic` WHERE `name` = '$semantic'
            ))"
    );
?>
