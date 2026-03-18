export function lruSteps(pages, frameCount) {

    const steps = [];
    const frames = [];
    const lastUsed = new Map();

    for (let i = 0; i < pages.length; i++) {

        const page = pages[i];

        // PAGE HIT
        if (frames.includes(page)) {

            steps.push({
                type: "hit",
                page: page,
                frames: [...frames],
                text: `Page ${page} is already in frame → HIT`
            });

            lastUsed.set(page, i);
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

            // FIND LRU PAGE
            let lruPage = frames[0];
            let minIndex = lastUsed.get(lruPage);

            for (let p of frames) {
                if (lastUsed.get(p) < minIndex) {
                    minIndex = lastUsed.get(p);
                    lruPage = p;
                }
            }

            const idx = frames.indexOf(lruPage);
            frames[idx] = page;

            steps.push({
                type: "replace",
                removed: lruPage,
                page: page,
                frames: [...frames],
                text: `Replace least recently used page ${lruPage} with ${page}`
            });
        }

        lastUsed.set(page, i);
    }

    return steps;
}