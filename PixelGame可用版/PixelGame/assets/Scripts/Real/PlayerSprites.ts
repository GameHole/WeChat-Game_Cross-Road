const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayerSprites {
@property(cc.SpriteFrame)
   public forward:cc.SpriteFrame=null;
   @property(cc.SpriteFrame)
   public back:cc.SpriteFrame=null;
   @property(cc.SpriteFrame)
   public left:cc.SpriteFrame=null;
   @property(cc.SpriteFrame)
   public right:cc.SpriteFrame=null;
   @property(cc.SpriteFrame)
   public deadFlow:cc.SpriteFrame=null;
   @property(cc.SpriteFrame)
   public deadGround:cc.SpriteFrame=null;
}
