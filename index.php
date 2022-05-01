<?php
session_start();
$vcount = file_get_contents('vcount_dif');
$vcount = $vcount + 1;
file_put_contents('vcount_dif',$vcount);



/////////////////////////////////////////////////////////
// INCLUDE FOR SUPPORT NEEDS 
/////////////////////////////////////////////////////////


// Loading Helpers for the Design and contnet processing 
include './corestruts/helperlibs.php';

include './corestruts/headerline.php';
// Loading loading the Headers support 

include './corestruts/layoutCalls.php';
// Loading layoutCalls for Gride Creations

include './corestruts/navliner.php';
// Loafing the  Navigation Lines 



// Government Site Array
$govsite = ['www.psc.gov.ws', 
	'www.audit.gov.ws',
	'www.ag.gov.ws',
	'www.palemene.ws',
	'www.ombudsman.gov.ws',
	'www.regulator.gov.ws',
	'www.oec.gov.ws',
	'www.samoalawreform.gov.ws',
	'www.sbs.gov.ws',
	'www.maf.gov.ws',
	'www.revenue.gov.ws',
	'www.mcil.gov.ws',
	'www.mcit.gov.ws',
	'www.mesc.gov.ws',
	'www.mof.gov.ws',
	'www.mfat.gov.ws',
	'www.health.gov.ws',
	'www.mjca.gov.ws',
	'www.mpmc.gov.ws',
	'www.mpe.gov.ws',
	'www.mwcsd.gov.ws',
	'www.acc.gov.ws',
	'www.dbsamoa.ws',
	'www.epc.ws',
	'www.lta.gov.ws',
	'www.nkfsamoa.org.ws',
	'www.nus.edu.ws',
	'www.samoahouing.ws',
	'www.sifa.ws',
	'www.samoaland.ws',
	'www.samoalife.gov.ws',
	'www.spasamoa.ws',
	'www.samoapost.ws',
	'www.publictrust.ws',
	'www.sqa.gov.ws',
	'www.samoa.travel',
	'www.swa.gov.ws',
	'www.scros.org.ws',
	'www.utos.gov.ws',
	'www.cbs.gov.ws'
	];


$samoanBank = [
		'www.bsp.com.ws',
		'www.nbs.ws',
		'www.anz.com/samoa/en/personal/',
		'www.cbs.gov.ws',
		'www.sifa.ws',
		'www.dbsamoa.ws',
		'www.scbl.ws',
];

$samoaISPnTelcos = [
	'www.digicelgroup.com/ws/',
	'www.vodafone.com.ws',
	'www.csl.ws',
	'www.samoadigital.net',
	'www.ssccsamoa.com',
	'lesamoa.net'
];


$samoaonlineshops = [
  'www.maua.app',
  'samoamarket.com',
  'frankiesamoa.com',
  'mysamoa.co',
  'www.onlineshoppingsamoa.com',
  'samoa.desertcart.com',
  'mailelani-samoa.com',
  'www.samoa.travel',
  'ssab.ws',
  'evenicarruthers.com',
  'www.seioriana.com',
  'vaoalavanilla.com'
];


////////////////////////////////////////////////////////////////////////////////////////////////////
// ##  Code for LinksIcon should be move to the  HelpersLibs file 
// ##
$linkIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-link" viewBox="0 0 16 16">
  <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z"/>
  <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z"/>
</svg>';



// row-1-col-1 HyperLink Arrays 
$row1col1 = '<ul class="list-group">
             <li class="list-group-item"> '.$linkIcon.' <a href="https://www.psc.gov.ws">Google SE</a></li>
             <li class="list-group-item"> '.$linkIcon.' <a href="https://www.yahoo.com">Yahoo SE</a></li>
             <li class="list-group-item"> '.$linkIcon.' <a href="http://bing.com/">Bing SE</a></li>
             <li class="list-group-item"> '.$linkIcon.' <a href="http://baidu.com/">Baidu SE</a></li>
             </ul>';

$row1col2 = '<ul class="list-group">
             <li class="list-group-item"> '.$linkIcon.' <a href="http://aol.co.uk/">AOL SE</a></li>
             <li class="list-group-item"> '.$linkIcon.' <a href="http://ask.com/">ASK SE</a></li>
             <li class="list-group-item"> '.$linkIcon.' <a href="http://www.excite.com/">Excite SE</a></li>
             <li class="list-group-item"> '.$linkIcon.' <a href="https://www.duckduckgo.com/">DuckDuckGo SE</a></li>
             </ul>';

