// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var Bullet = require('bullet');

cc.Class({
    extends: cc.Component,

    properties: {
        speed: 0,
        blood: 0,
        hitRadius: 0,
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        this.node.blood = this.node.getComponent('enemy').blood;
    },

    overBorder: function() {
        if(this.node.y < -680) {
            this.node.destroy();
        }
    },

    enemyMove:function() {
        this.node.y -= this.speed;
    },

    // 子弹和敌机碰撞检测
    crash: function() {
        var Bullets = cc.find("Bullets", this.game.node);
        var Enemies = cc.find("Enemies", this.game.node);
        for(let i = 0; i < Bullets.childrenCount; i++) {
            for(let j = 0; j < Enemies.childrenCount; j++) {
                var bulletPos = Bullets.children[i].getPosition();
                var enemyPos = Enemies.children[j].getPosition();
                var enemyComp = Enemies.children[j].getComponent('enemy');
                var hitRadius = enemyComp.hitRadius;
                if(bulletPos.sub(enemyPos).mag() < hitRadius) {
                    Enemies.children[j].blood--;
                    Bullets.children[i].destroy();
                    if (Enemies.children[j].blood<=0) {
                        Enemies.children[j].destroy();
                    }
                }
            }
        }
    },

    update (dt) {
        this.crash();
        // 超出边界销毁
        this.overBorder();
        // 敌机移动
        this.enemyMove();
    },
});
