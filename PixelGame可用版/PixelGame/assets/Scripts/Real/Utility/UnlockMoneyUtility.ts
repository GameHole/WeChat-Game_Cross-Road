import RoleDataUtility from "./RoleDataUtility";

const {ccclass, property} = cc._decorator;
@ccclass
export default class UnlockMoneyUtility extends cc.Component {
	private static config = [
		0, 800, 2000,
		0, 800, 2000,
		300, 800, 2000,
		2000, 2000, 5000
	];
    public static Take(x: number, y: number): number {
        return this.config[RoleDataUtility.toIndex(x,y)];
    }
}
