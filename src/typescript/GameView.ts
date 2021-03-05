import * as PIXI from "pixi.js";
import { Graphics } from '@pixi/graphics';
import '@pixi/graphics-extras';
import '@pixi/text';

export class GameView {

    private readonly app: PIXI.Application;
    private readonly gameArea: PIXI.Container;
    private readonly amountOfSides = 6;
    private readonly depthOfSides = 5;
    private hexagons: [any];

    constructor() {

        this.app = new PIXI.Application({
            width: 400,
            height: 420,
            backgroundColor: 0xFFFFFF
        });

        this.hexagons = [PIXI.Container];

        this.gameArea = new PIXI.Container();
        this.app.stage.addChild(this.gameArea);
    }

    draw(sideLength: number,
         x: number,
         y: number,
         value?: number){

        let hexagon = new PIXI.Container();

        //@ts-ignore
        const graphics = new Graphics()
            .lineStyle(this.depthOfSides, 0x988B80, 1)
            .beginFill(0xFFFFFF)
            .drawRegularPolygon(x, y, sideLength, this.amountOfSides)
            .endFill();
        hexagon.addChild(graphics);
        this.putValue(x, y, value ?? 0, sideLength, hexagon);
        this.gameArea.addChild(hexagon);

        this.hexagons.push(hexagon);
    }

    putValue(x: number,
             y: number,
             value: number,
             sideLength: number,
             container: PIXI.Container){

        let style = new PIXI.TextStyle(
            {
                fontFamily : 'Arial',
                fontSize: sideLength - 2,
                fill : 0x988B80,
                align : 'center'
            });

        let text = new PIXI.Text(value.toString(), style);

        text.x = x - sideLength/4;
        text.y = y - sideLength/2;

        container.addChild(text);
    }

    getPixiApp(){
        return this.app.view;
    }
}