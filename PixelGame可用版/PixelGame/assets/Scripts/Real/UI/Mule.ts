import SaveUtility from "../Utility/SaveUtility";
import WaitShow from "../RoleSelector/WaitShow";
import EventUtility from "../Utility/EventUtility";
import EventNames from "../EventNames";
import WxAudioPlayer from "../Sounds/WxAudioPlayer";

const {ccclass, property} = cc._decorator;
@ccclass
export default class Mule extends cc.Component {
    @property(cc.SpriteFrame)
    openSp: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    closeSp: cc.SpriteFrame = null;
    private sound: cc.Node = null;
    private mark: cc.Sprite = null;
    private button: cc.Button = null;
    private isOpen = true;
    private wait: WaitShow = null;
    start() {
        this.sound = this.node.getChildByName("sound");
        this.mark = this.node.getChildByName("mark").getComponent(cc.Sprite);
        this.button = this.getComponent(cc.Button);
        this.wait = this.addComponent(WaitShow);
        let x = new cc.Component.EventHandler();
        x.component = "Mule";
        x.target = this.node;
        x.handler = "click";
        this.button.clickEvents.push(x);
        let o = SaveUtility.GetItem("Mule");
        if (o == null)
            this.isOpen = true;
        else
            this.isOpen = o;
        EventUtility.Fire(EventNames.onMule, this.isOpen);
        this.change();
        this.show();
    }
    public setOp(value: number) {
        this.sound.opacity = this.mark.node.opacity = value*255;
    }
    private click() {
        this.setOp(1);
        this.isOpen = !this.isOpen;
        this.change();
        this.show();
        SaveUtility.SetItem("Mule", this.isOpen);
        EventUtility.Fire(EventNames.onMule, this.isOpen);
    }
    private change() {
        if (this.isOpen) {
            this.mark.spriteFrame = this.openSp;
        } else {
            this.mark.spriteFrame = this.closeSp;
        }
    }
    private show() {
        this.wait.Run(3, () => { this.setOp(0.5); });
    }
}
