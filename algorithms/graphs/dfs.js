export function dfsSteps(graph,start){

const visited = new Set();
const stack = [start];
const steps = [];

steps.push({
type:"init",
node:start,
stack:[...stack],
text:`Start DFS from ${start}`
});

while(stack.length){

const node = stack.pop();

if(!visited.has(node)){

visited.add(node);

steps.push({
type:"visit",
node:node,
stack:[...stack],
text:`Visit node ${node}`
});

for(const neighbor of [...graph[node]].reverse()){

if(!visited.has(neighbor)){

stack.push(neighbor);

steps.push({
type:"push",
node:neighbor,
from:node,
stack:[...stack],
text:`Push ${neighbor} to stack`
});

}

}

}

}

return steps;

}