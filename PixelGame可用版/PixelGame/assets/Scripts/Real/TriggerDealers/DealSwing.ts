import ADealer from "./ADealer";
import Trigger from "../Trigger";
import Tags from "./Tags";
import DealWater from "./DealWater";
import MoveTo from "../MoveTo";
import GameCoordinate from "../GameCoordinate";
import SoundUtility from "../Utility/SoundUtility";
import SoundId from "../Sounds/SoundId";
import Transform from "../../Transform/Transform";
import MathUtility from "../Utility/MathUtility";
import PlayerUIs from "../PlayerUIs";
import EventNames from "../EventNames";
import EventUtility from "../Utility/EventUtility";
import ItemData from "./ItemData";

const {ccclass, property} = cc._decorator;
@ccclass
export default class DealSwing extends ADealer {
    public get Tag() { return Tags.Swing; }
    private isStart = false;
    private tran: Transform;
	private endP: cc.Vec2;
	@property()
	xSpeed: number = 1500;
	@property
	g: number = 5000;
	private ySpeed: number;
	private chil: cc.Node;
	private orgPos: cc.Vec2;
	private endRealPos: cc.Vec2;
    start() {
		this.tran = this.player.getComponent(Transform);
		this.chil = this.node.getChildByName("Player");
		this.orgPos = this.chil.position;
    }
    public onTriggerEnter(other: Trigger, self: cc.Collider): void {
        this.player.getComponent(DealWater).run = false;
        this.player.canNotMove();
		SoundUtility.Play(SoundId.item_Swing);
        this.player.SetUI(PlayerUIs.curent.forward);
        this.player.EndMove();
        this.player.ApplyUIPos();
        this.isStart = true;
        let startP = GameCoordinate.TransformDir(GameCoordinate.ToUIPosition(this.player.GetPos()));
        this.endRealPos = this.player.GetPos().add(new cc.Vec2(3, 0));
        console.log(this.endRealPos);
		this.endP = GameCoordinate.TransformDir(GameCoordinate.ToUIPosition(this.endRealPos));
		this.ySpeed = (this.endP.x - startP.x) * this.g / (2 * this.xSpeed);
        //console.log(this.ySpeed);
        //other.getComponent(cc.Animation).play();
	}
	public Stop() {
		this.isStart = false;
		this.chil.position = this.orgPos;
		EventUtility.Fire(EventNames.onAir, this.chil.position);
		this.player.getComponent(DealWater).run = true;
	}
	update(dt) {
		if (this.isStart) {
			let gamePos = GameCoordinate.TransformDir(this.tran.Position);
			gamePos.x += this.xSpeed * dt;
            //let chil = this.node.getChildByName("Player");
            this.player.SetPos(GameCoordinate.toRealPos(this.tran.Position));
			if (gamePos.x >= this.endP.x) {
                gamePos = this.endP;
                this.player.canMove()// = true;
                this.Stop();
                this.player.SetPos(this.endRealPos);
                this.player.ApplyUIPos();
				return;
			}
			this.tran.Position = GameCoordinate.InverseTransformDir(gamePos);
			this.ySpeed -= this.g * dt;
			this.chil.position = this.chil.position.add(cc.Vec2.UP.mul(this.ySpeed * dt));
			EventUtility.Fire(EventNames.onAir, this.chil.position);
		}
	}
}
