export function bfsSteps(graph, start){

const visited = new Set();
const queue = [start];
const steps = [];

visited.add(start);

steps.push({
type:"init",
node:start,
queue:[...queue],
text:`Start BFS from ${start}`
});

while(queue.length > 0){

const node = queue.shift();

steps.push({
type:"visit",
node:node,
queue:[...queue],
text:`Visit node ${node}`
});

for(const neighbor of graph[node]){

if(!visited.has(neighbor)){

visited.add(neighbor);
queue.push(neighbor);

steps.push({
type:"enqueue",
from:node,   // ⭐ IMPORTANT
node:neighbor,
queue:[...queue],
text:`Discovered ${neighbor} from ${node} → add to queue`
});

}

}

}

return steps;

}