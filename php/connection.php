<?php

$servername1 = "localhost";
$username1 = "root";
$password1 = "";
$db_name1 = "dcpatient";

$servername2 = "192.168.0.111";
$username2 = "qadiri";
$password2 = "keela1";
$db_name2 = "dcpatient";

$servername3 = "192.168.0.110";
$username3 = "qadiri";
$password3 = "keela1";
$db_name3 = "dcpatient";

$conn1 = new mysqli($servername1,$username1,$password1,$db_name1);
//$connakram = new mysqli($servername2,$username2,$password2,$db_name2);
//$connqadir = new mysqli($servername3,$username3,$password3,$db_name3);

if($conn1->connect_error){
	die("Connection failed locally".$conn1->connect_error);
}
else{
echo "Connected Successfully with HQ";
}

/*if($connakram->connect_error){
	die("Connection failed with branch".$conn1->connect_error);
}
else{
echo "connected with akram server";
}
*/
?>
