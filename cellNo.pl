#! /usr/bin/perl



open (OST,">cellNo.csv");

	printf OST "No,Cell,n/45\n";

	$cycle = 1;

for($i=0;$i<20000;$i++){

	$Cell = $i%406+1;
	$statusN = $i%45+1;
	
	$status = "kasoku" if($statusN<46);
	$status = "gensoku" if($statusN<43);
	$status = "sokutei" if($statusN<40);
	
	
	printf OST "%d,$cycle,%d,%d,$status\n",$i+1,$Cell,$statusN;
	
	
	$cycle = $cycle + 1 if($Cell == 406); 
	
}

close OST;

