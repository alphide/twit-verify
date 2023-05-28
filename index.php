<?php

require "vendor/autoload.php";
use Abraham\TwitterOAuth\TwitterOAuth;

$access = getenv('ACCESS');
$access_secret = getenv('ACCESS_SECRET');
$consumer = getenv('CONSUMER');
$consumer_secret = getenv('CONSUMER_SECRET');

$connection = new TwitterOAuth('pWHSC5CNbsfqQG32Jp07aHG7M', 'AvLW2loHe5Hoj7U0oeBR6L3GDGtnk91PbUzTYOeyxDVGjiczMO', '1542237757065633792-escQY4VCgckGXvLrsSkscFTjAtMlCj', 'H5LNqegV8Wcxsml6QsmbRRoPgzNQZpl2rh3Xz7dEqPCZS');

$data = json_decode(file_get_contents('php://input'), true);
$username = $data["username"];
$targetAccount = 'VirtuosoRBLX'; // replace 'TargetAccount' with the account you want to check followers of

$followers = $connection->get("followers/ids", ["screen_name" => $targetAccount]);

$isFollowing = in_array($username, $followers->ids);

header('Content-Type: application/json');
echo json_encode(array('isFollowing' => $isFollowing));

?>
