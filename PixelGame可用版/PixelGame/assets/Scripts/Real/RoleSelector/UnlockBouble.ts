import Number from "../Number";
import MyCoin from "../UI/MyCoin";
import UnlockMoneyUtility from "../Utility/UnlockMoneyUtility";

const {ccclass, property} = cc._decorator;
@ccclass
export default class UnlockBouble extends cc.Component {
    private needMoney: number;
	@property(Number)
	unlockCoin: Number = null;
    private ok: cc.Button;
    private no: cc.Button;
    public Show() {
        this.node.active = true;
    }
    public Close() {
        this.node.active = false;
    }
    onLoad() {
        this.ok = this.node.getChildByName("yes").getComponent(cc.Button);
        this.no = this.node.getChildByName("no").getComponent(cc.Button);
        //console.log(this.no);
        //console.log(this.ok);
    }
    public Init(x: number, y: number) {
        let need = UnlockMoneyUtility.Take(x, y);
        if (need <= MyCoin.Value) {
            this.ok.node.opacity = 255;
            this.ok.interactable = true;
        } else {
            this.ok.node.opacity = 128;
            this.ok.interactable = false;
        }
        this.unlockCoin.SetNumber(need);
        this.needMoney = need;
    }
    public UnLock() {
        MyCoin.Sub(this.needMoney);
        this.Close();
    }
}
