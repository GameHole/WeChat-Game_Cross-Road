import ShaderHelper = require("../ShaderLab/components/ShaderHelper")
import List from "../System/List";
import ItemData from "./TriggerDealers/ItemData";

const { ccclass, property } = cc._decorator;
@ccclass
export default class ImageEffect extends cc.Component {
    private sh = null;
    private static readonly normalEffect = "NormalShader";
    private static readonly grayEffect = "GrayShader";
    private static change: boolean;
    //private static list = new List<cc.Sprite>();
    public static SetGray() {
        this.change = false;
        //for (var i = 0; i < this.list.Count; i++) {
        //    let item = this.list.Get(i);
        //    if (item.enabled)
        //        ShaderHelper.applyShaderByName(ImageEffect.grayEffect, item);
        //}
    }
    public static SetNormal() {
        this.change = true;
        //for (var i = 0; i < this.list.Count; i++) {
        //    let item = this.list.Get(i);
        //    if (item.enabled)
        //        ShaderHelper.applyShaderByName(ImageEffect.normalEffect, item);
        //}
    }
    private sprite: cc.Sprite;
    private state: number = 0;
    //private inited: boolean = false;
    onLoad() {
        this.Inject(this.getComponent(cc.Sprite));
    }
    public Inject(sprite: cc.Sprite) {
        //if (this.inited) return;
        //this.inited = true;
        this.sprite = sprite;
        //if (this.sprite == null) return;
        //ImageEffect.list.Add(this.sprite);
    }
    update() {
        if (this.sprite.enabled == true) {
            if (ItemData.isPause && !ImageEffect.change) {
                //if (this.state == 1) return;
                //this.state = 1;
                //console.log("ggggg");
                ShaderHelper.applyShaderByName(ImageEffect.grayEffect, this.sprite);
            } else {
                //if (this.state == 0) return;
                //this.state = 0;
                //console.log("nnnnn");
                ShaderHelper.applyShaderByName(ImageEffect.normalEffect, this.sprite);
            }
            //console.log("eeeee");
        }
    }
    //onDestroy() {
    //    if (this.sprite == null) return;
    //    ImageEffect.list.Remove(this.sprite);
    //}
}
