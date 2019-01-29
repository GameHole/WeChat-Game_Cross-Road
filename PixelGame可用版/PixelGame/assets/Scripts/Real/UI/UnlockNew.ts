import ScaleTo from "../RoleSelector/ScaleTo";
import UIJump from "./UIJump";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UnlockNew extends cc.Component {
    private sprite: cc.Sprite;
    private anim: cc.Animation;
    public Init(image: cc.SpriteFrame) {
        this.sprite = this.node.getChildByName("role").getComponent(cc.Sprite);
        this.anim = this.sprite.getComponent(cc.Animation);
		this.sprite.spriteFrame = image;
        this.node.active = true;
        this.anim.play();
    }
    private test() {
        this.anim.play();
    }
	public close() {
		this.node.active = false;
	}
}
