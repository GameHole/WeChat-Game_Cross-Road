import ADealer from "./ADealer";
import Tags from "./Tags";
import WaitShow from "../RoleSelector/WaitShow";
import Trigger from "../Trigger";
import SoundUtility from "../Utility/SoundUtility";
import SoundId from "../Sounds/SoundId";
import ItemData from "./ItemData";
import DealItem from "./DealItem";

const {ccclass, property} = cc._decorator;
@ccclass
export default class DealMagnet extends DealItem {
    protected onRunOver(): void {
        ItemData.SetMagent(false);
    }
    protected onRunStart(): void {
        SoundUtility.Play(SoundId.Magnet);
        ItemData.SetMagent(true);
    }
    public get Tag() { return Tags.Magnet; }
}
