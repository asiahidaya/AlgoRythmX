export function rrSteps(processes, quantum = 2) {
    const steps = [];
    // make working copy
    const queue = processes.map(p => ({ ...p, remaining: p.burst }));
    let time = 0;

    while (queue.length > 0) {
        const proc = queue.shift();
        const run = Math.min(proc.remaining, quantum);
        steps.push({
            type: "execute",
            process: proc.name,
            start: time,
            end: time + run,
            text: `Execute ${proc.name} for ${run} time units`
        });
        time += run;
        proc.remaining -= run;
        if (proc.remaining > 0) {
            queue.push(proc);
        }
    }

    return steps;
}