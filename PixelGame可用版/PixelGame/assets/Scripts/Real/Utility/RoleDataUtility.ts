import SaveUtility from "./SaveUtility";
import EventUtility from "./EventUtility";
import EventNames from "../EventNames";
import CloudUtility from "./CloudUtility";

export default class RoleDataUtility{
    private static array = new Array<boolean>();
	public static Has(x: number, y: number): boolean {
		let res = this.array[this.toIndex(x, y)];
		return res != null && res == true;
    }
    public static UnLock(x, y) {
        let index = this.toIndex(x, y);
		this.array[index] = true;
		SaveUtility.SetItem("useableRoles", this.array);
		CloudUtility.UpdateServer("useableRoles");
    }
	public static Init(length: number) {
		let useable = SaveUtility.GetItem("useableRoles");
		if (useable == null) {
			this.array = new Array<boolean>(length);
			for (let i = 0; i < this.array.length; i++) {
				this.array[i] = false;
			}
			this._init_();
		} else {
			this.array = useable;
		}
	}
	private static _init_() {
		this.array[this.toIndex(0, 0)] = true;
		this.array[this.toIndex(1, 0)] = true;
		SaveUtility.SetItem("useableRoles", this.array);
		CloudUtility.UpdateServer("useableRoles");
	}
    public static toIndex(x, y): number {
        return x * 3 + y;
	}
	public static toXY(index: number): cc.Vec2 {
		return new cc.Vec2(Math.floor(index / 3), index % 3);
	}
	public static TakeUsefull(x: number, y: number): cc.Vec2 {
		let last = this.toIndex(x, y);
		for (let i = last;i >= 0; i--) {
			if (this.array[i])
				return this.toXY(i);
		}
		return cc.Vec2.ZERO;
    }
}
