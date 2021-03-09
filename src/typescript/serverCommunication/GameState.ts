export class GameState {

    private _currentGameState!: JSON;
    private _newGameState!: JSON;

    get currentGameState(): JSON {
        return this._currentGameState;
    }

    public setCurrentGameState(jsonData: JSON) {
        if(typeof jsonData !== 'undefined') {
            this._currentGameState = jsonData;
        }
    }

    get newGameState(): JSON {
        return this._newGameState;
    }

    set newGameState(jsonData: JSON) {
        if(typeof jsonData !== 'undefined'){
            this._newGameState = jsonData;
        }
    }
}