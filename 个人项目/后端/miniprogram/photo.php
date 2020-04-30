<?php
header('Content-Type:text/html;charset=utf-8');
$searchID =  $_GET['albumID'];
include('config.php');
$sql = "SELECT `photoPath` as col1, `photoDescription` as col2, `username` as col3, `useravatar` as col4,`photoDate` as col5
        FROM `photo`
        WHERE albumID = '$searchID'
        ORDER BY col5 DESC";
$result = mysqli_query($conn, $sql);
if (! $result) {
    die('无法读取数据: ' . mysqli_error($conn));
}
$num = mysqli_num_rows($result);
if($num == 0){
    echo '0';
} else {

    $arr = array();
    $i = 0;
    while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
        //$newItem = json_encode(array("id"=>$i, "imageUrl"=>"http://localhost:8080/miniprogram/".$row['col1'], "content"=>$row['col3']." ".$row['col4']),JSON_UNESCAPED_SLASHES);
        $newItem = array("id"=>$i, "imageUrl"=>"http://localhost:8080/miniprogram/".$row['col1'], "content"=>$row['col2'], "username"=>$row['col3'],  "useravatar"=>$row['col4'],"time"=>$row['col5']);
        $i++;
        $arr[] = $newItem;
    }
    //$newarr = array("imgListData"=>$arr);
    //echo stripslashes(json_encode($newarr));

    //echo $arr;
    //echo json_encode($arr,JSON_UNESCAPED_SLASHES);
    //var_dump(json_decode(stripslashes(json_encode($arr))));
    echo stripslashes(json_encode($arr, JSON_UNESCAPED_UNICODE));

}
 ?>
