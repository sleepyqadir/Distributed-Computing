<?php
include("../checkIP.php");
//initializing variables
$fn="";
$ln="";
$ad="";
$cn="";
$errors = array();


//connect to the database
$dbHQ = mysqli_connect('localhost','root','','dcpatient');


if(isset($_POST['patientInsert'])) {
    //recieve all inputted walues from the form
    $fn=mysqli_real_escape_string($dbHQ,$_POST['fn']);
  	$ln=mysqli_real_escape_string($dbHQ,$_POST['ln']);
  	$ad=mysqli_real_escape_string($dbHQ,$_POST['ad']);
  	$cn=mysqli_real_escape_string($dbHQ,$_POST['cn']);
    

    // form validation: ensure that the form is correctly filled ...
  // by adding (array_push()) corresponding error unto $errors array
if (empty($fn)) { array_push($errors, "*First name is required"); }
if (empty($ln)) { array_push($errors, "*Last Name is required"); }
if (empty($ad)) { array_push($errors, "*Address is required"); }
if (empty($cn)){ array_push($errors, "*Contact is required"); }

/*if($_SERVER['REQUEST_METHOD']=='POST'){
	$_SESSION['fn']=$_POST['fn'];
}

echo $_SESSION['fn']; */
      
//Finally Insert data if there is no Errors

    if (count($errors) == 0) {
         $query = "INSERT INTO patient(FirstName,LastName,Address,Contact_No) VALUES ('$fn','$ln','$ad','$cn');";	
      $result = mysqli_query($conn1, $query);
      if($result){
		echo "Data inserted oofh";
	  }
		else{
			echo "Acha baat nahi hai";
		}
		  
    } 


} //END INSERTION


