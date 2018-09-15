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
        speed: 0,
        blood: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    overBorder: function() {
        if(this.node.y < -680) {
            this.node.destroy();
        }
    },

    enemyMove:function() {
        this.node.y -= this.speed;
    },

    start () {

    },

    update (dt) {
        // 超出边界销毁
        this.overBorder();
        // 敌机移动
        this.enemyMove();
    },
});
