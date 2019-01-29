import EventUtility from "./EventUtility";
import EventNames from "../EventNames";

export default class StartUtility {
	public static Start(func: () => void) {
		func();
		EventUtility.Regist(EventNames.onLoadScene, func);
	}
	public static OnClear(func: () => void) {
		EventUtility.Regist(EventNames.onClear, func);
	}
}
