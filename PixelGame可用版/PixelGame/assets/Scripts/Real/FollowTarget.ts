import Transform from "../Transform/Transform";
import StartUtility from "./Utility/StartUtility";
const { ccclass, property } = cc._decorator;

@ccclass
export default class FollowTarget extends cc.Component {
    private target: Transform;
    private transform: Transform;
    private offset: cc.Vec2;
    onLoad() {
		this.transform = this.getComponent(Transform);
		StartUtility.OnClear(() => {
			this.Stop();
		});
    }
    public Run(target: Transform, offset: cc.Vec2 = cc.Vec2.ZERO) {
        this.target = target;
        this.offset = offset;
    }
    public Stop() {
        this.target = null;
    }
    update(dt) {
        if (this.target != null && this.target.isValid) {
            this.transform.Position = this.target.Position.add(this.offset);
        }
    }
}
