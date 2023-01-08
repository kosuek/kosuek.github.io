var list = [
	{val:"20230108",txt:"20230108 見よ、わたしは新しいことを行う。 イザヤ43:18-21"},
	{val:"20230101",txt:"20230101 【新年】見よ、わたしは新しいことを行う。 イザヤ43:18-21"},
	{val:"20221225",txt:"20221225 【クリスマス】イエスもまた同じように　へブル2:14-16"},
	{val:"20221218",txt:"20221218 自分の日を数えることを。　詩篇90:12-13"},	
	{val:"20221211",txt:"20221211 彼らはあなたのものですから。　ヨハネ17:9-10"},
	{val:"20221204",txt:"20221204 だれが御怒りの力をしっているでしょう。　詩篇90:7-11"},	
	{val:"20221127",txt:"20221127 今彼らは知っています。　ヨハネ17:6-8"},
	{val:"20221120",txt:"20221120 人をちりに帰らせます。　詩篇90:3-6"},
	{val:"20221113",txt:"20221113 わざを成し遂げて、あなたの栄光を　ヨハネ17:4-5"},
	{val:"20221106",txt:"20221106 主よあなたは神です。　詩篇90:1-2"},
	{val:"20221030",txt:"20221030 永遠のいのちとは、　ヨハネ17:2-3"},
	{val:"20221023",txt:"20221023 デマスは行ってしまいました。　IIテモテ4:9-13"},
	{val:"20221016",txt:"20221016 父よ、時が来ました。　ヨハネ17:1"},
	{val:"20221009",txt:"20221009 私には見えるのだシモン　使徒8:2"},
	{val:"20221002",txt:"20221002 そのために、イエスは去って、　ヨハネ11:54-57"},
	{val:"20220925",txt:"20220925 だから、この悪事を　使徒8:22"},
	{val:"20220918",txt:"20220918 大祭司カヤパが、預言したのである　ヨハネ11:47-53"},
	{val:"20220911",txt:"20220911 おまえの心が神の前に正しくないから　使徒8:21"},
	{val:"20220904",txt:"20220904 イエスを信じた。しかし、何人かは　ヨハネ11:45-46"},
	{val:"20220828",txt:"20220828 シモンは、金で神の賜物を手に　使徒8:18-20"},
	{val:"20220821",txt:"20220821 ラザロよ、出て来なさい。　ヨハネ11:38-44"},
	{val:"20220814",txt:"20220814 アナニアは、サッピラとともに　使徒5:1-6"},
	{val:"20220807",txt:"20220807 イエスは涙を流された。　ヨハネ11:28-37"},
	{val:"20220731",txt:"20220731 イスカリオテのユダはイエスを引き渡す　マタイ26:14-16"},
	{val:"20220724",txt:"20220724 あなたは、このことを信じますか。　ヨハネ11:25-27"},
	{val:"20220717",txt:"20220717 私は主の前に罪ある者です。　サムエル記第二12:13～14"},
	{val:"20220710",txt:"20220710 あなたの兄弟はよみがえります。　ヨハネ11:17-24"},
	{val:"20220703",txt:"20220703 ダビデにあなたがその男　サムエル記第二12:7～12"},
	{val:"20220626",txt:"20220626 彼らは言われたものと思った　ヨハネ11:11-16"},
	{val:"20220619",txt:"20220619 主はナタンをダビデに遣わされた。　サムエル記第二12:1～6"},
	{val:"20220612",txt:"20220612 だれでもこの世の光を見て　ヨハネ11:5-10"},
	{val:"20220605",txt:"20220605 【ペンテコステ】神の聖霊を悲しませてはいけません エペソ4:24-30"},
	{val:"20220529",txt:"20220529 ダビデは主のみこころを損なった。　サムエル記第二11:22～27"},
	{val:"20220522",txt:"20220522 この病気は死で終わるものではなく、 ヨハネ11:1-4"},
	{val:"20220515",txt:"20220515 ダビデはヨアブにウリヤを　サムエル記第二11:14～21"},
	{val:"20220508",txt:"20220508 妻たちよ エペソ5:22-24"},
	{val:"20220501",txt:"20220501 この方について話したことはすべて真実 ヨハネ10:37-42"},
	{val:"20220424",txt:"20220424 ダビデはヒッタイト人ウリヤを　サムエル記第二11:6～13"},
	{val:"20220417",txt:"20220417 【イースター】今やキリストは、眠った者の初穂 Iコリント15:19-22"},
	{val:"20220410",txt:"20220410 【受難週】父よ、彼らをお赦しください ルカ23:32-38"},
	{val:"20220403",txt:"20220403 自分を神としているからだ ヨハネ10:31-36"},
	{val:"20220327",txt:"20220327 ダビデはウリヤの妻で、　サムエル記第二11:1～5"},
	{val:"20220320",txt:"20220320 わたしは彼らに永遠のいのちを ヨハネ10:28-30"},
	{val:"20220313",txt:"20220313 ダビデはサウルの上着の裾を、　サムエル記第一24:4～7"},
	{val:"20220306",txt:"20220306 父の名によって行うわざが、 ヨハネ10:22-27"},
	{val:"20220227",txt:"20220227 ダビデは万軍の主の御名によって、 サムエル記第一17:45～49"},
	{val:"20220220",txt:"20220220 ことばのために、分裂が生じた。 ヨハネ10:19-21"},
	{val:"20220213",txt:"20220213 神の人エリシャに仕える若者ゲハジは II列王5:20-22"},
	{val:"20220206",txt:"20220206 自分のいのちを捨てるからこそ、 ヨハネ10:17-18"},
	{val:"20220130",txt:"20220130 神の人が言ったとおりに II列王5:10-14"},
	{val:"20220123",txt:"20220123 わたしは良い牧者です ヨハネ10:14-16"},
	{val:"20220116",txt:"20220116 イゼベルはすぐ、アハブに I列王21:15-17"},
	{val:"20220109",txt:"20220109 良い牧者は雇い人は ヨハネ10:11-13"},
	{val:"20220102",txt:"20220102 【新年】あなたの口を大きく開けよ 詩篇81:8-10"},
	{val:"20211226",txt:"20211226 【送年】サウルは主のことばを退けたので Iサムエル記15:20-23"},
	{val:"20211219",txt:"20211219 【クリスマス】良い知らせを伝えるものよ イザヤ40:9-11"},
	{val:"20211212",txt:"20211212 わたしは羊たちの門です。　ヨハネ10:7-10"},
	{val:"20211205",txt:"20211205 アカンが、の物の一部を　ヨシュア記7:1,10-12"},
	{val:"20211128",txt:"20211128 牧者は、羊たちは　ヨハネ10:3-6"},
	{val:"20211121",txt:"20211121 しかし、バラムはバラクに答えた。　民数記22:15-20"},
	{val:"20211114",txt:"20211114 羊たちの牧者　ヨハネ10:1-6"},
	{val:"20211107",txt:"20211107 隣人の家を欲してはならないIV　出エジプト記20:17"},
	{val:"20211031",txt:"20211031 さばきのためにこの世に　ヨハネ9:39-41"},
	{val:"20211024",txt:"20211024 隣人の家を欲してはならないIII　出エジプト記20:17"},
	{val:"20211017",txt:"20211017 主よ、信じます　ヨハネ9:35-39"},
	{val:"20211010",txt:"20211010 隣人の家を欲してはならないII　出エジプト記20:17"},
	{val:"20211003",txt:"20211003 私たちを教えるのか ヨハネ9:32-34"},
	{val:"20210926",txt:"20210926 隣人の家を欲してはならないI　出エジプト記20:17"},
	{val:"20210919",txt:"20210919 神は、その人の言うことは ヨハネ9:30-31"},
	{val:"20210606",txt:"20210912 【反芻】私がその人ですと言った ヨハネ9:8-12"},
	{val:"20210516",txt:"20210905 【反芻】行って、シロアムの池で洗いなさい ヨハネ9:4-7"},
	{val:"20210425",txt:"20210829 【反芻】この人に神のわざが現れるため ヨハネ9:1-3"},
	{val:"20210314",txt:"20210822 【反芻】だれでもわたしのことばを守るなら ヨハネ8:51-55"},
	{val:"20210103",txt:"20210815 【反芻】これが人間にとってすべて 伝道者の書12:13-14"},
	{val:"20210808",txt:"20210808 偽りの証言をしてはならないIV　出エジプト記20:16"},
	{val:"20210801",txt:"20210801 あの方の弟子になりたいのですか ヨハネ9:26-29"},
	{val:"20210725",txt:"20210725 偽りの証言をしてはならないIII　出エジプト記20:16"},
	{val:"20210718",txt:"20210718 神に栄光を帰しなさい ヨハネ9:24-25"},
	{val:"20210711",txt:"20210711 偽りの証言をしてはならないII　出エジプト記20:16"},
	{val:"20210704",txt:"20210704 イエスをキリストと告白する者。 ヨハネ9:18-23"},
	{val:"20210627",txt:"20210627 偽りの証言をしてはならない　出エジプト記20:16"},
	{val:"20210620",txt:"20210620 あの方は預言者です。 ヨハネ9:13-17"},
	{val:"20210613",txt:"20210613 盗んではならない(IV) 出エジプト記20:15"},
	{val:"20210606",txt:"20210606 私がその人ですと言った ヨハネ9:8-12"},
	{val:"20210530",txt:"20210530 盗んではならない(III) 出エジプト記20:15"},
	{val:"20210523",txt:"20210523 【ペンテコステ】助け主　その方が来ると、 ヨハネ16:7-11"},
	{val:"20210516",txt:"20210516 行って、シロアムの池で洗いなさい ヨハネ9:4-7"},
	{val:"20210509",txt:"20210509 聖書はすべて神の霊感によるもの テモテII3:14-17"},
	{val:"20210502",txt:"20210502 盗んではならない(II) 出エジプト記20:15"},
	{val:"20210425",txt:"20210425 この人に神のわざが現れるため ヨハネ9:1-3"},
	{val:"20210418",txt:"20210418 盗んではならない(I) 出エジプト記20:15"},
	{val:"20210411",txt:"20210411 アブラハムが生まれる前から ヨハネ8:56-59"},
	{val:"20210404",txt:"20210404 【イースター】人を死者の中からよみがえらせる へブル11:17-19"},
	{val:"20210328",txt:"20210328 【受難週】父よ、わたしの霊を御手にゆだねます ルカ23:46-49"},
	{val:"20210321",txt:"20210321 姦淫してはならない(III) 出エジプト記20:14"},
	{val:"20210314",txt:"20210314 だれでもわたしのことばを守るなら ヨハネ8:51-55"},
	{val:"20210307",txt:"20210307 姦淫してはならない(II) 出エジプト記20:14"},
	{val:"20210228",txt:"20210228 わたしを卑しめています ヨハネ8:48-50"},
	{val:"20210221",txt:"20210221 姦淫してはならない(I) 出エジプト記20:14"},
	{val:"20210214",txt:"20210214 神から出た者は ヨハネ8:45-47"},
	{val:"20210207",txt:"20210207 殺してはならない(II) 出エジプト記20:13"},
	{val:"20210131",txt:"20210131 悪魔は(II) ヨハネ8:44"},
	{val:"20210124",txt:"20210124 殺してはならない(I) 出エジプト記20:13"},
	{val:"20210117",txt:"20210117 悪魔は(I) ヨハネ8:43-44"},
	{val:"20210110",txt:"20210110 あなたの父と母を敬え(II) 出エジプト記20:12"},
	{val:"20210103",txt:"20210103 【新年】これが人間にとってすべて 伝道者の書12:13-14"},
	{val:"",txt:"---"},
	{val:"",txt:"2020年以前の聞きたい説教はリクエストください！"},
	{val:"",txt:"リクエスト↓"},
	{val:"20201227",txt:"20201227 【送年】神が父であるなら ヨハネ8:37-42"},
	{val:"20201220",txt:"20201220 【クリスマス】神の御子が現れました。 ヨハネの手紙第一3:7-9"},
	{val:"20200105",txt:"20200105 【新年】あなたの履き物を脱げ 使徒7:33-34"},
	{val:"20191229",txt:"20191229 【送年】これはあなたがたのための、 Iコリント11:23-24"},
	{val:"20191222",txt:"20191222 【クリスマス】いのちのやりとり ヨハネ10:11,18"},
	{val:"20190106",txt:"20190106 【新年】主があなたがたとともに行って 申命記20:1-4"},
	{val:"20181230",txt:"20181230 【送年】わたしだ。恐れることはない。 ヨハネ6:16-21"},
	{val:"20181223",txt:"20181223 【クリスマス】わたしが来たのは、 ルカ5:27-32"},
	{val:"20180107",txt:"20180107 【新年】エノクは神とともに歩んだ"},
	{val:"20171231",txt:"20171231 【送年】神の近くにいることが、"},
	{val:"20171224",txt:"20171224 【クリスマス】栄光が、平和が、"},
	{val:"20170101",txt:"20170101 【新年】"},
	{val:"20161225",txt:"20161225 【クリスマス&送年】ダビデの子ヨセフ。"},
	{val:"20160103",txt:"20160103 【新年】"},
];
