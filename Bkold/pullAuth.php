<?php 

// echo '<a href="./">Home</a>'; 
echo '<hr/><h5>REPO INFO</h5><hr/>';

$outresults = system('. /var/www/html/devpro/d_amata.sfll.ws/pa.sh',$rv);
// echo "\n".'you got pull'."\n";
echo '<pre>out: '.$outresults."\n".$rv.'</pre>';

?>