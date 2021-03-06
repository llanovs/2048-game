import {GameView} from "./GameView";
import {HexagonCell} from "./HexagonCell";
import {HexagonData} from "./HexagonData";
import {Graphics} from '@pixi/graphics';
import '@pixi/graphics-extras';

export class DrawHexagon {

    private readonly gameView: GameView;
    private cell: HexagonCell;
    private hexagonData: HexagonData;
    private hexagon: Graphics;

    private readonly x = 200;
    private readonly y = 215;

    private gameFieldDiv: any;

    constructor(gameView: GameView,
                cell: HexagonCell,
                hexagonData: HexagonData,
                gameFieldDiv: any) {
        this.hexagonData = hexagonData;
        this.gameView = gameView;
        this.cell = cell;
        this.gameFieldDiv = gameFieldDiv;
        this.setDiv();
        this.gameFieldDiv.appendChild(this.gameView.getPixiApp());
        this.hexagon = this.gameView.draw(hexagonData);
    }

    /**
     * Create a <div> block with hexagon dynamically, with an appended <div> inside
     */
    public setDiv() {
        let newDiv = document.createElement('div');
        newDiv.className = 'hexagons';
        newDiv.id = 'hexagon' + this.cell.id.toString();
        newDiv.setAttribute("data-value", this.cell.dataValue.toString());
        newDiv.setAttribute("data-x", this.cell.dataX.toString());
        newDiv.setAttribute("data-y", this.cell.dataY.toString());
        newDiv.setAttribute("data-z", this.cell.dataZ.toString());
        this.gameFieldDiv.appendChild(newDiv);
    }

    public updateValue(newValue: number) {
        this.hexagonData.value = newValue;
        this.cell.dataValue = newValue;
        this.gameView.updateValue(newValue);
    }
}