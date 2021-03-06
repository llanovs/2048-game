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
    private gameFieldDiv: any;

    constructor(gameView: GameView,
                cell: HexagonCell,
                hexagonData: HexagonData,
                gameFieldDiv: any) {
        this.hexagonData = hexagonData;
        this.gameView = gameView;
        this.cell = cell;
        this.gameFieldDiv = gameFieldDiv;
        this.gameFieldDiv.appendChild(this.cell.setDiv());
        this.gameFieldDiv.appendChild(this.gameView.getPixiApp());
        this.hexagon = this.gameView.draw(hexagonData);
    }

    public updateValue(newValue: number) {
        this.hexagonData.value = newValue;
        this.cell.updatedDiv(newValue);
        this.gameView.updateValue(newValue);
    }
}