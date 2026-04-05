export function bresenhamSteps(x1, y1, x2, y2){

    const steps = [];

    let dx = Math.abs(x2 - x1);
    let dy = Math.abs(y2 - y1);

    let sx = (x1 < x2) ? 1 : -1;
    let sy = (y1 < y2) ? 1 : -1;

    let x = x1;
    let y = y1;

    // 🔥 START
    steps.push({
        type: "start",
        x, y,
        text: `Start point (${x}, ${y})`
    });

    // 🔥 CASE 1: shallow slope
    if(dx > dy){

        let p = 2 * dy - dx;

        for(let i = 0; i < dx; i++){

            x += sx;

            if(p < 0){
                p += 2 * dy;
            } else {
                y += sy;
                p += 2 * (dy - dx);
            }

            const isEnd = (x === x2 && y === y2);

            steps.push({
                type: isEnd ? "end" : "plot",
                x, y,
                text: `Plot pixel (${x}, ${y})`
            });

            if(isEnd) break;
        }

    }
    // 🔥 CASE 2: steep slope
    else{

        let p = 2 * dx - dy;

        for(let i = 0; i < dy; i++){

            y += sy;

            if(p < 0){
                p += 2 * dx;
            } else {
                x += sx;
                p += 2 * (dx - dy);
            }

            const isEnd = (x === x2 && y === y2);

            steps.push({
                type: isEnd ? "end" : "plot",
                x, y,
                text: `Plot pixel (${x}, ${y})`
            });

            if(isEnd) break;
        }
    }

    // 🔥 COMPLETE
    steps.push({
        type: "complete",
        text: "Line drawing completed"
    });

    return steps;
}