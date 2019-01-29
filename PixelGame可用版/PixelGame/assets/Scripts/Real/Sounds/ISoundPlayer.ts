import WxAudioPlayer from "./WxAudioPlayer";

export default interface ISoundPlayer{
	Play(id: number, loop: boolean, v: number): WxAudioPlayer;
	Stop(id: number);
	New(id: number): WxAudioPlayer;
}
