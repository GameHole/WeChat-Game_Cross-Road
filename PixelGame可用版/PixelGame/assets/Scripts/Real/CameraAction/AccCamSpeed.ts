import Camera from "../Camera";
import StartUtility from "../Utility/StartUtility";
import EventUtility from "../Utility/EventUtility";
import EventNames from "../EventNames";
import FollowPlayer from "./FollowPlayer";

const {ccclass, property} = cc._decorator;
@ccclass
export default class AccCamSpeed extends cc.Component {
    private follow: FollowPlayer;
    private isStart: boolean = true;
    private add = 0;
    @property()
    rate: number = 0.02;
    start() {
        this.follow = this.getComponent(FollowPlayer);
        EventUtility.Regist(EventNames.onPlayerDead, () => {
            this.isStart = false;
        });
        StartUtility.Start(() => {
            this.isStart = true;
            this.add = 0;
        });
    }
    private _accSpeed(dt) {
        this.add += dt;
        if (this.add >= 1) {
            this.add = 0;
            this.follow.moveSpeed += this.follow.org * this.rate;
        }
    }
    update(dt) {
        if (this.isStart) {
            this._accSpeed(dt);
        }
    }
}
