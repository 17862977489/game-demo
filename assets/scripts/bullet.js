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
        pickRadius: 0,
        //子弹速度
        bulletSpeed: 26,
    },

    start () {

    },
    
    onLoad() {
        
    },

    overBorder: function() {
        if(this.node.y >= 500) {
            this.node.destroy();
        }
    },

    bulletMove:function() {
        this.node.y += this.bulletSpeed;
    },

    update (dt) {
        // 超出边界销毁
        this.overBorder();
        // 子弹移动
        this.bulletMove();
    },
});
