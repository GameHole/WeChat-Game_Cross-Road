import SaveUtility from "./Utility/SaveUtility";
import DateUtility from "./Utility/DateUtility";

const {ccclass, property} = cc._decorator;
@ccclass
export default class DateChanger extends cc.Component {
    private late: number = 0.1;
    private add: number = 0;
    update(dt) {
        this.add += dt;
        if (this.add >= this.late) {
            DateUtility.ChangeDate();
            this.enabled = false;
        }
    }
}
