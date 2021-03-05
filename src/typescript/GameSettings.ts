import {HexagonsDraw} from "./HexagonsDraw";
import {GameStatus} from "./GameStatus";
import {GameType} from "./GameType";

export class GameSettings {

    private readonly gameAreaWidth = 400;
    private readonly filledCellsOnInit = 3;
    private readonly firstType: any;
    private readonly secondType: any;
    private readonly thirdType: any;

    private sideLength = 0;
    private totalAmountOfCells = 0;
    private filledAmountOfCells = 3;
    private gameStatus: GameStatus;
    private gameFieldDiv: any;

    constructor() {
        this.firstType = document.querySelector("#first_type");
        this.secondType = document.querySelector("#second_type");
        this.thirdType = document.querySelector("#third_type");
        this.gameStatus = GameStatus.PLAYING;
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
    }

    /**
     * Setup game area and create hexagons
     * @param gameType
     */
    setupGameArea(gameType: number) {
        this.cleanGameArea();
        this.setParentDiv();
        this.setSideLength(gameType);
        this.setNumberOfHexagons(gameType);
        this.drawHexagons();
        this.putNewValue();

        GameSettings.setGameRules(this.gameFieldDiv);
        this.setGameStatus(this.gameFieldDiv);
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

    private setSideLength(gameType: number) {
        let particles = gameType === 2 ? 6 :
            gameType === 3 ? 10 : 14;

        this.sideLength = this.gameAreaWidth / particles;
    }

    /**
     * Draw hexagons according to totalAmountOfCells
     */
    drawHexagons(){
        for (let i = 0; i < this.totalAmountOfCells; i++){
            //todo: draw all of hexagons
        }

        //todo: delete, uses for test purposes
        this.drawSingleHexagon(this.gameFieldDiv, 0,0,0, 0);
    }

    drawSingleHexagon(parentDiv: HTMLDivElement,
                      dataX: number,
                      dataY: number,
                      dataZ: number,
                      dataValue?: number){
        new HexagonsDraw(parentDiv, dataX, dataY, dataZ, this.sideLength, dataValue);
    }

    private setParentDiv() {
        let gameFieldDiv = document.createElement('div');
        gameFieldDiv.id = 'play_area';
        gameFieldDiv.className = 'play_area';
        gameFieldDiv.setAttribute("height", "420px");
        gameFieldDiv.setAttribute("width", "400px");
        gameFieldDiv.setAttribute("position", "relative");
        gameFieldDiv.setAttribute("align-self", "center");
        document.getElementsByTagName('body')[0].appendChild(gameFieldDiv);
        this.gameFieldDiv = gameFieldDiv;
    }

    private setGameStatus(gameFieldDiv: HTMLDivElement) {
        let gameStatus = document.createElement('div');
        gameStatus.className = "selection_area";

        let currentGameStatus = document.createElement('span');
        gameStatus.setAttribute("data-status", this.gameStatus.toString());
        gameStatus.innerHTML = "Game Status: " + this.gameStatus.toString();
        gameStatus.append(currentGameStatus);

        gameFieldDiv.append(gameStatus);
    }

    private static setGameRules(gameFieldDiv: HTMLDivElement) {
        let rules = document.createElement('p');
        rules.setAttribute("font-style", "italic");
        rules.innerHTML = "Use Q, W, E, A, S, D keys for move";
        gameFieldDiv.append(rules);
    }

    /**
     * Put init values to hexagons
     */
    putNewValue() {
        for (let i = 0; i < this.filledCellsOnInit; i++) {
            //todo: implement logic part
        }
    }

    /**
     * When there's no moves it means that game over so the status was changed
     */
    changeGameStatus() {
        //todo: implement logic part

    }

    private cleanGameArea() {
        const gameArea = document.getElementById("play_area");
        if (gameArea != null) {
            document.getElementsByTagName("body")[0].removeChild(gameArea);
        }
    }
}