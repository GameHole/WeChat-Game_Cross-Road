import GameCoordinate from "./GameCoordinate";
import Transform from "../Transform/Transform";
import MoveTo from "./MoveTo";
import PlayerUIs from "./PlayerUIs";
import UIMap from "./UIMap";
import Walkable from "../Walkable";
import EventUtility from "./Utility/EventUtility";
import EventNames from "./EventNames";
import SoundUtility from "./Utility/SoundUtility";
import SoundId from "./Sounds/SoundId";
import ItemData from "./TriggerDealers/ItemData";
import StartUtility from "./Utility/StartUtility";
const { ccclass, property } = cc._decorator;

@ccclass
export default class RealPlayer extends cc.Component {
    public static main: RealPlayer;
    private _realPos: cc.Vec2 = cc.Vec2.ZERO;
    public SetPos(vec: cc.Vec2) {
        this._realPos = vec.clone();
        //console.log("SetPos::"+this._realPos);
    }
    public AddPos(vec: cc.Vec2) {
        this._realPos.addSelf(vec);
    }
    public GetPos(): cc.Vec2 {
        return this._realPos.clone();
    }
	public ApplyUIPos() {
		this.tran.Position = GameCoordinate.ToUIPosition(this._realPos);
    }
    @property(UIMap)
    map: UIMap = null;
    private shadow: cc.Node;
    private tran: Transform;
    private moveto: MoveTo;
    private image: cc.Sprite;
    private g: number = 10;
    private upSpeed: number = 500;
    private _canMove: boolean = true;
    public canNotMove() {
        this._canMove = false;
    }
    public canMove() {
        this._canMove = true;
	}
	private inited: boolean = false;
	private _uiOrg: cc.Vec2 = cc.Vec2.ZERO;
	public _init() {
		if (this.inited) return;
		this.inited = true;
		RealPlayer.main = this;
		this.moveto = this.getComponent(MoveTo);
		this.tran = this.getComponent(Transform);
		this.image = this.node.getChildByName("Player").getComponent(cc.Sprite);
		this.shadow = this.node.getChildByName("PlayerShadow");
		this._uiOrg = this.image.node.position;
    }
	start() {
		this._init();
		StartUtility.Start(() => {
			if (PlayerUIs.curent != null)
				this.SetUI(PlayerUIs.curent.forward);
			this.image.node.position = this._uiOrg;
		});
		//StartUtility.OnClear(() => {
		//	this.node.active = false;
		//});
    }
    //private next: cc.Vec2;
    public move(dir: cc.Vec2) {
        //console.log("In::" + this._canMove);
		if (this._canMove == false) return;
		if (this.moveto.isRun) return;
        //console.log("Run");
        let org = this.GetPos();
        //console.log("org::" + org);
        let next = this._realPos.addSelf(dir);
        //console.log("next::" + next);
		this.SetUIByDir(dir);
        //let start = GameCoordinate.ToUIPosition(org);
        let end = GameCoordinate.ToUIPosition(next);
        this.moveto.Run(org, end,
			(dt) => {
				this.upSpeed += this.g * dt;
				this.tran.Position.y += this.upSpeed * dt;
			}
			, () => {
				this.upSpeed = 500;
                let tran = this.map.Get(next);
                if (tran == null || !tran.getComponent(Walkable).walkAble) {
                    this._realPos = org;
                    this.ApplyUIPos();
                }
                EventUtility.Fire(EventNames.onJumpOver, true, this);
            });
        if (!ItemData.isBig)
            SoundUtility.Play(SoundId.NormalJump);
        else
            SoundUtility.Play(SoundId.BigJump);
    }
    public EndMove() {
        this.moveto.Stop();
    }
    public SetUI(sprite: cc.SpriteFrame) {
        this.image.spriteFrame = sprite;
    }
    public SetZIndex(value) {
        this.node.zIndex = value;
    }
	public Dead() {
		EventUtility.Fire(EventNames.onPlayerDead);
        this.shadow.active = false;
		this.getComponentInChildren(cc.BoxCollider).enabled = false;
		this.EndMove();
		this._canMove = false;
		console.log("dead:: real->" + this._realPos + "ui->" + this.tran.Position + " node->" + this.node.position);
	}
	public ReLife(life: boolean) {
		this.shadow.active = life;
		this.getComponentInChildren(cc.BoxCollider).enabled = life;
		this.image.node.active = life;
		this._canMove = life;
		//console.log("relife::");
	}
    private SetUIByDir(dir: cc.Vec2) {
        if (dir.x > 0) {
            this.SetUI(PlayerUIs.curent.forward);
            return;
        }
        if (dir.x < 0) {
            this.SetUI(PlayerUIs.curent.back);
            return;
        }
        if (dir.y > 0) {
            this.SetUI(PlayerUIs.curent.left);
            return;
        }
        if (dir.y < 0) {
            this.SetUI(PlayerUIs.curent.right);
            return;
        }
	}
	//update() {
	//	console.log(this._realPos);
	//}
    onDestroy() {
        RealPlayer.main = null;
    }
}
