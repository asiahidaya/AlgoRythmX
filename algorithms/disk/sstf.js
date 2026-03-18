export function sstfSteps(requests, head){

const steps = [];
let remaining = [...requests];
let current = head;
let total = 0;

while(remaining.length > 0){

let closestIndex = 0;
let minDist = Math.abs(remaining[0] - current);

for(let i = 1; i < remaining.length; i++){

const dist = Math.abs(remaining[i] - current);

if(dist < minDist){
minDist = dist;
closestIndex = i;
}

}

const next = remaining[closestIndex];

/* selection step */
steps.push({
type:"select",
current,
request:next,
remaining:[...remaining],
text:`SSTF chooses closest request to ${current} → ${next}`
});

/* movement step */
remaining.splice(closestIndex,1);

total += minDist;

steps.push({
type:"move",
from: current,
to: next,
movement:minDist,
total,
text:`Move head ${current} → ${next}
Seek distance = |${next} - ${current}| = ${minDist}
Total movement so far = ${total}`
});

current = next;

}

steps.push({
type:"complete",
total,
text:`All requests served using SSTF
Total head movement = ${total}`
});

return steps;

}