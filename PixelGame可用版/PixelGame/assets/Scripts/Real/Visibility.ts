import Transform from "../Transform/Transform";
import MathUtility from "./Utility/MathUtility";
import Camera from "./Camera";
import GameCoordinate from "./GameCoordinate";

const {ccclass, property} = cc._decorator;
@ccclass
export default class Visibility extends cc.Component {
	private transform: Transform;
	public Inject(tran: Transform) {
		this.transform = tran;
	}
	update(dt) {
		let sprite = this.getComponent(cc.Sprite);
		if (sprite != null) {
			let transform = this.transform;
			if (transform == null)
				transform = this.getComponent(Transform);
			if (transform == null || transform.isValid == false) {
				this.enabled = false
			} else {
				let dis = transform.Position.sub(Camera.main.Position);
				let screenx = Camera.main.Projection.x + GameCoordinate.Size.x * 0.5;
				let screeny = Camera.main.Projection.y + GameCoordinate.Size.y * 0.5;
				let abx = Math.abs(dis.x);
				let aby = Math.abs(dis.y);
				if (abx < screenx && aby < screeny) {
					sprite.enabled = true;
				}
				else {
					sprite.enabled = false;
				}
				if (abx < screenx + 200 && aby < screeny + 100) {
					transform.enabled = true;
				}
				else {
					transform.enabled = false;
				}
			}
		} else {
			this.enabled = false;
		}
	}
}
