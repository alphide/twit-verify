<?php

require "vendor/autoload.php";
require "vendor/abraham/autoload.php";
use Abraham\TwitterOAuth\TwitterOAuth;

$access = getenv('ACCESS');
$access_secret = getenv('ACCESS_SECRET');
$consumer = getenv('CONSUMER');
$consumer_secret = getenv('CONSUMER_SECRET');

$connection = new TwitterOAuth($consumer, $consumer_secret, $access, $access_secret);

$data = json_decode(file_get_contents('php://input'), true);
$username = $data["username"];
$targetAccount = 'VirtuosoRBLX'; // replace 'TargetAccount' with the account you want to check followers of

$followers = $connection->get("followers/ids", ["screen_name" => $targetAccount]);

$isFollowing = in_array($username, $followers->ids);

header('Content-Type: application/json');
echo json_encode(array('isFollowing' => $isFollowing));

?>