$row1col3 = '<ul class="list-group">
             <li class="list-group-item"> '.$linkIcon.' <a href="https://www.wolframalpha.com/"> Wolframalpha SE</a></li>
             <li class="list-group-item"> '.$linkIcon.' <a href="https://www.yandex.com/">Yandex SE</a></li>
             <li class="list-group-item"> '.$linkIcon.' <a href="http://lycos.com/">Lycos SE</a></li>
             <li class="list-group-item"> '.$linkIcon.' <a href="http://www.chacha.com/">Chacha SE</a></li>
             </ul>';

$row1col4 = '<ul class="list-group">
             <li class="list-group-item"> '.$linkIcon.' <a href="https://www.psc.gov.ws">PSC</a></li>
             <li class="list-group-item"> '.$linkIcon.' <a href="https://www.mcit.gov.ws">MICT</a></li>
             <li class="list-group-item"> '.$linkIcon.' <a href="https://www.health.gov.ws">MOH</a></li>
             <li class="list-group-item"> '.$linkIcon.' <a href="https://www.mesc.gov.ws">MESC</a></li>
             </ul>';


// row-1-col-1 HyperLink Arrays
$row2col1 = '<ul class="list-group">
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$govsite[0].'">'.$govsite[0].'</a></li>
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$govsite[1].'">'.$govsite[1].'</a></li>
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$govsite[2].'">'.$govsite[2].'</a></li>
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$govsite[3].'">'.$govsite[3].'</a></li>
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$govsite[4].'">'.$govsite[4].'</a></li>
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$govsite[5].'">'.$govsite[5].'</a></li>
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$govsite[6].'">'.$govsite[6].'</a></li>
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$govsite[7].'">'.$govsite[7].'</a></li>
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$govsite[8].'">'.$govsite[8].'</a></li>
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$govsite[9].'">'.$govsite[9].'</a></li>
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$govsite[40].'">'.$govsite[40].'</a></li>
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$govsite[41].'">'.$govsite[41].'</a></li>
             </ul>';

$row2col2 = '<ul class="list-group">
             
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$govsite[10].'">'.$govsite[10].'</a></li>
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$govsite[11].'">'.$govsite[11].'</a></li>
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$govsite[12].'">'.$govsite[12].'</a></li>
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$govsite[13].'">'.$govsite[13].'</a></li>
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$govsite[14].'">'.$govsite[14].'</a></li>
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$govsite[15].'">'.$govsite[15].'</a></li>
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$govsite[16].'">'.$govsite[16].'</a></li>
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$govsite[17].'">'.$govsite[17].'</a></li>
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$govsite[18].'">'.$govsite[18].'</a></li>
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$govsite[19].'">'.$govsite[19].'</a></li>
             
             </ul>';

$row2col3 = '<ul class="list-group">
             
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$govsite[20].'">'.$govsite[20].'</a></li>
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$govsite[21].'">'.$govsite[21].'</a></li>
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$govsite[22].'">'.$govsite[22].'</a></li>
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$govsite[23].'">'.$govsite[23].'</a></li>
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$govsite[24].'">'.$govsite[24].'</a></li>
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$govsite[25].'">'.$govsite[25].'</a></li>
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$govsite[26].'">'.$govsite[26].'</a></li>
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$govsite[27].'">'.$govsite[27].'</a></li>
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$govsite[28].'">'.$govsite[28].'</a></li>
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$govsite[29].'">'.$govsite[29].'</a></li>
             
             </ul>';

$row2col4 = '<ul class="list-group">
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$govsite[30].'">'.$govsite[30].'</a></li>
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$govsite[31].'">'.$govsite[31].'</a></li>
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$govsite[32].'">'.$govsite[32].'</a></li>
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$govsite[33].'">'.$govsite[33].'</a></li>
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$govsite[34].'">'.$govsite[34].'</a></li>
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$govsite[35].'">'.$govsite[35].'</a></li>
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$govsite[36].'">'.$govsite[36].'</a></li>
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$govsite[37].'">'.$govsite[37].'</a></li>
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$govsite[38].'">'.$govsite[38].'</a></li>
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$govsite[39].'">'.$govsite[39].'</a></li>
             </ul>';


