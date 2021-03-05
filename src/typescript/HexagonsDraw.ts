import {GameView} from "./GameView";

export class HexagonsDraw {

    private hexagonId = 0;
    private dataX: number;
    private dataY: number;
    private dataZ: number;
    private dataValue: number;
    private gameFieldDiv: any;

    constructor(parentDiv: HTMLDivElement,
                dataX: number,
                dataY: number,
                dataZ: number,
                dataValue?: number) {
        this.gameFieldDiv = parentDiv;
        this.dataX = dataX;
        this.dataY = dataY;
        this.dataZ = dataZ;
        this.dataValue = dataValue ?? 0;
        this.init();
    }

    private init() {
        let sideLength = 50;
        let gameView = new GameView(this.gameFieldDiv, sideLength);
        this.setDiv();
        gameView.draw();
    }

    /**
     * Create a <div> block with hexagon dynamically, with an appended <div> inside
     */
    public setDiv() {

        let newDiv = document.createElement('div');
        newDiv.className = 'hexagons';
        newDiv.id = this.hexagonId.toString();
        newDiv.setAttribute("data-value", this.dataValue.toString());
        newDiv.setAttribute("data-x", this.dataX.toString());
        newDiv.setAttribute("data-y", this.dataY.toString());
        newDiv.setAttribute("data-z", this.dataZ.toString());
        this.gameFieldDiv.appendChild(newDiv);
        this.hexagonId++;
    }

}