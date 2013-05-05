<?php
    if(!isset($_POST['language']) OR !isset($_POST['semantic']) OR !isset($_POST['code']))
        exit();
    $language = $_POST['language'];
    $semantic = $_POST['semantic'];
    $code = addslashes($_POST['code']);

    require_once "db.php";

    $id = getOne("SELECT `id` FROM `Code` WHERE `language` = $language AND `semantic` = $semantic");
    if($id == "")
        putOne("INSERT INTO `Code` (`language`, `semantic`, `code`) VALUES ('$language', '$semantic', '$code')");
    else
        putOne("UPDATE `Code` SET `code` = '$code' WHERE `id` = $id");
?>

<html>
    <head>
        <meta http-equiv="refresh" content="0; url=../addCode.html">
    </head>
</html>

