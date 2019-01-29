import DealItem from "./DealItem";
import Tags from "./Tags";
import SoundUtility from "../Utility/SoundUtility";
import SoundId from "../Sounds/SoundId";
import Transform from "../../Transform/Transform";
import MoveTo from "../MoveTo";
import GameCoordinate from "../GameCoordinate";
import ItemData from "./ItemData";
import PlayerUIs from "../PlayerUIs";
import Walkable from "../../Walkable";
import EventUtility from "../Utility/EventUtility";
import EventNames from "../EventNames";
import AddHightWay from "../Behevior/Actions/AddHightWay";
import FollowPlayer from "../CameraAction/FollowPlayer";
import Camera from "../Camera";

const {ccclass, property} = cc._decorator;
@ccclass
export default class DealSupper extends DealItem {
    private tran: Transform;
    private collider: cc.BoxCollider;
	private moveTo: MoveTo;
	private ui: cc.Node;
	private org: cc.Vec2;
	private parent: cc.Node;
	private orgCamSpeed: number = 0;
	@property()
    hight: number = 100;
    @property(cc.Node)
    effect: cc.Node = null;
	protected onRunOver(): void {
		SoundUtility.Stop(SoundId.item_Fly);
		this.findValidPos();
		let follow = Camera.main.getComponent(FollowPlayer)
		//follow.ApplyPos(GameCoordinate.ToUIPosition(this.player.GetPos()));
        this.player.ApplyUIPos();
        //console.log("onOver::" + this.player.GetPos(), this.tran.Position);
		this.player.node.parent = this.parent;
		this.collider.enabled = true;
		this.ui.position = this.org;
		EventUtility.Fire(EventNames.onAir, this.ui.position);
		follow.flowSpeed = this.orgCamSpeed;    
        ItemData.SetFly(false);
        this.effect.active = false;
    }
	protected onRunStart(): void {
		this.player.node.parent = cc.find("Canvas/Hiest");
        SoundUtility.Play(SoundId.item_Fly);
        this.collider.enabled = false;
        this.player.EndMove();
        this.player.SetUI(PlayerUIs.curent.forward);
		this.ui.position = new cc.Vec2(0, this.hight);
		EventUtility.Fire(EventNames.onAir, this.ui.position);
		let fl = Camera.main.getComponent(FollowPlayer);
		this.orgCamSpeed = fl.flowSpeed;
        fl.flowSpeed *= 5;
        //console.log("onStartFly::" + this.player.GetPos(), this.tran.Position);
        ItemData.SetFly(true);
        this.effect.active = true;
    }
    public get Tag() { return Tags.Super; }
    start() {
		super.start();
		this.parent = this.player.node.parent;
        this.tran = this.player.getComponent(Transform);
        this.collider = this.player.getComponentInChildren(cc.BoxCollider);
		this.moveTo = this.player.getComponent(MoveTo);
		this.ui = this.player.node.getChildByName("Player");
        this.org = this.ui.position;
        this.effect.active = false;
        EventUtility.Regist(EventNames.onEmergencyStop, () => {
            this.wait.Stop();
            this.onRunOver();
        })
    }
    private detlaTime: number = 80;
    update(dt) {
        if (ItemData.isFly) {
            this.tran.Position = this.tran.Position.add(GameCoordinate.InverseTransformDir(cc.Vec2.RIGHT.mul(2000 * dt)));
            this.player.SetPos(GameCoordinate.toRealPos(this.tran.Position));
        }
    }
    private findValidPos() {
        this.player.SetPos(this.findAPos(this.findAWay()));
    }
    private findAWay(): cc.Vec2 {
        let org = this.player.GetPos();
        
        while (true) {
            let uig = this.player.map.GetALine(org.x);
            if (!this.isInvail(uig.wayType)) {
                console.log(uig.wayType+" org::" + org);
                return org;
            }
            org.addSelf(cc.Vec2.RIGHT);
        }
    }
    private findAPos(safePos: cc.Vec2): cc.Vec2 {
        //console.log("safePos::" + safePos);
        let len = this.player.map.width + this.player.map.sideSizeDown;
        let uig = this.player.map.GetALine(safePos.x);
        //console.log("x::" + safePos.x, uig.wayType);
        let yCenter = len / 2;
        let dir = yCenter - safePos.y;
        dir = dir > 0 ? 1 : -1;
        let index = safePos.y;
        //console.log("index::" + index);
        for (var i = 0; i < len; i++) {
            //console.log("find");
            if (uig.Get(index).getComponent(Walkable).walkAble == true)
                return new cc.Vec2(safePos.x, index);
            //console.log("dir::" + dir);
            index += dir;
            if (index < this.player.map.sideSizeDown || index >= len)
                throw "Eerror CanNot Find a Suitable POS";
        }
    }
	private isInvail(type: string) {
		return type == "Road" || type == "River" || type == "HightWay" || type == "Water" || type == "Traffic"
	}
}
