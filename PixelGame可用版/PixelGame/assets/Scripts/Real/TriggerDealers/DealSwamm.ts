import DealItem from "./DealItem";
import Tags from "./Tags";
import ItemData from "./ItemData";
import SoundUtility from "../Utility/SoundUtility";
import SoundId from "../Sounds/SoundId";
import ValueTwinkler from "../ValueTwinkler";
import EventUtility from "../Utility/EventUtility";
import EventNames from "../EventNames";
import MathUtility from "../Utility/MathUtility";
import UIMoveto from "../RoleSelector/UIMoveto";
import UIScalor from "../UIScalor";
import ScaleTo from "../RoleSelector/ScaleTo";
import RealPlayer from "../RealPlayer";
import WaitShow from "../RoleSelector/WaitShow";
import MoveTo from "../MoveTo";
import StartUtility from "../Utility/StartUtility";
class Big {
	protected node: cc.Node;
	protected small: number;
	protected big: number;
	//private runScale: number;
	public orgPos: cc.Vec2;
	public orgion: cc.Vec2 = cc.Vec2.ZERO;
	protected rate: number = 2;
	protected runRate;
	public constructor(node: cc.Node) {
		this.node = node;
		this.small = node.scale;
		this.big = node.scale * this.rate;
		this.orgPos = node.position;
	}
	public Init() {
		//this.runScale = this.big;
		this.runRate = this.rate;
		this.node.scale = this.big;
		this.node.position = this.orgPos.mul(this.rate);
	}
	public ToSmall() {
		this.node.scale = this.small;
		this.node.position = this.orgion.add(this.orgPos);
	}
	public ToSubBig() {
		//this.node.scale = this.runScale;
		//this.runScale -= this.big * 0.065;
		this.node.scale = this.runRate * this.small;
		this.runRate -= 0.065;
		this.node.position = this.orgion.add(this.orgPos.mul(this.runRate));
	}
}
class UIBig extends Big {
	public Init() {
		//if (this.runRate == this.rate) return;
		console.log("run");
		EventUtility.Fire(EventNames.onJumpOver, false);
		this.runRate = this.rate;
        this.node.position = this.orgPos.mul(this.rate);
        this.node.parent.getComponent(RealPlayer).canNotMove();
		let no = this.node.getComponent(UIMoveto);
		let sc = this.node.getComponent(ScaleTo);
		let wait = this.node.getComponent(WaitShow);
		no.speed = 4.5;
		sc.speed = no.speed + 1;
		no.Run(this.node.position, new cc.Vec2(0, 120), null, () => {		
			wait.Run(0.25, () => {
				no.speed = 6;
                no.Run(this.node.position, this.orgPos.mul(this.rate), null, () => {
                    this.node.parent.getComponent(RealPlayer).canMove();
					EventUtility.Fire(EventNames.onJumpOver, true);
				});
			});
		});
		sc.Run(this.small, this.big);


		//this.node.scale = this.big;
		//this.node.position = this.orgPos.mul(this.rate);
	}
}
const {ccclass, property} = cc._decorator;
@ccclass
export default class DealSwamm extends DealItem {
    private valueTkr: ValueTwinkler;
    private big: number;
    private runScale: number;
	private small: number;
	private chils = new Array<Big>();
	
	start() {
		super.start();
		this.valueTkr = this.addComponent(ValueTwinkler);
		//      this.big = this.node.scale * 2;
		//this.small = this.node.scale;
		
		this.chils[0] = new Big(this.node.getChildByName("PlayerShadow"));
		this.chils[1] = new UIBig(this.node.getChildByName("Player"));
		this.chils[2] = new Big(this.node.getChildByName("trigger"));
		EventUtility.Regist(EventNames.onAir, (org: cc.Vec2) => {
			//console.log(org, MathUtility.Distance(org, this.chils[1].orgPos));
			if (MathUtility.Distance(org, this.chils[1].orgPos) > 0)
				this.chils[1].orgion = org;
			else
				this.chils[1].orgion = cc.Vec2.ZERO;
		});
		//this.orgPos = this.chils[1].node.position;
		StartUtility.OnClear(() => {
			this.fired = false;
			this.valueTkr.Stop();
			this.ToSmall();
		});
    }
    protected onRunOver(): void {
        this.ToSmall();
        ItemData.SetBig(false);
    }
    protected onRunStart(): void {
        this.valueTkr.Stop();
        ItemData.SetBig(true);
        this.fired = false;
		SoundUtility.Play(SoundId.item_Swamm);
		//this.player.getComponent(MoveTo).End();
		this.Init();
    }
    private ToSmall() {
		//this.player.node.scale = this.small;
		for (var i = 0; i < this.chils.length; i++) {
			this.chils[i].ToSmall();
		}
		//this.chils[1].node.position = this.orgPos;
	}
	private Init() {
		for (var i = 0; i < this.chils.length; i++) {
			this.chils[i].Init();
		}
		//this.chils[1].node.position = this.orgPos.mul(2);
	}
	private subBig() {
		for (var i = 0; i < this.chils.length; i++) {
			this.chils[i].ToSubBig();
		}
		//this.chils[1].node.position = this.orgPos.mul(this.chils[1].runScale);
	}
    public get Tag(): string { return Tags.Swamm; }
    private fired = false;
    update(dt) {
        if (ItemData.isBig) {
            if (this.wait.curTime >= this.lastTime - this.valueTkr.duration - 0.1 && !this.fired) {
                this.valueTkr.Run(() => {
                    //this.player.node.scale = this.runScale;
					//this.runScale -= this.big * 0.065;
					this.subBig();
                }, () => {
                    this.ToSmall();
                });
                this.fired = true;
            }
        }
    }
}
