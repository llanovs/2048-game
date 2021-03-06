export class HexagonData {

    private readonly _sideLength: number;
    private readonly _x: number;
    private readonly _y: number;
    public value: number;

    constructor(sideLength: number,
                x: number,
                y: number,
                value: number) {
        this._sideLength = sideLength;
        this._x = x;
        this._y = y;
        this.value = value;
    }


    get sideLength(): number {
        return this._sideLength;
    }

    get x(): number {
        return this._x;
    }

    get y(): number {
        return this._y;
    }
}