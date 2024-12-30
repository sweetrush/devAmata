<!-- navliner.php -->
<?php 

// NavListing Arrays 
// Includes Name of the NavListing and the URL to the Page


//Comment if USING Domain Name 
//$siteURLDirectory = 'https://52.64.123.214';

//Comment Using IP 

include '../../corestruts/GVarsSite.php';
// Loading the Site Global Variables 


$navlisting = [
              "Home",
              "About",
              "Special Links",
              "Priority Links"
            ];

$subnavProjects = [
                  "...",
                  "...",
                  "...",
                  "...",
                  "...",
                  "..."
                ];

$subnavWordedAt = [
                  "...",
                  "...",
                  "..."
                ];


$navSubDropDownElements_P1 = ' <li class="nav-item dropdown">
                               <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">';



//  Naviation Bar develops on this corepage
echo '<nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">AIS</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
      </button>

  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">';

for($x =0; $x <= count($navlisting); $x++ ){
	 echo '<li class="nav-item active">';

	 if($x == 0 ){

	 	echo '<a class="nav-link" href="'.$siteURLDirectory.'/">'.$navlisting[$x].'</a>'; 

	 }elseif($x == 1){
      // echo '<a class="nav-link" href="'.$siteURLDirectory.'/m'.$navlisting[$x].'">'.$navlisting[$x].'</a>';
      echo ''.$navSubDropDownElements_P1.''.$navlisting[$x].'';
      echo '</a><div class="dropdown-menu">';

      // // Looping for the SubPages for the Projects Nav
      // // or Creating the Projects Links 

         for($y =0; $y<= count($subnavProjects); $y++){
         echo '<a class="dropdown-item" href="'.$siteURLDirectory.'/m'.$navlisting[$x].'/s'.$subnavProjects[$y].'/">'.$subnavProjects[$y].'</a>';
        }

      echo  '</div></li>';
      // // end of Project Dropdown List
   }elseif($x == 2){
      // echo '<a class="nav-link" href="'.$siteURLDirectory.'/m'.$navlisting[$x].'">'.$navlisting[$x].'</a>';
      echo ''.$navSubDropDownElements_P1.''.$navlisting[$x].'';
      echo '</a><div class="dropdown-menu">';

      // // Looping for the SubPages for the Worked-At Nav
      // // or Creating the Worked-At Links 

         for($yy =0; $yy<= count($subnavWordedAt); $yy++){
         echo '<a class="dropdown-item" href="'.$siteURLDirectory.'/m'.$navlisting[$x].'/s'.$subnavWordedAt[$yy].'/">'.$subnavWordedAt[$yy].'</a>';
        }

      echo  '</div></li>';
      // // end of Project Dropdown List
   }else{

	 	echo '<a class="nav-link" href="'.$siteURLDirectory.'/m'.$navlisting[$x].'">'.$navlisting[$x].'</a>';
	 }
        
      echo '</li>';

}
     
echo'    </ul>
  </div>
</nav>
<p></p>
<p></p>
';

