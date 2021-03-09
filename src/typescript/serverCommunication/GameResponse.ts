export class GameResponse {

    private readonly _status: number;
    private readonly _response: JSON;

    constructor(status: number, response: JSON) {
        this._status = status;
        this._response = response;
    }

    get status(): number {
        return this._status;
    }

    get response(): JSON {
        return this._response;
    }
}