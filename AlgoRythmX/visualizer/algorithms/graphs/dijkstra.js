export function dijkstraSteps(graph, start){

const steps=[];
const dist={};
const visited={};

Object.keys(graph).forEach(n=>{
    dist[n]=Infinity;
    visited[n]=false;
});

dist[start]=0;

while(true){

let closest=null;
let min=Infinity;

for(const node in dist){
if(!visited[node] && dist[node] < min){
min=dist[node];
closest=node;
}
}

if(closest===null) break;

visited[closest]=true;

steps.push({
type:"visit",
node:closest,
text:"Visit "+closest,
distances:{...dist}
});

for(const edge of graph[closest]){

const neighbor=edge.node;
const newDist=dist[closest]+edge.weight;

steps.push({
type:"relax",
from:closest,
to:neighbor,
text:`Check ${closest} → ${neighbor}`
});

if(newDist < dist[neighbor]){

dist[neighbor]=newDist;

steps.push({
type:"update",
from:closest,
to:neighbor,
text:`Update distance of ${neighbor} = ${newDist}`,
distances:{...dist}
});

}
}

}

steps.push({
type:"final",
text:"Shortest paths computed",
distances:{...dist}
});

return steps;

}