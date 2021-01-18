//
//misc.js その他
//

//ブラウザ判別
var userAgent = window.navigator.userAgent.toLowerCase();

if(userAgent.indexOf('line') != -1) {
  document.getElementById('myCanvas').style.display=none;
}

//ステージ
var stage = 0;
var enemypar = 50;

//ランダム
function rand(min,max){
  return Math.floor(Math.random()*(max-min+1))+min;
}

//キーボード押されたとき
document.onkeydown = function(e){
  key[e.keyCode] = true;
  if(e.keyCode ==40)event.preventDefault();
}
//キーボード離したとき
document.onkeyup = function(e){
  key[e.keyCode] = false;
}

//星の数
const starMax = 150;

//背景
class Star {
  constructor(){
    this.x = rand(0,canvasWidth)<<8;
    this.y = rand(0,canvasHeight)<<8;
    this.vx = 0;
    this.vy = rand(30,300);
    this.sz = rand(1,3);
  }

  draw(){
    var x = this.x>>8;
    var y = this.y>>8;
    ctx.fillStyle = rand(0,2)!=0?"#66f":"#aef";
    ctx.fillRect(x,y,this.sz,this.sz);
  }

  update(){
    this.x += this.vx;
    this.y += this.vy;
    if(this.y > canvasHeight<<8){
      this.y = 0;
      this.x = rand(0,canvasWidth<<8);
    }
  }
}

//共通
class CharaBase {
  constructor(x,y,vx,vy){
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.kill = false;
  }

  update(){
    this.x += this.vx;
    this.y += this.vy;

    if(this.x<0 || this.x>canvasWidth<<8
      || this.y<0 || this.y>canvasHeight<<8)this.kill = true;
  }
}

//アイテム
class Item extends CharaBase {
  constructor(x,y,vx,vy,s){
    super(x,y,vx,vy);
    this.w = 35;
    this.h = 20;
    this.s = s;
    this.itemkill = setTimeout(killer,5000);
  }

  draw(){
    ctx.drawImage(item1img,this.x>>8,this.y>>8,this.w,this.h)
  }

  update(){
    super.update();
    if(checkhit2(this.x,this.y,this.w,this.h,  jiki.x,jiki.y,jiki.w,jiki.h)){
      score+=this.s;
      this.kill=true;
      clearTimeout(this.itemkill);
    }
  }
}

function killer(){
  item[0].kill = true;
}

//爆発
class Exp extends CharaBase {
  constructor(x,y,vx,vy,w){
    super(x,y,vx,vy);
    this.w = w;
    this.count = this.counta = 0;
  }

  draw(){
    ctx.drawImage(eximg[this.count],this.x>>8,this.y>>8,this.w,this.w)

  }

  update(){
    super.update();

    this.counta++;
    if(this.counta == 2){
      this.count++;
      this.counta = 0;
    if(this.count ==16)this.kill=true;
  }
  }
}

//爆発2
function expl(x,y,vx,vy,w,h){
  for(var i = 0; i< 10; i++){
    var evx = vx+ (rand(-h,h)<<5);
    var evy = vy+ (rand(-h,h)<<5);
    exp.push(new Exp(x,y,evx,evy,w))
  }
}

function updateobj(obj) {
  for(var i = obj.length-1;i>=0;i--){
    obj[i].update();
    if(obj[i].kill)obj.splice(i,1);
  }
}

//当たり判定
function checkhit(x1,y1,r1, x2,y2,r2){
  //円同士
  var a =(x1-x2)>>8;
  var b =(y1-y2)>>8;
  var r =r1+r2;

  return r*r >= a*a+b*b;
}

function checkhit2(x1,y1,w1,h1, x2,y2,w2,h2){
  //矩形同士
  var left1   = x1>>8;
  var right1  = left1+w1;
  var top1    = y1>>8;
  var bottom1 = top1+h1;

  var left2   = x2>>8;
  var right2  = left2+w2;
  var top2    = y2>>8;
  var bottom2 = top2+h2;

  return(
    left1   <= right2 &&
    right1  >= left2 &&
    top1    <= bottom2 &&
    bottom1 >= top2
  )
}

//ゲーム開始
function gamestart(){
  clearInterval(game);
  bgm.volume = 0.5;
  bgm.loop = true;
  bgm.play();
  document.getElementById("myCanvas").removeEventListener('click',gamestart);
  game = setInterval(gameloop,gameSpeed);
}

