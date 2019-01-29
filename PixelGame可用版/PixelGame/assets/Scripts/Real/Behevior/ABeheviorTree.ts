import ResouseData from "../Res/ResouseData";
import UIMap from "../UIMap";

export default abstract class ABeheviorTree {
    protected parent: ABeheviorTree;
    public Add(node: ABeheviorTree){
        node.parent=this;
    }
    public abstract Remove(node: ABeheviorTree);

    public abstract Execute(input, output): boolean;
}
