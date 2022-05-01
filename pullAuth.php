<?php 

// echo '<a href="./">Home</a>'; 
echo '<hr/><h5>REPO INFO</h5><hr/>';
$code = null;
$output = null;
$cmdCall = 'git pull';

exec($cmdCall, $output, $code);
echo 'you got pull';
print_r($output);

