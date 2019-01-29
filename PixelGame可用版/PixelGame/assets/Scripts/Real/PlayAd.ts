import EventUtility from "./Utility/EventUtility";
import EventNames from "./EventNames";
import Advantage from "./UI/Advantage";
import VideoId from "./UI/VideoId";
import StartUtility from "./Utility/StartUtility";

const {ccclass, property} = cc._decorator;
@ccclass
export default class PlayAd extends cc.Component {
    private dealCount: number = 0;
    onLoad() {
        EventUtility.Regist(EventNames.onPlayerDead, () => {
            this.dealCount++;
            if (this.dealCount >= 3) {
                this.dealCount = 0;
                console.log("Open Ad");
                //Advantage.OpenRewarded(VideoId.dead);
            }
		});
		//StartUtility.Start(() => {

		//});
    }
}
