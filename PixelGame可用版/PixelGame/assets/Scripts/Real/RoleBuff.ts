import PlayerUIs from "./PlayerUIs";
import RealPlayer from "./RealPlayer";
import DealSupper from "./TriggerDealers/DealSupper";
import Combot from "./Scores/Combot";
import DealMagnet from "./TriggerDealers/DealMagnet";
import DealSwamm from "./TriggerDealers/DealSwamm";
//class buff {
//	public des: string;
//	public func: (real: RealPlayer) => void;
//	public constructor(describ: string, func: (real: RealPlayer) => void) {
//		this.des = describ;
//		this.func = func;
//	}
//}
const {ccclass, property} = cc._decorator;
@ccclass
export default class RoleBuff {
	private static readonly buffs = [
		{
			des: "变大道具时效\n增加20%", func: (role: RealPlayer) => { role.getComponent(DealSwamm).lastTime *= 1.2;/* console.log("big::" + role.getComponent(DealSwamm).lastTime)*/ }
		},
		{
			des: "连击时间调为2秒", func: (role: RealPlayer) => { cc.find("Combot").getComponent(Combot).time = 2; /*console.log("Combot::" + cc.find("Combot").getComponent(Combot).time)*/ }
		},
		{
			des: "磁铁道具时效\n增加40%", func: (role: RealPlayer) => { role.getComponent(DealMagnet).lastTime *= 1.4;/* console.log("Magnet::" + role.getComponent(DealMagnet).lastTime) */}
		},
		{
			des: "飞行道具时效\n增加30%", func: (role: RealPlayer) => { role.getComponent(DealSupper).lastTime *= 1.3;/* console.log("Supper::" + role.getComponent(DealSupper).lastTime)*/ }
		}];
	//private static readonly buffs = [
	//	new buff("变大道具时效\n增加20%", (role: RealPlayer) => { role.getComponent(DealSwamm).lastTime *= 1.2; }),
	//	new buff("连击时间调为2秒", (role: RealPlayer) => { role.getComponent(DealSwamm).lastTime *= 1.2; }),
	//	new buff("磁铁道具时效\n增加40%", (role: RealPlayer) => { role.getComponent(DealSwamm).lastTime *= 1.2; }),
	//	new buff("飞行道具时效\n增加30%", (role: RealPlayer) => { role.getComponent(DealSwamm).lastTime *= 1.2; })
	//]
	public static Take(x: number) {
		return this.buffs[x];
	}
}
