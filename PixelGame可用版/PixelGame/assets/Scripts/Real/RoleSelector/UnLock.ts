import RoleSelector from "./RoleSelector";
import SaveUtility from "../Utility/SaveUtility";
import RoleDataUtility from "../Utility/RoleDataUtility";
import EventUtility from "../Utility/EventUtility";
import EventNames from "../EventNames";
import WaitShow from "./WaitShow";
import Number from "../Number";
import UnlockMoneyUtility from "../Utility/UnlockMoneyUtility";
import MyCoin from "../UI/MyCoin";
import UnlockBouble from "./UnlockBouble";
import UnlockNew from "../UI/UnlockNew";
import PlayerUIs from "../PlayerUIs";
const {ccclass, property} = cc._decorator;

@ccclass
export default class UnLock extends cc.Component {
    private roles: RoleSelector;
	@property(cc.SpriteFrame)
	lockSprite = null;
	@property(UnlockBouble)
	unlockBouble: UnlockBouble = null;
	@property(UnlockNew)
	unlockNew: UnlockNew = null;
    @property()
    waitShowBouble: number = 0.3;
    private wait: WaitShow;
    private ok: cc.Button;
    private no: cc.Button;
    start() {
        this.roles = this.getComponent(RoleSelector);
        this.wait = this.addComponent(WaitShow);
        this.unlockBouble.Close();
        RoleDataUtility.Init(this.roles.playerUI.length);
        for (var i = 0; i < this.roles.runsH.length; i++) {
            if (!RoleDataUtility.Has(i, 0)) {
                this.Lock(this.roles.runsH[i]);
            }
        }
        this.checkSkinLock(this.roles.currentX);
        EventUtility.Regist(EventNames.onRoleChange, (x) => {
            this.checkSkinLock(x);
            this.unlockBouble.Close();
            this.wait.Stop();
            if (!RoleDataUtility.Has(this.roles.currentX, this.roles.currentY)) {
                this.wait.Run(this.waitShowBouble, () => {
                    this.unlockBouble.Show();
                });
                this.unlockBouble.Init(this.roles.currentX, this.roles.currentY);              
            }
        });
    }
    private Lock(node: cc.Node) {
        if (node.getChildByName("lock") != null) return;
        node.opacity =110;
        let lockor = new cc.Node();
        lockor.name = "lock";
        let sp = lockor.addComponent(cc.Sprite);
        sp.spriteFrame = this.lockSprite;
        lockor.parent = node;
        lockor.opacity = 512;
        lockor.position = cc.Vec2.ZERO;
    }
    private unLock(node: cc.Node) {
        node.opacity = 255;
        let chil = node.getChildByName("lock");
        if (chil != null) {
            chil.destroy();
        }
    }
    private checkSkinLock(x: number) {
        for (var i = 1; i < this.roles.runsV.length; i++) {
            if (!RoleDataUtility.Has(x, i)) {
                this.Lock(this.roles.runsV[i]);
            } else {
                this.unLock(this.roles.runsV[i]);
            }
        }
    }
    public UnlockCurrent() {
        RoleDataUtility.UnLock(this.roles.currentX, this.roles.currentY);
		this.unLock(this.roles.runsV[this.roles.currentY]);
		this.unlockNew.Init(this.roles.playerUI.Take(this.roles.currentX, this.roles.currentY).back);
        this.unlockBouble.UnLock();
    }
}
