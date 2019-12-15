<?php
include("../connection.php")
//initializing variables
$fn="";
$ln="";
$ad="";
$cn="";
$errors = array();


//connect to the database
//$db = mysqli_connect('192.168.43.21','','',''); // AKRAM K CREDENTIALS


if(isset($_POST['patientInsert'])) {
    //recieve all inputted walues from the form
   $fn=mysqli_real_escape_string($db,$_POST['fn']);
   $ln=mysqli_real_escape_string($db,$_POST['ln']);
   $ad=mysqli_real_escape_string($db,$_POST['ad']);
   $cn=mysqli_real_escape_string($db,$_POST['cn']);


    // form validation: ensure that the form is correctly filled ...
  // by adding (array_push()) corresponding error unto $errors array
  if (empty($fn)) { array_push($errors, "*First name is required"); }
  if (empty($ln)) { array_push($errors, "*Last Name is required"); }
  if (empty($ad)) { array_push($errors, "*Address is required"); }
  if (empty($cn)){ array_push($errors, "*Contact is required"); }


  // first check the database to make sure 
  $user_check_query = "SELECT * FROM patient WHERE FirstName='$fn'" ;
  $result = mysqli_query($connakram, $user_check_query);
  $user = mysqli_fetch_assoc($result);

  
  
  if ($user) { // if Pno exists
    if ($user['FirstName'] === $fn) {
      $price=$user['Price'];
      $user_check_query = "Delete FROM inventory WHERE Product_ID='$Pno'" ;
      $result = mysqli_query($connakram, $user_check_query);
      if($result)
  {
    echo "<br >"."Data Deleted from patient"."<br/>";
  }
     
//inserting into tempo
        if (count($errors) == 0) {
            $query = "INSERT INTO patientasyncho(FirstName,LastName,Address,Contact_No) 
                      VALUES('$fn','$ln','$ad','$cn')";
            mysqli_query($connakram, $query);
            echo "Data inserted in Sales";
}

}
else{
  echo "Patient doesn't exists";
}
 
}
else 
{
  echo "Patient doesn't exists";
}

}

//Deleting
/*
if(isset($_POST['salesDelete'])) {
 
  //recieve all inputted walues from the form
  $Pno=mysqli_real_escape_string($db,$_POST['pNo']);
 
  // form validation: ensure that the form is correctly filled ...
  // by adding (array_push()) corresponding error unto $errors array
  if (empty($Pno)) { array_push($errors, "*Product No is required"); }

  $user_check_query = "SELECT * FROM sales WHERE Product_ID='$Pno'" ;
  $result = mysqli_query($db, $user_check_query);
  $user = mysqli_fetch_assoc($result);

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
      <td>".$user['CustomerName']."</td>
      <td>".$user['dateTrans']."</td>
      <td>".$user['Price']."</td>
      <td>".$user['Branch']."</td>
      </tr>
      </table>";


        $Pno=$user['Product_ID'];
        $name=$user['CustomerName'];
        $date=$user['dateTrans'];
        $price=$user['Price'];
        $BRANCH=$user['Branch'];
  
        $query = "INSERT INTO salesasyncho (Product_ID,CustomerName,dateTrans,Price,Branch) 
                    VALUES('$Pno','$name', '$date','$price','$BRANCH')";
          mysqli_query($db, $query);



    }
  $user_check_query = "Delete FROM sales WHERE Product_ID='$Pno'" ;
  $result = mysqli_query($db, $user_check_query);
  if($result)
  {
    echo "<br >"."Above Data Deleted successfully"."<br/>"."<hr/>";
  }else{
    echo "<br >"."Above Data Not Deleted successfully"."<br/>"."<hr/>";
  }

}
  else{
    echo "The data you are trying to DELETE doesnot exists";
  }
}


if(isset($_POST['salesModify'])) {
 
  //recieve all inputted walues from the form
  $Pno=mysqli_real_escape_string($db,$_POST['pNo']);
 
  // form validation: ensure that the form is correctly filled ...
  // by adding (array_push()) corresponding error unto $errors array
  if (empty($Pno)) { array_push($errors, "*Product No is required"); }

  $user_check_query = "SELECT * FROM sales WHERE Product_ID='$Pno'" ;
  $result = mysqli_query($db, $user_check_query);
  $user = mysqli_fetch_assoc($result);

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
      <td>".$user['CustomerName']."</td>
      <td>".$user['dateTrans']."</td>
      <td>".$user['Price']."</td>
      <td>".$user['Branch']."</td>
      </tr>
      </table>";
    
       //recieve all inputted walues from the form
    $Pno=mysqli_real_escape_string($db,$_POST['pNo']);
    $name=mysqli_real_escape_string($db,$_POST['name']);
    $date=mysqli_real_escape_string($db,$_POST['date']);
    $price=mysqli_real_escape_string($db,$_POST['price']);

    // form validation: ensure that the form is correctly filled ...
  // by adding (array_push()) corresponding error unto $errors array
  if (empty($Pno)) { array_push($errors, "*Product No is required"); }
  if (empty($name)) { array_push($errors, "*Name is required"); }
  if (empty($date)) { array_push($errors, "*Date is required"); }
  if (empty($price)) { array_push($errors, "*Price is required"); }
  //Update Data if no Error
  if (count($errors) == 0) {
    $query = "UPDATE sales SET Product_ID ='$Pno',CustomerName='$name',dateTrans='$date',Price='$price'
    WHERE Product_ID ='$Pno'";
    mysqli_query($db, $query);
    echo "<br>"."Data Modified successfully"."<br>";

//stroing in tempo

$query = "INSERT INTO salesasyncho(Product_ID,CustomerName,dateTrans,Price,Branch) 
VALUES('$Pno','$name','$date','$price','$BRANCH')";
mysqli_query($db, $query);

    

    $user_check_query = "SELECT * FROM sales WHERE Product_ID='$Pno'" ;
  $result = mysqli_query($db, $user_check_query);
  $user = mysqli_fetch_assoc($result);

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
      <td>".$user['CustomerName']."</td>
      <td>".$user['dateTrans']."</td>
      <td>".$user['Price']."</td>
      <td>".$user['Branch']."</td>
      </tr>
      </table>";
    
    }
  }
}
}
}
  
  else{
    echo "The data you are trying to modify doesnot exists";
  }
}
*/

