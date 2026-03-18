export function heapSortSteps(arr) {
    const steps = [];
    const a = [...arr];
    const n = a.length;

    function heapify(n, i) {
        let largest = i;
        let left = 2 * i + 1;
        let right = 2 * i + 2;

        // visualize current root and children being compared
        steps.push({
            type: "heapCompare",
            i,
            left,
            right,
            heapSize: n,
            text: `Heapify root index ${i}`
        });

        if (left < n && a[left] > a[largest]) {
            largest = left;
            steps.push({
                type: "heapSelect",
                largest,
                i,
                left,
                right,
                heapSize: n,
                text: `New largest is index ${largest}`
            });
        }

        if (right < n && a[right] > a[largest]) {
            largest = right;
            steps.push({
                type: "heapSelect",
                largest,
                i,
                left,
                right,
                heapSize: n,
                text: `New largest is index ${largest}`
            });
        }

        if (largest !== i) {

            steps.push({
                type: "swap",
                i: i,
                j: largest,
                heapSize: n,
                text: `Swapping ${a[i]} and ${a[largest]}`
            });

            [a[i], a[largest]] = [a[largest], a[i]];
            heapify(n, largest);
        }
    }

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--)
        heapify(n, i);

    for (let i = n - 1; i >= 0; i--) {

    if (i > 0) {
        [a[0], a[i]] = [a[i], a[0]];

        steps.push({
            type: "swap",
            i: 0,
            j: i,
            heapSize: i,
            text: `Moving max to end`
        });
    }
         steps.push({
        type: "extract",
        value: a[i],
        heapSize: i,
        text: `Extract max ${a[i]}`
    });

    heapify(i, 0);
}

    return steps;
}
