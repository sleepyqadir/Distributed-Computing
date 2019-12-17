<?php

//initializing variables
$fn="";
$ln="";
$ad="";
$cn="";
$errors = array();


//connect to the database
$db = mysqli_connect('192.168.0.111','qadiri','keela1','dcpatient'); // akram k credentails
//connect to headquarter database
$dbHQ = mysqli_connect('localhost','root','','dcpatient'); // mere credentials

if(isset($_POST['replicateInsert'])) {
    
  $user_check_query = "SELECT * FROM patientasyncho " ;
  $result = mysqli_query($db, $user_check_query);
  $resultChecked=mysqli_num_rows($result);

  if ($resultChecked > 0) { 

    while($rows = mysqli_fetch_assoc($result)) {

      $fn=$rows['FirstName'];
      $ln=$rows['LastName'];
      $ad=$rows['Address'];
      $cn=$rows['Contact_No'];
      
      $user_check_query = "Delete FROM patient WHERE FirstName='$fn' AND Branch='Akram\'s Server'";
      mysqli_query($dbHQ, $user_check_query);

      $query = "INSERT INTO patient(FirstName,LastName,Address,Contact_No) VALUES ('$fn','$ln','$ad','$cn');";
      mysqli_query($dbHQ, $query);
  }
  
  echo "Data inserted in HQ";

  //deleting temp records
  $user_check_query = "Delete FROM patientasyncho" ;
  $result = mysqli_query($db, $user_check_query);
 }
}

//deleteing

if(isset($_POST['replicateDelete'])) {
 
$user_check_query = "SELECT * FROM patientasyncho" ;
$result = mysqli_query($db, $user_check_query);
$resultChecked=mysqli_num_rows($result);

if ($resultChecked > 0){ 

  while($rows = mysqli_fetch_assoc($result)) {

    $Pno=$rows['Product_ID'];
    $BRANCH=$rows['Branch'];

    $user_check_query = "Delete FROM patient WHERE FirstName='$fn' AND Branch='$BRANCH'" ;
    mysqli_query($dbHQ, $user_check_query);
     

  }

  echo "Data Deleted from HQ";

//deleting temp records
$user_check_query = "Delete FROM patientasyncho" ;
$result = mysqli_query($db, $user_check_query);
}


}



//modification
/*if(isset($_POST['replicateModify'])) {
 
  $user_check_query = "SELECT *FROM patientasyncho" ;
$result = mysqli_query($db, $user_check_query);
$resultChecked=mysqli_num_rows($result);

if ($resultChecked > 0) { 

  while($rows = mysqli_fetch_assoc($result)) {

    $Pno=$rows['Product_ID'];
      $name=$rows['CustomerName'];
      $date=$rows['dateTrans'];
      $price=$rows['Price'];
      $BRANCH=$rows['Branch'];

    
    $query = "UPDATE sales SET Product_ID ='$Pno',CustomerName='$name',dateTrans='$date',Price='$price'
    WHERE Product_ID ='$Pno' AND BRANCH='$BRANCH'";
    mysqli_query($dbHQ, $query);
    echo "<br>"."Data Modified successfully"."<br>";
     

  }



//deleting temp records
$user_check_query = "Delete FROM salesasyncho" ;
$result = mysqli_query($db, $user_check_query);
}


}
*/



?>