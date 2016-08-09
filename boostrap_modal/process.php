<?php
if (isset($_POST['name'])) {
$name = strip_tags($_POST['name']);
$email = strip_tags($_POST['Email']);
$sug = strip_tags($_POST['sug']);
echo "Name		=".$name."</br>";	
echo "Email		=".$email."</br>";	
echo "Message		=".$sug."</br>";	
echo "<span class=\"label label-info\" >your message has been submitted .. Thanks you</span>";
}?>