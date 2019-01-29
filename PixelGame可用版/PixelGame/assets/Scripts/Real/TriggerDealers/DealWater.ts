import ADealer from "./ADealer";
import Tags from "./Tags";
import PlayerUIs from "../PlayerUIs";
import SoundUtility from "../Utility/SoundUtility";
import SoundId from "../Sounds/SoundId";
import FullWater from "../FullWater";
const { ccclass, property } = cc._decorator;

@ccclass
export default class DealWater extends ADealer {
    public get Tag() { return Tags.Water; }
    public run: boolean = true;
    public onTriggerEnter(other, self): void {
        if (this.run) {
            this.player.SetUI(new cc.SpriteFrame());
            this.player.Dead();
            this.player.getComponentInChildren(FullWater).Open();
            SoundUtility.Play(SoundId.dead_Water);
        }
    }
}
