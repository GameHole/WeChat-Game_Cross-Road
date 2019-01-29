import ReferSelf from "./ReferSelf";
import List from "../System/List";

export default class RefArray {
	private array = new List<ReferSelf>();
	public Add(ref: ReferSelf) {
		this.array.Add(ref);
		ref.id = this.array.Count - 1;
		ref.ondestroySelf = (id) => {
			this.array.Set(id, null);
			//console.log("remove::" + id);
        };
    }
	public foreach(cb: (ele: ReferSelf) => void) {
		for (var i = 0; i < this.array.Count; i++) {
			let item = this.array.Get(i);
			if (item != null) {
				cb(item);
            }
        }
    }
	public Clear() {
		this.array.Clear();
    }
}
