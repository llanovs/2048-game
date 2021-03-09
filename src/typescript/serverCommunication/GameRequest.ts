import {GameResponse} from "./GameResponse"

export class GameRequest{

    private readonly REQUEST_TYPE: string;
    private readonly URL: string;
    private readonly gameType: number;
    private _gameState = [{}];

    constructor(gameType: number) {
        this.URL = `http://51.15.207.127:13337/${gameType}`;
        this.REQUEST_TYPE = `POST`;
        this.gameType = gameType;
    }

    async sendInitRequest() : Promise<GameResponse> {
        return fetch(this.URL, {
                method: this.REQUEST_TYPE,
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify([])
            }).then(async result => new GameResponse(result.status, await result.json()));
    }

    async sendGameRequest() : Promise<GameResponse> {
        return fetch(this.URL, {
            method: this.REQUEST_TYPE,
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(this.gameState)
        }).then(async result => new GameResponse(result.status, await result.json()));
    }

    set gameState(values: [{}]) {
        //todo: add array with current game status
        //[{"x": 0, "y": 0, "z": 0, "value": 2}]
        this._gameState = values;
    }
}