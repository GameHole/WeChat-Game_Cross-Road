import GameMgr from "../GameMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BGM extends cc.Component {
	private audio
	start() {
		this.audio = this.getComponent(cc.AudioSource);
		this.audio.volume = GameMgr.isStarted ? 1 : 0.7;
		//this.Play(audio);
		//cc.game.on(cc.game.EVENT_HIDE, function () {
		//	console.log("out ");
		//}, this);
		cc.game.on(cc.game.EVENT_SHOW,  ()=> {
			//console.log(audio.isPlaying);
			this.Play();
			//console.log("in");
		}, this);
	}
	update() {
        this.Play();
	}
	private Play() {
		if (this.audio.isPlaying) return;
		this.audio.play();
	}
}
