document.addEventListener("DOMContentLoaded", function(){
    var sierpinski = new Sierpinski();
    sierpinski.test("aa")
});


class Sierpinski {
    constructor() {

        this.canvas = document.getElementById('sierpinski-canvas');
        if (this.canvas.getContext) this.ctx = this.canvas.getContext("2d");
        else alert("Canvas error")

        document.getElementById("start").addEventListener('click', this.startCanvas.bind(this));
    }

    startCanvas() {
        this.drawTriangle([10,100],50);
    }

    drawTriangle(start, length) {
        this.ctx.beginPath();
        this.ctx.moveTo(start[0], start[1]);
        this.ctx.lineTo(start[0] + length, start[1]);
        this.ctx.lineTo(start[0] + length/2, length);
        this.ctx.fill();
    }

    test(params) {
        console.log(params)
    }
}

