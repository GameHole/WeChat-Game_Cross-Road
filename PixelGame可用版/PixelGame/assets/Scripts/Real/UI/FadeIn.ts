import ColorTo from "../RoleSelector/ColorTo";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FadeIn extends cc.Component {
	start() {
		this.getComponent(ColorTo).Run(300, 0);
    }
}
