<?php


//Seeing which branch user as selected to insert/delete/search/modify in (For Headquarter Branch Only)..
//..AND including the code for the selected branch


if(isset($_POST['doctorInsert'])){
$BRANCH =$_POST['branch'];
    if($BRANCH=='Karachi')
    {
       include("server.php");
    }
    elseif($BRANCH=='Lahore')
    {
        include("server2.php");
    }
    elseif($BRANCH=='Faisalabad')
    {
    include("server3.php");
    }
}//END INSERTION


if(isset($_POST['inventoringDelete'])){
    $BRANCH =$_POST['branch'];
    if($BRANCH=='Karachi')
    {
        include("server.php");
    }
    elseif($BRANCH=='Lahore')
    {
        include("server2.php");
    }
    elseif($BRANCH=='Faisalabad')
    {
        include("server3.php");
    }
}//END DELETE

if(isset($_POST['inventoringShow'])){
    $BRANCH ='Karachi';
        include("server.php");
}//END SHOW

            

?>
