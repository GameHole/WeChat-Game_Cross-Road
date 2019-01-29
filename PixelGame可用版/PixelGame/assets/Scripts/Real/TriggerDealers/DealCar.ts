import ADealer from "./ADealer";
import PlayerUIs from "../PlayerUIs";
import Tags from "./Tags";
import Transform from "../../Transform/Transform";
import Trigger from "../Trigger";
import GameCoordinate from "../GameCoordinate";
import FollowTarget from "../FollowTarget";
import EventNames from "../EventNames";
import EventUtility from "../Utility/EventUtility";
import SoundUtility from "../Utility/SoundUtility";
import SoundId from "../Sounds/SoundId";
import DealSwamm from "./DealSwamm";
import ItemData from "./ItemData";
import UIMoveto from "../RoleSelector/UIMoveto";
import Car from "../Car";
import PoolUtility from "../Utility/PoolUtility";
import ReferSelf from "../ReferSelf";
import CarUtility from "../Utility/CarUtility";

const { ccclass, property } = cc._decorator;

@ccclass
export default class DealCar extends ADealer {
    public get Tag() { return Tags.Car; }
    public onTriggerEnter(other: Trigger, self: cc.Collider): void {
        if (ItemData.isBig) {
            this.dealBig(other, self);
        } else {
            this.dealSmall(other, self);
        }
    }
    private dealSmall(other: Trigger, self: cc.Collider) {
        let ot = other.getComponent(Transform);
        let st = this.getComponent(Transform);
        let diff = GameCoordinate.TransformDir(ot.Position.sub(st.Position));
        if (Math.abs(diff.x) <= 5) {
            this.player.SetUI(PlayerUIs.curent.deadGround);
            SoundUtility.Play(SoundId.dead_Ground);
        }
        else {
            this.player.SetUI(PlayerUIs.curent.deadFlow);
            let chi = this.node.getChildByName("Player");
            chi.position = chi.position.add(new cc.Vec2(5, -20));
			let follow = PoolUtility.getorAddComponent(FollowTarget, this.player);
            follow.Run(ot);
            SoundUtility.Play(SoundId.dead_Car);
        }
        this.player.Dead();
    }
	private dealBig(other: Trigger, self: cc.Collider) {
		console.log("dealbig");
		other.Enabled(false);
		let car = other.getComponent(Car);
		car.Stop();
		let chil = other.node.getChildByName("Child");
		let shadow = other.node.getChildByName("Shadow");
		let org = chil.position;
		shadow.active = false;
		//other.getComponent(Transform).enabled = false;
		let mt = PoolUtility.getorAddComponent(UIMoveto, chil);
        mt.speed = 3.5;
		mt.Run(chil.position, new cc.Vec2(1000, 400), null, () => {
			console.log("over");
			other.Enabled(true);
			chil.position = org;
			shadow.active = true;
			CarUtility.DestroyCar(car);
			//other.getComponent(Transform).enabled = true;
			
        });
    }
}
