<?php

$user = 'rojina';
$pass= 'Rojin@P0st2017';
$nodecode="19934";
$CityCode="01015";

// جهت پست عادی نیازی به گرفتن بارکد نیست لذا کدی ندارد
$Type1=11; //سرویس پیشتاز معمولی
$Type2=19; // سرویس سفارش معمولی
$Type3=76; //پست ویژه امروز
$Type4=79; // پست ویژه شهری

$Type=$Type1;


function getbarcode($user,$pass,$nodecode,$CityCode,$Type){
	$xml='<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
   <soapenv:Header/>
   <soapenv:Body>
      <tem:getMassBarcode>
         <tem:UserName>'.$user.'</tem:UserName>
         <tem:Password>'.$pass.'</tem:Password>
         <tem:PostNodeCode>'.$nodecode.'</tem:PostNodeCode>
         <tem:CityCode>'.$CityCode.'</tem:CityCode>
         <tem:TypeCode>'.$Type.'</tem:TypeCode>
      </tem:getMassBarcode>
   </soapenv:Body>
</soapenv:Envelope>';

    $fp = fsockopen("zorala.com", 80, $errno, $errstr, 300);
	if (!$fp)return false;
	$out = "POST /barcode/getbarcode.asmx?wsdl HTTP/1.0\r\n";
	$out .= "Host: zorala.com\r\n";
	$out .= "Content-Type: text/xml; charset=UTF-8\r\n";
	$out .= "SOAPAction: \"http://tempuri.org/getMassBarcode\"\r\n";
	$out .= "Content-Length: ".strlen($xml)."\r\n";
	$out .= "\r\n";
	$out .= $xml;
	fwrite($fp, $out);
	$code='';
	while (!feof($fp))$code.=fgets($fp, 128);
	fclose($fp);
	if(!preg_match('/<Barcode>([0-9]{20})<\/Barcode>/isU',$code,$brcode) || !isset($brcode[1]))return false;
	return $brcode[1];
}

echo getbarcode($user,$pass,$nodecode,$CityCode,$Type);


?>
