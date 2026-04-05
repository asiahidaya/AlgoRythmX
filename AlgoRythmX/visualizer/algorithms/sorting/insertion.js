export function insertionSortSteps(arr) {
    const steps = [];
    const a = [...arr];

    for (let i = 1; i < a.length; i++) {

        let key = a[i];
        let j = i - 1;

        while (j >= 0 && a[j] > key) {

            steps.push({
                type:"compare",
                i:j,
                keyPos:j+1,
                array:[...a],
                text:`Comparing`
            });

            a[j+1] = a[j];

            steps.push({
                type:"overwrite",
                i:j+1,
                value:a[j],
                array:[...a], // 🔥 FIX
                text:`Shifting`
            });

            j--;
        }

        a[j+1] = key;

        steps.push({
            type:"insert",
            i:j+1,
            value:key,
            array:[...a], // 🔥 FIX
            text:`Insert key`
        });
    }

    return steps;
}