export function mergeSortSteps(arr) {
    const steps = [];
    const a = [...arr];
    const callStack = [];

    function mergeSort(start, end, depth) {

        // ✅ PUSH CALL STACK FIRST (FIXED ORDER)
        callStack.push({ name: 'mergeSort', start, end, depth });

        steps.push({
            type: 'callStack',
            stack: [...callStack],
            text: `Call: mergeSort(${start}, ${end})`
        });

        // ✅ SPLIT AFTER CALL STACK
        if (start < end) {
            steps.push({
                type: "split",
                array: [...a.slice(start, end + 1)], // ✅ safe copy
                start,
                end,
                mid: Math.floor((start + end) / 2),
                text: `Splitting array from ${start} to ${end}`
            });
        }

        // BASE CASE
        if (start >= end) {
            callStack.pop();

            steps.push({
                type: 'callStack',
                stack: [...callStack],
                text: `Return from mergeSort(${start}, ${end})`
            });

            return;
        }

        const mid = Math.floor((start + end) / 2);

        // RECURSION
        mergeSort(start, mid, depth + 1);
        mergeSort(mid + 1, end, depth + 1);

        // MERGE STEP
        merge(start, mid, end);

        // RETURN STACK
        callStack.pop();

        steps.push({
            type: 'callStack',
            stack: [...callStack],
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
                text: `Comparing ${left[i]} and ${right[j]}`
            });

            if (left[i] <= right[j]) {

                steps.push({
                    type: "overwrite",
                    i: k,
                    value: left[i],
                    start,
                    mid,
                    end,
                    k,
                    text: `Place ${left[i]} at position ${k}`
                });

                a[k++] = left[i++];

            } else {

                steps.push({
                    type: "overwrite",
                    i: k,
                    value: right[j],
                    start,
                    mid,
                    end,
                    k,
                    text: `Place ${right[j]} at position ${k}`
                });

                a[k++] = right[j++];
            }
        }

        // LEFT REMAINING
        while (i < left.length) {
            steps.push({
                type: "overwrite",
                i: k,
                value: left[i],
                start,
                mid,
                end,
                k,
                text: `Place ${left[i]} at position ${k}`
            });

            a[k++] = left[i++];
        }

        // RIGHT REMAINING
        while (j < right.length) {
            steps.push({
                type: "overwrite",
                i: k,
                value: right[j],
                start,
                mid,
                end,
                k,
                text: `Place ${right[j]} at position ${k}`
            });

            a[k++] = right[j++];
        }

        // ✅ FINAL MERGE STEP (VERY IMPORTANT)
        steps.push({
            type: "merge",
            array: [...a.slice(start, end + 1)], // ✅ safe snapshot
            start,
            end,
            text: `Merged [${a.slice(start, end + 1)}]`
        });
    }

    mergeSort(0, a.length - 1, 0);

    return steps;
}