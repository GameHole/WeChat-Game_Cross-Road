import ABeheviorTree from "./ABeheviorTree";
import TreeNode from "./TreeNode";

export default class Selector extends TreeNode {
    public Execute(input, output): boolean {
       
        for (let i = 0; i < this.childs.length; i++) {
            if (!this.childs[i].Execute(input, output))
                return false;
        }
        return true;
    }
}
