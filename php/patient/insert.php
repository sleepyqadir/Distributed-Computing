
<?php
include("../connection.php");
include("checkIP.php");
?>
<!-- Compiled and minified CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">

    <!-- Compiled and minified JavaScript -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>


<html>
<head>
 <title>Insert Patient</title>	
</head>
<body>
	<div class="centre-align">
	<div class="row">
    <form class="col s12" action="server.php" method="POST">
      <div class="row">
        <div class="input-field col s12">
          <input placeholder="Placeholder" id="first_name" type="text" class="validate" name="fn">
          <label for="first_name">First Name</label>
        </div>
        <div class="input-field col s12">
          <input id="last_name" type="text" class="validate" name="ln">
          <label for="last_name">Last Name</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="contact" type="text" class="validate" name="ad">
          <label for="contact">Address</label>
        </div>
		  <div class="input-field col s12">
          <input id="contact" type="text" class="validate" name="cn">
          <label for="contact">Contact</label>
        </div>
      </div>
		<!--<button class="btn waves-effect waves-light" type="submit" name="patientInsert" value="Submit">
    		<i class="material-icons right">Submit</i>
  		</button>
		<input type="submit" name="submit" value="Submit"> -->
		<?php
			$user_ip =getUserIP();	
			if($user_ip === '::1'){
            echo"
                <p>
    			 <label>
      				<input class='with-gap' name='branch' type='radio' checked />
      					<span>karachi</span>
    			 </label>
  				</p>
				<p>
    			 <label>
      				<input class='with-gap' name='branch' type='radio' checked />
      					<span>Lahore</span>
    			 </label>
  				</p>
				<p>
    			 <label>
      				<input class='with-gap' name='branch' type='radio' checked />
      					<span>Faisalabad</span>
    			 </label>
  				</p>
 ";
        } 
		?>
		<tr>
                <td><button type="submit" name='patientInsert' class="button">Insert</button></td>
            </tr>
    </form>
  </div>
	</div>


<?php
	
  if($user_ip === '192.168.0.111'){ //akram ka ip dalna idhr
            
                $db = mysqli_connect('192.168.0.111','qadiri','keela1','dcpatient');  //akram k credentials
                    
                    $user_check_query = "SELECT * FROM method_type ORDER BY ID DESC LIMIT 1";
                    $result = mysqli_query($db, $user_check_query);
                    $user = mysqli_fetch_assoc($result);
                    
                    if(TRUE) 
                    { 
                        $method = $user['Name_Method'];
                        if($method=='asyncho'){
                            echo "
                            <form class='noStyle' action='insert1.php' method='POST'>
                            <button type='submit' name='replicateInsert' class='replicate'>Replicate in HQ</button>
                            </form>";

                            include("../patientAsyncho/server2tempo.php");
                        }
                        if($method=='syncho'){
                                
                            include("server.php");
                        }
                    }
                    else
                    {
                        header("location:../connection.php");
                    }
                }

	
	
?>
	</body>
</html>