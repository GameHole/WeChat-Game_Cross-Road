import ADealer from "./ADealer";
import Trigger from "../Trigger";

const { ccclass, property } = cc._decorator;

@ccclass
export default class OnTrigger extends cc.Component {
    private dealers: Array<ADealer> = new Array<ADealer>();
    start() {
        let deals = this.node.parent.getComponents(ADealer);
        for (let i = 0; i < deals.length; i++) {
            this.dealers[deals[i].Tag] = deals[i];
        }
    }
    onCollisionEnter(other, self) {
        // console.log('on collision enter');
        // console.log(other.node.name);
        let triger = other.node.parent.getComponent(Trigger);
        if (triger == null) return;
        let dealer = this.dealers[triger.tag];
        // console.log("deal::"+dealer);
        if (dealer != null) {
            dealer.onTriggerEnter(triger, self);
        }
        // for (let i = 0; i < this.dealers.length; i++) {
        //     this.dealers[i].onTriggerEnter(other, self);
        // }
    }
}
