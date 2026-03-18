export function binarySearchSteps(arr, target) {

    const steps = [];
    let low = 0;
    let high = arr.length - 1;

    steps.push({
        type: "init",
        text: `Start: low = 0, high = ${high}`
    });

    while (low <= high) {

        let mid = Math.floor((low + high) / 2);

        // Step: calculate mid
        steps.push({
            type: "mid",
            low,
            high,
            mid,
            text: `mid = (${low} + ${high}) / 2 = ${mid}`
        });

        // Step: compare
        steps.push({
            type: "compare",
            low,
            high,
            mid,
            text: `Compare A[${mid}] = ${arr[mid]} with target ${target}`
        });

        if (arr[mid] === target) {
            steps.push({
                type: "found",
                mid,
                text: `Element found at index ${mid}`
            });
            return steps;
        }

        else if (target < arr[mid]) {
            steps.push({
                type: "left",
                low,
                high,
                mid,
                text: `Target < ${arr[mid]} → move left`
            });
            high = mid - 1;
        }

        else {
            steps.push({
                type: "right",
                low,
                high,
                mid,
                text: `Target > ${arr[mid]} → move right`
            });
            low = mid + 1;
        }
    }

    steps.push({
        type: "notfound",
        text: "Element not found"
    });

    return steps;
}