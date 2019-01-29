import Transform from "../Transform/Transform";
import PoolUtility from "./Utility/PoolUtility";
import ReferSelf from "./ReferSelf";
import Trigger from "./Trigger";
import List from "../System/List";
import RefArray from "./RefArray";
const { ccclass, property } = cc._decorator;
@ccclass
export default class UIGround implements IDisposable {
    public wayType: string;
	public isDisposed = false;
	public array: List<Transform> = new List<Transform>();
	public obArray = new List<Transform>();
	private other = new List<any>();
	private items = new List<cc.Node>();
    private index: number = 0;
    public GetObArray() {
        return this.obArray;
    }
	public Add(node: Transform): void {
		this.array.Add(node);
    }
	public SetOb(index: number, node: Transform) {
		this.obArray.Set(index, node);
    }
	public AddOther(node): void {
		this.other.Add(node);
	}
	public AddItem(ref: cc.Node) {
		this.items.Add(ref);
	}
	public Get(index: number): Transform {
		return this.array.Get(index);
    }
	public GetOb(index: number): cc.Node {
		return this.obArray.Get(index).node;
    }
	public get length() {
		return this.array.Count;
	}
	public DestroyAground(tran: Transform) {
		let item = tran;
        let tri = item.getComponent(Trigger);
        if (tri != null) {
            tri.Destroy();
        }
		//item.node.zIndex = -100;
		PoolUtility.Destroy(item.node);
    }
    public DestroyAnOb(i: number) {
        let tran = this.obArray.Get(i);
		if (tran!= null) {
			if (tran.node != null) {
				PoolUtility.Destroy(tran.node);
			}
        }
        this.obArray.Set(i, null);
	}
    public Dispose() {
        if (this.isDisposed) return;
        //console.log("Dispose");
		this.isDisposed = true;
        for (var i = this.array.Count-1; i >=0; i--)
		{
			this.DestroyAground(this.array.Get(i));
			//let item = this.array.Get(i);
			//let tri = item.getComponent(Trigger);
   //         if (tri != null) tri.destroy();
			//item.node.zIndex = -100;
			//PoolUtility.Destroy(item.node);
			//this.array[i].node.destroy();
		}
        //console.log(this.obArray.length);
        for (var i = this.obArray.Count - 1; i >= 0; i--) {
     //       if (this.obArray[i] != null) {
     //           if (this.obArray[i].node != null) {
					//PoolUtility.Destroy(this.obArray[i].node);
					////this.obArray[i].node.destroy();
     //           }
			//       }
            this.DestroyAnOb(i);
		}
		this.DestroyOthers();
		this.DestroyItems();
        this.array = null;
        this.obArray = null;
		
		
	}
	public DestroyOthers() {
		for (var i = 0; i < this.other.Count; i++) {
			let item = this.other.Get(i);
			if (item.isValid) {
				item.destroy();
			}
		}
		this.other = null;
	}
	public DestroyItems() {
		for (var i = 0; i < this.items.Count; i++) {
			let item = this.items.Get(i);
			if (item.isValid)
				item.destroy();
		}
		this.items = null;
	}
}
