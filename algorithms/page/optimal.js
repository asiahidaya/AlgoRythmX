export function optimalSteps(pages, frameCount) {

    const steps = [];
    const frames = [];

    for (let i = 0; i < pages.length; i++) {

        const page = pages[i];

        // PAGE HIT
        if (frames.includes(page)) {

            steps.push({
                type: "hit",
                page: page,
                frames: [...frames],
                text: `Page ${page} already exists in frame → HIT`
            });

            continue;
        }

        // PAGE FAULT
        if (frames.length < frameCount) {

            frames.push(page);

            steps.push({
                type: "fault",
                page: page,
                frames: [...frames],
                text: `Page ${page} loaded into frame → PAGE FAULT`
            });

        } else {

            // FIND PAGE USED FARTHEST IN FUTURE
            let farthestIndex = -1;
            let pageToReplace = frames[0];

            for (let f of frames) {

                let futureIndex = pages.slice(i + 1).indexOf(f);

                if (futureIndex === -1) {
                    pageToReplace = f;
                    break;
                }

                if (futureIndex > farthestIndex) {
                    farthestIndex = futureIndex;
                    pageToReplace = f;
                }
            }

            const idx = frames.indexOf(pageToReplace);
            frames[idx] = page;

            steps.push({
                type: "replace",
                removed: pageToReplace,
                page: page,
                frames: [...frames],
                text: `Replace page ${pageToReplace} with ${page} (used farthest in future)`
            });
        }
    }

    return steps;
}