import SaveUtility from "./SaveUtility";
import CloudUtility from "./CloudUtility";

const {ccclass, property} = cc._decorator;
@ccclass
export default class DateUtility extends cc.Component {
    public static isDateChange(): boolean {
		let lastDate = SaveUtility.GetItem("LastDate");
		//console.log("lastdata", lastDate);
        let newData = new Date().getDay();
        return lastDate == null || lastDate != newData;
    }
    public static ChangeDate(): void {
		SaveUtility.SetItem("LastDate", new Date().getDay());
		CloudUtility.UpdateServer("LastDate");
    }
}
