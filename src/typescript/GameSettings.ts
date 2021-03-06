import {DrawHexagon} from "./DrawHexagon";
import {GameStatus} from "./enums/GameStatus";
import {GameType} from "./enums/GameType";
import {HexagonCell} from "./entities/HexagonCell";
import {HexagonData} from "./entities/HexagonData";
import {GameMoves} from "./enums/GameMoves";
import {GameView} from "./GameView";
import {GameRequest} from "./serverCommunication/GameRequest";
import {GameState} from "./serverCommunication/GameState";

export class GameSettings {

    private readonly gameView: GameView;
    private readonly gameAreaWidth = 400;
    private readonly centerX = 200;
    private readonly centerY = 215;
    private readonly firstType: any;
    private readonly secondType: any;
    private readonly thirdType: any;

    private totalAmountOfCells = 0;
    private filledAmountOfCells = 3;
    private gameStatus: GameStatus;
    private gameFieldDiv!: HTMLDivElement;
    private hexagons : Map<HexagonCell, HexagonData>;
    private draw!: DrawHexagon;
    private gameState!: GameState;

    constructor() {
        this.firstType = document.querySelector("#first_type");
        this.secondType = document.querySelector("#second_type");
        this.thirdType = document.querySelector("#third_type");
        this.gameStatus = GameStatus.PLAYING;
        this.hexagons = new Map<HexagonCell, HexagonData>();
        this.gameView = new GameView();
        this.gameState = new GameState();
    }

    /**
     * Set listeners for button click Event
     */
    addListeners() {
        let me = this;

        this.firstType.addEventListener("click", function() {
            me.setupGameArea(GameType.FIRST_TYPE.valueOf());
        }, false);

        me.secondType.addEventListener("click", function() {
            me.setupGameArea(GameType.SECOND_TYPE.valueOf());
        }, false);

        me.thirdType.addEventListener("click", function() {
            me.setupGameArea(GameType.THIRD_TYPE.valueOf());
        }, false);

        document.addEventListener("keydown", (event) => {
            if(this.isKeyWasPressed(event)) {
                this.onPressKey(event);
            }
        });
    }

    private isKeyWasPressed(event: KeyboardEvent) {
        return (<any>Object).values(GameMoves).includes(event.code);
    }

    /**
     * Setup game area and create hexagons
     * @param gameType
     */
    async setupGameArea(gameType: number) {
        this.filledAmountOfCells = 3;
        this.cleanGameArea();
        this.setParentDiv();
        this.setNumberOfHexagons(gameType);
        await this.getInitValues(gameType)
        this.drawHexagons(gameType, this.gameState.currentGameState);
        this.setGameRules(this.gameFieldDiv);
        this.setGameStatus(this.gameFieldDiv);
    }

    onPressKey(eventCode: KeyboardEvent){
        //todo: add logic
        this.putNewValue(29);
    }

    private setNumberOfHexagons(gameType: number) {
        let amount = gameType;
        for (let i = 1; i < gameType; i++) {
            if (i + 1 === gameType) {
                amount *= 2;
            }
            amount += gameType + i;
        }
        this.totalAmountOfCells = amount;
    }

    private setSideLength(gameType: number): number{
        let particles = gameType === 2 ? 6 :
            gameType === 3 ? 10 : 14;

        return this.gameAreaWidth / particles;
    }

    async getInitValues(gameType: number): Promise<JSON> {
        let request = new GameRequest(gameType);
        let response = await request.sendInitRequest();
        // @ts-ignore
        return this.gameState.setCurrentGameState(response.response);
    }

    /**
     * Draw hexagons according to totalAmountOfCells
     */
    drawHexagons(gameType: number, response: JSON){
        let id = 0;

        let deltaX = -100;
        let amount = gameType - 1;
        let row = gameType;

        for (let x = -amount; x < gameType; x++) {
            let y = x <= 0 ? amount : 0;
            let z = x < 0 ? 0 : -amount;

            //todo: investigate formula
            let deltaY = x === 0 ? -115 : -60;

            for (let i = 0; i < row; i++) {
                console.log(`{${x};${y};${z}}`);
                let value = this.hasInitValue(x, y, z, response);

                // @ts-ignore
                this.createHexagon(gameType, id++, x, y, z,
                    value !== -1 ? value : 0, deltaX, deltaY);
                deltaY += 110;
                y--;
                z++;
            }
            deltaX += 106;
            row += x < 0 ? 1 : -1;
        }
    }

    private createHexagon(gameType: number,
                          id: number,
                          dataX: number,
                          dataY: number,
                          dataZ: number,
                          dataValue: number,
                          deltaX: number,
                          deltaY: number) {
        let sideLength = this.setSideLength(gameType);
        let leftTopCell = new HexagonCell(id, dataX, dataY, dataZ, dataValue);
        let leftTopHexagonData = new HexagonData(sideLength, this.centerX + deltaX, this.centerY + deltaY, dataValue);
        this.hexagons.set(leftTopCell, leftTopHexagonData);
        this.draw = new DrawHexagon(this.gameView, leftTopCell, leftTopHexagonData, this.gameFieldDiv);
    }

    private hasInitValue(x: number,
                         y: number,
                         z: number,
                         response: JSON): number {


        // @ts-ignore
        for (let i = 0; i < response.length; i++) {
            // @ts-ignore
            if (response[i].x === x && response[i].y === y && response[i].z === z) {
                // @ts-ignore
                return response[0].value;
            }
        }
        return -1;
    }

    private setParentDiv() {
        let gameFieldDiv = document.createElement("div");
        gameFieldDiv.id = "play_area";
        gameFieldDiv.className = "play_area";
        gameFieldDiv.setAttribute("height", "420px");
        gameFieldDiv.setAttribute("width", "400px");
        gameFieldDiv.setAttribute("position", "relative");
        gameFieldDiv.setAttribute("align-self", "center");
        document.getElementsByTagName('body')[0].appendChild(gameFieldDiv);
        this.gameFieldDiv = gameFieldDiv;
    }

    private setGameStatus(gameFieldDiv: HTMLDivElement) {
        let gameStatus = document.createElement("div");
        gameStatus.className = "selection_area";
        gameStatus.innerHTML = "Game Status: "
        let currentGameStatus = document.createElement("span");
        currentGameStatus.id = "data-status";
        currentGameStatus.setAttribute("data-status", this.gameStatus.toString());
        currentGameStatus.innerHTML = this.gameStatus.toString();
        gameStatus.append(currentGameStatus);

        gameFieldDiv.append(gameStatus);
    }

    private setGameRules(gameFieldDiv: HTMLDivElement) {
        let rules = document.createElement("p");
        rules.setAttribute("font-style", "italic");
        rules.innerHTML = "Use Q, W, E, A, S, D keys for move";
        gameFieldDiv.append(rules);
    }

    /**
     * Put init values to hexagons
     */
    putNewValue(newValue: number) {
        this.draw.updateValue(newValue);
    }

    /**
     * When there's no moves it means that game over so the status was changed
     */
    private changeGameStatus() {
        //todo: check that
        if(this.filledAmountOfCells === this.totalAmountOfCells){
            let gameStatus = document.getElementById("data-status");
            if (gameStatus !== undefined && gameStatus !== null){
                this.gameStatus = GameStatus.GAME_OVER;
                gameStatus.setAttribute("data-status", this.gameStatus.toString());
            }
        }
    }

    private cleanGameArea() {
        const gameArea = document.getElementById("play_area");
        if (gameArea != null) {
            document.getElementsByTagName("body")[0].removeChild(gameArea);
        }
    }
}