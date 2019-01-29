import Number from "../Number";
import MyCoin from "./MyCoin";
import Gift from "./Gift";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GiftRecever extends cc.Component {
	@property(Number)
	coin: Number = null;
    public onRecv: Function;
	private coinV: number;

    public open(coin: number, onrecv: Function = null) {
        this.coinV = coin;
        this.onRecv = onrecv;
		this.coin.SetNumber(this.coinV);
		this.node.active = true;
	}
	public Receve() {
		MyCoin.Add(this.coinV);
        if (this.onRecv) this.onRecv();
		this.node.active = false;
	}
}
