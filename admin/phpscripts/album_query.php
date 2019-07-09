<?php
header("Access-Control-Allow-Origin: *");
	function pullMood($mood) {
		include('connect.php');
		$albumstring = "SELECT * FROM albums, moods, mood_album WHERE albums.album_id = mood_album.album AND moods.mood_id = mood_album.mood AND moods.mood_name = '{$mood}' ORDER BY mood_album.ma_rating DESC";
		$albumquery = mysqli_query($link, $albumstring);
		if($albumquery) {
			$rows = array();
			while($r = mysqli_fetch_assoc($albumquery)) {
				$rows[] = $r;
			}
			echo json_encode($rows);
			return json_encode($rows);
		}else{
		}
		mysqli_close($link);
	}

	function pullCurrentRate($mood, $direction){
		include('connect.php');
		$currentRating = 0;
		$pullRateString = "SELECT * FROM mood_album WHERE mood_album_id = '{$mood}'";
		$pullRate = mysqli_query($link, $pullRateString);
		if($pullRate){
			$rows = array();
			while($r = mysqli_fetch_assoc($pullRate)) {
				$rows[] = $r;
			}
			$currentRating = $rows[0]['ma_rating'];
			if($direction == 'up'){
				$newRating = $currentRating + 1;
				changeRate($newRating, $mood);
			}else if ($direction == 'down'){
				$newRating = $currentRating - 1;
				changeRate($newRating, $mood);
			}
			
		}
		mysqli_close($link);
		
	}

	function changeRate($newRating, $mood){
			include('connect.php');
			$test = "UPDATE mood_album SET ma_rating = '{$newRating}' WHERE mood_album_id = '{$mood}'";
			$increaseRating = mysqli_query($link, $test);
			if($increaseRating){
				$string = "it worked";
				echo $string;
			}else{
				echo 'fire';
			}
			mysqli_close($link);

	}

	function pullAllMoods(){
		include('connect.php');
		$pullString = "SELECT * FROM moods";
		$pullQuery = mysqli_query($link, $pullString);
		if($pullQuery) {
			$rows = array();
			while($r = mysqli_fetch_assoc($pullQuery)) {
				$rows[] = $r;
			}
			echo json_encode($rows);
			return json_encode($rows);
		}else{
		}
		mysqli_close($link);
	}

	function addMood($mood){
		include('connect.php');
		$addMoodString = "INSERT INTO moods (mood_name) VALUES ('{$mood}') ";
		$addMoodQuery = mysqli_query($link, $addMoodString);
		$pullMoodQuery = "SELECT * FROM moods WHERE mood_name = '{$mood}'";
		$pullQuery = mysqli_query($link, $pullMoodQuery);
		if($pullQuery) {
			$rows = array();
			while($r = mysqli_fetch_assoc($pullQuery)) {
				$rows[] = $r;
			}
			echo json_encode($rows);
			return json_encode($rows);
		}else{
		}
		mysqli_close($link);
	}

	function pullPopularAlbums(){
		include('connect.php');
		$pullPopularString = "SELECT * FROM albums, moods, mood_album WHERE albums.album_id = mood_album.album AND moods.mood_id = mood_album.mood ORDER BY mood_album.ma_rating DESC LIMIT 10";
		$pullQuery = mysqli_query($link, $pullPopularString);
		if($pullQuery) {
			$rows = array();
			while($r = mysqli_fetch_assoc($pullQuery)) {
				$rows[] = $r;
			}
			echo json_encode($rows);
			return json_encode($rows);
		}else{
		}
		mysqli_close($link);
	}

	function connect_album($album, $mood){
		include('connect.php');
		$connectString = "INSERT INTO mood_album (mood, album, ma_rating) VALUES ('{$album}','{$mood}',0) ";
		$connectQuery = mysqli_query($link, $connectString);
		mysqli_close($link);
	}

	if (isset($_GET['mood'])){
		$mood = $_GET['mood'];
		pullMood($mood);
	}

	if (isset($_GET['album'])){
		$album = $_GET['album'];
		pullAlbum($album);
	}

	if (isset($_GET['upRate'])){
		$mood = $_GET['upRate'];
		$direction = 'up';
		pullCurrentRate($mood, $direction);
	}

	if (isset($_GET['downRate'])){
		$mood = $_GET['downRate'];
		$direction = 'down';
		pullCurrentRate($mood, $direction);
	}

	if (isset($_GET['pullMood'])){
		pullAllMoods();
	}

	if (isset($_GET['addMood'])){
		$mood = $_GET['addMood'];
		addMood($mood);
	}

	if(isset($_GET['pullPopular'])){
		pullPopularAlbums();
	}

	if(isset($_GET['connect_album'])){
		$album = $_GET['connect_album'];
		$mood = $_GET['connect_mood'];
		connect_album($album, $mood);

	}





?>
