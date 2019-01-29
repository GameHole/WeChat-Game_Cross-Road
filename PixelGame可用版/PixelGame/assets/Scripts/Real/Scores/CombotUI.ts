import Combot from "./Combot";
import ScaleTo from "../RoleSelector/ScaleTo";
import EventUtility from "../Utility/EventUtility";
import EventNames from "../EventNames";
import SoundUtility from "../Utility/SoundUtility";
import SoundId from "../Sounds/SoundId";
import StartUtility from "../Utility/StartUtility";
const {ccclass, property} = cc._decorator;

@ccclass
export default class CombotUI extends cc.Component {
	@property(cc.Sprite)
	combotUI: cc.Sprite = null;
    @property(cc.SpriteFrame)
    levels = Array<cc.SpriteFrame>();
    private orgLevel: number;
    start() {
		let scale = this.combotUI.addComponent(ScaleTo);
		StartUtility.Start(() => {
			this.combotUI.node.active = false;
		});
        EventUtility.Regist(EventNames.onCombot, (level) => {
            if (level == 0) {
				this.combotUI.node.active = false;
				this.combotUI.node.scale = 1;
            } else {
				this.combotUI.node.active = true;
                this.combotUI.spriteFrame = this.levels[level-1];
				scale.Run(1.3, 1);
			}
        })
    }
}
