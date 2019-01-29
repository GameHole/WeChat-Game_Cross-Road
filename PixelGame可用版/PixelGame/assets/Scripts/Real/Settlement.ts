import EventUtility from "./Utility/EventUtility";
import EventNames from "./EventNames";
import Score from "./Scores/Score";
import Coin from "./Coin/Coin";
import Number from "./Number";
import UIScalor from "./UIScalor";
import MyCoin from "./UI/MyCoin";
import Wx from "./WXAPI/wx";
import SaveUtility from "./Utility/SaveUtility";
import CloudUtility from "./Utility/CloudUtility";
import Gift from "./UI/Gift";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Settlement extends cc.Component {
    @property(Number)
    scoreNumber: Number = null;
    @property(Number)
    coinNumber: Number = null;
    @property(Number)
    bestNumber: Number = null;
    @property(Number)
    lastCoinNumber: Number = null;
    private isRun = false;
    private score: Score;
    private coin: Coin;
    private isAddRun = false;
    private add = 0;
    onLoad() {
        this.score = cc.find("Score").getComponent(Score);
        this.coin = cc.find("Coin").getComponent(Coin);
        EventUtility.Regist(EventNames.onPlayerDead, () => {
			SaveUtility.SetItem("MaxScore", this.score.maxValue);
            CloudUtility.UpdateServer("MaxScore");
            Gift.Save();
            Wx.Send("SetBest", { key: "score", value: this.score.maxValue });
            this.bestNumber.SetNumber(this.score.maxValue);
            this.scoreNumber.SetNumber(this.score.value);
            this.coinNumber.SetNumber(this.coin.value);
            let resuleCoin = this.coin.value + Math.floor(this.score.value * 0.01);
            EventUtility.Fire(EventNames.onSetCoin, resuleCoin);
            MyCoin.Add(resuleCoin);
            this.lastCoinNumber.SetNumber(resuleCoin);
            this.lastCoinNumber.node.parent.active = false;
            this.Active(false);
            this.isAddRun = true;
            //Wx.Send("SetBest", { key: "coin", value: MyCoin.Value });
        })
    }
    public Active(active) {
        this.scoreNumber.node.parent.active = active;
        this.coinNumber.node.parent.active = active;
    }
    public Fast() {
        if (this.score.value <= 0) return;
        this.isRun = false;
        this.isAddRun = false;
        this.scoreNumber.node.parent.active = true;
        this.coinNumber.node.parent.active = true;
        this.scoreNumber.SetNumber(this.score.value = 0);
        this.lastCoinNumber.node.parent.active = true;
        this.lastCoinNumber.node.parent.getComponent(UIScalor).Run();
    }
    update(dt) {
        if (this.isRun) {
            this.score.value -= 50;
            this.scoreNumber.SetNumber(this.score.value)
            if (this.score.value <= 0) {
                this.isRun = false;
                this.scoreNumber.SetNumber(0);
                this.lastCoinNumber.node.parent.active = true;
                this.lastCoinNumber.node.parent.getComponent(UIScalor).Run();
            }
        }
        if (this.isAddRun) {
            this.add += dt;
            if (this.add >= 0.5 && !this.scoreNumber.node.parent.active) {
                this.scoreNumber.node.parent.active = true;
                this.isRun = true;
            }
            if (this.add >= 1) {
                this.coinNumber.node.parent.active = true;
                this.isAddRun = false;
            }
        }
    }
}
