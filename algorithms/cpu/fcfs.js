export function fcfsSteps(processes) {
    let time = 0;

    return processes.map(p => {
        const step = {
            type: "execute",
            process: p.name,
            start: time,
            end: time + p.burst,
            text: `Execute ${p.name} for ${p.burst}`
        };

        time += p.burst;
        return step;
    });
}