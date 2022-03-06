document.addEventListener("DOMContentLoaded", function(){
    var sierpinski = new Sierpinski();
});


class Sierpinski {
    constructor() {

        this.canvas = document.getElementById('sierpinski-canvas');
        if (this.canvas.getContext) this.ctx = this.canvas.getContext("2d");
        else alert("Canvas error")

        this.triangles = [];

        this.btn_start = document.getElementById("start")
        this.btn_next_iter = document.getElementById("next_iter");
        this.btn_finish_loop = document.getElementById("finish_loop");
        this.btn_finish_iteration_group = document.getElementById("finish_iteration_group");

        this.btn_start.addEventListener('click', this.startCanvas.bind(this));
        this.btn_next_iter.addEventListener('click', this.nextTrinagleCutButton.bind(this));
        this.btn_finish_loop.addEventListener('click', this.finishLoopButton.bind(this));
        this.btn_finish_iteration_group.addEventListener('click', this.finishIterationGroup.bind(this));
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
        this.disable_iter_buttons(false);
    }

    getTriangleHeight (length) {
        return length * Math.sqrt(3) / 2
    }

    drawTriangle(triangle, upsideDown=false, fill="black", topLeft=true) {
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
        if (length < 6) return;

        let height = this.getTriangleHeight(length);
        let triangle1 = [x + length/4     , y               , length/2];
        let triangle2 = [x                , y + height / 2  , length/2];
        let triangle3 = [x + length / 2   , y + height / 2  , length/2];
        this.triangles.push(triangle1);
        this.triangles.push(triangle2);
        this.triangles.push(triangle3);
    }

    nextTrinagleCutButton() {
        if (this.triangles.length === 0) {
            this.disable_iter_buttons();
            alert ("Can't go further")
            return
        }

        this.nextTrinagleCut();
    }

    async nextTrinagleCut() {
        if (this.triangles.length === 0) return;

        let x,y,length;
        if (document.getElementById('random').checked){
            let element = Math.floor(Math.random()*this.triangles.length);
            [x,y,length] = this.triangles[element];

            this.triangles.splice(element, 1);
        } else {
            [x,y,length] = this.triangles.shift();
        }
        
        let white_y = y + this.getTriangleHeight(length)/2;
        let white_x = x + length / 4;

        this.addSmallTriangles(x,y,length);
        this.drawTriangle([white_x, white_y, length/2], true, "white");



    }

    loopNextTriangleCut(iteration) {
        for (let i = 0; i < iteration; i++) {
            this.nextTrinagleCut();
        }
    }


    finishLoopButton() {
        if (this.btn_finish_loop.innerText === "Pause") {
            this.stopFinish = true;
            this.btn_finish_loop.innerText = "Finish"
        } else {
            this.stopFinish = false;
            this.btn_finish_loop.innerText = "Pause"
            this.finishLoop();
        }

    }

    finishLoop() {
        if (this.triangles.length === 0) {
            this.disable_iter_buttons();
            alert("Finished")
            return;
        };

        if (this.stopFinish) return;

        setTimeout(() => {
            this.loopNextTriangleCut(100);
            this.finishLoop();
        }, 0);
    }

    finishIterationGroup() {
        if (this.triangles.length === 0) {         
            this.disable_iter_buttons();
            alert ("Can't go further")
            return
        }
        
        let length = this.triangles[0][2];
        do{ 
            this.nextTrinagleCut();
        } while(this.triangles.length > 0 && this.triangles[0][2] === length);
    }


    disable_iter_buttons(disabled=true) {
        this.btn_next_iter.disabled = disabled;
        this.btn_finish_iteration_group.disabled = disabled;
        this.btn_finish_loop.disabled = disabled;
    }

    test(params) {
        console.log(params)
    }
}

