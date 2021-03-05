import * as PIXI from "pixi.js";

export class GameView {

    private app: PIXI.Application;
    private gameArea: PIXI.Container;
    private gameFieldDiv: any;
    private sideLength: number;

    constructor(parentDiv: HTMLDivElement,
                sideLength: number) {

        this.app = new PIXI.Application({
            width: 400,
            height: 420,
            backgroundColor: 0xFFFFFF
        });
        this.sideLength = sideLength;
        this.gameFieldDiv = parentDiv;
        this.gameFieldDiv.appendChild(this.app.view);
        this.gameArea = new PIXI.Container();
    }

    draw(){
        //todo: create hexagon
        const graphics = new PIXI.Graphics();
        graphics.beginFill(0xE9E5E1);
        graphics.drawRect(0, 0, 50, 50);
        graphics.endFill();

        this.gameArea.addChild(graphics);
        this.app.stage.addChild(this.gameArea);
    }
}