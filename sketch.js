let increment = 0;

function setup() {
    createCanvas(700, 700);
}

function draw() {
    background(0);

    //GET SCREEN SIZE
    let w = width;
    let h = height;

    for (let layer = 1; layer <= 7; layer++) {
        //1 --> DRAW THE OUTER LAYER THAT "SPINS" SLOWLY
        //7 --> DRAW THE INNER LAYER THAT "SPINS" FASTLY

        //DRAW ONE OF THE LAYER
        drawRectTiles(w, h, (increment * layer) % (TWO_PI / 12));

        //EACH ITERATION DECREMENT 100 PX OF THE DIMENSIONS 
        w -= 100;
        h -= 100;
    }

    //INCREMENT ANGLE TO THE LAYERS ROTATION
    increment += 0.003;
}

function drawRectTiles(w, h, index) {

    // THIS ANGLES AIM TO EACH CORNER OF THE RECTANGLE
    // c -- d
    // |    |
    // b -- a

    let a = atan2(h, w);
    let b = -(a - PI / 2) + PI / 2;
    let c = a + PI;
    let d = 2 * PI - a;

    //ALL THE TRANSLATIONS AND ROTATIONS
    //BETWEEN PUSH() AND POP() WILL BE UNDONE 
    //AFTER THE BLOCK RESPECTIVE POP()
    push();
    //(0,0) IS NOW AT THE SCREEN CENTER 
    translate(width / 2, height / 2);

    //THE SECTION IS 1/20 OF THE CIRCUNFERENCE
    let section = (TWO_PI / 24);

    let count = 0;

    colorMode(RGB);

    //RUNS AROUND THE ELLIPSE
    for (var i = index; i < TWO_PI + index; i += 0.001) {
        let x1, y1;
        let x2, y2;

        //POSITIONS P1, P2, P3, P4
        // c --P4-- d
        // |        |
        // P3       P1
        // |        |
        // b --P2-- a

        //P1
        if (i > d || i <= a) {
            x1 = w / 2;
            y1 = tan(i) * w / 2;
        }
        //P2
        else if (i >= a && i < b) {
            x1 = (1 / tan(i)) * h / 2;
            y1 = h / 2;
        }
        //P3
        else if (i > b && i <= c) {
            x1 = -w / 2;
            y1 = -tan(i) * w / 2;
        }
        //P4
        else if (i >= c && i < d) {
            x1 = -(1 / tan(i)) * h / 2;
            y1 = -h / 2;
        }

        //P1
        if (i + section > d || i + section <= a) {
            x2 = w / 2;
            y2 = tan(i + section) * w / 2;
        }
        //P2
        else if (i + section >= a && i + section < b) {
            x2 = (1 / tan(i + section)) * h / 2;
            y2 = h / 2;
        }
        //P3
        else if (i + section > b && i + section <= c) {
            x2 = -w / 2;
            y2 = -tan(i + section) * w / 2;
        }
        //P4
        else if (i + section >= c && i + section < d) {
            x2 = -(1 / tan(i + section)) * h / 2;
            y2 = -h / 2;
        }

        //IF IT'S A SECTION POSITION
        if ((i - index) % section < 0.001) {

            //SHAPES WILL HAVE NO EDGES
            noStroke();

            //SET WHICH COLOR WILL HAVE THE FOLLOWING SHAPE
            if (count % 2 == 0) {
                fill(255, 127, 0);
            } else {
                fill(50, 50, 205);
            }

            //INCREMENT TO ALTERNATE BETWEEN THE COLORS
            count++;

            //BEGIN A SHAPE
            beginShape();

            //A VERTEX OF THE SHAPE
            vertex(x1, y1);

            //IF THE VERTEXES ARE NEAR A CORNER
            //THIS CORNER BECOMES A MIDDLE VERTEX
            if (i < a && i + section > a) {
                vertex(w / 2, h / 2);
            }
            else if (i < b && i + section > b) {
                vertex(-w / 2, h / 2);
            }
            else if (i < c && i + section > c) {
                vertex(-w / 2, -h / 2);
            }
            else if (i < d && i + section > d) {
                vertex(w / 2, -h / 2);
            }

            //ANOTHER VERTEX OF THE SHAPE
            vertex(x2, y2);

            //CENTER OF THE SCREEN
            vertex(0, 0);

            //END THE SHAPE
            endShape(CLOSE);
        }

    }

    pop();

}

//THIS FUNCTION IS NOT USED IN THIS PROJECT
//BUT IT'S ROLE IS 
//DRAWING A RECTANGLE RUNS AT THE ANGLES OF AN ELLIPSE
function drawRect(cx, cy, w, h) {

    // THIS ANGLES AIM TO EACH CORNER OF THE RECTANGLE
    // c -- d
    // |    |
    // b -- a

    let a = atan2(h, w);
    let b = -(a - PI / 2) + PI / 2;
    let c = a + PI;
    let d = 2 * PI - a;

    //ALL THE TRANSLATIONS AND ROTATIONS
    //BETWEEN PUSH() AND POP() WILL BE UNDONE 
    //AFTER THE BLOCK RESPECTIVE POP()
    push()
    
    //(0,0) IS NOW AT THE CENTER OF THE RECTANGLE
    translate(cx, cy);
    //BEGIN A SHAPE
    beginShape();
    //RUNS AROUND THE ELLIPSE (FROM 0 TO TWO PI)
    for (let i = 0; i < TWO_PI; i += 0.001) {
        let x, y;

        //POSITIONS P1, P2, P3, P4
        // c --P4-- d
        // |        |
        // P3       P1
        // |        |
        // b --P2-- a

        //P1
        if (i > d || i <= a) {
            x = w / 2;
            y = tan(i) * w / 2;
        }
        //P2
        else if (i >= a && i < b) {
            x = (1 / tan(i)) * h / 2;
            y = h / 2;
        }
        //P3
        else if (i > b && i <= c) {
            x = -w / 2;
            y = -tan(i) * w / 2;
        }
        //P4
        else if (i >= c && i < d) {
            x = -(1 / tan(i)) * h / 2;
            y = -h / 2;
        }

        //ADD THE VERTEX
        vertex(x, y);
    }
    //END THE SHAPE
    endShape(CLOSE);

    pop();
}