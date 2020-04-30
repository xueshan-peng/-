<?php
/*
define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', '');
define('DB_DATABASE', 'pengxueshan');
$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

if(! $conn){
  die("连接不到数据库：" . mysqli_error());
}else{
  echo "success";
}
*/
$dbhost = 'localhost:3306';  // mysql服务器主机地址
$dbuser = 'root';            // mysql用户名
$dbpass = '';          // mysql用户名密码
$conn = mysqli_connect($dbhost, $dbuser, $dbpass);
if(! $conn )
{
    die('连接失败: ' . mysqli_error($conn));
}
//echo '连接成功';
mysqli_select_db($conn, 'miniprogram' );
mysqli_set_charset($conn, "utf8");
//mysqli_close($conn);
?>
