export function bubbleSortSteps(arr) {
    const steps = [];
    const a = [...arr];
    const n = a.length;

    for(let i=0;i<n-1;i++) {

        for(let j=0;j<n-i-1;j++) {

            steps.push({
                type:"compare",
                i:j,
                j:j+1,
                array:[...a],
                text:`Pass ${i+1}: Comparing ${a[j]} and ${a[j+1]}`
            });

            if(a[j] > a[j+1]) {

                const val1 = a[j];
                const val2 = a[j+1];

                [a[j],a[j+1]] = [a[j+1],a[j]];

                steps.push({
                    type:"swap",
                    i:j,
                    j:j+1,
                    array:[...a],
                    text:`Swapping ${val1} and ${val2} to move bigger element right`
                });
            }
        }

        // ✅ correct placement
        steps.push({
            type: "sorted",
            index: n - i - 1,
            array: [...a],
            text: `Element ${a[n - i - 1]} is in correct position`
        });
    }

    // ✅ mark first element
    steps.push({
        type: "sorted",
        index: 0,
        array: [...a],
        text: `Element ${a[0]} is in correct position`
    });

    // ✅ final step
    steps.push({
        type: "done",
        array: [...a],
        text: "All elements are sorted ✅"
    });

    return steps;
}