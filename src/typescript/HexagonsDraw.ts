import {GameView} from "./GameView";

export class HexagonsDraw {

    private readonly sideLength: number;

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
                sideLength: number,
                dataValue?: number) {
        this.gameFieldDiv = parentDiv;
        this.dataX = dataX;
        this.dataY = dataY;
        this.dataZ = dataZ;
        this.dataValue = dataValue ?? 0;
        this.sideLength = sideLength;
        this.init();
    }

    private init() {
        this.setDiv();
        let gameView = new GameView();
        this.gameFieldDiv.appendChild(gameView.getPixiApp());

        //todo: create a formula to draw hexagons

        //left top corner
        gameView.draw(this.sideLength, 100,160, 2);

        //right top corner
        gameView.draw(this.sideLength, 300,160, 2);

        //top
        gameView.draw(this.sideLength, 200,100, 1);

        //bottom
        gameView.draw(this.sideLength, 200,330, 1);

        //right bottom corner
        gameView.draw(this.sideLength, 300,270, 1);

        //left bottom corner
        gameView.draw(this.sideLength, 100,270, 1);

        //center
        gameView.draw(this.sideLength, 200,215, 2);
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