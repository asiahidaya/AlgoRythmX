export function diskFCFSSteps(requests, head){

const steps = [];
let current = head;
let total = 0;

requests.forEach(req => {

const movement = Math.abs(req - current);
total += movement;

steps.push({
type:"move",
from: current,
to: req,
movement,
total,
text:`Move head ${current} → ${req}
Seek distance = |${req} - ${current}| = ${movement}
Total movement so far = ${total}`
});

current = req;

});

steps.push({
type:"complete",
total,
text:`All requests serviced.
Total head movement = ${total}`
});

return steps;

}