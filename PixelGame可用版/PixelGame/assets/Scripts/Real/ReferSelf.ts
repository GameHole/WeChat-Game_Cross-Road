const { ccclass, property } = cc._decorator;

@ccclass
export default class ReferSelf extends cc.Component {
    public ondestroySelf;
    public id: number;
    public RemoveRef() {
        if (this.ondestroySelf != null)
            this.ondestroySelf(this.id);
    }
}
