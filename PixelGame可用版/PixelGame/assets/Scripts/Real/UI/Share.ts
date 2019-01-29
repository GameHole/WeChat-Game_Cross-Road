import Wx from "../WXAPI/wx";
import SaveUtility from "../Utility/SaveUtility";
import DateUtility from "../Utility/DateUtility";
import MyCoin from "./MyCoin";
import GiftRecever from "./GiftRecever";

const {ccclass, property} = cc._decorator;
@ccclass
export default class Share extends cc.Component {
    private button: cc.Button;
    @property(cc.Node)
    showInfo: cc.Node = null;
    @property(cc.Texture2D)
    image: cc.Texture2D = null;
    @property(GiftRecever)
    recever: GiftRecever = null;
    start() {
        this.button = this.getComponent(cc.Button);
        let x = new cc.Component.EventHandler();
        x.component = "Share";
        x.target = this.node;
        x.handler = "share";
        this.button.clickEvents.push(x);
        this.showInfo.active = DateUtility.isDateChange();
    }
    private share() {
        Wx.SafeCall((wx) => {
            let max = SaveUtility.GetItem("MaxScore");
            if (max == null) max = 0;
            wx.shareAppMessage({
                title: "我在像素过马路中获得了" + max + "分，快来挑战我吧",
                imageUrl: this.image
            });
            if (this.showInfo.active) {
                this.recever.open(50, null);
                this.showInfo.active = false;
            }
        });
    }
}
