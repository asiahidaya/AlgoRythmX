export function scanSteps(requests, head, diskSize = 200){

const steps = [];
const left = [];
const right = [];

requests.forEach(r => {

if(r < head) left.push(r);
else right.push(r);

});

left.sort((a,b)=>b-a);
right.sort((a,b)=>a-b);

let current = head;
let total = 0;

/* move right first */

right.forEach(req => {

const movement = Math.abs(req-current);
total += movement;

steps.push({
type:"move",
from:current,
to:req,
movement,
total,
text:`SCAN moves right
${current} → ${req}
Seek distance = |${req} - ${current}| = ${movement}
Total movement so far = ${total}`
});

current = req;

});

/* move to disk end */

if(current !== diskSize){

const movement = Math.abs(diskSize-current);
total += movement;

steps.push({
type:"end",
from:current,
to:diskSize,
movement,
total,
text:`No more requests on right
Move head to disk end ${diskSize}
Seek distance = ${movement}`
});

current = diskSize;

}

/* reverse direction */

left.forEach(req => {

const movement = Math.abs(req-current);
total += movement;

steps.push({
type:"move",
from:current,
to:req,
movement,
total,
text:`SCAN reverses direction
${current} → ${req}
Seek distance = |${req} - ${current}| = ${movement}
Total movement so far = ${total}`
});

current = req;

});

steps.push({
type:"complete",
total,
text:`All requests serviced using SCAN
Total head movement = ${total}`
});

return steps;

}