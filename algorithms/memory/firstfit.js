export function firstFitSteps(blocks, processes) {

const steps = [];
const memory = [...blocks];

processes.forEach((process, pIndex) => {

let allocated = false;

for(let i = 0; i < memory.length; i++){

steps.push({
type: "check",
process,
blockIndex: i,
blocks: [...memory],
text: `Checking block ${memory[i]} for process ${process}`
});

if(memory[i] >= process){

memory[i] -= process;
allocated = true;

steps.push({
type:"allocate",
process: process,
processIndex: pIndex,
block: i,
blocks:[...memory],
text:`Allocate ${process} to Block ${i+1}`
});

break;
}

}

if(!allocated){

steps.push({
type: "fail",
process,
blocks: [...memory],
text: `Process ${process} cannot be allocated`
});

}

});

return steps;
}