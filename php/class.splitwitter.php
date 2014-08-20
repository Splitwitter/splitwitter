<?

class splitwitter {
	
	private $lenght = 140;
	
	private $tweet;
	private $tweetArray;
	
	public function __construct($tweet = null) {
		if(isset($tweet) && $tweet != null) {
			$this->tweet = $tweet;
		}
	}
	
	public function tweet() {
		// Max Tweet lenght
		$length = $this->lenght;
		
		// Add space for the numbering
		$length = $length - 8;
		
		// Split up the tweet into an array
		$valueArray = explode("\n", wordwrap($this->tweet, $length, "\n"));
		
		// The amount of tweets
		$count = count($valueArray);
		
		// The keys for the array
		$keyArray = range(1, $count);
		
		// Combines the key- and value array
		$tweetArray = array_combine($keyArray, $valueArray);
		
		// Add the Tweet numbering
		foreach($tweetArray as $key => &$value) {
			$value = $value . " [" . $key . "/" . $count . "]";
		}
		
		$this->tweetArray = $tweetArray;
		return $tweetArray;	
	}
}

$tweet = "Maecenas pretium dolor quis lectus dictum laoreet. Vestibulum imperdiet magna in nisi luctus iaculis. Sed a magna vehicula, pellentesque ipsum in, venenatis magna. Duis diam diam, euismod quis pharetra tristique, interdum ac sapien. Pellentesque semper risus enim, non dignissim ante dapibus vel. Sed cursus, magna sit amet iaculis faucibus, purus justo fringilla lacus, at elementum leo purus aliquet velit. Nulla facilisi. Sed egestas quis lacus vel varius. Etiam vitae eros turpis. Maecenas augue lectus, fermentum quis egestas eu, dictum iaculis tellus. Praesent molestie ligula ipsum, sed elementum leo molestie ac.";

$splitwitter = new splitwitter($tweet);
echo "<pre>";
print_r($splitwitter->tweet());