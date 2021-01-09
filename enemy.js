//
//enemy.js 敵関連
//

//敵
class Enemy extends CharaBase {
  constructor(x,y,vx,vy){
    super(x,y,vx,vy)
    this.enemytype = rand(0,5)

    if(this.enemytype<4){
      this.w = this.h = 50;
      this.enemylife = 3;
      if(this.enemytype<2)this.vy = 1500;
    }
    else if (this.enemytype>4){
      this.w = this.h = 100;
      this.enemylife = 5;
    }
    else{
      this.w = this.h = 150;
      this.enemylife = 8;
    }

    this.r = this.w/2;
    this.reload = 0;
  }

  draw(){
    var enemyx = (this.x>>8) - this.w/2;
    var enemyy = (this.y>>8) - this.h/2;

    ctx.drawImage(enimg,enemyx,enemyy,this.w,this.h)
    if(this.reload==0){
      if(this.enemytype<=4){
        enemytama.push(new Enemytama(this.x ,this.y +(this.h/2<<8),0,1500))
      }
      if(this.enemytype>=4){
        enemytama.push(new Enemytama(this.x - (8<<8),this.y +(this.h/2<<8),-200,1500))
        enemytama.push(new Enemytama(this.x + (8<<8),this.y +(this.h/2<<8),200,1500))
      }
      this.reload = 30;
    }
  }

  update(){
    super.update();
    if(this.enemytype<2){
      if(jiki.x>this.x)this.vx += 8;
      if(jiki.x<this.x)this.vx -= 8;
    }else{
      if(jiki.x>this.x)this.vx += 4;
      if(jiki.x<this.x)this.vx -= 4;
    }
    if(this.reload>0)this.reload--;

    if(jiki.damage==0 && checkhit(this.x,this.y,this.r,  jiki.x+(25<<8),jiki.y+(25<<8),jiki.r-5)){
      sound0.currentTime = 0.3;
      sound0.play();
      jiki.life--;
      if(jiki.life == 0)gameend();
      jiki.damage = 60;
      jiki.flag = 10;
      this.kill = true;
    }
  }
}

//ボス
class Boss extends CharaBase {
  constructor(x,y,vx,vy){
    super(x,y,vx,vy);
    bossflag = false;
    bosscheck = false;
    this.bossmoveflag = 0;
    this.w = this.h = 250;
    this.r = this.w/2;
    this.bosslife = 250;
    this.reload = 0;
  }

  draw(){
    var bossx = (this.x>>8) - this.w/2;
    var bossy = (this.y>>8) - this.h/2;

    ctx.drawImage(enimg,bossx,bossy,this.w,this.h);

    if(this.reload==0){
        enemytama.push(new Enemytama(this.x ,this.y +(this.h/2<<8),0,1500))
        enemytama.push(new Enemytama(this.x-(8<<8) ,this.y +(this.h/2<<8),-200,1500))
        enemytama.push(new Enemytama(this.x+(8<<8) ,this.y +(this.h/2<<8),+200,1500))
        enemytama.push(new Enemytama(this.x-(16<<8) ,this.y +(this.h/2<<8),-400,1500))
        enemytama.push(new Enemytama(this.x+(16<<8) ,this.y +(this.h/2<<8),+400,1500))
        this.reload = 30;
    }
  }

  update(){
    super.update();

    if(this.reload>0)this.reload--;

    if(this.bossmoveflag==0 &&(this.y<<8)>=100)this.bossmoveflag = 1;

    if (this.bossmoveflag == 1) {
      if((this.vy-=0.7)<=0){
        this.bossmoveflag = 2;
        this.vy = 0;
      }
    }else if(this.bossmoveflag == 2){
      if(this.vx<300)this.vx+=10;
      if(this.x>>8 > canvasWidth-100)this.bossmoveflag = 3;
    }else if(this.bossmoveflag == 3){
      if(this.vx>-300)this.vx-=10;
      if(this.x>>8 < 100)this.bossmoveflag = 2;
    }

    if(jiki.damage==0 && checkhit(this.x,this.y,this.r,  jiki.x+(25<<8),jiki.y+(25<<8),jiki.r-5)){
      sound0.currentTime = 0.3;
      sound0.play();
      jiki.life--;
      if(jiki.life == 0)gameend();
      jiki.damage = 60;
      jiki.flag = 10;
    }
  }
}

//敵弾
class Enemytama extends CharaBase {
  constructor(x,y,vx,vy){
    super(x,y,vx,vy)
    this.w = 15;
    this.h = 30;
  }

  draw(){
    ctx.drawImage(enemytamaimg,this.x>>8,this.y>>8,this.w,this.h)
  }

  update(){
    super.update();

    if(checkhit2(this.x,this.y,this.w,this.h,  jiki.x,jiki.y,jiki.w,jiki.h)){
      score++;
      this.kill=true;
      if(score >= 100 && enemypar == 50)enemypar-=5;
      if(score >= 200 && enemypar == 45)enemypar-=5;
      if(score >= 300 && enemypar == 40)enemypar-=5;
      if(score >= 400 && enemypar == 35)enemypar-=5;
      if(score >= 500 && enemypar == 30)enemypar-=5;
      if(score >= 600 && enemypar == 25)enemypar-=5;
      if(score >= 700 && bosscheck)bossflag = true;
      if(score >= 700 && enemypar == 20 && !bosscheck)enemypar-=5;
    }
  }
}
