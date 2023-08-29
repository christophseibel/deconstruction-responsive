class Collider {

    constructor(x, y, w, h) {
        let options = {
            friction: 5,
            isStatic: true
        }

        this.w = w;
        this.h = h;

        this.body = Bodies.rectangle(x, y, w, h, options);
        Composite.add(engine.world, this.body);
    }

    display() {
        var pos = this.body.position;

        canvas.push();
        canvas.translate(pos.x, pos.y);
        canvas.rectMode(CENTER);
        canvas.stroke(255, 0, 0);
        canvas.strokeWeight(5);
        canvas.fill(0);
        canvas.rect(0, 0, this.w, this.h);
        canvas.pop();
    }

}

class Rectangle {

    constructor(x, y, w, h, img) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.img = img;

        let options = {
            friction: 1.2,
        }

        this.body = Bodies.rectangle(this.x + this.w / 2, this.y + this.h / 2, this.w, this.h, options);
        Composite.add(engine.world, this.body);
    }

    display() {
        let pos = this.body.position;
        let angle = this.body.angle;
        canvas.push();
        canvas.rectMode(CENTER);
        canvas.imageMode(CENTER);
        canvas.translate(pos.x, pos.y);
        canvas.rotate(angle);
        canvas.image(this.img, 0, 0, this.w, this.h);
        canvas.pop();
    }

}