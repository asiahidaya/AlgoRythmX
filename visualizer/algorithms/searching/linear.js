export function linearSearchSteps(arr, target) {
    const steps = [];
    // make a copy so we don't mutate original
    const a = [...arr];

    for (let i = 0; i < a.length; i++) {
        steps.push({
            type: "compare",
            i,
            j: null,
            text: `Comparing value ${a[i]} with target ${target}`
        });
        if (a[i] === target) {
            steps.push({
                type: "found",
                i,
                text: `Target found at index ${i}`
            });
            return steps;
        }
    }

    steps.push({
        type: "notfound",
        text: `Target ${target} not present in array`
    });
    return steps;
}