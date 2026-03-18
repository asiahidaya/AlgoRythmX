export function selectionSortSteps(arr) {
    const steps = [];
    const a = [...arr];
    const n = a.length;

    for (let i = 0; i < n; i++) {
        let minIndex = i;

        for (let j = i + 1; j < n; j++) {

            steps.push({
                type: "compare",
                outer: i,           // keep track of outer loop index
                i: minIndex,
                j: j,
                text: `Comparing current min index ${minIndex} with ${j}`
            });

            if (a[j] < a[minIndex]) {
                minIndex = j;
            }
        }

        if (minIndex !== i) {
            steps.push({
                type: "swap",
                outer: i,
                i: i,
                j: minIndex,
                text: `Swapping ${a[i]} and ${a[minIndex]}`
            });

            [a[i], a[minIndex]] = [a[minIndex], a[i]];
        }
    }

    return steps;
}
