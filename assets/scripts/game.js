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
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad :function() {
        // 背景位置
        this.fixBgPos(this.bg[0],this.bg[1],this.bg[2]);
        // 初始化计时器
        this.timer = 0;
        // 生成子弹
        this.spawnNewBullet();
    },

    spawnNewBullet: function() {
        // 使用给定的模板在场景中生成一个新节点
        var newBullet = cc.instantiate(this.bulletPrefab);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newBullet);
        // 飞机的位置
        this.playerX = this.player.x;
        this.playerY = this.player.y + this.player.height/2;
        // 为子弹设置位置
        newBullet.setPosition(this.getBulletPosition(this.playerX, this.playerY));
        newBullet.getComponent('bullet').game = this;
        this.timer = 0;
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
  
    update:function(dt){
        this.bgMove(this.bg,this.moveSpeed);
        this.checkBgReset(this.bg);
        // 隔段时间产生新子弹

        cc.log(dt)
        if (this.timer > 0.15) {
            this.spawnNewBullet();
            return;
        }
        this.timer += dt;
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
