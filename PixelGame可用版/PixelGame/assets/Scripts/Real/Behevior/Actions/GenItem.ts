import Action from "../Action";
import ResouseData from "../../Res/ResouseData";
import UIMap from "../../UIMap";
import Walkable from "../../../Walkable";
import Transform from "../../../Transform/Transform";
import Trigger from "../../Trigger";
import Tags from "../../TriggerDealers/Tags";
import Random from "../../Random";
import UpDown from "../../UpDown";
import GameCoordinate from "../../GameCoordinate";
import PoolUtility from "../../Utility/PoolUtility";
import ReferSelf from "../../ReferSelf";
import CoinMoveTo from "../../TriggerDealers/CoinMoveTo";
import Visibility from "../../Visibility";

export default class GenItem extends Action {
    private tag: string;
    public constructor(tag: string) {
        super();
        this.tag = tag;
    }
	public Execute(input: Array<ResouseData>, output: UIMap): boolean {
		let eatable = input[8];
		let road = output.GetALine(output.length - 1);
		let pos = Random.RangeInt(output.sideSizeDown, output.sideSizeDown + output.width);
		let walk = road.Get(pos);
		if (walk.getComponent(Walkable).walkAble) {
			let coin = this.InstanceByTag(eatable);
			coin.parent = eatable.node;
			//coin.scale *= GameCoordinate.scale;
			let tran =/* PoolUtility.getorAddComponent(Transform, coin);// */coin.addComponent(Transform);
			let tri = /*PoolUtility.getorAddComponent(Trigger, coin);// */coin.addComponent(Trigger);
			tri.Init(this.tag);
			tri.SetScale(0.5);
			tran.Position = walk.Position;
			coin.getChildByName("Item").addComponent(Visibility).Inject(tran);
			//let refself = PoolUtility.getorAddComponent(ReferSelf, coin);
			road.AddItem(coin);
		}
		return true;
	}
	private InstanceByTag(eatable: ResouseData): cc.Node {
		let item: cc.Node;
        if (this.tag == Tags.Coin) {
            item =/* PoolUtility.Instance(eatable.other[0]); //*/cc.instantiate(eatable.other[0]) as cc.Node;
            item.getComponent(CoinMoveTo).Init();
		} else {
            item =/* PoolUtility.Instance(eatable.other[1]);//*/cc.instantiate(eatable.other[1]) as cc.Node;
			item.getChildByName("Item").getComponent(cc.Sprite).spriteFrame = eatable.textures[this.takeID()];
        }
		//PoolUtility.getorAddComponent(UpDown, item.getChildByName("Item"));
		item.getChildByName("Item").addComponent(UpDown);
        return item;
    }
    private takeID() {
        switch (this.tag) {
            case Tags.Clock:
                return 0;
            case Tags.Magnet:
                return 1;
            case Tags.Super:
                return 2;
            case Tags.Swamm:
                return 3;
            default:
                return 0;
        }
    }
}
