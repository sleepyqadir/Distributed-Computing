<?php 

function getUserIP()  //GETTING IP OF THE SYSTEM USING THE SITE
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

//THIS WILL INCLUDE THE CODE FOR ASYNCHRONOUS REPLICATION AS THE USER PRESS "REPLICATION IN HQ BUTTON"
//EACH BRANCH (not HQ) AS ITS OWN CODE 
//HEADQUARTER WILL BE DIRECTED TO check which branch user as selected 
 
$user_ip = getUserIP();

if($user_ip === '192.168.0.101') //FOR HEADQUATER
{   
    include('checkBranch.php');
}


elseif($user_ip === '192.168.0.111') //FOR LAHORE (SERVER2)
{   
    if(isset($_POST['replicateInsert'])){
        include("../patientAsyncho/server2asyncho.php");

    }
    elseif(isset($_POST['replicateDelete'])){
        include("../patientAsyncho/server2asyncho.php");

    }
    }


elseif($user_ip === '') //FOR FAISALABAD SERVER3
{
            
    if(isset($_POST['replicateInsert'])){
        include("../patientAsyncho/server3asyncho.php");

    }
   elseif(isset($_POST['replicateModify'])){
        include("../patientAsyncho/server3asyncho.php");

    }

        }
?>