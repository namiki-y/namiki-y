//キャンバス
var canvas = document.getElementById("myCanvas")
var ctx = canvas.getContext("2d");

var canvasWidth = 600;
var canvasHeight = 550;
canvas.width=canvasWidth;
canvas.height=canvasHeight;

//ゲームスピード
const gameSpeed = 1000/60;

//初期化
function init(){
  for(var i = 0;i<starMax;i++)star[i] = new Star();
}

//オブジェクト
var star = [];
var key = [];
var tama =[];
var jiki = new Jiki();
var enemy = [];
var enemytama =[];
var score =0;
var exp = [];
var item = [];
var game;
var bossflag = false;
var boss =[];
var bosscheck = true;
var itemkill;
var gekiha = 0;

//メインループ
function gameloop() {
if(bossflag)boss.push(new Boss((canvasWidth/2)<<8,0,0,200));
  //移動
  for(var i = 0;i<starMax;i++)star[i].update();
  updateobj(tama);
  updateobj(enemy);
  jiki.update();
  updateobj(enemytama);
  updateobj(exp);
  updateobj(item);
  updateobj(boss);

  //描画
  ctx.fillStyle =(jiki.flag)?"red":"black";
  ctx.fillRect(0,0,canvasWidth,canvasHeight);

  if(rand(0,enemypar) ==1)
  enemy.push(new Enemy(rand(0,canvasWidth)<<8,0,0,rand(300,1200)))

  for(var i = 0;i<starMax;i++)star[i].draw();
  for(var i = 0;i<tama.length;i++)tama[i].draw();
  jiki.draw();
  for(var i = 0;i<enemy.length;i++)enemy[i].draw();
  for(var i = 0;i<enemytama.length;i++)enemytama[i].draw();
  for(var i = 0;i<exp.length;i++)exp[i].draw();
  for(var i = 0;i<item.length;i++)item[i].draw();
  for(var i = 0;i<boss.length;i++)boss[i].draw();
  //デバッグ
  var DEBUG =true;

  if (DEBUG) {
    ctx.font = "20px 'Impact'";
    ctx.fillStyle = "white";
    ctx.fillText("残　　" + jiki.life,20,20);
    var s = score*1000;
    ctx.fillText("score  ￥" + s.toLocaleString(),180,20);
  }
}

window.onload = openstart();