/*
if(isset($_POST['inventoringSearch'])) {
 
  //recieve all inputted walues from the form
  $Pno=mysqli_real_escape_string($db,$_POST['pNo']);
 
  // form validation: ensure that the form is correctly filled ...
  // by adding (array_push()) corresponding error unto $errors array
  if (empty($Pno)) { array_push($errors, "*Product No is required"); }

  if($BRANCH==='Karachi') //IF HQ USER selected to Search Record of Karachi only in Karachi DB
  {
    $user_check_query = "SELECT * FROM inventory WHERE Product_ID='$Pno' AND Branch='Karachi'" ;
    $result = mysqli_query($db, $user_check_query);
    $user = mysqli_fetch_assoc($result);
  }
  else //IF HQ USER selected to Search Record of ALL  in Karachi DB
  {
    $user_check_query = "SELECT * FROM inventory WHERE Product_ID='$Pno'" ;
    $result = mysqli_query($db, $user_check_query);
    $user = mysqli_fetch_assoc($result);
  }

  if ($user) { // if Pno exists
    if (count($errors) == 0) {
      echo "<table class='tableheadings'>
      <tr>
      <th>Product_ID</th>
      <th>Article_NO</th>
      <th>Size</th>
      <th>Color</th>
      <th>Gender</th>
      <th>Price</th>
      <th>Branch</th>
      </tr>
      <tr>
      <td>".$user['Product_ID']."</td>
      <td>".$user['Article_NO']."</td>
      <td>".$user['Size']."</td>
      <td>".$user['Color']."</td>
      <td>".$user['Gender']."</td>
      <td>".$user['Price']."</td>
      <td>".$user['Branch']."</td>
      </tr>
      </table>";
    }
  } //IF Pno not exist
  else
  {
    echo "Entered ID doesnot exist"; 
  } 
}//END OF SEARCH


if(isset($_POST['inventoringShow'])) {
 
  $user_check_query = "SELECT *FROM inventory" ;
  $result = mysqli_query($db, $user_check_query);
  $resultChecked=mysqli_num_rows($result);

  if ($resultChecked > 0) { 
    echo "<table class='tableheadings'>
    <tr>
    <th>Product_ID</th>
    <th>Article_NO</th>
    <th>Size</th>
    <th>Color</th>
    <th>Gender</th>
    <th>Price</th>
    <th>Branch</th>
    </tr>
    </table>";
    while($rows = mysqli_fetch_assoc($result)) {
      echo "
      <table class='tableheadings'>
      <tr>
      <td>".$rows['Product_ID']."</td>
      <td>".$rows['Article_NO']."</td>
      <td>".$rows['Size']."</td>
      <td>".$rows['Color']."</td>
      <td>".$rows['Gender']."</td>
      <td>".$rows['Price']."</td>
      <td>".$rows['Branch']."</td>
      </tr>
      </table>";
    }
  }
  else //IF DB IS EMPTY
  {
    array_push($errors, "No Data Exists"); 
    echo "No DATA exits";
  } 
}//END SHOW ALL

if(isset($_POST['inventoringDelete'])) {
 
  //recieve all inputted walues from the form
  $Pno=mysqli_real_escape_string($db,$_POST['pNo']);
 
  // form validation: ensure that the form is correctly filled ...
  // by adding (array_push()) corresponding error unto $errors array
  if (empty($Pno)) { array_push($errors, "*Product No is required"); }


  if($BRANCH==='Karachi') //NO NEED FOR THIS COMPARISON
  {

    //SEARCHING TO SEE IF THE DATA TO DELETE EXIST
  $user_check_query = "SELECT * FROM inventory WHERE Product_ID='$Pno' AND Branch='Karachi'" ;
  $result = mysqli_query($db, $user_check_query);
  $user = mysqli_fetch_assoc($result);

  if ($user) 
  { // if Pno exists
    if (count($errors) == 0) {
      echo "<table class='tableheadings'>
      <tr>
      <th>Product_ID</th>
      <th>Article_NO</th>
      <th>Size</th>
      <th>Color</th>
      <th>Gender</th>
      <th>Price</th>
      <th>Branch</th>
      </tr>
      <tr>
      <td>".$user['Product_ID']."</td>
      <td>".$user['Article_NO']."</td>
      <td>".$user['Size']."</td>
      <td>".$user['Color']."</td>
      <td>".$user['Gender']."</td>
      <td>".$user['Price']."</td>
      <td>".$user['Branch']."</td>
      </tr>
      </table>";
    }
    //QUERY TO DELETE DATA 
  $user_check_query = "Delete FROM inventory WHERE Product_ID='$Pno' AND Branch='Karachi'" ;
  $result = mysqli_query($db, $user_check_query);
  if($result)
  {
    echo "<br >"."Above Data Deleted successfully"."<br/>"."<hr/>";
  }
  else{
    echo "<br >"."Above Data Not Deleted successfully"."<br/>"."<hr/>";
  }
}


else{//IF NO ASKED DATA
    echo "The data you are trying to DELETE doesnot exists";
}
}
  
}//END OF DELETE


if(isset($_POST['inventoringModify'])) {
 
  //recieve all inputted walues from the form
  $Pno=mysqli_real_escape_string($db,$_POST['pNo']);
 
  // form validation: ensure that the form is correctly filled ...
  // by adding (array_push()) corresponding error unto $errors array
  if (empty($Pno)) { array_push($errors, "*Product No is required"); }

  //SEEING IF THE DATA REQUESTED FOR MODIFICATION EXIST
  $user_check_query = "SELECT * FROM inventory WHERE Product_ID='$Pno' AND Branch='Karachi'" ;
  $result = mysqli_query($db, $user_check_query);
  $user = mysqli_fetch_assoc($result);

  if ($user) { // if Pno exists
    if (count($errors) == 0) {
      //SHOWING DATA BEFORE MODIFICATION
      echo "OLD RECORD"."<br/>";
      echo "<table class='tableheadings'>
      <tr>
      <th>Product_ID</th>
      <th>Article_NO</th>
      <th>Size</th>
      <th>Color</th>
      <th>Gender</th>
      <th>Price</th>
      <th>Branch</th>
      </tr>
      <tr>
      <td>".$user['Product_ID']."</td>
      <td>".$user['Article_NO']."</td>
      <td>".$user['Size']."</td>
      <td>".$user['Color']."</td>
      <td>".$user['Gender']."</td>
      <td>".$user['Price']."</td>
      <td>".$user['Branch']."</td>
      </tr>
      </table>";
    
       //recieve all inputted walues from the form
    $Pno=mysqli_real_escape_string($db,$_POST['pNo']);
    $Ano=mysqli_real_escape_string($db,$_POST['aNo']);
    $SIZE=mysqli_real_escape_string($db,$_POST['size']);
    $COLOR=mysqli_real_escape_string($db,$_POST['color']);
    $GENDER=mysqli_real_escape_string($db,$_POST['gender']);
    $PRICE=mysqli_real_escape_string($db,$_POST['price']);
    

    // form validation: ensure that the form is correctly filled ...
  // by adding (array_push()) corresponding error unto $errors array
  if (empty($Pno)) { array_push($errors, "*Product No is required"); }
  if (empty($Ano)) { array_push($errors, "*Article No is required"); }
  if (empty($SIZE)) { array_push($errors, "*Size is required"); }
  if (empty($COLOR)) { array_push($errors, "*Color is required"); }
  if (empty($GENDER)) { array_push($errors, "*Gender is required"); }
  if (empty($PRICE)) { array_push($errors, "*Price is required"); }
  if (empty($BRANCH)) { array_push($errors, "*Branch is required"); }

  //Update Data if no Error
  if (count($errors) == 0) {

    //QUERY TO UPDATE DATA
    $query = "UPDATE inventory SET Product_ID ='$Pno',Article_No='$Ano',Size='$SIZE',Color='$COLOR',Gender='$GENDER',Price='$PRICE',Branch='$BRANCH'
    WHERE Product_ID ='$Pno'";
    mysqli_query($db, $query);
    echo "<br>"."Data Modified successfully"."<br>"."<br>";


  //SEARCHING DATA TO DISPLAY AFTER MODIFICATION
  $user_check_query = "SELECT * FROM inventory WHERE Product_ID='$Pno'" ;
  $result = mysqli_query($db, $user_check_query);
  $user = mysqli_fetch_assoc($result);

  if ($user) { // if Pno exists
    if (count($errors) == 0) {
      echo "NEW RECORD"."<br/>";
      echo "<table class='tableheadings'>
      <tr>
      <th>Product_ID</th>
      <th>Article_NO</th>
      <th>Size</th>
      <th>Color</th>
      <th>Gender</th>
      <th>Price</th>
      <th>Branch</th>
      </tr>
      <tr>
      <td>".$user['Product_ID']."</td>
      <td>".$user['Article_NO']."</td>
      <td>".$user['Size']."</td>
      <td>".$user['Color']."</td>
      <td>".$user['Gender']."</td>
      <td>".$user['Price']."</td>
      <td>".$user['Branch']."</td>
      </tr>
      </table>";
    
    }
    echo "<br>"."<br>"."<hr/>";
}
}
}
  }
  else{
    echo "The data you are trying to modify doesnot exists";
  }
}//END OF MODIFICATION*/
?>