#! /usr/bin/perl

use File::Basename;
use Cwd;

	open (OST,">test.md");

$imax = 100;
	
for($i=1;$i<$imax;$i++){
print OST 
"## $i - 1
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


[<<<](https://kosuek.github.io/reveal/lyrics.html#/$imax)

---
";}


for($i=1;$i<$imax;$i++){
print OST
"[$i](https://kosuek.github.io/reveal/lyrics.html#/$i)\n";}

close (OST);



