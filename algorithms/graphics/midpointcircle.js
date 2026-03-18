export function midpointCircleSteps(xc, yc, r){

const steps = [];

let x = 0;
let y = r;

let p = 1 - r;

steps.push({
type:"calc",
text:`Initial decision parameter p = 1 - r = ${p}`
});

function plotCirclePoints(xc,yc,x,y){

const points = [
[xc+x,yc+y],
[xc-x,yc+y],
[xc+x,yc-y],
[xc-x,yc-y],
[xc+y,yc+x],
[xc-y,yc+x],
[xc+y,yc-x],
[xc-y,yc-x]
];

const plotted = new Set();

for(const [px,py] of points){

if(px < -10 || px > 10 || py < -10 || py > 10) continue;

const key = `${px},${py}`;
if(plotted.has(key)) continue;

plotted.add(key);

steps.push({
type:"plot",
x:px,
y:py,
text:`Plot pixel (${px}, ${py})`
});

}

}

// first symmetric points
plotCirclePoints(xc,yc,x,y);

while(x < y){

x++;

if(p < 0){

steps.push({
type:"decision",
text:`p < 0 → choose East pixel`
});

p = p + 2*x + 1;

steps.push({
type:"calc",
text:`p = previous p + 2(${x}) + 1 = ${p}`
});

}
else{

y--;

steps.push({
type:"decision",
text:`p ≥ 0 → choose South-East pixel`
});

p = p + 2*(x - y) + 1;

steps.push({
type:"calc",
text:`p = previous p + 2(${x}-${y}) + 1 = ${p}`
});

}

plotCirclePoints(xc,yc,x,y);

}

steps.push({
type:"end",
text:"Circle drawing completed"
});

return steps;

}