$Bankrow1col1 = '<ul class="list-group"> 
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$samoanBank[0].'">'.$samoanBank[0].'</a></li>
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$samoanBank[1].'">'.$samoanBank[1].'</a></li>
             </ul>';

$Bankrow1col2 = '<ul class="list-group">
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$samoanBank[2].'">'.$samoanBank[2].'</a></li>
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$samoanBank[3].'">'.$samoanBank[3].'</a></li>
             </ul>';

$Bankrow1col3 = '<ul class="list-group">
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$samoanBank[4].'">'.$samoanBank[4].'</a></li>
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$samoanBank[5].'">'.$samoanBank[5].'</a></li>
             </ul>';

$Bankrow1col4 = '<ul class="list-group">
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$samoanBank[6].'">'.$samoanBank[6].'</a></li>
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$samoanBank[7].'">'.$samoanBank[7].'</a></li>
             </ul>';


$ISP_Telcosrow1col1 = '<ul class="list-group"> 
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$samoaISPnTelcos[0].'">'.$samoaISPnTelcos [0].'</a></li>
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$samoaISPnTelcos [1].'">'.$samoaISPnTelcos [1].'</a></li>
             </ul>';

$ISP_Telcosrow1col2 = '<ul class="list-group">
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$samoaISPnTelcos [2].'">'.$samoaISPnTelcos [2].'</a></li>
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$samoaISPnTelcos [3].'">'.$samoaISPnTelcos [3].'</a></li>
             </ul>';

$ISP_Telcosrow1col3 = '<ul class="list-group">
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$samoaISPnTelcos [4].'">'.$samoaISPnTelcos [4].'</a></li>
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$samoaISPnTelcos [5].'">'.$samoaISPnTelcos [5].'</a></li>
             </ul>';

$ISP_Telcosrow1col4 = '<ul class="list-group">
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$samoaISPnTelcos [6].'">'.$samoaISPnTelcos [6].'</a></li>
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$samoaISPnTelcos [7].'">'.$samoaISPnTelcos [7].'</a></li>
             </ul>';



$onlineshopsrow1col1 = '<ul class="list-group"> 
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$samoaonlineshops[0].'">'.$samoaonlineshops[0].'</a></li>
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$samoaonlineshops[1].'">'.$samoaonlineshops[1].'</a></li>
             </ul>
            
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$samoaonlineshops[8].'">'.$samoaonlineshops[8].'</a></li>
             </ul>

             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$samoaonlineshops[9].'">'.$samoaonlineshops[9].'</a></li>
             </ul>';
             

$onlineshopsrow1col2 = '<ul class="list-group">
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$samoaonlineshops[2].'">'.$samoaonlineshops[2].'</a></li>
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$samoaonlineshops[3].'">'.$samoaonlineshops[3].'</a></li>
             </ul>

              <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$samoaonlineshops[10].'">'.$samoaonlineshops[10].'</a></li>
             </ul>

             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$samoaonlineshops[11].'">'.$samoaonlineshops[11].'</a></li>
             </ul>
            ';

$onlineshopsrow1col3 = '<ul class="list-group">
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$samoaonlineshops[4].'">'.$samoaonlineshops[4].'</a></li>
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$samoaonlineshops[5].'">'.$samoaonlineshops[5].'</a></li>
             </ul>';

$onlineshopsrow1col4 = '<ul class="list-group">
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$samoaonlineshops[6].'">'.$samoaonlineshops[6].'</a></li>
             <li class="list-group-item"> '.$linkIcon.' <a href="https://'.$samoaonlineshops[7].'">'.$samoaonlineshops[7].'</a></li>
             </ul>';




$searchbarCode = '<script async src="https://cse.google.com/cse.js?cx=bbbac27a3f50617e3"></script>
<div class="gcse-search"></div>';


// search Engine Bar Custom

layout_2_8_2('',$searchbarCode,'');

$contactAmata = contact_amata();
$submittingURL = submit_url();

layout_4_4_4('.',''.$contactAmata.'','.');
layout_4_4_4('.',''.$submittingURL.'','.');

//ROW One

layout_3_9('',"<span class=\"badge bg-warning text-dark\"><h4>Search Engines / Masini Saili <span class=\"badge bg-secondary\"> 12 </span></h4>");
layout_3_3_3_3($row1col1 , $row1col2 ,$row1col3 ,'');
spaceRow();


