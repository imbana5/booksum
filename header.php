<?php
  $params['nav_title0']   = "HOME";
  $params['nav_title1']   = "SHELVES";
  $params['nav_title2']   = "CONTACT";

  $base = "https://booksum.skylabs.or.id/";
  $host = $_SERVER['HTTP_HOST'];
  if (strpos($host, "localhost") !== false) {
    $base = "http://localhost/projects/slo_web/demo/booksum/";
  }
?>

<div id="sum-header-container" class="headercontainer">
  <nav class="container grid-x">
    <div id="sum-header-title" class="headertitle grid-x">
      <a href="<?php echo $base?>">
        <img id="sum-header-title-image" class="headertitleimage show-for-small-only" src="<?php echo $base . 'images/logo.png' ?>" alt="BookSum logo">
        <img id="sum-header-title-image" class="headertitleimage show-for-medium" src="<?php echo $base . 'images/logo-and-text.png' ?>" alt="BookSum logo">
      </a>
    </div>
    <div id="sum-header-menu" class="headermenu grid-x noselect">
      <a href="<?php echo $base?>" id="sum-header-menu-home" class="go-to-home headermenutext"><?php echo $params['nav_title0']; ?></a>
      <a href="<?php echo $base . 'shelves' ?>" id="sum-header-menu-shelves" class="go-to-about headermenutext"><?php echo $params['nav_title1']; ?></a>
      <a href="<?php echo $base . 'contact' ?>" id="sum-header-menu-contact" class="go-to-join headermenutext"><?php echo $params['nav_title2']; ?></a>
    </div>
    <div class="headerlogin">
      <a href="<?php echo $base . 'profile' ?>" id="sum-header-menu-profile" class="go-to-profile headermenutext"><i class="fa fa-user"></i></a>
    </div>
  </nav>
</div>