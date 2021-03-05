import * as PIXI from "pixi.js";

export class HexagonsValueDraw {

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
    }

    draw(){
        const app = new PIXI.Application({ antialias: true });
        this.gameFieldDiv.append(app.view);

        const graphics = new PIXI.Graphics();
        graphics.beginFill(0xDE3249);
        graphics.drawRect(50, 50, 50, 50);
        graphics.endFill();
    }

    /**
     * Create a <div> block with hexagon dynamically, with an appended <div> inside
     * @param dataX
     * @param dataY
     * @param dataZ
     * @param dataValue
     */
    public setDiv(dataX: number,
                  dataY: number,
                  dataZ: number,
                  dataValue: number) {

        let newDiv = document.createElement('div');
        newDiv.className = 'hexagons';
        newDiv.id = this.hexagonId.toString();
        newDiv.setAttribute("data-value", dataValue.toString());
        newDiv.setAttribute("data-x", dataX.toString());
        newDiv.setAttribute("data-y", dataY.toString());
        newDiv.setAttribute("data-z", dataZ.toString());
        this.gameFieldDiv.appendChild(newDiv);

        this.hexagonId++;
        // this.playArea.innerHTML = this.div;
    }
}