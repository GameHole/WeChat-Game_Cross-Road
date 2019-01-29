import RealPlayer from "../RealPlayer";
import Camera from "../Camera";
import Transform from "../../Transform/Transform";
import GameCoordinate from "../GameCoordinate";
import MathUtility from "../Utility/MathUtility";

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class JustLookPlayer extends cc.Component {
    private camera: Camera;
    @property(RealPlayer)
    public realPlayer: RealPlayer = null;
    @property(cc.Vec2)
    public offset: cc.Vec2 = new cc.Vec2(0, 230);
    private player: Transform;
    public flowSpeed: number = 0.1;
    start() {
        //this.camera = this.getComponent(Camera);
        //this.player = this.realPlayer.getComponent(Transform);
        //this.camera.Position = GameCoordinate.ToUIPosition(this.realPlayer._realPos);
    }
    lateUpdate(){
        this.camera.Position=MathUtility.Lerp(this.camera.Position,this.player.Position,this.flowSpeed)
    }
}
