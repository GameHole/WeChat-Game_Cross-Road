
export default class List<T> {
    private _array = new Array<T>();
    private _count = 0;
    public get Count() { return this._count; }
    public Add(item: T) {
        this._array[this._count++] = item;
    }
    public Remove(item: T): void {
        let index = this.indexOf(item);
        if (index > 0) {
            this.RemoveAt(index);
        }
    }
    public indexOf(item: T): number {
        for (let i = 0; i < this._count; i++) {
            if (this._array[i] == item)
                return i;
        }
        return -1;
    }
    public RemoveAt(index: number): void {
        for (let i = index; i < this._count - 1; i++) {
            this._array[i] = this._array[i + 1];
        }
        this._count--;
    }
    public Get(index: number): T {
        this.assert(index);
        return this._array[index];
    }
    public Set(index: number, item: T): void {
        this.assert(index);
        this._array[index] = item;
    }
    private assert(index: number) {
        if (index < 0 || index >= this._count)
            throw "List  out of range";
    }
    public Clear(): void {
        for (var i = 0; i < this._count; i++) {
            this._array[i] = null;
        }
        this._count = 0;
	}
	public Alt(count: number): List<T> {
		this._array = new Array<T>(count);
		this._count = count;
		return this;
	}
}
