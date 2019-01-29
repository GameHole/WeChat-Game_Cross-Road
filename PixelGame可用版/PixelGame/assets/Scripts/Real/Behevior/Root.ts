import ABeheviorTree from "./ABeheviorTree";
import ResouseData from "../Res/ResouseData";
import UIMap from "../UIMap";
import TreeNode from "./TreeNode";

export default class Root extends TreeNode {
    public Execute(input, output) {
        let res = true;
        this.childs.forEach(element => {
            res = res && element.Execute(input, output);
        });
        return res;
    }
}
