import ABeheviorTree from "./ABeheviorTree";
export default abstract class TreeNode extends ABeheviorTree {
    protected childs = new Array<ABeheviorTree>();
    public Add(node: ABeheviorTree) {
        super.Add(node);
        this.childs.push(node);
    }
    public Remove(node: ABeheviorTree) {
        let i = this.IndexOf(node);
        if (i = -1) return;
        for (let x = i; i < this.childs.length - 1; i++) {
            this.childs[i] = this.childs[i + 1];
        }
    }
    private IndexOf(node: ABeheviorTree) {
        for (let i = 0; i < this.childs.length; i++) {
            if (this.childs[i] == node)
                return i;
        }
        return -1;
    }
}
