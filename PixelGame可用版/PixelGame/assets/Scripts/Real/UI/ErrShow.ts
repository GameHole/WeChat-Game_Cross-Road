const {ccclass, property} = cc._decorator;

@ccclass
export default class ErrShow extends cc.Component {
	@property(cc.Label)
	title: cc.Label = null;
	public Open(info = null) {
		this.node.active = true;
		if (info != null)
		this.title.string = info;
	}
	public Close() {
		this.node.active = false;
	}
}
