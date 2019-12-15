<?php 
include("connection.php");
$flag=0;
if(isset($_POST['syncho']))
{
    $method='syncho';
    $flag=1;
    
}
elseif(isset($_POST['asyncho']))
{
    $flag=1;
    $method='asyncho';
    
}

function getUserIPforMethod()
{
    // Get real visitor IP behind CloudFlare network
    if (isset($_SERVER["HTTP_CF_CONNECTING_IP"])) {
              $_SERVER['REMOTE_ADDR'] = $_SERVER["HTTP_CF_CONNECTING_IP"];
              $_SERVER['HTTP_CLIENT_IP'] = $_SERVER["HTTP_CF_CONNECTING_IP"];
    }
    $client  = @$_SERVER['HTTP_CLIENT_IP'];
    $forward = @$_SERVER['HTTP_X_FORWARDED_FOR'];
    $remote  = $_SERVER['REMOTE_ADDR'];

    if(filter_var($client, FILTER_VALIDATE_IP))
    {
        $ip = $client;
    }
    elseif(filter_var($forward, FILTER_VALIDATE_IP))
    {
        $ip = $forward;
    }
    else
    {
        $ip = $remote;
    }

    return $ip;
}


$user_ip = getUserIPforMethod();
if($user_ip === '::1')
{
    
    include("sales.php");
}
elseif($user_ip === $servername2)
{
    
    $db = mysqli_connect($servername2,$username2,$password2,$db_name2);
    
    //deleting old records
    $user_check_query = "Delete FROM method_type" ;
    $result = mysqli_query($db, $user_check_query);

    if($flag)
    {
        $query = "INSERT INTO method_type (Name_Method) 
        VALUES('$method')";
        mysqli_query($db, $query);
    }
    else
    {
        header("location:index.php");
    }
    include("method.php");
}
elseif($user_ip === '')
{
    
    $db = mysqli_connect('192.168.43.94','EasyWalk3','easywalk3','method');
    
    //deleting old records
    $user_check_query = "Delete FROM method_type" ;
    $result = mysqli_query($db, $user_check_query);

    if($flag)
    {
        $query = "INSERT INTO method_type (Name_Method) 
        VALUES('$method')";
        mysqli_query($db, $query);
    }
    else
    {
        header("location:index.php");
    }
    include("inventory.php");
}




?>



