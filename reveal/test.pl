#! /usr/bin/perl

use File::Basename;
use Cwd;
$imax = 100;


open (OST,">test.md");

for($i=1;$i<$imax;$i++){
print OST
"[$i](https://kosuek.github.io/reveal/lyrics.html#/$i)\n";}

print OST "\n---\n";
	
for($i=1;$i<$imax;$i++){
print OST 
"
## $i - 1
あいうえお かきくけこ
さしすせそ たちつてと
なにぬねの はひふへほ
まみむめも やゆよ

>>>
## $i - 2
あいうえお かきくけこ
さしすせそ たちつてと
なにぬねの はひふへほ
まみむめも やゆよ

>>>
## $i - 3
あいうえお かきくけこ
さしすせそ たちつてと
なにぬねの はひふへほ
まみむめも やゆよ

>>>
## $i - 4
あいうえお かきくけこ
さしすせそ たちつてと
なにぬねの はひふへほ
まみむめも やゆよ


[<<<](https://kosuek.github.io/reveal/lyrics.html#/)

---
";}



close (OST);



