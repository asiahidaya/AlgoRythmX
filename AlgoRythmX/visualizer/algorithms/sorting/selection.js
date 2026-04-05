export function selectionSortSteps(arr) {
    const steps = [];
    const a = [...arr];

    for (let i = 0; i < a.length; i++) {
        let min = i;

        for (let j = i + 1; j < a.length; j++) {

            steps.push({
                type:"compare",
                i:min,
                j:j,
                array:[...a],
                text:`Comparing`
            });

            if (a[j] < a[min]) {
                min = j;

                steps.push({
                    type:"newMin",
                    i:min,
                    array:[...a],
                    text:`New min`
                });
            }
        }

        if (min !== i) {
            [a[i],a[min]] = [a[min],a[i]];

            steps.push({
                type:"swap",
                i:i,
                j:min,
                array:[...a], // 🔥 FIX
                text:`Swapped`
            });
        }
    }

    return steps;
}