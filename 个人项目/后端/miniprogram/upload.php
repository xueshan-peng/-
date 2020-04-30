<?php
//print_r($_FILES['file']);
header('Content-Type:text/html;charset=utf-8');
include('config.php');
include('time_config.php');
$aid = $_POST['albumID'];
$des = $_POST['description'];
$username = $_POST['username'];
$avatar = $_POST['useravatar'];
$datetime = getTime();
//$datetime = date("Y-m-d H:i:s");
$time = time();


if(!empty($_FILES['file']['tmp_name'])){
    $file_name = $_FILES["file"]["name"];
    $file_tmp = $_FILES["file"]['tmp_name'];//临时文件地址

    $file_ext = explode('.', $file_name);
    $file_ext = strtolower(end($file_ext));

    //上传文件类型列表
    $uptypes=array(
     'image/jpg',
     'image/jpeg',
     'image/png',
     'image/pjpeg',
     'image/gif',
     'image/bmp',
     'image/x-png'
    );


          if($_FILES["file"]["size"] > 1024000){
              //Response::json(0,'error: 图片过大',$img_url1);
              echo '0+图片过大';
          } else {
               //判断上传的图片的类型是不是jpg,gif,png,bmp中的一种，同时判断是否上传成功
               if(in_array($_FILES['file']["type"], $uptypes)){

                        $file_name_new = $username."-".$time.".".$file_ext;
                        $file_destination = "uploads/".$file_name_new;

                        //如果上传的文件没有在服务器上存在 //把图片文件从临时文件夹中转移到我们指定上传的目录中
                        if(move_uploaded_file($file_tmp,$file_destination))
                        {

                        $sql = "INSERT INTO `photo` (`photoPath`, `photoDescription`, `albumID`, `username`, `useravatar`, `photoDate`)
                                VALUES ('$file_destination', '$des', '$aid', '$username', '$avatar', '$datetime')";
                        $insert = mysqli_query($conn, $sql);
                        if ($insert) {
                            //Response::json(1,'success: 上传成功',$img_url1);
                            echo '1';
                        } else {
                            die('insert fail: '.mysqli_error($conn));
                        }

                    } else {
                        echo '0';
                    }

                } else {
                        //Response::json(1,'error: 类型错误',$img_url1);
                        //$unuploaded++;
                        echo '0';
                  }
           }
      //}//endif else


     //Response::json(0,'error: 上传失败',$img_url1);

} else {
    echo '0';
}


?>
