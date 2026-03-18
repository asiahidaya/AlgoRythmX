export function bubbleSortSteps(arr) {

    const steps = [];
    const a = [...arr];
    const n = a.length;

    for(let i=0;i<n;i++) {
        for(let j=0;j<n-i-1;j++) {

            steps.push({
                type:"compare",
                i:j,
                j:j+1,
                text:`Comparing index ${j} and ${j+1}`
            });

            if(a[j] > a[j+1]) {

                [a[j],a[j+1]] = [a[j+1],a[j]];

                steps.push({
                    type:"swap",
                    i:j,
                    j:j+1,
                    text:`Swapping ${a[j]} and ${a[j+1]}`
                });
            }
        }
    }

    return steps;
}
