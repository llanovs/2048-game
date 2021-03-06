export class HexagonCell{

    private readonly _id: number;
    private readonly _dataX: number;
    private readonly _dataY: number;
    private readonly _dataZ: number;

    dataValue: number;

    constructor(id: number,
                dataX: number,
                dataY: number,
                dataZ: number,
                dataValue: number) {
        this._id = id;
        this._dataX = dataX;
        this._dataY = dataY;
        this._dataZ = dataZ;
        this.dataValue = dataValue;
    }

    get dataX(): number {
        return this._dataX;
    }

    get dataY(): number {
        return this._dataY;
    }

    get dataZ(): number {
        return this._dataZ;
    }

    get id(): number {
        return this._id;
    }
}