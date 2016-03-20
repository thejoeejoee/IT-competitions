<!doctype html>
<html lang="cs">
<head>
	<meta charset="UTF-8">
	<meta name="author" content="Josef Kolář 2a">

	<title>Recenze iPhone 5c</title>

	<link rel="stylesheet" href="css/style.php?file=style.scss" type="text/css">
	<link rel="stylesheet" href="css/reset.css" type="text/css">

	<script src="js/jquery.js"></script>
	<script src="js/main.js"></script>
</head> 
<body>
	<header>
		<h1>Recenze Apple iPhone 5c</h1>
	</header>
	<nav>
		<ul>
			<li><a href="?page=uvod">Úvod</a></li>
			<li><a href="?page=parametry">Technické parametry</a></li>
			<li><a href="?page=vzhled">Vzhled</a></li>
			<li><a href="?page=uvnitr">Co je uvnitř</a></li>
			<li><a href="?page=multimedia">Multimédia</a></li>
			<li><a href="?page=zaver">Závěr</a></li>
			<li><a href="?page=zhodnoceni">Zhodnocení</a></li>
			<li><a href="?page=fotogalerie">Fotogalerie</a></li>
		</ul>

		<a id="text">Dvojnásobná velikost textu</a>
		<a id="kontrast">Vysoký kontrast</a>
	</nav>
	<div id="content">
		<?php 
			$obsah = array("uvod", "parametry", "vzhled", "uvnitr", "multimedia", "zaver", "zhodnoceni", "fotogalerie");
			if (!isset($_GET["page"])) {
				$page = "uvod";
			} else {
				$page = $_GET["page"];
			}
			if (file_exists("content/$page.php")) {
				include("content/$page.php");
			} else {
				echo("<h2>404</h2>");
			}

		?>
	</div>
	<footer>
		<span>© Josef Kolář, Soutěž v programování 2014</span>
	</footer>
</body>
</html>