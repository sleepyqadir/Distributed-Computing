<?php include('IPchecking.php');?>
<html>
<head>
  <title>Patient Health</title>
  <link rel="stylesheet" href="CSS/index.css"> 
</head>
<body>
    <?php
    
      if($user_ip !== '::1'){
         echo "<a href='index.php' class='mainpage'>Change Method</a>";
      }
      ?>
    <div class="Tables">
        <img src="Images/1.jpg" width="520" height=""/>
        <ul class="tabs">
          <li class="tab active"><a href="#content">Patient</a></li>
          <li class="tab"><a href="method2.php">Doctor</a></li>
        </ul>
          <div id="content">   
            
            <table>
                <tr>
                    <td><a href="patient/insert.php">- Insert</a></td>
                </tr>
                <tr>
                    <td><a href="patient/">- Delete</a></td>
                </tr>
                <tr>
                    <td><a href="patient/">- Show All</a></td>
                </tr>
            </table>  
            <h1>Patient Table</h1>
        </div>
      </div> 
</body>
</html>