import EventUtility from "./Utility/EventUtility";
import EventNames from "./EventNames";
import ItemData from "./TriggerDealers/ItemData";

// Learn TypeScript:
const {ccclass, property} = cc._decorator;

@ccclass
export default class onDead extends cc.Component {
	start() {
		EventUtility.Regist(EventNames.onPlayerDead, () => {
			ItemData.Clear();
			console.log("clear");
		});
    }
}
