import RealPlayer from "../RealPlayer";
import EventUtility from "../Utility/EventUtility";
import EventNames from "../EventNames";
import StartUtility from "../Utility/StartUtility";
const { ccclass, property } = cc._decorator;

@ccclass
export default class OnForward extends cc.Component {
    private player: RealPlayer;
	private maxLine = 0;
	start() {
		this.player = this.getComponent(RealPlayer);	
	}
	public Init() {
		this.maxLine = this.player.GetPos().x;
	}
    update(dt) {
        let moved = this.player.GetPos().x - this.maxLine;
        // console.log(moved);
        if (moved > 0) {
            EventUtility.Fire(EventNames.onForward, moved);
            this.maxLine = this.player.GetPos().x;
        }
    }
}
