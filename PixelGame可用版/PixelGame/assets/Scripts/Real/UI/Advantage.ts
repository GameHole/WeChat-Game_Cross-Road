import Wx from "../WXAPI/wx";
import MyCoin from "./MyCoin";
import VideoId from "./VideoId";
import GiftRecever from "./GiftRecever";
import SoundUtility from "../Utility/SoundUtility";
import SoundId from "../Sounds/SoundId";
import EventUtility from "../Utility/EventUtility";
import EventNames from "../EventNames";

const {ccclass, property} = cc._decorator;
@ccclass
export default class Advantage extends cc.Component {
    private static _vedios = new Array<any>();
    public static Init(adUnitId: string) {
        Wx.SafeCall((wx) => {
            let v = wx.createRewardedVideoAd({
                adUnitId: adUnitId
            });
            v.onError(err => {
                console.error(err);
            });
            this._vedios[adUnitId] = v;
        });
    }
    public static OpenRewarded(adUnitId: string, onclose = null) {
        let v = this._vedios[adUnitId];
		if (v == null) return;
		//cc.game.pause();
		//EventUtility.Fire(EventNames.onOpenAd, true);
        v.show()
			.catch(err => {
                v.load()
                    .then(() => v.show());
            });
        v.offClose();
        v.onClose(res => {
            //cc.game.resume();
            //EventUtility.Fire(EventNames.onOpenAd, false);
            if (res && res.isEnded || res === undefined) {
                if (onclose) onclose();
            }
        });
    }
    private add: number = 0;
    private remind: cc.Node = null;
    @property(cc.Button)
    button: cc.Button = null;
    @property(GiftRecever)
    revever: GiftRecever= null;
    @property()
    time: number = 120;
    onLoad() {
        Advantage.Init(VideoId.x2);
        Advantage.Init(VideoId.pressed);
        Advantage.Init(VideoId.dead);
    }
    start() {
       
        this.remind = this.button.node.getChildByName("ML_UI_remind");
        let x = new cc.Component.EventHandler();
        x.component = "Advantage";
        x.target = this.node;
        x.handler = "Open";
        this.button.clickEvents.push(x);
    }
    public Open() {
        let self = this;
        Advantage.OpenRewarded(VideoId.pressed, () => {
            self.revever.open(50);
        });
        this.add = 0;
    }
    update(dt) {
        this.add += dt;
        if (this.add >= this.time)
            this.remind.active = this.button.enabled = true;
        else
            this.remind.active = this.button.enabled = false;
    }
}
