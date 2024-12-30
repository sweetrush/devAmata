<?php
// About LayoutCalls Pape
// This Page defines the layout calls for laying out in iformation in the Gride. 



function spaceRow(){

	// |=====|================|====|
	// |  2  |       8        |  2 |
	// |=====|================|====|

echo '<div class="container p-4">
  		<div class="row">
    		<div class="col-12"></div>
  	    </div>
  	  </div>';

}


function layout_2_8_2($l1,$l2,$l3){

	// |=====|================|====|
	// |  2  |       8        |  2 |
	// |=====|================|====|

echo '<div class="container">
  		<div class="row">
    		<div class="col-2">'.$l1.'</div>
    		<div class="col-8">'.$l2.'</div>
    		<div class="col-2">'.$l3.'</div>
  	    </div>
  	  </div>';

}


function layout_1_10_1($l1,$l2,$l3){

	// |=====|================|====|
	// |  1  |       10       |  1 |
	// |=====|================|====|

echo '<div class="container ">
  		<div class="row">
    		<div class="col-1">'.$l1.'</div>
    		<div class="col-10">'.$l2.'</div>
    		<div class="col-1">'.$l3.'</div>
  	    </div>
  	  </div>';

}



function layout_6_6($l1,$l2){

	// |============|============|
	// |     6      |     6      |
	// |============|============|

echo '<div class="container">
  		<div class="row">
    		<div class="col-6">'.$l1.'</div>
    		<div class="col-6">'.$l2.'</div>
  	    </div>
  	  </div>';

}


function layout_4_4_4($l1,$l2,$l3){

	// |=======|===========|=======|
	// |  4    |     4     |   4   |
	// |=======|===========|=======|

echo '<div class="container">
  		<div class="row">
    		<div class="col-4">'.$l1.'</div>
    		<div class="col-4">'.$l2.'</div>
    		<div class="col-4">'.$l3.'</div>
  	    </div>
  	  </div>';

}


function layout_3_3_3_3($l1,$l2,$l3,$l4){

	// |=====|======|======|=======|
	// |  3  |   3  |   3  |   3   |
	// |=====|======|======|=======|

echo '<div class="container-fluid">
  		<div class="row">
    		<div class="col-3">'.$l1.'</div>
    		<div class="col-3">'.$l2.'</div>
    		<div class="col-3">'.$l3.'</div>
    		<div class="col-3">'.$l4.'</div>
  	    </div>
  	  </div>';

}

function layout_3_9($l1,$l2){

	// |=====|======|======|=======|
	// |  3  |          9          |
	// |=====|======|======|=======|

echo '<div class="container-fluid">
  		<div class="row">
    		<div class="col-3">'.$l1.'</div>
    		<div class="col-9">'.$l2.'</div>
  	    </div>
  	  </div>';

}