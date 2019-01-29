// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class EnableCollision extends cc.Component {
    @property()
    enable: boolean = true;
    @property()
    debugDraw: boolean = true;
    @property()
    rate: number = 60;
    start() {
        let m = cc.director.getCollisionManager();
        m.enabled = this.enable;
        m.enabledDebugDraw = this.debugDraw;
        cc.game.setFrameRate(this.rate);
    }
    
    // update (dt) {}
}
