
import Transform from "../Transform/Transform";
import Trigger from "./Trigger";
import MoveTo from "./MoveTo";
import Tags from "./TriggerDealers/Tags";
import MathUtility from "./Utility/MathUtility";
import EventUtility from "./Utility/EventUtility";
import EventNames from "./EventNames";
import ItemData from "./TriggerDealers/ItemData";
import TestEnter from "../z_Test/TestEnter";
import PoolUtility from "./Utility/PoolUtility";
import ReferSelf from "./ReferSelf";
import Visibility from "./Visibility";
import ImageEffect from "./ImageEffect";
const { ccclass, property } = cc._decorator;

@ccclass
export default class Car extends cc.Component {
	@property(cc.SpriteFrame)
	up: cc.SpriteFrame = null;
	@property(cc.SpriteFrame)
	down: cc.SpriteFrame = null;
	@property()
	spriteDownOffset: number = 0;
	public shadow: cc.SpriteFrame = null;
	private trigger: Trigger = null;
	@property()
	spriteUpOffset: number = 50;
	@property(cc.Vec2)
	triggerSize: cc.Vec2 = cc.Vec2.ONE.mul(100);
	private dir: cc.Vec2;
	public end: cc.Vec2;
	private speed: number;
	private isRun = false;
	public transform: Transform;
	private image: cc.Sprite;
	public autoDestroy = true;
	private ref: ReferSelf;
	@property()
	isTestDown: boolean = false;
    private addUI() {
        let chil = this.node.getChildByName("Child");
        if (chil == null) {
		let  chil = new cc.Node("Child");
            chil.parent = this.node;
            this.image = chil.addComponent(cc.Sprite);
            chil.addComponent(Visibility).Inject(this.transform);
            chil.addComponent(ImageEffect).Inject(this.image);
            chil.scale *= 2;
        }
        this.AddTrigger();
        this.node.scale = 1.2;
    }
    protected addShadow() {
        let sh = this.node.getChildByName("Shadow");
        if (sh == null) {
            sh = new cc.Node("Shadow");
            sh.parent = this.node;
            sh.addComponent(cc.Sprite).spriteFrame = this.shadow;
            sh.addComponent(Visibility).Inject(this.transform);
            sh.scale *= 2;
        }
	}
	public _Start() {
		this.transform = PoolUtility.getorAddComponent(Transform, this);// this.addComponent(Transform);
		this.ref = PoolUtility.getorAddComponent(ReferSelf, this);// this.addComponent(Transform);
		this.addShadow();
		this.addUI();
	}
	public Init(startPoint: cc.Vec2, endpoint: cc.Vec2, speed: number) {
		if (startPoint == null || endpoint == null)
			throw "Chck You Code !!!!!!!!!!! start or end is NUll!!!!!!";
		this.transform.Position = startPoint;
		this.dir = endpoint.sub(startPoint).normalize();
		this.end = endpoint;
		this.speed = speed;
		if (startPoint.y > endpoint.y)
			this.image.spriteFrame = this.getDown();
		else
			this.image.spriteFrame = this.getUp();
		if (this.isTestDown)
		//test
		this.image.spriteFrame = this.getDown();
	}
	protected getDown(): cc.SpriteFrame {
		this.image.node.position = new cc.Vec2(0, this.spriteDownOffset);
		return this.down;
	}
	protected getUp(): cc.SpriteFrame  {
		this.image.node.position = new cc.Vec2(0, this.spriteUpOffset);
		return this.up;
	}
	protected AddTrigger() {
		if (this.trigger == null) {
			this.trigger = this.addComponent(Trigger);
			this.trigger.Init(Tags.Car);
			this.trigger.SetSize(this.triggerSize);
		}
	}
	public SerTag(tag: string) {
		this.trigger.SetTag(tag);
	}
	public Run() {
		this.isRun = true;
	}
	public Stop() {
		this.isRun = false;
	}
	protected update(dt) {
		if (ItemData.isPause) {
			if (ItemData.isBig) {
				this.SerTag(Tags.Car);
			} else {
				this.SerTag(Tags.Obstacle);
			}
		} else {
			this.run(dt);
			this.SerTag(Tags.Car);
		}
	}
    protected run(dt) {
		if (this.isRun) {
			this.transform.Position = this.transform.Position.add(this.dir.mul(dt * this.speed));
			if (MathUtility.Distance(this.transform.Position, this.end) <= dt * this.speed) {
				this.isRun = false;
                if (this.autoDestroy) {
                    //console.log(this.node.name);
                    this.ref.RemoveRef();
                    PoolUtility.Destroy(this.node);
                    //this.node.destroy();
                }
			}
		}
    }
}
