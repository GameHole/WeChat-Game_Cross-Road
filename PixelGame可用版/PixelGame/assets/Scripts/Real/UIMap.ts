import UIGround from "./UIGround";
import Transform from "../Transform/Transform";
import ResouseData from "./Res/ResouseData";
import GameCoordinate from "./GameCoordinate";
import Walkable from "../Walkable";
import Random from "./Random";
import PoolUtility from "./Utility/PoolUtility";
import Visibility from "./Visibility";
import List from "../System/List";
import MathUtility from "./Utility/MathUtility";
import NeedLayer from "./NeedLayer";
import ImageEffect from "./ImageEffect";
const { ccclass, property } = cc._decorator;

@ccclass
export default class UIMap extends cc.Component {
	public array = new List<UIGround>();
    @property(cc.Prefab)
	private groundPrefab: cc.Prefab = null;
	@property(cc.Node)
	ground: cc.Node = null;
    @property()
	public sideSizeUp: number = 3;
    @property()
	public sideSizeDown: number = 3;
    @property()
	public width: number = 6;
	private lenght: number = 0;
	public centerLenght: number = 0;
	private obParent: cc.Node = null;
	onLoad() {
		this.lenght = this.sideSizeUp + this.sideSizeDown + this.width;
		this.centerLenght = this.sideSizeDown + this.width;
		this.obParent = cc.find("Canvas/Obs");
	}
	public get length() {
		return this.array.Count;
    }
	public Get(pos: cc.Vec2): Transform {
		if (pos.x < 0 || pos.x >= this.array.Count)
			return null;
		if (pos.y < 0 || pos.y >= this.array.Get(pos.x).length)
            return null;
        pos.x = Math.floor(pos.x);
		pos.y = Math.floor(pos.y);
		return this.array.Get(pos.x).Get(pos.y);
    }
	public GetALine(index: number): UIGround {
		if (index < 0 || index >= this.array.Count) return null;
		return this.array.Get(index);
    }
	public GetLineType(index: number) {
		return this.array.Get(index).wayType;
    }
	public AddLine(resData: ResouseData, addobs: boolean = true): UIGround {
		//console.log("AddLine");
        let uig = new UIGround();
		let x = this.array.Count;
		uig.obArray = new List<Transform>().Alt(this.lenght);
		for (let i = 0; i < this.lenght; i++) {
            let sp = this.instanceBase();
            PoolUtility.getorAddComponent(Walkable, sp);
            sp.node.color = cc.Color.WHITE;
            sp.spriteFrame = resData.currentSp;
			let tran = sp.getComponent(Transform);
			if (sp.node.parent!=this.ground)
            this.ground.insertChild(sp.node, 0);
            sp.node.setScale(GameCoordinate.TakeScale(sp.node.getContentSize(false)));
            tran.Position = GameCoordinate.ToUIPosition(new cc.Vec2(x, i));
            uig.Add(tran);
        }
        for (let i = this.sideSizeDown; i < uig.length - this.sideSizeUp; i++) {
            uig.Get(i).getComponent(Walkable).walkAble = true;
        }
        for (let i = 0; i < this.sideSizeDown; i++) {
            this.createObs(resData, uig, i);
        }
        for (let i = this.sideSizeDown + this.width; i < uig.length; i++) {
            this.createObs(resData, uig, i);
        }
        if (addobs) {
            if (resData.currentOb != null) {
                this.AddRanObs(uig, resData);
            }
        }
		this.array.Add(uig);
        return uig;
    }
    public AddRanObs(uig: UIGround, resData: ResouseData) {
        //let x = new List<number>();
        //MathUtility.RandomGetPos(this.sideSizeDown, this.sideSizeDown + this.width, 3, 1, x);
        //for (let i = 0; i < x.Count; i++) {
        //    let p = x.Get(i);
        //    this.AddAOb(resData, uig, p);
		//}
		for (let i = this.sideSizeDown; i < this.centerLenght; i++) {
            if (Random.Range(0, 100) < 10)
                this.AddAOb(resData, uig, i);
		}
		//let count = Random.RangeInt(0, this.centerLenght);
		//for (var i = 0; i < count; i++) {
		//	this.AddAOb(resData, uig, i + this.sideSizeDown);
		//}
    }
    public createObs(resData: ResouseData, uig: UIGround, i: number) {
        if (resData.currentOb != null) {
            this.AddAOb(resData, uig, i);
        }
        else {
            uig.Get(i).getComponent(Walkable).walkAble = false;
            uig.Get(i).node.color = new cc.Color(194, 194, 194, 255);
        }
	}

    public AddAOb(resData: ResouseData, uig: UIGround, i: number) {
        uig.Get(i).getComponent(Walkable).walkAble = false;
        let clone = PoolUtility.Instance(resData.currentOb);
		if (clone.parent != this.obParent)
			this.obParent.insertChild(clone, 0);
		let tran = PoolUtility.getorAddComponent(Transform, clone);
        PoolUtility.getorAddComponent(Visibility, clone);
        PoolUtility.getorAddComponent(NeedLayer, clone);
        PoolUtility.getorAddComponent(ImageEffect, clone);
		tran.Position = uig.Get(i).Position;
        uig.SetOb(i, tran);
        resData.RandomObs();
        //clone.setScale(new cc.Vec2(0.8, 0.8));
    }
    private instanceBase(): cc.Sprite {
        let g = PoolUtility.Instance(this.groundPrefab);
        PoolUtility.getorAddComponent(ImageEffect, g);
        return g.getComponent(cc.Sprite);
    }
	public Dispose() {
		for (var i = 0; i < this.array.Count; i++) {
			this.array.Get(i).Dispose();
		}
		this.array.Clear();
    }
}
