<!-- footerliner.php -->
<?php 
$siteURLMain = 'suetena.sfll.ws';
$SN_URL_Facebook     = 'https://www.facebook.com/samoaprogrammer';
$SN_URL_GitHub       = 'https://github.com/sweetrush';
$SN_URL_Google       = 'https://play.google.com/store/apps/developer?id=Suetena%26Lusia';
$SN_URL_Instagram    = 'https://keys.mailvelope.com/pks/lookup?op=get&search=0x21027242A889EA72';
$SN_URL_Google       = '#';
$SN_URL_Twitter      = '#';
$SN_URL_Linkedin     = 'https://www.linkedin.com/in/suetena-faatuuala-loia-8a599238';

// Replace "#" with the actual Links for the Social Network Site (SN)





// The Footer codes and information goes Here.
// echo '<center> All content on this site is CopyLeft <strong>CC</strong></center>';

echo '
<p></p>
<p></p>
<p></p>
<p></p>
<!-- Footer -->
<footer class=" text-center text-white" style="background-color:#564848;">
  <!-- Grid container -->
  <div class="container p-4">

    <!-- Section: Social media -->
    <section class="mb-4">
      <!-- Facebook -->
      <a class="btn btn-primary btn-floating m-1" style="background-color: #3b5998" href="'.$SN_URL_Facebook.'" role="button"><i class="fa fa-facebook"></i></a>

      <!-- Twitter -->
      <a class="btn btn-primary btn-floating m-1" style="background-color: #55acee" href="'.$SN_URL_Twitter.'" role="button"><i class="fa fa-twitter"></i></a>

      <!-- Google -->
      <a class="btn btn-primary btn-floating m-1" style="background-color: #dd4b39" href="'.$SN_URL_Google.'" role="button"><i class="fa fa-google"></i></a>

      <!-- Instagram -->
      <a class="btn btn-primary btn-floating m-1" style="background-color: #ac2bac" href="'.$SN_URL_Instagram.'" role="button"><i class="fa fa-instagram"></i></a>

      <!-- Linkedin -->
      <a class="btn btn-primary btn-floating m-1" style="background-color: #0082ca" href="'.$SN_URL_Linkedin.'" role="button"><i class="fa fa-linkedin"></i></a>
      <!-- Github -->
      <a class="btn btn-primary btn-floating m-1" style="background-color: #333333" href="'.$SN_URL_GitHub.'" role="button"><i class="fa fa-github"></i></a>
    </section>
    <!-- Section: Social media -->




  </div>
  <!-- Grid container -->

  <!-- Copyright -->
  <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2)">
    © '.date("Y").' Copyright:
    <a class="text-white" href="https://'.$siteURLMain.'/">'.$siteURLMain.'</a>
  </div>
  <!-- Copyright -->

</footer>
<!-- Footer -->';


// End of Full Page Tags
echo '</body></html>';