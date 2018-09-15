// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // 背景图片
        bg: [cc.Node],
        // 飞机
        player: {
            default: null,
            type: cc.Node
        },
        // bg的移动速度
        moveSpeed: 1.8,
        // 子弹
        bulletPrefab: {
            default: null,
            type: cc.Prefab
        },
        // 敌机
        enemyPrefab:{
            default: [],
            type: cc.Prefab
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function() {
        // 背景位置
        this.fixBgPos(this.bg[0],this.bg[1],this.bg[2]);
        // 初始化计时器
        this.bulletTimer = 0;
        this.enemyTimer = 0;
        // 生成子弹
        this.spawnNewBullet();
        // 生成敌机
        this.spawnNewEnemy();
    },

    spawnNewEnemy: function() {
        var num = Math.floor(Math.random()*9);
        var newEnemy = cc.instantiate(this.enemyPrefab[num]);
        cc.find("Enemies", this.node).addChild(newEnemy);
        this.enemyWidth = newEnemy.width/2;
        var enemyX;
        if(Math.random() > 0.5) {
            enemyX = Math.random()*320 - this.enemyWidth;
        } else {
            enemyX = -Math.random()*320 + this.enemyWidth;
        }
        newEnemy.setPosition(this.getEnemyPosition(enemyX, 700));
        newEnemy.getComponent('enemy').game = this;
        this.enemyTimer = 0;
    },

    getEnemyPosition: function(x, y) {
        // 敌机x 坐标
        var randX = x;
        // 敌机y 坐标
        var randY = y;
        // 返回敌机坐标
        return cc.v2(randX, randY);
    },

    spawnNewBullet: function() {
        // 使用给定的模板在场景中生成一个新节点
        var newBullet = cc.instantiate(this.bulletPrefab);
        cc.find("Bullets", this.node).addChild(newBullet);
        // 飞机的位置
        this.playerX = this.player.x;
        this.playerY = this.player.y + this.player.height/2;
        // 为子弹设置位置
        newBullet.setPosition(this.getBulletPosition(this.playerX, this.playerY));
        newBullet.getComponent('bullet').game = this;
        this.bulletTimer = 0;
    },

    getBulletPosition: function(x, y) {
        var randX = x;
        // 子弹 y 坐标
        var randY = y + 30;
        // 返回子弹坐标
        return cc.v2(randX, randY);
    },
  
    fixBgPos:function(bg1,bg2,bg3){
        bg1.x = -320;
        //利用前一张图片的边框大小设置下一张图片的位置
        var bg1BoundingBox = bg1.getBoundingBox();
        bg2.setPosition(bg1BoundingBox.xMin,bg1BoundingBox.yMax);
        var bg2BoundingBox = bg2.getBoundingBox();
        bg3.setPosition(bg2BoundingBox.xMin,bg2BoundingBox.yMax);
    },

    // 子弹和敌机碰撞检测
    crash: function() {
        var Bullets = cc.find("Bullets", this.node);
        var Enemies = cc.find("Enemies", this.node);
        for(let i = 0; i < Bullets.childrenCount; i++) {
            for(let j = 0; j < Enemies.childrenCount; j++) {
                var bulletPos = Bullets.children[i].getPosition();
                var enemyPos = Enemies.children[j].getPosition();
                var enemyComp = Enemies.children[j].getComponent('enemy');
                var hitRadius = enemyComp.hitRadius;
                if(bulletPos.sub(enemyPos).mag() < hitRadius) {
                    Bullets.children[i].destroy();
                    Enemies.children[j].destroy();
                }
            }
        }
    },
  
    update:function(dt){
        this.crash();
        this.bgMove(this.bg,this.moveSpeed);
        this.checkBgReset(this.bg);
        // 隔段时间产生新子弹
        if (this.enemyTimer > 0.8) {
            this.spawnNewEnemy();
        } else {
            this.enemyTimer += dt;
        }
        if (this.bulletTimer > 0.15) {
            this.spawnNewBullet();
        } else {
           this.bulletTimer += dt; 
        }
    },

    //背景滚动
    bgMove:function(bgList,speed){
        for(var index = 0; index < bgList.length; index++){
            var element = bgList[index];
            element.y -= speed;
        }
    },

    //检查是否要重置位置
    checkBgReset:function(bgList){
        var first_yMax = bgList[0].getBoundingBox().yMax;
        if(first_yMax<=-480){
            var preFirstBg = bgList.shift();
            bgList.push(preFirstBg);
            var curFirstBg = bgList[1];
            preFirstBg.y = curFirstBg.getBoundingBox().yMax;
        }
    }
});
