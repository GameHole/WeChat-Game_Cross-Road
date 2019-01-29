import EventUtility from "../Utility/EventUtility";
import EventNames from "../EventNames";
import UIMoveto from "./UIMoveto";
import RoleBuff from "../RoleBuff";
import PlayerUIs from "../PlayerUIs";
import RoleSelector from "./RoleSelector";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RoleBuffUI extends cc.Component {
	private uimveto: UIMoveto;
	private text: cc.Label;
	@property(cc.Node)
	startP: cc.Node = null;
	@property(cc.Node)
	endP: cc.Node = null;
	@property(RoleSelector)
	roleSel: RoleSelector = null;
	start() {
		this.uimveto = this.addComponent(UIMoveto);
		this.text = this.getComponentInChildren(cc.Label);
		this.text.string = RoleBuff.Take(this.roleSel.currentX).des;
		EventUtility.Regist(EventNames.onRoleChange, (x) => {
			this.text.string = RoleBuff.Take(x).des;
			this.uimveto.Run(this.startP.position, this.endP.position);
		});
    }
}
