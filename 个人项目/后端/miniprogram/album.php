<?php
header('Content-Type:text/html;charset=utf-8');
include('config.php');
$sql = "SELECT albumName
        FROM `album`";
$result = mysqli_query($conn, $sql);
if (! $result) {
    die('无法读取数据: ' . mysqli_error($conn));
}
$num = mysqli_num_rows($result);
$round =0;
while($row = mysqli_fetch_array($result)){
    $round ++;
    $output = $row['albumName'];
    if($round < $num){
        $output .= '+';
    }
    echo $output;
}

?>
