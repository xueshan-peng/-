<?php
/*以中国为时区为示例
date_default_timezone_set("PRC");
echo date("Y年-m月-d日 H:i:s");
*/
        /*
         * PHP获取中国标准北京时间
         * PHP获取NTP服务器时间
         * PHP获取时间服务器标准时间 避免服务器时间误差
         * @Author 吴先成 qQ: 13550865073
         https://www.51-n.com/t-4479-1-1.html
        */
function getTime(){
        ini_set('date.timezone', 'Asia/Shanghai');
        $startTime = microtime(true);
        $resource = @fsockopen('time.nist.gov', 13, $code, $error, 30);
        if($resource){
                stream_set_timeout($resource, 30);
                $response = stream_get_contents($resource);
                // 服务器返回的字符串形如 57637 16-09-06 16:26:17 50 0 0 147.2 UTC(NIST) *
                $endTime = microtime(true);
                $timeDifference = (int)round($endTime - $startTime);
                if(preg_match('%\d{2}\-\d{2}\-\d{2}\s+\d{2}\:\d{2}\:\d{2}%', $response, $match)){
                        // 得到当前时间戳
                        $timestamp = strToTime('20'.$match[0]) + 3600*8 + $timeDifference;
                        //echo date('Y-m-d H:i:s', $timestamp);
                        return date('Y-m-d H:i:s', $timestamp);
                }
        }
        return false;
}
?>
