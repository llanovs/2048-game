export class HexagonData {

    private readonly _amountOfSides = 6;
    private readonly _sideLength: number;
    private readonly _x: number;
    private readonly _y: number;
    private _color = 0x988B80;
    private _value: number;

    constructor(sideLength: number,
                x: number,
                y: number,
                value: number) {
        this._sideLength = sideLength;
        this._x = x;
        this._y = y;
        this._value = value;
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

    stringValue(): string {
        return this._value === 0 ? "" : this._value.toString();
    }

    set value(value: number) {
        this._value = value;
    }

    get amountOfSides(): number {
        return this._amountOfSides;
    }

    get color(): number {
        return this._color;
    }

    set color(value: number) {
        this._color = value;
    }
}