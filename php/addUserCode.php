<?php
    if(!isset($_POST['provider']) or !isset($_POST['language']) or !isset($_POST['semantic']) or !isset($_POST['code']))
        exit();
    $provider = addslashes($_POST['provider']);
    $language = $_POST['language'];
    $semantic = $_POST['semantic'];
    $code = addslashes($_POST['code']);

    require_once "db.php";
    require_once "tools.php";

    $ip = getIp();
    
    putOne("INSERT INTO `UserCode` 
            (`provider`, `ip`, `language`, `semantic`, `code`) 
            VALUES ('$provider', '$ip', (
                SELECT `id` FROM `Language` WHERE `name` = '$language'
            ), (
                SELECT `id` FROM `Semantic` WHERE `name` = '$semantic'
            ), '$code')"
    );

?>

