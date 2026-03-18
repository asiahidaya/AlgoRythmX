export function insertionSortSteps(arr) {
    const steps = [];
    const a = [...arr];

    for (let i = 1; i < a.length; i++) {
        let key = a[i];
        let j = i - 1;
        // key will be considered at position j+1 during comparisons

        while (j >= 0 && a[j] > key) {

            steps.push({
                type: "compare",
                outer: i,
                keyPos: j + 1,
                i: j,
                j: j + 1,
                text: `Comparing ${a[j]} and ${key}`
            });

            a[j + 1] = a[j];

            steps.push({
                type: "swap",
                outer: i,
                keyPos: j + 1,
                i: j,
                j: j + 1,
                text: `Shifting ${a[j]} to right`
            });

            j--;
        }

        // final placement of key at j+1
        a[j + 1] = key;
        steps.push({
            type: "overwrite",
            outer: i,
            keyPos: j + 1,
            i: j + 1,
            value: key,
            text: `Insert key ${key} at position ${j + 1}`
        });
    }

    return steps;
}
