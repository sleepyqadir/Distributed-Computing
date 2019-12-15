<?php
include("../connection.php");
//initializing variables
$dfn="";
$dln="";
$dcn="";
$errors = array();


//connect to the database
$dbHQ = mysqli_connect('localhost','root','','dcpatient');


if(isset($_POST['doctorInsert'])){
    //recieve all inputted walues from the form
    $dfn=mysqli_real_escape_string($dbHQ,$_POST['dfn']);
  	$dln=mysqli_real_escape_string($dbHQ,$_POST['dln']);
  	$dcn=mysqli_real_escape_string($dbHQ,$_POST['dcn']);
    

    // form validation: ensure that the form is correctly filled ...
  // by adding (array_push()) corresponding error unto $errors array
if (empty($dfn)) { array_push($errors, "*First name is required"); }
if (empty($dln)) { array_push($errors, "*Last Name is required"); }
if (empty($dcn)){ array_push($errors, "*Contact is required"); }

/*if($_SERVER['REQUEST_METHOD']=='POST'){
	$_SESSION['fn']=$_POST['fn'];
}

echo $_SESSION['fn']; */
      
//Finally Insert data if there is no Errors

    if (count($errors) == 0) {
         $query = "INSERT INTO doctor(FirstName,LastName,contact) VALUES ('$dfn','$dln','$dcn');";	
      	 $result = mysqli_query($conn1, $query);
      	if($result){
			echo "Data inserted";
	  	}
		else{
			echo "Acha baat nahi hai";
		}
		  
    } 


} //END INSERTION