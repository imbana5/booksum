<?php
  $params = array();
  $params['title'] = "BookSum";
  $params['logo'] = "images/logo.png";
  $params['description'] = "Get through your favorite books at your convenience";
  $params['url'] = "https://booksum.skylabs.or.id";
  
  $params['section_title1'] = "What We Offer";
  $params['section_title2'] = "Stories & Facts";
  $params['section_title3'] = "Partnerships";

  $params['tagline']     = "BookSum";
  $params['tagline_sub'] = "Get through your favorite books at your convenience.";
?>

<html>
<head>
  <meta charset="UTF-8">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title><?php echo $params['title']; ?></title>
  <meta name="author" content="SkyLabs">
  <meta name="description" content="<?php echo $params['description']; ?>">
  <meta name="keywords" content="books, literacy, digital">
  <meta name="robots" content="index, follow">
  <meta name="viewport" content="viewport-fit=cover, width=device-width, minimum-scale=1, maximum-scale=1, initial-scale=1, user-scalable=no"> 
  <meta name="application-name" content="BookSum">
  <meta name="theme-color" content="#f0f0f0">

  <meta property="og:url" content="<?php echo $params['url']; ?>">
  <meta property="og:type" content="article"/>
  <meta property="og:title" content="<?php echo $params['title']; ?>"/>
  <meta property="og:image" content="<?php echo $params['logo']; ?>"/>
  <meta property="og:description" content="<?php echo $params['description']; ?>"/>

  <meta name="twitter:title" content="<?php echo $params['title']; ?>"/>
  <meta name="twitter:image" content="<?php echo $params['logo']; ?>"/>
  <meta name="twitter:description" content="<?php echo $params['description']; ?>"/>
  <meta name="twitter:card" content="summary"/>

  <link rel="canonical" href="<?php echo $params['url']; ?>"/>
  <link rel="shortcut icon" href="images/favicon.ico" type="image/ico" sizes="16x16"/>

  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous"/>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/foundation-sites@6.7.4/dist/css/foundation.min.css" crossorigin="anonymous"/>
  <link rel="stylesheet" href="lib/swiper/swiper-bundle.min.css"/>
  <link rel="stylesheet" href="css/_normalize.css"/>
  <link rel="stylesheet" href="css/utilities.css"/>
  <link rel="stylesheet" href="css/sum.css"/>

  <!--  jquery/foundation -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/foundation-sites@6.7.4/dist/js/foundation.min.js" crossorigin="anonymous"></script>
  
  <!--  booksum -->
  <script src="js/sum/model.js"></script>
  <script src="js/sum/view.js"></script>
  <script src="js/sum/controller.js"></script>
  <script src="js/sum/web.js"></script>

  <!--  utils -->
  <script src="js/utils/finals.js"></script>
  <script src="js/utils/globals.js"></script>

</head>

<body>
<div id="sum-site-container">

<!-- header -->
  <?php include "header.php" ?>
<!-- ./header -->

<!-- body -->
<div id="sum-body-container" class="bodycontainer">
  <main class="home">
    <section class="home-header">
      <div class="container py-3">
        <h1>Happy reading,<br /> Ambon</h1>
        <div class="py-2">
          <h3>
            In a busy world, people has less and less time reading books.
          </h3>
          <h3>With BookSum, you can get through the book of your choice, anytime, anywhere.
          </h3>
        </div> 
        <a href="shelves/" class="btn btn-secondary">START READING</a>
      </div>
    </section>
  </main>
  <!-- /footer -->
  <?php include "footer.php" ?>
  <!-- ./footer -->

</div>
<!-- ./body -->
</div>

</body>
</html>