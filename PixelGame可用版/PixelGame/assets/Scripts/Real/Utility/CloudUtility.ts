import Wx from "../WXAPI/wx";
import EventUtility from "./EventUtility";
import EventNames from "../EventNames";

export default class CloudUtility {
	public static UpdateServer(key: string) {
		EventUtility.Fire(EventNames.updateServer,key);
	}
}
