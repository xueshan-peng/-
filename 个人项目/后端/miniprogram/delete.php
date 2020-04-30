<?php
include('config.php');
$url = $_GET['url'];

$sql = "DELETE
        FROM `photo`
        WHERE `photoPath` = '$url'";
if(mysqli_query($conn,$sql)){
    echo "1";
} else {
    echo "0".mysqli_error($conn);
}

 ?>
