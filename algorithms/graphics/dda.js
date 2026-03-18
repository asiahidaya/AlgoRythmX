export function ddaSteps(x1, y1, x2, y2) {

const steps = [];

let dx = x2 - x1;
let dy = y2 - y1;

const stepCount = Math.max(Math.abs(dx), Math.abs(dy));

const xInc = dx / stepCount;
const yInc = dy / stepCount;

// Explanation steps
steps.push({
type:"info",
text:`dx = ${x2} - ${x1} = ${dx}`
});

steps.push({
type:"info",
text:`dy = ${y2} - ${y1} = ${dy}`
});

steps.push({
type:"info",
text:`steps = max(|${dx}|, |${dy}|) = ${stepCount}`
});

steps.push({
type:"info",
text:`xInc = dx / steps = ${dx} / ${stepCount} = ${xInc.toFixed(2)}`
});

steps.push({
type:"info",
text:`yInc = dy / steps = ${dy} / ${stepCount} = ${yInc.toFixed(2)}`
});

let x = x1;
let y = y1;

steps.push({
type:"start",
x:x1,
y:y1,
text:`Start point (${x1}, ${y1})`
});

for(let i=0;i<=stepCount;i++){

const px = Math.round(x);
const py = Math.round(y);

const isEnd = (i === stepCount);

steps.push({
type: isEnd ? "end" : "plot",
x:px,
y:py,
text:`Plot pixel (${px}, ${py})`
});

x += xInc;
y += yInc;

}

steps.push({
type:"complete",
text:"Line drawing completed"
});

return steps;

}