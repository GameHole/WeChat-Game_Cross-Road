import ADealer from "./ADealer";
import Tags from "./Tags";
import Trigger from "../Trigger";
import Coin from "../Coin/Coin";
import EventNames from "../EventNames";
import EventUtility from "../Utility/EventUtility";
import SoundUtility from "../Utility/SoundUtility";
import SoundId from "../Sounds/SoundId";
import PoolUtility from "../Utility/PoolUtility";
import ReferSelf from "../ReferSelf";
import DealItem from "./DealItem";
const { ccclass, property } = cc._decorator;

@ccclass
export default class DealCoin extends ADealer {
    private coin: Coin;
    start() {
        this.coin = cc.find("Coin").getComponent(Coin);
    }
    public get Tag() { return Tags.Coin; }
	public onTriggerEnter(other: Trigger, self: cc.Collider): void {
		DealItem.Retuen(other);
		this.coin.value++;
		SoundUtility.Play(SoundId.Coin);
    }
}
