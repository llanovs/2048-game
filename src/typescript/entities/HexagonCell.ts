export class HexagonCell{

    private readonly id: number;
    private readonly dataX: number;
    private readonly dataY: number;
    private readonly dataZ: number;

    private dataValue: number;

    constructor(id: number,
                dataX: number,
                dataY: number,
                dataZ: number,
                dataValue: number) {
        this.id = id;
        this.dataX = dataX;
        this.dataY = dataY;
        this.dataZ = dataZ;
        this.dataValue = dataValue;
    }

    public setDiv() {
        let newDiv = document.createElement("div");
        newDiv.className = "hexagons";
        newDiv.id = "hexagon" + this.id;
        newDiv.setAttribute("data-value", this.dataValue.toString());
        newDiv.setAttribute("data-x", this.dataX.toString());
        newDiv.setAttribute("data-y", this.dataY.toString());
        newDiv.setAttribute("data-z", this.dataZ.toString());
       return newDiv;
    }

    public updatedDiv(newValue: number) {
        this.dataValue = newValue;
        let newDiv = document.getElementById("hexagon" + this.id)
        if (newDiv !== undefined && newDiv !== null){
            newDiv.setAttribute("data-value", newValue.toString());
        }
    }
}