import ABeheviorTree from "./ABeheviorTree";
import ResouseData from "../Res/ResouseData";
import UIMap from "../UIMap";
export default abstract class Action extends ABeheviorTree{
    public Add(node: ABeheviorTree){}
    public Remove(node: ABeheviorTree){}
    public abstract Execute(input, output): boolean;
}
