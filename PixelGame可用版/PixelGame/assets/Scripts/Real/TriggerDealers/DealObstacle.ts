import ADealer from "./ADealer";
import Tags from "./Tags";
import Trigger from "../Trigger";
import MoveTo from "../MoveTo";

const {ccclass, property} = cc._decorator;
@ccclass
export default class DealObstacle extends ADealer {
    public get Tag() { return Tags.Obstacle; }
    public onTriggerEnter(other: Trigger, self: cc.Collider): void {
        let to = this.player.getComponent(MoveTo);
        to.Stop();
        this.player.SetPos(to.Org);
        this.player.ApplyUIPos();
    }
}
