export function sjfSteps(processes) {
    // assume processes is array of {name, burst}
    const steps = [];
    // copy to avoid mutating original
    const a = [...processes];
    // sort by burst (shortest job first)
    a.sort((p, q) => p.burst - q.burst);
    let time = 0;
    a.forEach(p => {
        steps.push({
            type: "execute",
            process: p.name,
            start: time,
            end: time + p.burst,
            text: `Execute ${p.name} for ${p.burst}`
        });
        time += p.burst;
    });
    return steps;
}