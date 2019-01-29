import Advantage from "./Advantage";
import EventUtility from "../Utility/EventUtility";
import EventNames from "../EventNames";
import MyCoin from "./MyCoin";
import Number from "../Number";
import StartUtility from "../Utility/StartUtility";
import VideoId from "./VideoId";

const {ccclass, property} = cc._decorator;
@ccclass
export default class PlayAdx2 extends cc.Component {
    private button: cc.Button;
    private coin: number = 0;
    @property(Number)
    lastCoinNumber: Number = null;
    onLoad() {
        this.button = this.getComponent(cc.Button);
        let x = new cc.Component.EventHandler();
        x.component = "PlayAdx2";
        x.target = this.node;
        x.handler = "look";
        this.button.clickEvents.push(x);
        EventUtility.Regist(EventNames.onSetCoin, (coin) => {
            this.coin = coin;
        });
    }
    start() {
        StartUtility.Start(() => {
            this.button.interactable = true;
        });
    }
    private look() {
        let v = Advantage.OpenRewarded(VideoId.x2, () => {
            MyCoin.Add(this.coin);
            this.lastCoinNumber.SetNumber(this.coin * 2);
        });
        this.button.interactable = false;
    }
}
