export function mergeSortSteps(arr) {
    const steps = [];
    const a = [...arr];
    const callStack = [];

    function mergeSort(start, end, depth) {

        callStack.push({ name: 'mergeSort', start, end, depth });

        steps.push({
            type: 'callStack',
            stack: [...callStack],
            array: [...a], // 🔥 ADD
            text: `Call: mergeSort(${start}, ${end})`
        });

        if (start < end) {
            steps.push({
                type: "split",
                start,
                end,
                mid: Math.floor((start + end) / 2),
                array: [...a], // 🔥 FIX (full array)
                text: `Splitting ${start} → ${end}`
            });
        }

        if (start >= end) {

            callStack.pop();

            steps.push({
                type: 'callStack',
                stack: [...callStack],
                array: [...a], // 🔥 ADD
                text: `Return`
            });

            return;
        }

        const mid = Math.floor((start + end) / 2);

        mergeSort(start, mid, depth + 1);
        mergeSort(mid + 1, end, depth + 1);

        merge(start, mid, end);

        callStack.pop();

        steps.push({
            type: 'callStack',
            stack: [...callStack],
            array: [...a], // 🔥 ADD
            text: `Return from mergeSort(${start}, ${end})`
        });
    }

    function merge(start, mid, end) {

        let left = a.slice(start, mid + 1);
        let right = a.slice(mid + 1, end + 1);

        let i = 0, j = 0, k = start;

        while (i < left.length && j < right.length) {

            steps.push({
                type: "compare",
                i: start + i,
                j: mid + 1 + j,
                start,
                mid,
                end,
                array: [...a], // 🔥 ADD
                text: `Compare ${left[i]} & ${right[j]}`
            });

            if (left[i] <= right[j]) {

                a[k] = left[i];

                steps.push({
                    type: "overwrite",
                    i: k,
                    value: left[i],
                    start,
                    mid,
                    end,
                    array: [...a], // 🔥 FIX (after update)
                    text: `Place ${left[i]} at ${k}`
                });

                i++;
                k++;

            } else {

                a[k] = right[j];

                steps.push({
                    type: "overwrite",
                    i: k,
                    value: right[j],
                    start,
                    mid,
                    end,
                    array: [...a], // 🔥 FIX
                    text: `Place ${right[j]} at ${k}`
                });

                j++;
                k++;
            }
        }

        while (i < left.length) {

            a[k] = left[i];

            steps.push({
                type: "overwrite",
                i: k,
                value: left[i],
                start,
                mid,
                end,
                array: [...a], // 🔥 FIX
                text: `Place ${left[i]}`
            });

            i++;
            k++;
        }

        while (j < right.length) {

            a[k] = right[j];

            steps.push({
                type: "overwrite",
                i: k,
                value: right[j],
                start,
                mid,
                end,
                array: [...a], // 🔥 FIX
                text: `Place ${right[j]}`
            });

            j++;
            k++;
        }

        steps.push({
            type: "merge",
            start,
            end,
            array: [...a], // 🔥 FULL ARRAY
            text: `Merged section ${start}-${end}`
        });
    }

    mergeSort(0, a.length - 1, 0);

    steps.push({
        type: "final",
        array: [...a],
        text: "Final sorted array"
    });

    return steps;
}