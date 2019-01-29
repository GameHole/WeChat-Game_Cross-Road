interface IE<T> {
    Get(index: number): T;
    Set(index: number, item: T): void;
}
export default class Stack<T>{
    private array = Array<T>(64);
    private count: number = 0;
    public get Count() { return this.count; }
    public Push(item: T) {
        this.array[this.count++] = item;
    }
    public Pop(): T {
        //console.log("run::" + this.count);
        if (this.count <= 0)
            throw "Stack out of range!!!";
        return this.array[--this.count];
    }
    //private copy(src: Array<T>,srcoffset, des: Array<T>,desoffset,len) {
    //    for (var i = 0; i < len; i++) {
    //        des[i] = src[i];
    //    }
    //}
}