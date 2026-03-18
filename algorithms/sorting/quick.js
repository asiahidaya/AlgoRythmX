export function quickSortSteps(arr) {
    const steps = [];
    const a = [...arr];
    const callStack = [];

    function quickSort(low, high, depth) {
        callStack.push({ name: 'quickSort', low, high, depth });

        steps.push({
            type: 'callStack',
            stack: [...callStack],
            text: `Call: quickSort(${low}, ${high})`
        });

        if (low < high) {
            let pi = partition(low, high);

            quickSort(low, pi - 1, depth + 1);
            quickSort(pi + 1, high, depth + 1);
        }

        callStack.pop();

        steps.push({
            type: 'callStack',
            stack: [...callStack],
            text: `Return from quickSort(${low}, ${high})`
        });
    }
function partition(low, high){

let pivot = a[high];
let i = low - 1;

steps.push({
type:"pivot",
pivot:high,
low,
high,
text:`Choosing pivot ${pivot}`
});

for(let j=low;j<high;j++){

steps.push({
type:"compare",
i,
j,
pivot:high,
low,
high,
text:`Comparing ${a[j]} with pivot ${pivot}`
});

if(a[j] < pivot){

steps.push({
type:"less",
j,
pivot:high,
low,
high,
text:`${a[j]} < pivot`
});

i++;

steps.push({
type:"swap",
i,
j,
pivot:high,
low,
high,
text:`Move ${a[j]} to left partition`
});

[a[i],a[j]]=[a[j],a[i]];

}
else{

steps.push({
type:"greater",
j,
pivot:high,
low,
high,
text:`${a[j]} ≥ pivot`
});

}

}

steps.push({
type:"pivotSwap",
i:i+1,
pivot:high,
low,
high,
text:`Place pivot ${pivot} at correct position`
});

[a[i+1],a[high]]=[a[high],a[i+1]];

steps.push({
type:"partition",
pivot:i+1,
low,
high,
text:`Partition complete`
});

return i+1;

}


    quickSort(0, a.length - 1, 0);
    // 🔥 FINAL STEP TO FORCE UI CORRECTNESS
steps.push({
    type: "final",
    array: [...a],
    text: `Final sorted array`
});


    return steps;
}