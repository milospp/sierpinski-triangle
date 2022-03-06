document.addEventListener("DOMContentLoaded", function(){
    var sierpinski = new Sierpinski();
    sierpinski.test("aa")
});


class Sierpinski {
    constructor() {

        this.canvas = document.getElementById('sierpinski-canvas');
        if (this.canvas.getContext) this.ctx = this.canvas.getContext("2d");
        else alert("Canvas error")

        this.triangles = [];

        document.getElementById("start").addEventListener('click', this.startCanvas.bind(this));
        document.getElementById("next_iter").addEventListener('click', this.nextTrinagleCut.bind(this));
    }

    resizeCanvas() {
        this.canvas.width = document.getElementById('inputWidth').value
        this.canvas.height = document.getElementById('inputHeight').value
    }

    startCanvas() {
        this.resizeCanvas();
        this.triangles = [];

        let length = Math.min(this.canvas.width, this.canvas.height)

        this.drawTriangle([0,0,length], false);
        this.triangles.push([0,0,length]);
    }

    getTriangleHeight (length) {
        return length * Math.sqrt(3) / 2
    }

    drawTriangle(triangle, upsideDown=false, fill="red", topLeft=true) {
        let [x,y,length] = triangle;
        let direction = upsideDown ? -1 : 1;
        if (topLeft && !upsideDown) y += this.getTriangleHeight(length); 

        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x + length, y);
        this.ctx.lineTo(x + length/2, y - (this.getTriangleHeight(length) * direction ));
        this.ctx.fillStyle = fill;
        this.ctx.fill();
    }


    addSmallTriangles(x, y, length) {
        if (length < 3) return;

        let height = this.getTriangleHeight(length);
        let triangle1 = [x + length/4     , y               , length/2];
        let triangle2 = [x                , y + height / 2  , length/2];
        let triangle3 = [x + length / 2   , y + height / 2  , length/2];
        this.triangles.push(triangle1);
        this.triangles.push(triangle2);
        this.triangles.push(triangle3);
    }

    nextTrinagleCut() {
        if (this.triangles.length === 0) return;
        
        let [x,y,length] = this.triangles.shift();
        
        let white_y = y + this.getTriangleHeight(length)/2;
        let white_x = x + length / 4;

        this.addSmallTriangles(x,y,length);
        this.drawTriangle([white_x, white_y, length/2], true, "white");



    }

    test(params) {
        console.log(params)
    }
}

