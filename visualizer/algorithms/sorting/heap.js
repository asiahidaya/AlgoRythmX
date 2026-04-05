export function heapSortSteps(arr) {
    const steps = [];
    const a = [...arr];
    const n = a.length;

    function heapify(size, i) {

        let largest = i;
        let left = 2 * i + 1;
        let right = 2 * i + 2;

        steps.push({
            type: "heapCompare",
            i,
            left,
            right,
            heapSize: size,
            array: [...a], // 🔥 ADD
            text: `Heapify at index ${i}`
        });

        if (left < size && a[left] > a[largest]) {
            largest = left;

            steps.push({
                type: "heapSelect",
                largest,
                i,
                left,
                right,
                heapSize: size,
                array: [...a], // 🔥 ADD
                text: `Left child is larger`
            });
        }

        if (right < size && a[right] > a[largest]) {
            largest = right;

            steps.push({
                type: "heapSelect",
                largest,
                i,
                left,
                right,
                heapSize: size,
                array: [...a], // 🔥 ADD
                text: `Right child is larger`
            });
        }

        if (largest !== i) {

            // 🔥 SWAP FIRST
            [a[i], a[largest]] = [a[largest], a[i]];

            // 🔥 THEN PUSH
            steps.push({
                type: "swap",
                i,
                j: largest,
                heapSize: size,
                array: [...a], // 🔥 FIX
                text: `Swapped ${a[largest]} and ${a[i]}`
            });

            heapify(size, largest);
        }
    }

    // 🔥 BUILD HEAP
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(n, i);
    }

    // 🔥 EXTRACT ELEMENTS
    for (let i = n - 1; i > 0; i--) {

        // 🔥 SWAP ROOT WITH LAST
        [a[0], a[i]] = [a[i], a[0]];

        steps.push({
            type: "swap",
            i: 0,
            j: i,
            heapSize: i,
            array: [...a], // 🔥 FIX
            text: `Move max to end`
        });

        steps.push({
            type: "extract",
            value: a[i],
            heapSize: i,
            array: [...a], // 🔥 FIX
            text: `Extract ${a[i]}`
        });

        heapify(i, 0);
    }

    // 🔥 FINAL STATE
    steps.push({
        type: "final",
        array: [...a],
        text: "Array sorted"
    });

    return steps;
}