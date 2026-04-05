export function fifoSteps(pages, framesCount) {

    const frames = [];
    const steps = [];
    let faults = 0;

    pages.forEach((page, index) => {

        if (frames.includes(page)) {

            steps.push({
                type: "hit",
                page,
                frames: [...frames],
                index,
                faults,
                text: `✔ Page ${page} → HIT`
            });

        } else {

            faults++;

            if (frames.length < framesCount) {

                frames.push(page);

                steps.push({
                    type: "fault",
                    page,
                    frames: [...frames],
                    index,
                    faults,
                    text: `❌ Page ${page} → FAULT`
                });

            } else {

                const removed = frames.shift();
                frames.push(page);

                steps.push({
                    type: "replace",
                    page,
                    removed,
                    frames: [...frames],
                    index,
                    faults,
                    text: `❌ Page ${page} → REPLACE ${removed}`
                });

            }
        }

    });

    return steps;
}