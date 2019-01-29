import RealPlayer from "../RealPlayer";
import Trigger from "../Trigger";

const { ccclass, property } = cc._decorator;

@ccclass
export default abstract class ADealer extends cc.Component {
    protected player:RealPlayer;
    onLoad(){
        this.player=this.getComponent(RealPlayer);
    }
    public abstract get Tag();
    public abstract onTriggerEnter(other:Trigger, self:cc.Collider): void;
}
