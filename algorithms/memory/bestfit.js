export function bestFitSteps(blocksInput, processes) {

const blocks = [...blocksInput];
const steps = [];

processes.forEach((process, pIndex) => {

let bestIndex = -1;

for (let i = 0; i < blocks.length; i++) {

if (blocks[i] >= process) {

if (bestIndex === -1 || blocks[i] < blocks[bestIndex]) {
bestIndex = i;
}

}

}

if (bestIndex !== -1) {

blocks[bestIndex] -= process;

steps.push({
type:"allocate",
process: process,
processIndex: pIndex,
block: bestIndex,
blocks:[...blocks],
text:`Allocate ${process} to Block ${bestIndex+1}`
});

} else {

steps.push({
type: "fail",
process: process,
blocks: [...blocks],
text: `Process ${process} cannot be allocated`
});

}

});

return steps;
}