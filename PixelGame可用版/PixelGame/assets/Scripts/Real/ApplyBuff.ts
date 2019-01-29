import RealPlayer from "./RealPlayer";
import RoleBuff from "./RoleBuff";
import PlayerUIs from "./PlayerUIs";
import StartUtility from "./Utility/StartUtility";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ApplyBuff extends cc.Component {
    start() {
		let player = this.getComponent(RealPlayer);
		StartUtility.Start(() => {
			RoleBuff.Take(PlayerUIs.curRoleID).func(player);
		});
	}
}
