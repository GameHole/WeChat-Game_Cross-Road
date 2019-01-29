import ResouseData from "../Res/ResouseData";
import UIMap from "../UIMap";
import Random from "../Random";
import TreeNode from "./TreeNode";
import List from "../../System/List";

export default class RandomSelector extends TreeNode {
    public Execute(input: Array<ResouseData>, output: UIMap) {
        //while (true) {
        //    if (this.childs[Random.RangeInt(0, this.childs.length)].Execute(input, output))
        //        return true;
		//}
		return this.Select(0, this.childs.length, (i) => {
			return this.childs[i].Execute(input, output);
		});
    }
    private Select(x, y, Fx: (z) => void): boolean {
        let arr = new List<number>();
        for (let i = x; i < y; i++) {
            arr.Add(i);
		}
		//let count = 1;
		while (arr.Count > 0) {
			//console.log(count);
            let index = Random.RangeInt(0, arr.Count);
            if (Fx(arr.Get(index))) return true;
			arr.RemoveAt(index);
			//count++;
        }
        //console.log("None");
        return false;
    }
 //   private Select(x, y, Fx: (z) => void): boolean {
 //       console.log("select::",x, y);
	//	if (x >= y) return false;
	//	let z = Random.RangeInt(x, y);
	//	if (Fx(z)) return true;
	//	let lx, ly, rx, ry;
	//	if (Random.Range(0, 100) < 50) {
	//		lx = x;
	//		ly = z;
	//		rx = z + 1;
	//		ry = y;
	//	} else {
	//		rx = x;
	//		ry = z;
	//		lx = z + 1;
	//		ly = y;
	//	}
	//	return this.Select(lx, ly, Fx) || this.Select(rx, ry, Fx);
	//}
}
