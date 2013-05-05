<?php
    if(!isset($_POST['language']) or !isset($_POST['semantic']))
        exit();
    $language = $_POST['language'];
    $semantic = $_POST['semantic'];

    require_once "db.php";
    require_once "tools.php";
    
    $code = getOne("SELECT `code` 
                 FROM `Language`, `Semantic`, `Code` 
                 WHERE `Language`.`id` = `Code`.`language` AND 
                       `Semantic`.`id` = `Code`.`semantic` AND 
                       `Language`.`name` LIKE '$language' AND 
                       `Semantic`.`name` LIKE '$semantic'"
    );

    if($code == '') {
        $ip = getIp();
        $code = getOne("SELECT `code` 
                        FROM `Language`, `Semantic`, `UserCode` 
                        WHERE `UserCode`.`ip` = '$ip' AND
                              `Language`.`id` = `UserCode`.`language` AND 
                              `Semantic`.`id` = `UserCode`.`semantic` AND 
                              `Language`.`name` LIKE '$language' AND 
                              `Semantic`.`name` LIKE '$semantic'
                        ORDER BY `UserCode`.`timestamp` DESC"
        );
    }

    echo htmlspecialchars($code);
?>
