<?php
header('Content-Type:text/html;charset=utf-8');
$username =  $_GET['username'];
include('config.php');

$sql = "SELECT `photoPath` as col1, `photoDescription` as col2, `photoDate` as col3, `albumName` as col4
        FROM `photo`, `album`
        WHERE `photo`.albumID = `album`.albumID
        AND username = '$username'
        ORDER BY col3 DESC";
$result = mysqli_query($conn, $sql);
if (! $result) {
    die('无法读取数据: ' . mysqli_error($conn));
}
    $arr = array();
    $i = 0;
    while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
        //$newItem = json_encode(array("id"=>$i, "imageUrl"=>"http://localhost:8080/miniprogram/".$row['col1'], "content"=>$row['col3']." ".$row['col4']),JSON_UNESCAPED_SLASHES);
        $newItem = array("id"=>$i, "imageUrl"=>"http://localhost:8080/miniprogram/".$row['col1'], "content"=>$row['col2'], "time"=>$row['col3'], "album"=>$row['col4']);
        $i++;
        $arr[] = $newItem;
    }
    echo stripslashes(json_encode($arr, JSON_UNESCAPED_UNICODE));
 ?>
