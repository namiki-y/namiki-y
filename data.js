//
//data.js データ
//

//読込
var meimg = new Image();
meimg.src ="image/図2.png"
var enimg = new Image();
enimg.src ="image/図1.png"
var tamaimg = new Image();
tamaimg.src = "image/tama1.png"
var enemytamaimg = new Image();
enemytamaimg.src ="image/1000円.png"
var satutabaimg = new Image();
satutabaimg.src ="image/札束.png"
var item1img = new Image();
item1img.src ="image/item1.png"
var bgm = new Audio();
bgm.src = "sound/Blizzard.mp3"
var sound0 = new Audio();
sound0.src = "sound/戦隊被弾_2.mp3"
var sound1 = new Audio();
sound1.src = "sound/コミカルな爆発音.mp3"
var sound2 = new Audio();
sound2.src = "sound/破滅・壊滅的なワンショット音.mp3"

var exlist = [
  "image/exp1.png",
  "image/exp2.png",
  "image/exp3.png",
  "image/exp4.png",
  "image/exp5.png",
  "image/exp6.png",
  "image/exp7.png",
  "image/exp8.png",
  "image/exp9.png",
  "image/exp10.png",
  "image/exp11.png",
  "image/exp12.png",
  "image/exp13.png",
  "image/exp14.png",
  "image/exp15.png",
  "image/exp16.png",
]

var eximg = [];
for(var i = 0;i<exlist.length;i++){
  var image = new Image();
  image.src = exlist[i];
  eximg.push(image);
}
