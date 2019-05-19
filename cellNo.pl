#! /usr/bin/perl

open (OST,">cellNo.csv");

$CM = 45;
$N = 9;

for($i=1;$i<($CM*$N+1+1);$i++){
	printf OST "Cell%d,",$i;
}
printf OST "\n";


$cycle = 1;
for($i=0;$i<($CM*$N+1)*($CM-3-3)*5;$i++){

	$Cell = $i%($CM*$N+1)+1;

	$statusN = $i%45+1;
	$status = "K" if($statusN<($CM+1));
	$status = "G" if($statusN<($CM-3+1));
	$status = "S" if($statusN<($CM-3-3+1));

	printf OST "%d $status,",$i+1;
#	printf OST "$status,",$i+1;
	
	printf OST "\n" if($Cell == ($CM*$N+1));
	$cycle = $cycle + 1 if($Cell == ($CM*$N+1)); 
	
}

close OST;
