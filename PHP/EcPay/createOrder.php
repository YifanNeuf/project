<?php
    /**
    *   一般產生訂單(全功能)範例
    */
    date_default_timezone_set("Asia/Taipei");

    // $tmp = $_POST['tmp'];
    // if (isset($tmp)) {
    //     echo($tmp);
    // }
    // else {
    //     echo('none');
    // }

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $data = $_POST["data"];
      
        // 处理数据并打印结果
        $result = "data: $data";
        echo $result;
      }

    // 載入SDK(路徑可依系統規劃自行調整)
    
    include 'ECPay.Payment.Integration.php';
    // try {
        
    // 	$obj = new ECPay_AllInOne();
   
    //     //服務參數
    //     $obj->ServiceURL  = "https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5";  //服務位置
    //     $obj->HashKey     = '5294y06JbISpM5x9' ;                                          //測試用Hashkey，請自行帶入ECPay提供的HashKey
    //     $obj->HashIV      = 'v77hoKGq4kWxNNIS' ;                                          //測試用HashIV，請自行帶入ECPay提供的HashIV
    //     $obj->MerchantID  = '2000132';                                                    //測試用MerchantID，請自行帶入ECPay提供的MerchantID
    //     $obj->EncryptType = '1';                                                          //CheckMacValue加密類型，請固定填入1，使用SHA256加密


    //     //基本參數(請依系統規劃自行調整)
    //     $MerchantTradeNo = "Test".time() ;
    //     $obj->Send['ReturnURL']         = "http://www.ecpay.com.tw/receive.php";     //付款完成通知回傳的網址
    //     $obj->Send['MerchantTradeNo']   = $tmp;                          //訂單編號
    //     $obj->Send['MerchantTradeDate'] = date('Y/m/d H:i:s');                       //交易時間
    //     $obj->Send['TotalAmount']       = 100;                                       //交易金額
    //     $obj->Send['TradeDesc']         = "good to drink";                           //交易描述
    //     $obj->Send['ChoosePayment']     = ECPay_PaymentMethod::ALL;                  //付款方式:全功能
    //     $obj->Send['ClientBackURL'] = 'http://localhost:3000/donatestep3';
    //     $obj->Send['PaymentType'] = 'aio';

    //     //訂單的商品資料
    //     array_push(
    //         $obj->Send['Items'], 
    //         array('Name' => "測試1234", 'Price' => (int)"100", 'Currency' => "元", 'Quantity' => (int) "1", 'URL' => "dedwed"),
    //         array('Name' => "其他商品", 'Price' => (int)"10", 'Currency' => "元", 'Quantity' => (int) "1", 'URL' => "dedwed")
    //     );

    //     //產生訂單(auto submit至ECPay)
    //     $obj->CheckOut();
    // } catch (Exception $e) {
    // 	echo $e->getMessage();
    // }
?>