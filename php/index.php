<?php include('checkIP.php');?>

<html>
<head>
  <title>EasyWalk</title>
  <link rel="stylesheet" href="CSS/index.css"> 
</head>
<body>
<?php
if($user_ip !== "::1")
{ echo "
<body>
<div class='Tables Methodsdiv'>
<h1 id='method'>CHOOSE REPLICATION METHOD</h1>
<div class='methodButton'>
<form action='ipFORmethod.php' method='POST'>
<button type='submit' name='syncho' class='methods'>Synchronous</button>
<button type='submit' name='asyncho' class='methods'>Asynchronous</button>
</form>
</div>
</div>
";

}
?>
</body>
</html>