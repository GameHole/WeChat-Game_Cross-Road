const {ccclass, property} = cc._decorator;

@ccclass
export default class Random {
    public static Range(min:number,max:number):number{
        if(min>max)
        {
            let temp=min;
            min=max;
            max=temp;
        }
        return min+Math.random()*(max-min);
    }
    public static RangeInt(min:number,max:number):number{
      return Math.floor(Random.Range(min,max));
    }
}
