<?php include('IPchecking.php');?>
<html>
<head>
  <title>DC Project</title>
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
          <li class="tab"><a href="method.php">Patient</a></li>
          <li class="tab active"><a href="#contecnt">Doctor</a></li>
        </ul>
          <div id="content">   
            
            <table>
                <tr>
                    <td><a href="doctor/insert.php">- Insert</a></td>
                </tr>
                
                <tr>
                    <td><a href="Sales/delete.php">- Delete</a></td>
                </tr>
                <tr>
                    <td><a href="Sales/showall.php">- Show All</a></td>
                </tr>
            </table>  
            <h1>Doctor Table</h1>
        </div>
      </div> 
</body>
</html>