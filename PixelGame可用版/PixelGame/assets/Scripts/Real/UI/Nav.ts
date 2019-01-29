import RealPlayer from "../RealPlayer";
import EventUtility from "../Utility/EventUtility";
import EventNames from "../EventNames";

const {ccclass, property} = cc._decorator;
@ccclass
export default class Nav extends cc.Component {
    private index: number = 0;
    private info = ["点击屏幕，角色向前移动\n向下滑动，角色向后移动", " 向左滑动, 角色向左移动", "向右滑动,角色向右移动"];
    @property(cc.Animation)
    hand: cc.Animation = null;
    @property(cc.Label)
    text: cc.Label = null;
    start() {
        this.hand.play("handup");
        this.text.string = this.info[0];
		EventUtility.Regist(EventNames.onJumpOver, (isrun, real: RealPlayer) => {
			if (real == null) return;
            let pos = real.GetPos();
            if (pos.x == 7 && pos.y == 8) {
                this.hand.play("handright");
                this.text.string = this.info[2];
            }
            if (pos.x == 7 && pos.y == 6) {
                this.hand.play("handup");
                this.text.string = this.info[0];
            }
            if (pos.x == 9 && pos.y == 6) {
                this.hand.play("handleft");
                this.text.string = this.info[1];
            }
            if (pos.x == 9 && pos.y == 8) {
                this.hand.play("handup");
                this.text.string = this.info[0];
            }
            if (pos.x == 12 && pos.y == 8) {
                this.node.active = false;
            }
            this.hand.node.position = cc.Vec2.ZERO;
        });
    }
}
