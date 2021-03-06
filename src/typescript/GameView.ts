import * as PIXI from "pixi.js";
import { Graphics } from '@pixi/graphics';
import '@pixi/graphics-extras';
import '@pixi/text';
import { HexagonData } from "./HexagonData";

export class GameView {

    private readonly app: PIXI.Application;
    private readonly gameArea: PIXI.Container;
    private readonly amountOfSides = 6;
    private readonly depthOfSides = 5;

    private text!: PIXI.Text;

    constructor() {

        this.app = new PIXI.Application({
            width: 400,
            height: 420,
            backgroundColor: 0xFFFFFF
        });

        this.gameArea = new PIXI.Container();
        this.app.stage.addChild(this.gameArea);
    }

    draw(hexagonData: HexagonData): Graphics {
        let hexagonContainer = new PIXI.Container();

        //@ts-ignore
        let hexagon = new Graphics()
            .lineStyle(this.depthOfSides, 0x988B80, 1)
            .beginFill(0xFFFFFF)
            .drawRegularPolygon(hexagonData.x, hexagonData.y,
                hexagonData.sideLength, this.amountOfSides, 0.525)
            .endFill();
        hexagonContainer.addChild(hexagon);
        this.putValue(hexagonData, hexagonContainer);
        this.gameArea.addChild(hexagonContainer);

        return hexagon;
    }

    putValue(hexagonData: HexagonData,
             container: PIXI.Container) {

        let style = new PIXI.TextStyle(
            {
                fontFamily: 'Arial',
                fontSize: hexagonData.sideLength - 2,
                fill: 0x988B80,
                align: 'center'
            });

        this.text = new PIXI.Text(hexagonData.value === 0 ?
            "" : hexagonData.value.toString(), style);

        this.text.x = hexagonData.x - hexagonData.sideLength / 4;
        this.text.y = hexagonData.y - hexagonData.sideLength / 2;

        container.addChild(this.text);
    }

    getPixiApp() {
        return this.app.view;
    }

    public updateValue(newValue: number) {
        this.text.text = newValue.toString();
        //todo: fix text scale
        this.text.x -= newValue > 9 ? 10 : 0;
    }
}