/////////////////////////
layout_3_9('',"<span class=\"badge bg-warning text-dark\"><h4>Online Shops / 
Faleoloa faaleupegatafailagi <span class=\"badge bg-secondary\"> ".sizeof($samoaonlineshops)." </span></h4>");
layout_3_3_3_3($onlineshopsrow1col1 , $onlineshopsrow1col2 , $onlineshopsrow1col3 , $onlineshopsrow1col4);
spaceRow();
/////////////////////////




//ROW TWO
layout_3_9('',"<span class=\"badge bg-warning text-dark\"><h4>Banks & Financials / Faletupe ma Ofisa mo Tupe  <span class=\"badge bg-secondary\"> ".sizeof($samoanBank)." </span></h4>");
layout_3_3_3_3($Bankrow1col1 , $Bankrow1col2 , $Bankrow1col3 , $Bankrow1col4);
spaceRow();
//ROW TWO
layout_3_9('',"<span class=\"badge bg-warning text-dark\"><h4>ISP & Telcos / Kamupani Initaneti ma Telefoni <span class=\"badge bg-secondary\"> ".sizeof($samoaISPnTelcos)." </span></h4>");
layout_3_3_3_3($ISP_Telcosrow1col1 , $ISP_Telcosrow1col2 , $ISP_Telcosrow1col3 , $ISP_Telcosrow1col4);
spaceRow();
//ROW THREE
layout_3_9('',"<span class=\"badge bg-warning text-dark\"><h4>Government Websites / Upegatafailagi Mo Ofisa A le Malo</span><span class=\"badge bg-secondary\"> ".sizeof($govsite)." </h4>");
layout_3_3_3_3($row2col1 , $row2col2 , $row2col3 , $row2col4);
spaceRow();

layout_4_4_4('','<h6>Visit: '.$vcount.'</h6>','');





// Getting Client Information
/////////////////////////////////////////
// Information : This feature of Amata will help to better  gain understanding in building for the 
// User and device preference and location based support. 
// get user details
        $user_agent = $_SERVER['HTTP_USER_AGENT']; //user browser
        $ip_address = $_SERVER["REMOTE_ADDR"];     // user ip adderss
        $page_name = $_SERVER["SCRIPT_NAME"];      // page the user looking
        $query_string = $_SERVER["QUERY_STRING"];   // what query he used
        $current_page = $page_name."?".$query_string; 


    // get location 
        // https://api.ipinfodb.com/v3/ip-city/?key=YOUR_API_KEY&ip=IPV4_OR_IPV6_ADDRESS&format=json
        $url = file_get_contents("http://api.ipinfodb.com/v3/ip-city/?key=34ec24d49d69985565c8c9dcfca452f6dc07c44e75689ffd37c46bb6341c6e52");
        $country=$url->countryName;  // user country
        $city=$url->cityName;       // city
        $region=$url->regionName;   // regoin
        $latitude=$url->latitude;    //lat and lon
        $longitude=$url->longitude;

    // get time
        date_default_timezone_set('UTC');
        $date = date("Y-m-d");
        $time = date("H:i:s");


// Defining the items for the files data 
//////////////////////////////////////////////////////////////////////////
//  Choosing to go with a top down layout 
//////////////////////////////////////////////////////////////////////////
$line_1 = 'Date : '.$date."\n";
$line_2 = 'Time : '.$time."\n";
$line_3 = 'UserAgent : '.$user_agent."\n";
$line_4 = 'IP-Address : '.$ip_address."\n";
$line_5 = 'Date : '.$url."\n";





$myfile = fopen("clinfo_dif", "a") or die("Unable to open file!");
//$txt = $date.'##'.$time.'##'.$user_agent.'##'.$ip_address.'##'.$page_name.'##'.$query_string.'##'.$current_page.'##'.'##'.$country.'##'.$city.'##'.$region.'##'.$latitude.'##'.$longitude.'';
$txt_h1 = "###################################################################\n";
$txt = $date.'##'.$time.'##'.$user_agent.'##'.$ip_address.'##'.$url."## \n";

// Writing to the file 
////////////////////////////////////////////////////
fwrite($myfile, $txt_h1);
fwrite($myfile, $line_1);
fwrite($myfile, $line_2);
fwrite($myfile, $line_3);
fwrite($myfile, $line_4);
fwrite($myfile, $line_5);
fwrite($myfile, $txt_h1);

// Closing the file 
fclose($myfile);

//echo $txt;
//echo '<p>..'.$url.'</p>';
