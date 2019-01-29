import RoleSelector from "./RoleSelector";
const {ccclass, property} = cc._decorator;

@ccclass
export default class ShowHead extends cc.Component {
    private roles: RoleSelector;
    @property(cc.Sprite)
    headImage: cc.Sprite = null;
    start() {
        this.roles = this.getComponentInChildren(RoleSelector);
    }
    update() {
        if (this.roles.currentSprite != null) {
            this.headImage.spriteFrame = this.roles.currentSprite.back;
        }
    }
}
