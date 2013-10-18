<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Untitled Document</title>
</head>

<body>
<?php
  $url = "http://api.wunderground.com/api/2e6b8f412f3e40e8/geolookup/q/21.03333330,105.85000000.json";
  //echo file_get_contents($url);die;
  $condition = "http://api.wunderground.com/api/2e6b8f412f3e40e8/conditions/geolookup/q/VN/Hanoi.json";
  //$json_string = file_get_contents("http://api.wunderground.com/api/2e6b8f412f3e40e8/geolookup/conditions/q/IA/Cedar_Rapids.json");
  $json_string = file_get_contents($condition);
  //echo $json_string;die;
  $parsed_json = json_decode($json_string);
  $location = $parsed_json->{'location'}->{'city'};
  $temp_c = $parsed_json->{'current_observation'}->{'temp_c'};
  echo "Current temperature in ${location} is: ${temp_c}\n";
?>

<div class="tp_-_box" data-tp-settings="domainId:7791042">
    <a href="http://www.trustpilot.dk/review/www.izabellashoes.com" rel="nofollow" hidden>Izabellashoes Anmeldelser</a>
</div>
<script type="text/javascript">
    (function () { var a = "https:" == document.location.protocol ? "https://ssl.trustpilot.com" : "http://s.trustpilot.com", b = document.createElement("script"); b.type = "text/javascript"; b.async = true; b.src = a + "/tpelements/tp_elements_all.js"; var c = document.getElementsByTagName("script")[0]; c.parentNode.insertBefore(b, c) })();
</script>
</body>
</html>