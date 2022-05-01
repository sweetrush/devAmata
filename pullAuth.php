<?php 

// echo '<a href="./">Home</a>'; 
echo '<hr/><h5>REPO INFO</h5><hr/>';

$outresults = shell_exec('git pull');
echo "\n".'you got pull'."\n";
echo '<pre>'.$outresults.'</pre>';

?>