//ゲーム終了
function gameend(){
  clearInterval(game);
  bgm.pause();
  bgm.currentTime = 0;
  init();
  game = setInterval(gameOver,gameSpeed);
  document.getElementById("myCanvas").addEventListener('click',openstart);

  if(score*1000>highscore)localStorage.setItem("highScore",score);
  if(gekiha>maxgekiha)localStorage.setItem("maxGekiha",gekiha);
}

//スタート画面表示
function openstart(){
  clearInterval(game);
  document.getElementById("myCanvas").removeEventListener('click',openstart);
  gameinit();
  init();
  game = setInterval(start,gameSpeed);

  //記録
  highscore = Number(localStorage.getItem("highScore"))*1000;
  maxgekiha = localStorage.getItem("maxGekiha");

  document.getElementById('highscore').innerHTML = "HIGHSCORE：￥" + highscore.toLocaleString();
  document.getElementById('maxgekiha').innerHTML = "最高撃破数："+ maxgekiha*1;
}

//スタート画面
function start(){
  document.getElementById("myCanvas").addEventListener('click',gamestart);
  ctx.font = "30px 'Impact'";
  ctx.fillStyle ="black";
  ctx.fillRect(0,0,canvasWidth,canvasHeight);
  for(var i = 0;i<starMax;i++)star[i].update();
  for(var i = 0;i<starMax;i++)star[i].draw();

  ctx.fillStyle = "white";
  var s = "click   START!";
  var w = ctx.measureText(s).width;
  var x = canvasWidth/2 - w/2;
  var y = 100;
  ctx.fillText(s,x,y);
}

//ゲームオーバー
function gameOver(){
  ctx.font = "30px 'Impact'";
  ctx.fillStyle ="black";
  ctx.fillRect(0,0,canvasWidth,canvasHeight);
  for(var i = 0;i<starMax;i++)star[i].update();
  for(var i = 0;i<starMax;i++)star[i].draw();

  for(var i = 100;i<=score;i+=100){
    ctx.drawImage(satutabaimg,200,410-(i/10),200,100);
  }

  ctx.fillStyle = "white";
  var s = "GAME OVER";
  var w = ctx.measureText(s).width;
  var x = canvasWidth/2 - w/2;
  var y = 100;
  ctx.fillText(s,x,y);

  s = score*1000;
  t = "￥" + s.toLocaleString();
  w = ctx.measureText(t).width;
  x = canvasWidth/2 - w/2;
  y =150;
  ctx.fillText(t,x,y);

  s = "撃破数　" + gekiha;
  w = ctx.measureText(s).width;
  x = canvasWidth/2 - w/2;
  y =200;
  ctx.fillText(s,x,y);
}

//初期化
function gameinit(){
  star = [];
  key = [];
  tama =[];
  enemy = [];
  enemytama =[];
  score =0;
  exp = [];
  enemypar = 50;
  delete jiki;
  jiki = new Jiki;
  boss = [];
  item = [];
  bossflag = false;
  bosscheck = true;
  gekiha = 0;
}

//スマホ対応
var hasshabutton = document.getElementById("ctrlbutton");
var idoubutton = document.getElementById("movebutton");

function hassha() {
  key[17] = true;
}

function hasshastop() {
  key[17] = false;
}

hasshabutton.addEventListener("touchstart",hassha);
hasshabutton.addEventListener("touchend",hasshastop);

function idou() {
  event.preventDefault();
  var touchObject = event.changedTouches[0] ;
	var touchX = touchObject.pageX ;
	var touchY = touchObject.pageY ;

	// 要素の位置を取得
	var clientRect = idoubutton.getBoundingClientRect() ;
	var positionX = clientRect.left + window.pageXOffset ;
	var positionY = clientRect.top + window.pageYOffset ;

	// 要素内におけるタッチ位置を計算
	var x = touchX - positionX ;
	var y = touchY - positionY ;

  if(x<=37)key[37] = true;
  else key[37] = false;
  if(x>=73)key[39] = true;
  else key[39] = false;

  if(y<=37)key[38] = true;
  else key[38] = false;
  if(y>73)key[40] = true;
  else key[40] = false;
}

function idoustop() {
  key[37] = key[38] = key[39] = key[40] = false;
}

idoubutton.addEventListener("touchstart",idou);
idoubutton.addEventListener("touchmove",idou);
idoubutton.addEventListener("touchend",idoustop);

var highscore;
var maxgekiha;
