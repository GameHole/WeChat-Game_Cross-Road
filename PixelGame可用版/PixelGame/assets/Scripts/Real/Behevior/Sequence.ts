import TreeNode from "./TreeNode";
export default class Sequence extends TreeNode {
    public Execute(input: any, output: any): boolean {
        for (var i = 0; i < this.childs.length; i++) {
            this.childs[i].Execute(input, output);
        }
        return true;
    }
}
