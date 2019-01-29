import ADealer from "./ADealer";
import Tags from "./Tags";
import Trigger from "../Trigger";
import WaitShow from "../RoleSelector/WaitShow";
import EventUtility from "../Utility/EventUtility";
import EventNames from "../EventNames";
import SoundUtility from "../Utility/SoundUtility";
import SoundId from "../Sounds/SoundId";
import ItemData from "./ItemData";
import DealItem from "./DealItem";
import StartUtility from "../Utility/StartUtility";
import ImageEffect from "../ImageEffect";

const {ccclass, property} = cc._decorator;
@ccclass
export default class DealClock extends DealItem {
	start() {
		super.start();
		EventUtility.Regist(EventNames.onPlayerDead, () => {
			this.onRunOver();
		});
	}
    protected onRunOver(): void {
        ItemData.Restart();
        ImageEffect.SetNormal();
        SoundUtility.Stop(SoundId.Clock);
    }
    protected onRunStart(): void {
        if (!this.wait.isRun)
            SoundUtility.Play(SoundId.Clock, true);
        ItemData.Pause();
        ImageEffect.SetGray();
        EventUtility.Fire(EventNames.onPause, this.lastTime);
    }
    public get Tag() { return Tags.Clock; }
}
