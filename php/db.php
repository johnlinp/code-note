<?php
    $hostname = "gardenia.csie.ntu.edu.tw";
    $database = "SetSize";
    $username = "averangeall";
    $password = "agent#336";
    $link = mysql_connect($hostname, $username, $password);
    mysql_select_db($database, $link);
    
    function getTable($cmd) {
        $res = array();
        $query = mysql_query($cmd);
        while(($row = mysql_fetch_array($query)) != null)
            array_push($res, $row);
        return $res;
    }
    
    function getCol($cmd) {
        $table = getTable($cmd);
        $res = array();
        for($i = 0; $i < count($table); ++ $i)
            array_push($res, $table[$i][0]);
        return $res;
    }
    
    function getRow($cmd) {
        $table = getTable($cmd);
        return $table[0];
    }
    
    function getOne($cmd) {
        $table = getTable($cmd);
        if(count($table) > 0)
            return $table[0][0];
        else
            return "";
    }
    
    function putOne($cmd) {
        mysql_query($cmd);
    }
    
?>
