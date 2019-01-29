import EventUtility from "./EventUtility";
import ColorTo from "../RoleSelector/ColorTo";
import UIMap from "../UIMap";
import RealPlayer from "../RealPlayer";
import EventNames from "../EventNames";
const {ccclass, property} = cc._decorator;

@ccclass
export default class SceneUtility {
	public static LoadScene(func = null, over = null) {
		this.Run(func, over);
    }
	private static Run(func,over) {
		let cola = cc.find("Canvas/Black").getComponent(ColorTo);
        cola.speed = 1.5;
        cola.Run(0, 256, null, () => {
			cc.find("UiMap").getComponent(UIMap).Dispose();
            EventUtility.Fire(EventNames.onClear);
            if (func) func();
            EventUtility.Fire(EventNames.onLoadScene);
			RealPlayer.main.canNotMove();
			cola.speed = 1;
			cola.Run(400, 0, null, () => { RealPlayer.main.canMove(); if (over) over(); });
        });
    }
}
