export function worstFitSteps(blocksInput, processes) {

const blocks = [...blocksInput];
const steps = [];

processes.forEach((process, pIndex) => {

let worstIndex = -1;

for (let i = 0; i < blocks.length; i++) {

if (blocks[i] >= process) {

if (worstIndex === -1 || blocks[i] > blocks[worstIndex]) {
worstIndex = i;
}

}

}

if (worstIndex !== -1) {

blocks[worstIndex] -= process;

steps.push({
type:"allocate",
process: process,
processIndex: pIndex,
block: worstIndex,
blocks:[...blocks],
text:`Allocate ${process} to Block ${worstIndex+1}`
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