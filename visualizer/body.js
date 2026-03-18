import { bubbleSortSteps } from "./algorithms/sorting/bubble.js";
import { selectionSortSteps } from "./algorithms/sorting/selection.js";
import { insertionSortSteps } from "./algorithms/sorting/insertion.js";
import { mergeSortSteps } from "./algorithms/sorting/merge.js";
import { quickSortSteps } from "./algorithms/sorting/quick.js";
import { heapSortSteps } from "./algorithms/sorting/heap.js";
import { linearSearchSteps } from "./algorithms/searching/linear.js";
import { binarySearchSteps } from "./algorithms/searching/binary.js";
import { fcfsSteps } from "./algorithms/cpu/fcfs.js";
import { sjfSteps } from "./algorithms/cpu/sjf.js";
import { rrSteps } from "./algorithms/cpu/rr.js";
import { fifoSteps } from "./algorithms/page/fifo.js";
import { lruSteps } from "./algorithms/page/lru.js";
import { optimalSteps } from "./algorithms/page/optimal.js";
import { bfsSteps } from "./algorithms/graphs/bfs.js";
import { dfsSteps } from "./algorithms/graphs/dfs.js";
import { dijkstraSteps } from "./algorithms/graphs/dijkstra.js";
import { firstFitSteps } from "./algorithms/memory/firstfit.js";
import { bestFitSteps } from "./algorithms/memory/bestfit.js";
import { worstFitSteps } from "./algorithms/memory/worstfit.js";
import { diskFCFSSteps } from "./algorithms/disk/diskfcfs.js";
import { sstfSteps } from "./algorithms/disk/sstf.js";
import { scanSteps } from "./algorithms/disk/scan.js";
import { ddaSteps } from "./algorithms/graphics/dda.js";
import { bresenhamSteps } from "./algorithms/graphics/bresenham.js";
import { midpointCircleSteps } from "./algorithms/graphics/midpointcircle.js";

const visualizer = document.getElementById("visualizer");
const stepsPanel = document.getElementById("steps");
const complexityPanel = document.getElementById("complexity");
const explanationPanel = document.getElementById("algoDescription");

// predefined graph for BFS/DFS
const graph = {
A:["B","C"],
B:["D","E"],
C:["F"],
D:[],
E:["F"],
F:[]
};

// weighted graph for Dijkstra's
const weightedGraph = {

A:[
{node:"B",weight:4},
{node:"C",weight:2}
],

B:[
{node:"D",weight:5},
{node:"E",weight:10}
],

C:[
{node:"F",weight:3}
],

D:[],

E:[
{node:"F",weight:4}
],

F:[]
};

// shared info data for algorithms (names, complexity, descriptions)
const info = {
    bubble: {
        name: "Bubble Sort",
        complexity: "O(n²)",
        description: "Repeatedly compares adjacent elements and swaps them if needed."
    },
    selection: {
        name: "Selection Sort",
        complexity: "O(n²)",
        description: "Selects the minimum element and places it at correct position."
    },
    insertion: {
        name: "Insertion Sort",
        complexity: "O(n²)",
        description: "Inserts each element into its correct position in sorted part."
    },
    merge: {
        name: "Merge Sort",
        complexity: "O(n log n)",
        description: "Divides array into halves, sorts and merges them."
    },
    quick: {
        name: "Quick Sort",
        complexity: "O(n log n)",
        description: "Chooses a pivot and partitions array around it."
    },
    heap: {
        name: "Heap Sort",
        complexity: "O(n log n)",
        description: "Builds a heap and repeatedly extracts maximum."
    },
    linear: {
        name: "Linear Search",
        complexity: "O(n)",
        description: "Checks each element one by one until the target is found."
    },
    binary: {
        name: "Binary Search",
        complexity: "O(log n)",
        description: "Divides the sorted array into halves to find the target efficiently."
    },
    fcfs: {
    name: "First Come First Serve",
    complexity: "O(n)",
    description: "Processes are executed in arrival order."
    },
sjf: {
    name: "Shortest Job First",
    complexity: "O(n log n)",
    description: "Process with smallest burst time executes first."
},
rr: {
    name: "Round Robin",
    complexity: "O(n)",
    description: "Each process gets fixed time quantum."
},
fifo: {
    name: "FIFO Page Replacement",
    complexity: "O(n)",
    description: "Replaces the oldest page in memory."
},
lru: {
    name: "LRU Page Replacement",
    complexity: "O(n)",
    description: "Replaces the least recently used page."
},
optimal: {
    name: "Optimal Page Replacement",
    complexity: "O(n²)",
    description: "Replaces the page used farthest in future."
},
bfs:{
    name:"Breadth First Search",
    complexity:"O(V + E)",
    description:"Visits nodes level by level using a queue."
},
dfs:{
name:"Depth First Search",
complexity:"O(V + E)",
description:"Explores nodes deeply before visiting siblings using recursion or stack."
},
dijkstra:{
name:"Dijkstra's Algorithm",
complexity:"O(V²)",
description:"Finds shortest paths from a source node to all other nodes in a weighted graph."
},
firstfit:{
    name:"First Fit Allocation",
    complexity:"O(n)",
    description:"Allocates each process to the first available memory block."
},
bestfit:{
    name:"Best Fit Allocation",
    complexity:"O(n)",
    description:"Allocates each process to the smallest available memory block."
},
worstfit:{
    name:"Worst Fit Allocation",
    complexity:"O(n)",
    description:"Allocates each process to the largest available memory block."
},
diskfcfs:{
name:"Disk FCFS",
complexity:"O(n)",
description:"Serves disk requests in arrival order."
},

sstf:{
name:"SSTF",
complexity:"O(n²)",
description:"Selects request with minimum seek distance."
},

scan:{
name:"SCAN (Elevator)",
complexity:"O(n log n)",
description:"Head moves in one direction servicing requests then reverses."
},
dda:{
name:"DDA Line Drawing",
complexity:"O(n)",
description:"Draws a line by incrementally plotting pixels using floating point increments."
},
bresenham:{
name:"Bresenham's Line Drawing",
complexity:"O(n)",
description:"Draws a line using integer arithmetic and decision parameters."
},
circle:{
name:"Midpoint Circle",
complexity:"O(r)",
description:"Draws a circle using midpoint decision parameter and 8-way symmetry."
}
}

// manual step controls
const algoSelect = document.getElementById("algorithmSelect");
const manualCheckbox = document.getElementById("manualCheckbox");
const nextStepBtn = document.getElementById("nextStepBtn");
let manualMode = false;
manualCheckbox.addEventListener("change", () => {
    manualMode = manualCheckbox.checked;
    nextStepBtn.disabled = !manualMode;
});
const params = new URLSearchParams(window.location.search);
const selectedAlgo = params.get("algo");

if (selectedAlgo) {
     algoSelect.value = selectedAlgo;
}
// handle UI changes
const targetInputEl = document.getElementById("targetInput");

const processColors = [
   "#00ffd5",
 "#ff9800",
 "#e91e63",
 "#8b5cf6",
 "#22c55e",
 "#3b82f6",
 "#f59e0b",
 "#ec4899"
];

function getAlgoFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("algo") || "bubble"; // default
}

// Build the left‑side list of all algorithms with their short descriptions
function populateAlgoList() {
    const list = document.getElementById('algoList');
    if (!list) return;
    list.innerHTML = '';
    Object.entries(info).forEach(([key, data]) => {
        const li = document.createElement('li');
        li.textContent = `${data.name} – ${data.description}`;
        li.addEventListener('click', () => {
            algoSelect.value = key;
            // mimic change handler behaviour
            algoSelect.dispatchEvent(new Event('change'));
            // update top info panels
            document.getElementById('algoTitle').textContent = data.name;
            explanationPanel.textContent = data.description;
            complexityPanel.textContent = data.complexity;
        });
        list.appendChild(li);
    });
}

// 🔥 AUTO LOAD ALGORITHM FROM HOMEPAGE
window.addEventListener("DOMContentLoaded", () => {
    const algoFromURL = getAlgoFromURL();
    const arrayInput = document.getElementById("arrayInput");

const x1 = document.getElementById("x1");
const y1 = document.getElementById("y1");
const x2 = document.getElementById("x2");
const y2 = document.getElementById("y2");

if(algoFromURL === "dda" || algoFromURL === "bresenham"){

arrayInput.style.display = "none";

x1.style.display = "inline-block";
y1.style.display = "inline-block";
x2.style.display = "inline-block";
y2.style.display = "inline-block";

}

else if(algoFromURL === "circle"){

arrayInput.style.display = "none";

x1.style.display = "inline-block";
y1.style.display = "inline-block";
x2.style.display = "inline-block";
y2.style.display = "none";   // hide extra input

x1.placeholder = "Center X";
y1.placeholder = "Center Y";
x2.placeholder = "Radius";

}

else{

arrayInput.style.display = "inline-block";

x1.style.display = "none";
y1.style.display = "none";
x2.style.display = "none";
y2.style.display = "none";

}
    const bfsQueuePanel = document.getElementById("bfsQueuePanel");
    const dfsStackPanel = document.getElementById("dfsStackPanel");
    const blockInput = document.getElementById("blockInput");
const processInput = document.getElementById("processInput");
const headInput = document.getElementById("headInput");

if(["diskfcfs","sstf","scan"].includes(algoFromURL)){
    headInput.style.display = "inline-block";
}else{
    headInput.style.display = "none";
}

if(["firstfit","bestfit","worstfit"].includes(algoFromURL)){

    blockInput.style.display="inline-block";
    processInput.style.display="inline-block";
    arrayInput.style.display="none";

}

if(algoFromURL === "dfs"){
    dfsStackPanel.style.display = "block";
}else{
    dfsStackPanel.style.display = "none";
}

if(algoFromURL === "bfs"){
    bfsQueuePanel.style.display = "block";
}else{
    bfsQueuePanel.style.display = "none";
}
    

    // populate the sidebar list of algorithms
    populateAlgoList();

    if (algoFromURL) {
        if (["bfs","dfs","dijkstra"].includes(algoFromURL)) {
    document.getElementById("arrayInput").style.display = "none";
}
        const dropdown = document.getElementById("algorithmSelect");
        dropdown.value = algoFromURL;

        // update algorithm panel
        renderAlgorithm(algoFromURL);

        // also update top info fields
        if (info[algoFromURL]) {
            document.getElementById('algoTitle').textContent = info[algoFromURL].name;
            explanationPanel.textContent = info[algoFromURL].description;
            complexityPanel.textContent = info[algoFromURL].complexity;
            updateDetail(algoFromURL);
        }

        // 🚀 OPTIONAL AUTO START
        if (document.getElementById("arrayInput").value.trim() !== "") {
            setTimeout(() => start(), 300);
        }
        if(algoFromURL === "circle"){

x1.placeholder = "Center X";
y1.placeholder = "Center Y";
x2.placeholder = "Radius";

}
    }
});

algoSelect.addEventListener("change", (e) => {
    const val = e.target.value;
    const arrayInput = document.getElementById("arrayInput");
    const blockInput = document.getElementById("blockInput");
const processInput = document.getElementById("processInput");
const x1 = document.getElementById("x1");
const y1 = document.getElementById("y1");
const x2 = document.getElementById("x2");
const y2 = document.getElementById("y2");

if(val === "dda" || val === "bresenham"){

arrayInput.style.display = "none";

x1.style.display = "inline-block";
y1.style.display = "inline-block";
x2.style.display = "inline-block";
y2.style.display = "inline-block";

}

else if(val === "circle"){

arrayInput.style.display = "none";

x1.style.display = "inline-block";
y1.style.display = "inline-block";
x2.style.display = "inline-block";

y2.style.display = "none";   // hide extra input

x1.placeholder = "Center X";
y1.placeholder = "Center Y";
x2.placeholder = "Radius";

}

else{

arrayInput.style.display = "inline-block";

x1.style.display = "none";
y1.style.display = "none";
x2.style.display = "none";
y2.style.display = "none";

}

if(["firstfit","bestfit","worstfit"].includes(val)){
blockInput.style.display="inline-block";
processInput.style.display="inline-block";
arrayInput.style.display="none";
}else{
blockInput.style.display="none";
processInput.style.display="none";
}
     if(["bfs","dfs","dijkstra"].includes(val)){
        arrayInput.style.display = "none";
    } else {
        arrayInput.style.display = "inline-block";
    }

    if (["linear", "binary"].includes(val)) {
        targetInputEl.style.display = "inline-block";
    } else {
        targetInputEl.style.display = "none";
    }

     const quantumInput = document.getElementById("quantumInput");

    if (val === "rr") {
        quantumInput.style.display = "inline-block";
    } else {
        quantumInput.style.display = "none";
    }

    const frameInput = document.getElementById("frameInput");
    const bfsQueuePanel = document.getElementById("bfsQueuePanel");

if(val === "bfs"){
    bfsQueuePanel.style.display = "block";
}else{
    bfsQueuePanel.style.display = "none";
}

if (["fifo","lru","optimal"].includes(val)) {
    frameInput.style.display = "inline-block";
} else {
    frameInput.style.display = "none";
}
const queuePanel = document.querySelector(".queue-panel");

if (["fcfs","sjf","rr"].includes(val)) {
    queuePanel.style.display = "block";
} else {
    queuePanel.style.display = "none";

}

    // update algorithm panel as soon as the user picks a new algo
    renderAlgorithm(val);

    // reflect selection in URL for bookmarking/reload
    history.replaceState(null, "", window.location.pathname + "?algo=" + val);
});

// start with target hidden
if (!["linear", "binary"].includes(algoSelect.value)) {
    targetInputEl.style.display = "none";
}

// removed tree-related globals

document.getElementById("startBtn").onclick = () => start();

const algoMap = {
    bubble: [
        "1. for i = 0 to n-1",
        "2.   for j = 0 to n-i-1",
        "3.     if A[j] > A[j+1]",
        "4.         swap A[j], A[j+1]"
    ],
    selection: [
        "1. for i = 0 to n-1",
        "2.   min = i",
        "3.   for j = i+1 to n",
        "4.       if A[j] < A[min]",
        "5.           min = j",
        "6.   swap A[i], A[min]"
    ],
    insertion: [
        "1. for i = 1 to n",
        "2.   key = A[i]",
        "3.   j = i-1",
        "4.   while j >= 0 and A[j] > key",
        "5.       A[j+1] = A[j]",
        "6.   A[j+1] = key"
    ],
    merge: [
        "1. Divide array into halves",
        "2. Recursively sort left",
        "3. Recursively sort right",
        "4. Merge sorted halves"
    ],
    quick: [
        "1. Choose pivot",
        "2. Partition array",
        "3. Recursively sort left",
        "4. Recursively sort right"
    ],
    heap: [
        "1. Build max heap",
        "2. Swap root with last",
        "3. Reduce heap size",
        "4. Heapify root"
    ],
     linear: [
        "1. Start",
        "2. Read array A and key",
        "3. for i = 0 to n-1",
        "4. if A[i] == key",
        "5. return i",
        "6. return -1",
        "7. Stop"
    ],

    binary: [
        "1. Start",
        "2. low = 0, high = n-1",
        "3. while low <= high",
        "4. mid = (low + high) / 2",
        "5. if A[mid] == key",
        "6. else if key < A[mid] → high = mid - 1",
        "7. else → low = mid + 1",
        "8. return -1",
        "9. Stop"
    ],
    fcfs: [
        "1. Enqueue processes in arrival order",
        "2. Execute each process to completion",
        "3. Record start and end times in Gantt chart"
    ],
    sjf: [
        "1. Sort processes by burst time",
        "2. Execute each shortest job first",
        "3. Add executions to Gantt chart"
    ],
    rr: [
        "1. Set time quantum",
        "2. Cycle through processes",
        "3. Execute for quantum or remaining time",
        "4. Continue until all done"
    ],
     fifo: [
    "1. Create empty frame list",
    "2. For each page:",
    "3.   If page not in frame → page fault",
    "4.   If frame full → remove oldest page",
    "5.   Insert new page"
],

lru: [
    "1. Create empty frame list",
    "2. For each page:",
    "3.   If page not in frame → page fault",
    "4.   If frame full → remove least recently used",
    "5.   Insert new page"
],

optimal: [
    "1. Create empty frame list",
    "2. For each page:",
    "3.   If page not in frame → page fault",
    "4.   If frame full → remove farthest future use",
    "5.   Insert new page"
],

bfs:[
"1. Start from source node",
"2. Mark node as visited",
"3. Add node to queue",
"4. Remove node from queue",
"5. Visit all unvisited neighbors",
"6. Repeat until queue empty"
],

dfs:[
"1. Start from source node",
"2. Mark node as visited",
"3. Visit first unvisited neighbor",
"4. Recursively apply DFS",
"5. Backtrack when no neighbors",
"6. Repeat until all nodes visited"
],

dijkstra:[
"1. Initialize distances to infinity",
"2. Set source distance = 0",
"3. Select closest unvisited node",
"4. Relax all outgoing edges",
"5. Update neighbor distances",
"6. Repeat until all nodes visited"
],

firstfit:[
"1. Start with list of memory blocks and processes",
"2. For each process:",
"3.   Find first memory block that is large enough",
"4.   If no block found → allocation failed",
"5.   Allocate block to process",
"6. Repeat until all processes allocated"
],

bestfit:[
"1. Read memory blocks",
"2. Read processes",
"3. Find smallest block that fits",
"4. Allocate process",
"5. Update block size"
],

worstfit:[
"1. Read memory blocks",
"2. Read processes",
"3. Find largest block available",
"4. Allocate process",
"5. Update block size"
],

diskfcfs:[
"1. Start at current disk head",
"2. Take requests in arrival order",
"3. Move head to next request",
"4. Calculate seek distance",
"5. Repeat until all requests served"
],

sstf:[
"1. Start at current disk head",
"2. Find request closest to head",
"3. Move head to that request",
"4. Remove request from queue",
"5. Repeat until all requests served"
],

scan:[
"1. Sort disk requests",
"2. Move head in one direction",
"3. Service all requests along path",
"4. Reach disk end",
"5. Reverse direction and continue"
],
dda:[
"1. Read (x1,y1) and (x2,y2)",
"2. dx = x2 - x1",
"3. dy = y2 - y1",
"4. steps = max(|dx|,|dy|)",
"5. xInc = dx / steps",
"6. yInc = dy / steps",
"7. Plot pixels from start to end"
],
bresenham:[
"1. Read (x1,y1) and (x2,y2)",
"2. dx = x2 - x1",
"3. dy = y2 - y1",
"4. p = 2*dy - dx",
"5. Plot initial point",
"6. While x < x2:",
"7.   If p < 0:",
"8.     p = p + 2*dy",
"9.     x = x + 1",
"10.   Else:",
"11.     p = p + 2*dy - 2*dx",
"12.     x = x + 1",
"13.     y = y + 1",
"14.   Plot pixel"
],
circle:[
"1. Input center (xc,yc) and radius r",
"2. Set x = 0, y = r",
"3. p = 1 - r",
"4. Plot 8 symmetric points",
"5. While x < y",
"6. If p < 0 → p = p + 2x + 1",
"7. Else → y-- , p = p + 2(x - y) + 1",
"8. Plot symmetric points"
],
};
async function start() {

    // sanitize input; ignore empty segments so trailing commas don't break it

    const target = Number(document.getElementById("targetInput").value);
    const algo = document.getElementById("algorithmSelect").value;
    let arr = [];

if(algo !== "dda" && algo !== "bresenham" && algo !== "circle"){

const arrRaw = document.getElementById("arrayInput").value
.split(",")
.map(s => s.trim())
.filter(s => s !== "");

arr = arrRaw.map(Number);

}

    const bfsQueuePanel = document.getElementById("bfsQueuePanel");
    const dfsStackPanel = document.getElementById("dfsStackPanel");

    const blockInput = document.getElementById("blockInput");
    const processInput = document.getElementById("processInput");

    const head = Number(document.getElementById("headInput").value);

    let blocks = [];
    let processes = [];

    /* ================= MEMORY INPUT ================= */

   if(["firstfit","bestfit","worstfit"].includes(algo)){

    blocks = blockInput.value
        .split(",")
        .map(x => Number(x.trim()))
        .filter(x => !isNaN(x));

    processes = processInput.value
        .split(",")
        .map(x => Number(x.trim()))
        .filter(x => !isNaN(x));

    if(blocks.length === 0){
        alert("Enter memory block sizes");
        return;
    }

    if(processes.length === 0){
        alert("Enter process sizes");
        return;
    }

}

    /* ================= BFS / DFS PANELS ================= */

    if(algo === "bfs"){
        bfsQueuePanel.style.display = "block";
    }else{
        bfsQueuePanel.style.display = "none";
    }

    if(algo === "dfs"){
        dfsStackPanel.style.display = "block";
    }else{
        dfsStackPanel.style.display = "none";
    }

    /* ================= PAGE FAULT COUNTER ================= */

    const faultCounter = document.getElementById("faultCounter");

    if(["fifo","lru","optimal"].includes(algo)){
        faultCounter.style.display = "block";
        document.getElementById("faultCount").textContent = 0;
    }
    else{
        faultCounter.style.display = "none";
    }

    /* ================= DIJKSTRA PANELS ================= */

    const resultBox = document.getElementById("dijkstraResult");

    if(resultBox){
        resultBox.style.display = "none";
    }

    const distancePanel = document.getElementById("distancePanel");

    if(algo === "dijkstra"){
        distancePanel.style.display = "block";
    }else{
        distancePanel.style.display = "none";
    }

    /* ================= READY QUEUE ================= */

    const queuePanel = document.getElementById("readyQueue").parentElement;

    if (["fcfs","sjf","rr"].includes(algo)) {
        queuePanel.style.display = "block";
    } else {
        queuePanel.style.display = "none";
    }

    /* ================= URL ================= */

    history.replaceState(null, "", window.location.pathname + "?algo=" + algo);

    renderAlgorithm(algo);

    /* ================= ARRAY VALIDATION ================= */

    if (!["bfs","dfs","dijkstra","firstfit","bestfit","worstfit","dda","bresenham","circle"].includes(algo)) {

        if (arr.length === 0) {
            alert("Please enter at least one number in the array input.");
            return;
        }

        if (arr.some(n => isNaN(n))) {
            alert("Please enter only valid numbers separated by commas.");
            return;
        }

    }

    if(algo === "dda" || algo === "bresenham"){
clearPixels();
}

    const stepsListEl = document.getElementById("stepsList");
    if (stepsListEl) stepsListEl.innerHTML = "";

    /* ================= SEARCH TARGET ================= */

    if ((algo === "linear" || algo === "binary") && isNaN(target)) {
        alert("Please enter a valid numeric target to search for.");
        return;
    }

    let steps;

    const titleEl = document.getElementById("algoTitle");
    const descEl = document.getElementById("algoDescription");

    /* ================= SCHEDULING PROCESS LIST ================= */

    let procList = null;

    if (["fcfs", "sjf", "rr"].includes(algo)) {
        procList = arr.map((burst, idx) => ({ name: `P${idx+1}`, burst }));
    }

    if (info[algo]) {
        titleEl.textContent = info[algo].name;
        descEl.textContent = info[algo].description;
        complexityPanel.textContent = info[algo].complexity;
    }

    /* ================= ARRAY FOR VISUALIZATION ================= */

    let arrayForRender = arr;

    if(["firstfit","bestfit","worstfit"].includes(algo)){
        arrayForRender = [...blocks];
    }

    /* ================= ALGORITHM SWITCH ================= */

    switch(algo) {

        case "bubble":
            steps = bubbleSortSteps(arr);
            break;

        case "selection":
            steps = selectionSortSteps(arr);
            break;

        case "insertion":
            steps = insertionSortSteps(arr);
            break;

        case "merge":
            steps = mergeSortSteps(arr);
            break;

        case "quick":
            steps = quickSortSteps(arr);
            break;

        case "heap":
            steps = heapSortSteps(arr);
            break;

        case "linear":
            steps = linearSearchSteps(arr, target);
            break;

        case "binary":
            arrayForRender = [...arr].sort((a, b) => a - b);
            steps = binarySearchSteps(arrayForRender, target);
            break;

        case "fcfs":
            steps = fcfsSteps(procList);
            break;

        case "sjf":
            steps = sjfSteps(procList);
            break;

        case "rr":

            const quantum =
            Number(document.getElementById("quantumInput").value) || 2;

            steps = rrSteps(procList, quantum);
            break;

        case "fifo":

            const frameCount =
            Number(document.getElementById("frameInput").value) || 3;

            steps = fifoSteps(arr, frameCount);
            break;

        case "lru":

            const frameCountLRU =
            Number(document.getElementById("frameInput").value) || 3;

            steps = lruSteps(arr, frameCountLRU);
            break;

        case "optimal":

            const frameCountOptimal =
            Number(document.getElementById("frameInput").value) || 3;

            steps = optimalSteps(arr, frameCountOptimal);
            break;

        case "bfs":
            steps = bfsSteps(graph,"A");
            break;

        case "dfs":
            steps = dfsSteps(graph, "A");
            break;

        case "dijkstra":
            steps = dijkstraSteps(weightedGraph, "A");
            break;

        case "firstfit":
            steps = firstFitSteps(blocks, processes);
            break;

        case "bestfit":
            steps = bestFitSteps(blocks, processes);
            break;

        case "worstfit":
            steps = worstFitSteps(blocks, processes);
            break;

        case "diskfcfs":
steps = diskFCFSSteps(arr, head);
break;

case "sstf":
steps = sstfSteps(arr, head);
break;

case "scan":
steps = scanSteps(arr, head);
break;    

case "dda":

const x1 = Number(document.getElementById("x1").value);
const y1 = Number(document.getElementById("y1").value);
const x2 = Number(document.getElementById("x2").value);
const y2 = Number(document.getElementById("y2").value);

if(
isNaN(x1) || isNaN(y1) ||
isNaN(x2) || isNaN(y2)
){
alert("Please enter valid coordinates");
return;
}

steps = ddaSteps(x1,y1,x2,y2);

break;

case "bresenham":

const bx1 = Number(document.getElementById("x1").value);
const by1 = Number(document.getElementById("y1").value);
const bx2 = Number(document.getElementById("x2").value);
const by2 = Number(document.getElementById("y2").value);

if(
isNaN(bx1) || isNaN(by1) ||
isNaN(bx2) || isNaN(by2)
){
alert("Please enter valid coordinates");
return;
}

steps = bresenhamSteps(bx1,by1,bx2,by2);

break;

case "circle":

const xc = Number(document.getElementById("x1").value);
const yc = Number(document.getElementById("y1").value);
const r  = Number(document.getElementById("x2").value); // radius
const center = document.getElementById(`pixel-${xc}-${yc}`);
if(center){
center.classList.add("start");
}

steps = midpointCircleSteps(xc,yc,r);

break;

        default:
            steps = [];

    }

    /* ================= STEP LIST ================= */

    if (stepsListEl) {

        steps.forEach((st, idx) => {

            const li = document.createElement("li");

            li.textContent = st.text;

            li.dataset.idx = idx;

            stepsListEl.appendChild(li);

        });

    }

    else {

        complexityPanel.textContent = "";
        explanationPanel.textContent = "";

    }

    /* ================= RENDER VISUALIZER ================= */

    renderBars(arrayForRender, algo);

    /* ================= SCHEDULING GANTT ================= */

    if (["fcfs","sjf","rr"].includes(algo)) {

        renderGanttForScheduling(steps);

    }

    /* ================= PAGE FRAMES ================= */

    if (["fifo","lru","optimal"].includes(algo)) {

        const frameCount =
        Number(document.getElementById("frameInput").value) || 3;

        renderFramesTimeline(steps, frameCount, arr);

    }

    /* ================= ANIMATION ================= */

    arrayForRender = await animate(steps, arrayForRender, algo);

    /* ================= RESULTS TABLE ================= */

    if (["fcfs","sjf","rr"].includes(algo)) {

        showResultsTable(steps);

    }

}
function renderAlgorithm(algo) {
    const container = document.getElementById("algoSteps");
    container.innerHTML = "";

    if (!algoMap[algo]) return;

    algoMap[algo].forEach((line, index) => {
        const div = document.createElement("div");
        div.classList.add("algo-line");
        div.dataset.line = index;
        div.textContent = line;
        container.appendChild(div);
    });

    // also ensure left‑detail panel shows current algo
    updateDetail(algo);
}

// update the left-side description panel based on current algorithm
function updateDetail(algo) {
    const detailEl = document.getElementById('algoDetail');
    if (!detailEl) return;
    if (info[algo]) {
        detailEl.innerHTML = `<strong>${info[algo].name}</strong><br>
            <em>Complexity: ${info[algo].complexity}</em><br>
            <p>${info[algo].description}</p>`;
    } else {
        detailEl.textContent = '';
    }
}

function highlightAlgoLine(lineIndex) {
    // clear previous highlighting on the algorithm panel
    const lines = document.querySelectorAll(".algo-line");

    lines.forEach(l => l.classList.remove("active-line"));

    if (lines[lineIndex]) {
        lines[lineIndex].classList.add("active-line");
    }
    // note: we no longer depend on ids or <li> elements, since the
    // algorithm panel uses divs with the .algo-line class.
}
function createBar(parent, val, i) {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = val*4 + "px";
    bar.innerHTML = `
        <div class="marker i-marker"></div>
        <div class="marker j-marker"></div>
        <div class="marker min-marker"></div>
        <div class="marker key-marker"></div>
        <div class="marker left-marker"></div>
        <div class="marker mid-marker"></div>
        <div class="marker right-marker"></div>
        <div class="marker k-marker"></div>
        <div class="marker pivot-marker"></div>
        <span>${val}</span>
    `;
    parent.appendChild(bar);
}

function displayRecursionStack(stack) {
    const recursionPanel = document.getElementById('recursionPanel');
    const recursionStackDiv = document.getElementById('recursionStack');
    
    if (stack.length === 0) {
        recursionPanel.style.display = 'none';
        return;
    }
    
    recursionPanel.style.display = 'block';
    recursionStackDiv.innerHTML = '';
    
    // show stack from bottom to top
    for (let i = 0; i < stack.length; i++) {
        const frame = stack[i];
        const frameDiv = document.createElement('div');
        frameDiv.classList.add('stack-frame');
        frameDiv.style.paddingLeft = (frame.depth * 10) + 'px';
        
        if (frame.name === 'mergeSort') {
            frameDiv.innerHTML = `📍 mergeSort(${frame.start}, ${frame.end})`;
        } else if (frame.name === 'quickSort') {
            frameDiv.innerHTML = `📍 quickSort(${frame.low}, ${frame.high})`;
        }
        recursionStackDiv.appendChild(frameDiv);
    }
}

    function renderBars(arr, algo) {

    visualizer.innerHTML = "";

    // CGIP Algorithms use pixel grid
if(algo === "dda" || algo === "bresenham" || algo === "circle"){
renderGrid(21);
return;
}

    if(["firstfit","bestfit","worstfit"].includes(algo)){
renderMemory(arr,[]);
return;
}
    if(["diskfcfs","sstf","scan"].includes(algo)){
        const head = Number(document.getElementById("headInput").value) || 50;
renderDisk(arr, head);
return;
}

    // 🔥 Scheduling algorithms should only show Gantt chart
    if (["fcfs","sjf","rr"].includes(algo)) {

        const wrapper = document.createElement("div");
        wrapper.classList.add("gantt-container");

        const title = document.createElement("div");
        title.textContent = "Gantt Chart";
        title.style.color = "#00ffd5";
        title.style.marginBottom = "10px";
        title.style.fontWeight = "bold";

        const gantt = document.createElement("div");
        gantt.classList.add("gantt");

        wrapper.appendChild(title);
        wrapper.appendChild(gantt);

        visualizer.appendChild(wrapper);

        return;   // 🚀 prevents bars from rendering
    }
    if(algo === "bfs" || algo === "dfs"){
    renderGraph(graph);
    return;
}

if(algo === "dijkstra"){
    renderGraph(weightedGraph);
    return;
}
    
    // 🔥 Page replacement algorithms: create container
    if (["fifo","lru","optimal"].includes(algo)) {
        // Will be populated by renderFramesTimeline
        return;
    }
    
    if (algo === 'merge') {
        const tree = document.createElement("div");
        tree.id = "mergeTree";
        visualizer.appendChild(tree);

        buildMergeTree(arr, tree);
        const row = document.createElement('div');
        row.classList.add('visual-row');
        row.id = 'mergeBars';
        visualizer.appendChild(row);

        arr.forEach((val, i) => createBar(row, val, i));
    }
    else if (algo === 'heap') {
        const wrapper = document.createElement('div');
        wrapper.classList.add('heap-wrapper');

        const treeContainer = document.createElement('div');
        treeContainer.classList.add('heap-tree');
        treeContainer.id = 'heapTree';

        const sortedContainer = document.createElement('div');
        sortedContainer.classList.add('heap-sorted');
        sortedContainer.id = 'heapSorted';

        // ✅ ADD THIS
        const label = document.createElement("div");
        label.classList.add("sorted-label");
        label.textContent = "Sorted Array";

        sortedContainer.appendChild(label);

        wrapper.appendChild(treeContainer);
        wrapper.appendChild(sortedContainer);

        visualizer.appendChild(wrapper);
     
        renderHeapTree(arr, treeContainer);
    } else {
        const row = document.createElement('div');
        row.classList.add('visual-row');
        row.id = 'singleRow';
        visualizer.appendChild(row);
        arr.forEach((val, i) => createBar(row, val, i));
    }
}

function renderDisk(requests, head){

visualizer.innerHTML="";

const container=document.createElement("div");
container.classList.add("disk-container");

const track=document.createElement("div");
track.classList.add("disk-track");

container.appendChild(track);

/* seek path */
const path=document.createElement("div");
path.classList.add("disk-path");
track.appendChild(path);

/* render requests */
requests.forEach(req=>{

const node=document.createElement("div");
node.classList.add("disk-node");
node.textContent=req;

track.appendChild(node);

});

/* render disk head */
const headNode=document.createElement("div");
headNode.classList.add("disk-head");
headNode.id="diskHead";
headNode.textContent="H:"+head;

track.appendChild(headNode);

/* position head at correct request */
setTimeout(()=>{

const nodes=document.querySelectorAll(".disk-node");

nodes.forEach(node=>{
if(Number(node.textContent)===head){

headNode.style.left=node.offsetLeft+"px";

}
});

},50);

visualizer.appendChild(container);

}

function clearPixels(){

document.querySelectorAll(".pixel").forEach(p=>{
p.classList.remove("start","end","active");
});

selectedPoints = [];   // reset click selection

}
let selectedPoints = [];

function handlePixelClick(e){

if(selectedPoints.length === 2) return;

const x = Number(e.target.dataset.x);
const y = Number(e.target.dataset.y);

if(selectedPoints.length === 0){
clearPixels();
}

selectedPoints.push({x,y});

if(selectedPoints.length === 1){
e.target.classList.add("start");
}

if(selectedPoints.length === 2){

const p1 = selectedPoints[0];
const p2 = selectedPoints[1];

document.getElementById("x1").value = p1.x;
document.getElementById("y1").value = p1.y;
document.getElementById("x2").value = p2.x;
document.getElementById("y2").value = p2.y;

startBtn.click();

selectedPoints = [];

}

}

function renderGrid(size = 21){

visualizer.innerHTML = "";

const grid = document.createElement("div");
grid.classList.add("pixel-grid");

const offset = Math.floor(size/2);

for(let y = offset; y >= -offset; y--){

for(let x = -offset; x <= offset; x++){

const pixel = document.createElement("div");
pixel.classList.add("pixel");

pixel.dataset.x = x;
pixel.dataset.y = y;

pixel.id = `pixel-${x}-${y}`;

// AXIS LINES
if(y === 0) pixel.classList.add("x-axis");
if(x === 0) pixel.classList.add("y-axis");
if(x === 0 && y === 0) pixel.classList.add("origin");
if(y === 0 && x % 2 === 0){
pixel.innerText = x;
pixel.classList.add("axis-label");
}

if(x === 0 && y % 2 === 0){
pixel.innerText = y;
pixel.classList.add("axis-label");
}

// TOOLTIP
pixel.addEventListener("mousemove",(e)=>{

const tooltip = document.getElementById("coordTooltip");

tooltip.style.display = "block";
tooltip.style.left = e.pageX + 10 + "px";
tooltip.style.top = e.pageY + 10 + "px";

tooltip.innerText = `(${x}, ${y})`;

});

pixel.addEventListener("mouseleave",()=>{
document.getElementById("coordTooltip").style.display="none";
});

// CLICK FOR LINE
pixel.addEventListener("click", handlePixelClick);

grid.appendChild(pixel);

}

}

visualizer.appendChild(grid);

}

function renderGraph(graph){

visualizer.innerHTML="";

const container=document.createElement("div");
container.classList.add("graph-container");

visualizer.appendChild(container);

const positions={
A:{x:300,y:40},

B:{x:180,y:170},
C:{x:420,y:120},

D:{x:100,y:320},
E:{x:300,y:320},
F:{x:500,y:320}
};

Object.keys(graph).forEach(node=>{

const circle=document.createElement("div");
circle.classList.add("graph-node");
circle.id="node-"+node;

circle.style.left=positions[node].x+"px";
circle.style.top=positions[node].y+"px";

circle.textContent=node;

container.appendChild(circle);

});
function drawEdge(parent, child, weight){

const p=document.getElementById("node-"+parent);
const c=document.getElementById("node-"+child);

const line=document.createElement("div");
line.classList.add("graph-edge");
line.id = `edge-${parent}-${child}`;

const x1=p.offsetLeft+25;
const y1=p.offsetTop+25;

const x2=c.offsetLeft+25;
const y2=c.offsetTop+25;

const dx=x2-x1;
const dy=y2-y1;

const length=Math.sqrt(dx*dx+dy*dy);
const angle=Math.atan2(dy,dx);

line.style.width=length+"px";
line.style.left=x1+"px";
line.style.top=y1+"px";
line.style.transform="rotate("+angle+"rad)";

container.appendChild(line);

if(weight !== undefined){

const label=document.createElement("div");
label.classList.add("edge-weight");
label.textContent=weight;

label.style.left=(x1+x2)/2+"px";
label.style.top=(y1+y2)/2+"px";

container.appendChild(label);

}

}
Object.keys(graph).forEach(node => {

    graph[node].forEach(edge => {

        if(typeof edge === "string"){
            drawEdge(node, edge);
        }else{
            drawEdge(node, edge.node, edge.weight);
        }

    });

});
}
function buildMergeTree(arr, container) {
    const levels = [];

    function helper(start, end, depth) {
        if (!levels[depth]) levels[depth] = [];

        levels[depth].push({ start, end });

        if (start >= end) return;

        const mid = Math.floor((start + end) / 2);

        helper(start, mid, depth + 1);
        helper(mid + 1, end, depth + 1);
    }

    helper(0, arr.length - 1, 0);

    // render
    levels.forEach(level => {
        const row = document.createElement("div");
        row.classList.add("merge-row");

        level.forEach(({ start, end }) => {
            const node = document.createElement("div");
            node.classList.add("merge-node");

            node.dataset.start = start;
            node.dataset.end = end;

            node.textContent = `[${arr.slice(start, end + 1)}]`;

            // ✅ FIX: subtree coloring INSIDE loop
            const parentMid = Math.floor((start + end) / 2);

            if (end <= parentMid) {
                node.classList.add("left-subtree");
            } else if (start > parentMid) {
                node.classList.add("right-subtree");
            }

            row.appendChild(node);
        });

        container.appendChild(row);
    });
}
function updateMergeNode(step) {
    const nodes = document.querySelectorAll(".merge-node");

    nodes.forEach(node => {
        const s = Number(node.dataset.start);
        const e = Number(node.dataset.end);

        // 🎬 animate current node
        if (s === step.start && e === step.end) {
            node.classList.add("merge-animate");

            setTimeout(() => {
                node.classList.remove("merge-animate");
                node.textContent = `[${step.array.join(",")}]`;
                node.classList.add("merge-active");
            }, 400);
        }

        // 🔥 fade children
        else if (s >= step.start && e <= step.end) {
            node.style.opacity = "0.3";
        }
    });
}


let heapNodes = [];
let heapPositions = new Map();

function renderHeapTree(arr, container) {
    container.innerHTML = '';
    heapNodes = [];
    heapPositions = new Map();
    const nodes = heapNodes; // alias for clarity
    
    // create size bar
    const sizeBar = document.createElement('div');
    sizeBar.id = 'heapSizeBar';
    container.appendChild(sizeBar);
    sizeBar.innerHTML = '';
    arr.forEach((_, idx) => {
        const seg = document.createElement('div');
        seg.classList.add('size-segment');
        seg.dataset.idx = idx;
        sizeBar.appendChild(seg);
    });
    
    // Create tree nodes with index label inside
    arr.forEach((val, idx) => {
        const node = document.createElement('div');
        node.classList.add('tree-node');
        node.dataset.idx = idx;
        node.innerHTML = `
            <div class="node-value">${val}</div>
            <div class="node-index">${idx}</div>
        `;
        nodes.push(node);
        container.appendChild(node);
    });
    
    // Position nodes in binary tree layout, and draw connecting lines
    const positions = positionTreeNodes(nodes, arr.length);
    heapPositions = positions; // remember for later swaps
    drawHeapLines(nodes, positions, container);
}



function positionTreeNodes(nodes, n) {
    const heights = new Map();
    const positions = new Map();
    
    function getHeight(idx) {
        if (heights.has(idx)) return heights.get(idx);
        const left = 2 * idx + 1;
        if (left >= n) {
            heights.set(idx, 0);
            return 0;
        }
        const h = 1 + Math.max(getHeight(left), 2 * idx + 2 < n ? getHeight(2 * idx + 2) : 0);
        heights.set(idx, h);
        return h;
    }
    
    function setPositions(idx, left, right, y) {
        if (idx >= nodes.length) return;
        const mid = (left + right) / 2;
        positions.set(idx, { x: mid, y });
        const leftChild = 2 * idx + 1;
        const rightChild = 2 * idx + 2;
        const offset = (right - left) / 4;
        if (leftChild < nodes.length) setPositions(leftChild, left, mid - offset, y + 100);
        if (rightChild < nodes.length) setPositions(rightChild, mid + offset, right, y + 100);
    }
    
    getHeight(0);
    setPositions(0, 0, 400, 10);
    
    nodes.forEach((node, idx) => {
        const pos = positions.get(idx);
        node.style.left = pos.x + 'px';
        node.style.top = pos.y + 'px';
    });
    return positions;
}

// draw lines between parent and children in heap visualization
function drawHeapLines(nodes, positions, container) {
    // clear existing lines
    container.querySelectorAll('.heap-line').forEach(l => l.remove());
    nodes.forEach((node, idx) => {
        const pos = positions.get(idx);
        if (!pos) return;
        const centerX = pos.x + 25; // half node width
        const centerY = pos.y + 25; // half node height
        const leftChild = 2 * idx + 1;
        const rightChild = 2 * idx + 2;
        [leftChild, rightChild].forEach(childIdx => {
            if (childIdx < nodes.length) {
                const childPos = positions.get(childIdx);
                if (!childPos) return;
                const childX = childPos.x + 25;
                const childY = childPos.y + 25;
                const dx = childX - centerX;
                const dy = childY - centerY;
                const length = Math.hypot(dx, dy);
                const angle = Math.atan2(dy, dx);
                const line = document.createElement('div');
                line.classList.add('heap-line');
                line.style.width = length + 'px';
                line.style.transform = `translate(${centerX}px, ${centerY}px) rotate(${angle}rad)`;
                container.appendChild(line);
            }
        });
    });
}

function waitForNext() {
    if (!manualMode) {
        return new Promise(r => setTimeout(r, 500));
    }

    return new Promise(resolve => {
        const handler = () => {
            nextStepBtn.removeEventListener("click", handler);
            resolve();
        };
        nextStepBtn.addEventListener("click", handler);
    });
}

      function explainStep(step, arr, algo) {

    // ================= BUBBLE SORT =================
    if (algo === "bubble") {

        if (step.type === "compare") {
            const a = arr[step.i];
            const b = arr[step.j];

            if (a > b) {
                return `🔄 ${a} > ${b} → Swap needed ✅ (larger number should move right)`;
            } else {
                return `✔ ${a} ≤ ${b} → No swap needed ❌ (already in correct order)`;
            }
        }

        if (step.type === "swap") {
            return `🔁 Swapping ${arr[step.i]} and ${arr[step.j]} to move bigger element right`;
        }
    }

    // ================= SELECTION SORT =================
    if (algo === "selection") {

        if (step.type === "compare") {
            const current = arr[step.j];
            const min = arr[step.i];

            if (current < min) {
                return `🔍 ${current} < ${min} → New minimum found ✅`;
            } else {
                return `❌ ${current} ≥ ${min} → Not smaller than current minimum`;
            }
        }

        if (step.type === "newMin") {
            return `📌 Updating minimum element`;
        }

        if (step.type === "swap") {
            return `🔁 Placing smallest element at correct position`;
        }
    }

    // ================= INSERTION SORT =================
    if (algo === "insertion") {

        if (step.type === "compare") {
            const key = arr[step.keyPos];
            const val = arr[step.j];

            if (val > key) {
                return `🔄 ${val} > ${key} → Shift needed (move element right)`;
            } else {
                return `✔ ${val} ≤ ${key} → Correct position found`;
            }
        }

        if (step.type === "overwrite" || step.type === "swap") {
            // insertion sort uses a "swap" step to represent shifting
            return `➡ Shifting element to the right`;
        }

        if (step.type === "insert") {
            return `📥 Inserting key into correct position`;
        }
    }

    // ================= QUICK SORT =================
    if (algo === "quick") {

        if (step.type === "pivot") {
            return `🎯 Choosing ${arr[step.pivot]} as pivot`;
        }

        if (step.type === "compare") {
            return `🔍 Comparing element with pivot`;
        }

        if (step.type === "less") {
            return `⬅ ${arr[step.j]} < pivot → move to left side`;
        }

        if (step.type === "greater") {
            return `➡ ${arr[step.j]} ≥ pivot → stay on right side`;
        }

        if (step.type === "swap") {
            return `🔁 Swapping elements to partition array`;
        }

        if (step.type === "pivotSwap") {
            return `📍 Placing pivot in its correct sorted position`;
        }

        if (step.type === "final") {
            return `✅ Array is fully sorted`;
        }
    }

    // ================= MERGE SORT =================
    if (algo === "merge") {

        if (step.type === "split") {
            return `✂ Dividing array into smaller parts`;
        }

        if (step.type === "merge") {
            return `🔗 Merging two sorted halves together`;
        }
    }

    // ================= HEAP SORT =================
    if (algo === "heap") {

        if (step.type === "heapCompare") {
            return `🔍 Comparing parent with its children`;
        }

        if (step.type === "heapSelect") {
            return `📌 Selecting largest among parent and children`;
        }

        if (step.type === "swap") {
            return `🔁 Swapping to maintain max heap property`;
        }

        if (step.type === "extract") {
            return `📤 Extracting maximum element to sorted array`;
        }
    }

    // ================= LINEAR SEARCH =================
    if (algo === "linear") {

        if (step.type === "compare") {
            return `🔍 Checking ${arr[step.i]} with target`;
        }

        if (step.type === "found") {
            return `🎯 Element found at index ${step.i}`;
        }

        if (step.type === "notfound") {
            return `❌ Element not found in array`;
        }
    }

    // ================= BINARY SEARCH =================
    if (algo === "binary") {

        if (step.type === "compare") {
            return `🔍 Middle element is ${arr[step.mid]}`;
        }

        if (step.type === "left") {
            return `⬅ Target is smaller → search left half`;
        }

        if (step.type === "right") {
            return `➡ Target is larger → search right half`;
        }

        if (step.type === "found") {
            return `🎯 Element found at index ${step.mid}`;
        }

        if (step.type === "notfound") {
            return `❌ Element not found`;
        }
    }

    // ================= SCHEDULING =================
    if (["fcfs","sjf","rr"].includes(algo)) {
        if (step.type === "execute") {
            return `▶️ Execute ${step.process} from ${step.start} to ${step.end}`;
        }
    }
     // ================= PAGE REPLACEMENT =================
if (["fifo","lru","optimal"].includes(algo)) {

    if (step.type === "hit") {
        return `✔ Page ${step.page} already in frame → No page fault`;
    }

    if (step.type === "fault") {
        return `⚠ Page ${step.page} not in frame → Page fault`;
    }

    if (step.type === "replace") {
        return `🔄 Replace page ${step.removed} with ${step.page}`;
    }
}
if(algo === "diskfcfs"){

if(step.type === "move"){
return `Disk head moves from ${step.from} to ${step.to}. 
Seek distance = ${Math.abs(step.to-step.from)}. 
FCFS services requests in arrival order.`;
}

if(step.type === "complete"){
return "All disk requests have been serviced.";
}

}

if(algo === "scan"){

if(step.type === "move"){
return `Head moves in current direction servicing requests.
Next request along the path is ${step.to}.`;
}

if(step.type === "end"){
return `No more requests ahead. Head moves to disk end and reverses direction.`;
}

if(step.type === "complete"){
return "All requests are serviced after reversing direction.";
}

}
// ================= DDA LINE DRAWING =================
if(algo === "dda"){

if(step.type === "calc"){
return `
📐 dx = ${step.dx}
📐 dy = ${step.dy}

📊 steps = ${step.steps}

➜ xInc = ${step.xInc.toFixed(2)}
➜ yInc = ${step.yInc.toFixed(2)}
`;
}

if(step.type === "start"){
return `Start point (${step.x}, ${step.y})`;
}

if(step.type === "plot"){
return `Plot pixel (${step.x}, ${step.y})`;
}

if(step.type === "end"){
return `Line drawing completed at (${step.x}, ${step.y})`;
}

}
// ================= BRESENHAM LINE DRAWING =================
if(algo === "bresenham"){

if(step.type === "calc"){
return `
📐 dx = |${step.x2} - ${step.x1}| = ${step.dx}
📐 dy = |${step.y2} - ${step.y1}| = ${step.dy}

📊 Initial decision parameter

p = 2dy - dx  
p = 2(${step.dy}) - ${step.dx} = ${step.p}
`;
}

if(step.type === "decision"){

if(step.p < 0){
return `
p < 0 → Choose East pixel

p = p + 2dy
`;
}

else{
return `
p ≥ 0 → Choose North-East pixel

p = p + 2dy - 2dx
`;
}

}

if(step.type === "plot"){
return `Plot pixel (${step.x}, ${step.y})`;
}

if(step.type === "end"){
return `Reached end point (${step.x}, ${step.y})`;
}

}
// ================= MIDPOINT CIRCLE =================
if(algo === "circle"){

if(step.type === "calc"){
return `
📍 Center = (${step.xc}, ${step.yc})
📏 Radius = ${step.r}

Initial decision parameter

p = 1 - r = ${step.p}
`;
}

if(step.type === "decision"){

if(step.p < 0){
return `
p < 0 → choose East pixel
p = p + 2x + 1
`;
}
else{
return `
p ≥ 0 → choose South-East pixel
p = p + 2(x - y) + 1
`;
}

}

if(step.type === "plot"){
return `Plot symmetric circle point (${step.x}, ${step.y})`;
}

if(step.type === "end"){
return "Circle completed";
}

}

// ================= DEFAULT =================
    return step.text || "Processing...";
}

function showResultsTable(steps) {

    const old = document.querySelector(".result-card");
    if (old) old.remove();

    const results = [];

    steps.forEach(step => {
        if (step.type === "execute") {

            const burst = step.end - step.start;
            const turnaround = step.end;      // arrival = 0
            const waiting = step.start;       // arrival = 0

            results.push({
                process: step.process,
                start: step.start,
                end: step.end,
                burst: burst,
                waiting: waiting,
                turnaround: turnaround
            });
        }
    });

    let totalWaiting = 0;
    let totalTurnaround = 0;

    results.forEach(r => {
        totalWaiting += r.waiting;
        totalTurnaround += r.turnaround;
    });

    const avgWaiting = (totalWaiting / results.length).toFixed(2);
    const avgTurnaround = (totalTurnaround / results.length).toFixed(2);

    const card = document.createElement("div");
    card.classList.add("result-card");

    card.innerHTML = `
        <h2 class="result-title">Scheduling Results</h2>

        <table class="result-table">
            <thead>
                <tr>
                    <th>Process</th>
                    <th>Start</th>
                    <th>Completion</th>
                    <th>Burst</th>
                    <th>Waiting</th>
                    <th>Turnaround</th>
                </tr>
            </thead>
            <tbody>
                ${results.map(r => `
                    <tr>
                        <td>${r.process}</td>
                        <td>${r.start}</td>
                        <td>${r.end}</td>
                        <td>${r.burst}</td>
                        <td>${r.waiting}</td>
                        <td>${r.turnaround}</td>
                    </tr>
                `).join("")}
            </tbody>
        </table>

        <div class="avg-container">
            <div class="avg-box">
                ⏳ Avg Waiting Time: <span>${avgWaiting}</span>
            </div>
            <div class="avg-box">
                🔁 Avg Turnaround Time: <span>${avgTurnaround}</span>
            </div>
        </div>
    `;

    visualizer.appendChild(card);
}
function renderPageTable(reference) {

    const wrapper = document.createElement("div");
    wrapper.classList.add("page-wrapper");

    const title = document.createElement("div");
    title.textContent = "Page Reference String";
    title.style.marginBottom = "10px";
    title.style.color = "#00ffd5";

    const table = document.createElement("div");
    table.classList.add("page-table");

    reference.forEach(page => {
        const cell = document.createElement("div");
        cell.classList.add("page-cell");
        cell.textContent = page;
        table.appendChild(cell);
    });

    wrapper.appendChild(title);
    wrapper.appendChild(table);

    visualizer.appendChild(wrapper);
}

// Render a clean Gantt chart for scheduling (FCFS/SJF/RR) using the .gantt container
function renderGanttForScheduling(steps) {
    const gantt = document.querySelector('.gantt');
    if (!gantt) return;
    gantt.innerHTML = '';

    const execSteps = steps.filter(s => s.type === 'execute');
    const totalTime = execSteps.length ? execSteps[execSteps.length - 1].end : 0;
    const minCell = 40; // minimum pixels per time unit for readability
    const ganttWidth = gantt.clientWidth || 900;
const unit = totalTime ? ganttWidth / totalTime : 40;

    const track = document.createElement('div');
    track.className = 'gantt-track';
    track.style.position = 'relative';
    track.style.minWidth = (totalTime * unit) + 'px';
    track.style.height = '48px';
    track.style.marginBottom = '8px';

    const cpu = document.createElement("div");
cpu.className = "cpu-pointer";

const cpuLabel = document.createElement("div");
cpuLabel.className = "cpu-label";
cpuLabel.textContent = "CPU";

cpu.appendChild(cpuLabel);
track.appendChild(cpu);

    execSteps.forEach(step => {
        const block = document.createElement('div');
        block.className = 'gantt-block';
        const left = Math.round(step.start * unit);
        const w = Math.max(24, Math.round((step.end - step.start) * unit));
        block.style.left = left + 'px';
        block.style.width = w + 'px';
        block.textContent = step.process;
        block.title = `${step.process}: ${step.start} → ${step.end}`;
        const processIndex = Number(step.process.replace("P","")) - 1;
const color = processColors[processIndex % processColors.length];
        block.style.background = color;
        track.appendChild(block);
    });

    const ruler = document.createElement('div');
    ruler.className = 'gantt-ruler';
    ruler.style.position = 'relative';
    ruler.style.minWidth = (totalTime * unit) + 'px';
    ruler.style.height = '20px';
    for (let t = 0; t <= totalTime; t++) {
        const mark = document.createElement('div');
        mark.className = 'gantt-time';
        mark.textContent = t;
        mark.style.left = Math.round(t * unit) + 'px';
        ruler.appendChild(mark);
    }

    gantt.appendChild(track);
    gantt.appendChild(ruler);
}

// Render a frame-by-time table for FIFO / LRU / Optimal page replacement
function renderFramesTimeline(steps, frameCount, pages) {

    const visual = document.getElementById("visualizer");
    if (!visual) return;

    visual.querySelectorAll(".page-wrapper, .page-frames-wrapper")
        .forEach(n => n.remove());

    const wrapper = document.createElement("div");
    wrapper.className = "page-frames-wrapper";
    wrapper.style.overflowX = "auto";
    wrapper.style.padding = "8px 0";

    /* ===============================
       HEADER (REFERENCE STRING)
    =============================== */

    const header = document.createElement("div");
    header.className = "frames-header";
    header.style.display = "flex";
    header.style.alignItems = "center";
    header.style.marginBottom = "6px";

    const title = document.createElement("div");
    title.textContent = "Reference";
    title.style.minWidth = "80px";
    title.style.fontWeight = "600";

    header.appendChild(title);

    const cols = document.createElement("div");
    cols.style.display = "flex";
    cols.style.gap = "6px";

    steps.forEach((step, i) => {

        const c = document.createElement("div");
        c.className = "ref-cell";

        c.dataset.step = i;

        c.textContent = step.page !== undefined ? step.page : "";

        c.title = step.text || "";

        c.style.minWidth = "60px";
        c.style.textAlign = "center";
        c.style.fontSize = "0.85rem";

        cols.appendChild(c);

    });

    header.appendChild(cols);
    wrapper.appendChild(header);

    /* ===============================
       FRAME GRID
    =============================== */

    const grid = document.createElement("div");
    grid.className = "frames-grid";

    grid.style.display = "grid";
    grid.style.gridTemplateRows = `repeat(${frameCount}, 44px)`;
    grid.style.gap = "6px";

    for (let r = 0; r < frameCount; r++) {

        const row = document.createElement("div");
        row.className = "frames-row";

        row.style.display = "flex";
        row.style.gap = "6px";
        row.style.alignItems = "center";

        const label = document.createElement("div");
        label.textContent = `Frame ${r}`;
        label.style.minWidth = "80px";
        label.style.fontWeight = "500";

        row.appendChild(label);

        const cells = document.createElement("div");
        cells.style.display = "flex";
        cells.style.gap = "6px";

        steps.forEach((step, stepIndex) => {

            const cell = document.createElement("div");

            cell.className = "frames-cell";

            /* IMPORTANT DATA FOR ANIMATION */

            cell.dataset.step = stepIndex;
            cell.dataset.frame = r;

            cell.textContent = "";

            cell.style.minWidth = "60px";
            cell.style.height = "38px";

            cell.style.display = "flex";
            cell.style.alignItems = "center";
            cell.style.justifyContent = "center";

            cell.style.border = "1px solid rgba(255,255,255,0.06)";
            cell.style.borderRadius = "6px";

            cell.style.background = "rgba(255,255,255,0.02)";

            cells.appendChild(cell);

        });

        row.appendChild(cells);
        grid.appendChild(row);

    }

    wrapper.appendChild(grid);
    visual.appendChild(wrapper);

}

function renderReadyQueue(queue){

    const container = document.getElementById("readyQueue");
    if(!container) return;

    const oldBoxes = Array.from(container.children);

    // animate exiting boxes
    oldBoxes.forEach(box=>{
        if(!queue.includes(box.textContent)){
            box.classList.add("exit");
            setTimeout(()=>box.remove(),300);
        }
    });

    // add new boxes
    queue.forEach(p=>{

        if(![...container.children].some(el=>el.textContent===p)){

            const box = document.createElement("div");
            box.classList.add("queue-box","enter");
            box.textContent = p;

            container.appendChild(box);

            setTimeout(()=>{
                box.classList.remove("enter");
            },20);
        }

    });

    // reorder elements
    queue.forEach(p=>{
        const el=[...container.children].find(b=>b.textContent===p);
        if(el) container.appendChild(el);
    });
}

function renderMemory(blocks, allocations = [], originalBlocks = []) {

const visual = document.getElementById("visualizer");
visual.innerHTML = "";

blocks.forEach((remaining,i)=>{

const original = originalBlocks[i] ?? remaining;

const div = document.createElement("div");
div.classList.add("memory-block");

const processes = allocations.filter(a => a.block === i);

let segments = "";
let used = 0;

processes.forEach((p)=>{

segments += `
<div class="segment process">
P${p.id + 1} (${p.process})
</div>
`;

used += p.process;

});

const internal = original - used;

if(internal > 0){

segments += `
<div class="segment internal">
Internal ${internal}
</div>
`;

}

div.innerHTML = `
<div class="block-title">Block ${i+1} (${original})</div>

<div class="memory-bar">
${segments}
</div>
`;

visual.appendChild(div);

});
}


// ANIMATION 
async function animate(steps, arr, algo) {
    const stepsListEl = document.getElementById("stepsList");
    const x1 = Number(document.getElementById("x1").value);
const y1 = Number(document.getElementById("y1").value);
const x2 = Number(document.getElementById("x2").value);
const y2 = Number(document.getElementById("y2").value);

    const bars = algo === 'heap'
        ? []
        : (algo === 'merge'
            ? document.querySelectorAll('#mergeBars .bar')
            : document.querySelectorAll('.bar'));

    let prevLi = null;

    let allocations = [];
    

    for (let idx = 0; idx < steps.length; idx++) {
      
        const step = steps[idx];

if(["firstfit","bestfit","worstfit"].includes(algo)){

    if(step.type === "allocate"){

        allocations.push({
            block: step.block,
            process: step.process,
            id: step.processIndex
        });

    }

    renderMemory(step.blocks, allocations, arr);

    const blocks = document.querySelectorAll(".memory-block");

    if(step.type === "allocate"){

        const block = blocks[step.block];

        block.classList.add("allocate");

        setTimeout(()=>{
            block.classList.remove("allocate");
        },400);

    }

    if(step.type === "fail"){

        blocks.forEach(b=>{
            b.classList.add("fail");

            setTimeout(()=>{
                b.classList.remove("fail");
            },400);

        });

    }

}

if(["diskfcfs","sstf","scan"].includes(algo)){

    const nodes = document.querySelectorAll(".disk-node");
const head = document.querySelector(".disk-head");

nodes.forEach(n=>{
    if(Number(n.textContent)===step.to){

        const pos = n.offsetLeft;

        head.style.left = pos + "px";
        const node = [...nodes].find(n => Number(n.textContent) === step.to);

if(node){
const pos = node.offsetLeft;

head.style.left = pos + "px";
head.textContent = "H:"+step.to;
}

        n.classList.add("active");

        setTimeout(()=>{
            n.classList.remove("active");
        },400);
    }
});

}
if(algo==="diskfcfs"){

if(step.type==="move") highlightAlgoLine(2);

}

if(algo==="sstf"){

if(step.type==="move") highlightAlgoLine(2);

}

if(algo==="scan"){

if(step.type==="move") highlightAlgoLine(2);

}


        if(["fifo","lru","optimal"].includes(algo)){

/* ================= FRAME UPDATE ================= */

const cells = document.querySelectorAll(`.frames-cell[data-step="${idx}"]`);

cells.forEach((cell,frameIndex)=>{

const frameArr = step.frames || [];
const val = frameArr[frameIndex];

if(val !== undefined){

/* remove previous state */
cell.classList.remove("page-hit","page-fault","page-replace");

/* apply state + icon */

if(step.type === "hit"){
cell.classList.add("page-hit");
cell.innerHTML = `✔ ${val}`;
}

else if(step.type === "fault"){
cell.classList.add("page-fault");
cell.innerHTML = `❌ ${val}`;
}

else if(step.type === "replace"){
cell.classList.add("page-replace");
cell.innerHTML = `🔄 ${val}`;
}

/* animation */

cell.classList.add("update");

setTimeout(()=>{
cell.classList.remove("update");
},300);

const faultCounter = document.getElementById("faultCount");

if(faultCounter){

const faults = steps
.slice(0, idx + 1)
.filter(s => s.type === "fault" || s.type === "replace")
.length;

faultCounter.textContent = faults;

}

}

});



/* ================= REFERENCE HIGHLIGHT ================= */

document.querySelectorAll(".ref-cell")
.forEach(c => c.classList.remove("active-ref"));

const ref = document.querySelector(`.ref-cell[data-step="${idx}"]`);

if(ref){
ref.classList.add("active-ref");
}

}
//// LINE & CIRCLE DRAWING
if(algo === "dda" || algo === "bresenham" || algo === "circle"){

if(step.type !== "plot") continue;

const pixel = document.getElementById(`pixel-${step.x}-${step.y}`);
if(!pixel) continue;

if(algo !== "circle" && step.x === x1 && step.y === y1){
pixel.classList.add("start","draw");

}else if(algo !== "circle" && step.x === x2 && step.y === y2){
pixel.classList.add("end","draw");

}else{
pixel.classList.add("active","draw");

setTimeout(()=>{
pixel.classList.remove("draw");
},300);
}

}
    
   if (["fcfs","sjf","rr"].includes(algo)) {

const cpu = document.querySelector(".cpu-pointer");
const gantt = document.querySelector(".gantt-track");

if (cpu && gantt && step.type === "execute") {

const execSteps = steps.filter(s => s.type === "execute");
const totalTime = execSteps[execSteps.length - 1].end;

const unit = gantt.clientWidth / totalTime;

cpu.style.transition = "left 0.4s linear";
cpu.style.left = (step.end * unit) + "px";

/* READY QUEUE FIX */

const queue = steps
.slice(idx + 1)
.filter(s => s.type === "execute")
.map(s => s.process);

renderReadyQueue(queue);

/* Round Robin behavior */

if (algo === "rr" && step.remaining > 0) {
queue.push(step.process);
renderReadyQueue(queue);
}

}
}
    
if(algo === "bfs" && step.queue){

const queueDiv = document.getElementById("bfsQueue");

queueDiv.innerHTML="";

step.queue.forEach((item,i)=>{

const box=document.createElement("div");
box.classList.add("queue-item");

if(step.type==="enqueue") box.classList.add("queue-push");
if(step.type==="visit") box.classList.add("queue-pop");

box.textContent=item;

queueDiv.appendChild(box);

});

}
if(algo === "bfs" && step.type === "enqueue"){

const edge = document.getElementById(`edge-${step.from}-${step.node}`);

if(edge){

edge.classList.add("edge-active");

setTimeout(()=>{
edge.classList.remove("edge-active");
edge.classList.add("edge-visited");
},400);

}

}
if(algo === "dfs" && step.stack){

const stackDiv = document.getElementById("dfsStack");

stackDiv.innerHTML="";

step.stack.forEach((item,i)=>{

const box=document.createElement("div");
box.classList.add("queue-item");

if(step.type==="push") box.classList.add("queue-push");
if(step.type==="visit") box.classList.add("queue-pop");

box.textContent=item;

stackDiv.appendChild(box);

});

}
if(algo === "dijkstra" && step.distances){
    const table = document.getElementById("distanceTable");

table.innerHTML = "";

for(const node in step.distances){

const row = document.createElement("div");
row.classList.add("distance-row");

row.innerHTML = `
<span>${node}</span>
<span>${step.distances[node]}</span>
`;

table.appendChild(row);

/* highlight if distance updated */
if(step.type === "update" && step.text.includes(node)){

row.classList.add("distance-highlight");

setTimeout(()=>{
row.classList.remove("distance-highlight");
},500);

}
}}
// BFS and DFS graph traversal: animate node visits
if(algo === "bfs" || algo === "dfs" || algo === "dijkstra"){

    if(step.type === "visit"){

        const node = document.getElementById("node-"+step.node);

        node.classList.add("active");

        setTimeout(()=>{
            node.classList.remove("active");
            node.classList.add("visited");
        },400);
    }
}
if(algo === "dijkstra" && step.type === "relax"){

const edge = document.getElementById(`edge-${step.from}-${step.to}`);
edge.classList.add("edge-active");

if(edge){

edge.classList.add("edge-active");

setTimeout(()=>{
edge.classList.remove("edge-active");
edge.classList.add("edge-visited");
},400);

}

}
if(algo === "dijkstra" && step.type === "update"){

const node = step.text.split(" ")[3];
const circle = document.getElementById("node-"+node);

if(circle){
circle.classList.add("active");
setTimeout(()=>circle.classList.remove("active"),500);
}

}
if(algo === "dijkstra" && step.type === "update"){

const edge = document.getElementById(`edge-${step.from}-${step.to}`);

if(edge){
edge.classList.add("edge-visited");
}
}

        // ================= STEP TEXT =================
        stepsPanel.textContent = step.text;

        
  
        // ================= ALGORITHM PANEL HIGHLIGHT =================
if (algo === "linear") {
    if (step.type === "compare") highlightAlgoLine(3);
    if (step.type === "found") highlightAlgoLine(4);
    if (step.type === "notfound") highlightAlgoLine(5);
}

if (algo === "binary") {

    // RESET ALL
    bars.forEach(b => {
        b.classList.remove("active-range", "mid-highlight", "inactive");

        b.querySelector('.left-marker').textContent = '';
        b.querySelector('.mid-marker').textContent = '';
        b.querySelector('.right-marker').textContent = '';
    });

    // MARK ACTIVE RANGE
    if (step.low !== undefined && step.high !== undefined) {
        bars.forEach((bar, i) => {
            if (i >= step.low && i <= step.high) {
                bar.classList.add("active-range");
            } else {
                bar.classList.add("inactive");
            }
        });
    }

    // MARK POINTERS
    if (step.low !== undefined && bars[step.low]) {
        bars[step.low].querySelector('.left-marker').textContent = 'L';
    }

    if (step.mid !== undefined && bars[step.mid]) {
        bars[step.mid].querySelector('.mid-marker').textContent = 'M';
        bars[step.mid].classList.add("mid-highlight");
    }

    if (step.high !== undefined && bars[step.high]) {
        bars[step.high].querySelector('.right-marker').textContent = 'H';
    }

    // algorithm panel highlighting
    if (step.type === "init") highlightAlgoLine(0);
    if (step.type === "mid") highlightAlgoLine(3);
    if (step.type === "compare") highlightAlgoLine(4);
    if (step.type === "found") highlightAlgoLine(4);
    if (step.type === "left") highlightAlgoLine(5);
    if (step.type === "right") highlightAlgoLine(6);

}
        stepsPanel.classList.add("highlight");
        setTimeout(() => stepsPanel.classList.remove("highlight"), 300);

        // ================= STEP LIST =================
        if (prevLi) prevLi.classList.remove("current", "swap", "compare");

        const currLi = stepsListEl.querySelector(`li[data-idx='${idx}']`);
        if (currLi) {
            currLi.classList.add("current");
            if (step.type === "swap" || step.type === "overwrite") currLi.classList.add("swap");
            if (step.type === "compare") currLi.classList.add("compare");
            currLi.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        prevLi = currLi;

        // ================= RECURSION =================
        if (step.type === 'callStack') {
            displayRecursionStack(step.stack);
        }

        // ================= BUBBLE =================
        if (algo === 'bubble') {
            bars.forEach(b => {
                b.querySelector('.i-marker').textContent = '';
                b.querySelector('.j-marker').textContent = '';
            });

            if (bars[step.i]) bars[step.i].querySelector('.i-marker').textContent = 'i';
            if (bars[step.j]) bars[step.j].querySelector('.j-marker').textContent = 'j';
            if (step.type === "compare") highlightAlgoLine(2);
    if (step.type === "swap") highlightAlgoLine(3);
        }

        // ================= SELECTION =================
        if (algo === 'selection') {
            bars.forEach(b => {
                b.querySelector('.i-marker').textContent = '';
                b.querySelector('.j-marker').textContent = '';
                b.querySelector('.min-marker').textContent = '';
            });

            if (bars[step.outer]) bars[step.outer].querySelector('.i-marker').textContent = 'i';
            if (bars[step.i]) bars[step.i].querySelector('.min-marker').textContent = 'min';

            if (bars[step.j]) {
                let label = (step.j === step.outer + 1) ? 'i+1' : 'j';
                bars[step.j].querySelector('.j-marker').textContent = label;
            }
            if (step.type === "compare") highlightAlgoLine(3); // checking min
            if (step.type === "newMin") highlightAlgoLine(4);
    if (step.type === "swap") highlightAlgoLine(5);
        }

        // ================= INSERTION =================
        if (algo === 'insertion') {
            bars.forEach(b => {
                b.querySelector('.i-marker').textContent = '';
                b.querySelector('.j-marker').textContent = '';
                b.querySelector('.key-marker').textContent = '';
            });

            if (bars[step.outer]) bars[step.outer].querySelector('.i-marker').textContent = 'i';
            if (bars[step.j]) bars[step.j].querySelector('.j-marker').textContent = 'j';
            if (bars[step.keyPos]) bars[step.keyPos].querySelector('.key-marker').textContent = 'key';

            if (step.type === "compare") highlightAlgoLine(3);
            // both overwrite and the shifting 'swap' step should highlight the same line
            if (step.type === "overwrite" || step.type === "swap") highlightAlgoLine(4);
            if (step.type === "insert") highlightAlgoLine(5);
        }

        // ================= QUICK =================
       if (algo === 'quick') {

    // RESET
    bars.forEach(b => {
        b.classList.remove(
            "pivot", "compare", "less", "greater",
            "final-pivot", "left-part", "right-part"
        );
        b.querySelector('.pivot-marker').textContent = '';
    });

    // 🔹 PIVOT
    if (step.type === "pivot") {
        bars[step.pivot].classList.add("pivot");
        bars[step.pivot].querySelector('.pivot-marker').textContent = 'P';
        highlightAlgoLine(0);
    }

    // 🔹 COMPARE
    if (step.type === "compare") {
        bars[step.j].classList.add("compare");
        bars[step.pivot].classList.add("pivot");
        highlightAlgoLine(1);
    }
  


    // 🔹 FINAL PIVOT POSITION
   // ================= PIVOT SWAP =================
if (step.type === "pivotSwap") {

    if (bars[step.i] && bars[step.pivot]) {

        let temp = bars[step.i].style.height;
        bars[step.i].style.height = bars[step.pivot].style.height;
        bars[step.pivot].style.height = temp;

        let valI = bars[step.i].querySelector("span").textContent;
        let valJ = bars[step.pivot].querySelector("span").textContent;

        bars[step.i].querySelector("span").textContent = valJ;
        bars[step.pivot].querySelector("span").textContent = valI;

        [arr[step.i], arr[step.pivot]] = [arr[step.pivot], arr[step.i]];

    }
}

    // 🔹 RECURSION RANGE (VERY IMPORTANT 🔥)
    if (step.low !== undefined && step.high !== undefined) {
        bars.forEach((bar, idx) => {
            if (idx >= step.low && idx <= step.high) {
                bar.classList.add("active-range");
            } else {
                bar.classList.add("inactive");
            }
        });
    }
    if (step.type === "final") {
    bars.forEach((bar, i) => {
        bar.style.height = step.array[i] * 4 + "px";
        bar.querySelector("span").textContent = step.array[i];
        bar.classList.add("sorted");
    });
}
}

        // ================= HEAP =================
        if (algo === 'heap') {
            const nodes = heapNodes;

            nodes.forEach(n => {
                n.classList.remove('heap-root','heap-left','heap-right','heap-largest','out-of-heap','heap-visited');
            });

            if (step.heapSize !== undefined) {
                nodes.forEach((n, i) => {
                    if (i >= step.heapSize) n.classList.add('out-of-heap');
                });

                const segs = document.querySelectorAll('#heapSizeBar .size-segment');
                segs.forEach((s, i) => s.classList.toggle('size-active', i < step.heapSize));
            }

            if (step.type === 'heapCompare') {
                if (nodes[step.i]) nodes[step.i].classList.add('heap-root','heap-visited','highlight');
                if (nodes[step.left]) nodes[step.left].classList.add('heap-left','heap-visited','highlight');
                if (nodes[step.right]) nodes[step.right].classList.add('heap-right','heap-visited','highlight');
            }

            if (step.type === 'heapSelect') {
                if (nodes[step.largest]) nodes[step.largest].classList.add('heap-largest','highlight');
            }
            if (step.type === "heapCompare") highlightAlgoLine(3);
if (step.type === "heapSelect") highlightAlgoLine(3);
if (step.type === "swap") highlightAlgoLine(1);
if (step.type === "extract") highlightAlgoLine(2);
           
        }

        // ================= MERGE =================
if (algo === 'merge') {

    // 🔹 SPLIT ANIMATION
    if (step.type === "split") {
        document.querySelectorAll(".merge-node").forEach(node => {
            const s = Number(node.dataset.start);
            const e = Number(node.dataset.end);

            if (s === step.start && e === step.end) {
                node.classList.add("split-active");
            }
        });

        highlightAlgoLine(0);
    }

    // 🔥 CLEAR PREVIOUS MERGE HIGHLIGHTS
    document.querySelectorAll(".merge-node").forEach(n => {
        n.classList.remove("merging-left", "merging-right");
    });

    // 🎬 MERGE STEP
    if (step.type === "merge") {

        updateMergeNode(step);

        const nodes = document.querySelectorAll(".merge-node");
        const mid = Math.floor((step.start + step.end) / 2);

        nodes.forEach(node => {
            const s = Number(node.dataset.start);
            const e = Number(node.dataset.end);

            // LEFT CHILD
            if (s === step.start && e === mid) {
                node.classList.add("merging-left");
            }

            // RIGHT CHILD
            if (s === mid + 1 && e === step.end) {
                node.classList.add("merging-right");
            }
        });

        // 🧠 CORRECT EXPLANATION
        const left = arr.slice(step.start, mid + 1);
        const right = arr.slice(mid + 1, step.end + 1);

        highlightAlgoLine(3);
    }
}

       


    // ================= COMPARE (OPTIONAL VISUAL) =================
    // some algorithms already highlight the appropriate line for compare
    // steps in their own branches above.  we don't want a blanket
    // highlight that overrides the specific line numbers, so the
    // generic call has been removed.
    // the visual effect on the bars is still applied below:
    if (step.type === "compare" && algo !== 'heap') {
        if (bars[step.i]) bars[step.i].classList.add("compare");
        if (bars[step.j]) bars[step.j].classList.add("compare");
    }

        // ================= SWAP =================
        if (step.type === "swap") {

            if (algo === 'heap') {
                const nodeI = heapNodes[step.i];
                const nodeJ = heapNodes[step.j];

                if (nodeI && nodeJ) {
                    const posI = heapPositions.get(step.i);
                    const posJ = heapPositions.get(step.j);

                    [arr[step.i], arr[step.j]] = [arr[step.j], arr[step.i]];

                    requestAnimationFrame(() => {
                        nodeI.style.left = posJ.x + 'px';
                        nodeI.style.top = posJ.y + 'px';
                        nodeJ.style.left = posI.x + 'px';
                        nodeJ.style.top = posI.y + 'px';

                        [heapNodes[step.i], heapNodes[step.j]] =
                        [heapNodes[step.j], heapNodes[step.i]];
                    });
                }

            } else {
                if (bars[step.i] && bars[step.j]) {
                    let temp = bars[step.i].style.height;
                    bars[step.i].style.height = bars[step.j].style.height;
                    bars[step.j].style.height = temp;

                    let valI = bars[step.i].querySelector("span").textContent;
                    let valJ = bars[step.j].querySelector("span").textContent;

                    bars[step.i].querySelector("span").textContent = valJ;
                    bars[step.j].querySelector("span").textContent = valI;

                    [arr[step.i], arr[step.j]] = [arr[step.j], arr[step.i]];
                }
            }
        }

        // ================= OVERWRITE (OTHERS) =================
        if (step.type === "overwrite" && algo !== 'heap') {
            if (bars[step.i]) {
                bars[step.i].style.height = step.value * 4 + "px";
                bars[step.i].querySelector("span").textContent = step.value;
                bars[step.i].classList.add("swap");
            }
            arr[step.i] = step.value;
        }

        // ================= EXTRACT =================
        if (step.type === "extract") {
            const sortedContainer = document.getElementById("heapSorted");
            const node = heapNodes[step.heapSize];
            if (!node) {
                await waitForNext();
                continue;
            }

            const start = node.getBoundingClientRect();
            const end = sortedContainer.getBoundingClientRect();

            const floating = document.createElement("div");
            floating.classList.add("floating-node");
            floating.textContent = step.value;

            floating.style.left = start.left + "px";
            floating.style.top = start.top + "px";

            document.body.appendChild(floating);

            requestAnimationFrame(() => {
                floating.style.left = (end.left + sortedContainer.children.length * 50) + "px";
                floating.style.top = end.top + "px";
            });

            setTimeout(() => {
                floating.remove();

                const box = document.createElement("div");
                box.classList.add("sorted-box");
                box.textContent = step.value;

                sortedContainer.insertBefore(box, sortedContainer.children[1]);
            }, 600);
        }

        // ================= FOUND =================
        if (step.type === "found") {
            const idx = step.i !== undefined ? step.i : step.mid;
            if (typeof idx === 'number' && bars[idx]) {
                bars[idx].classList.add("sorted");
            }
        }

        await waitForNext();

explanationPanel.innerHTML = explainStep(step, arr, algo);

await new Promise(r => setTimeout(r,300));

        // ================= RESET =================
        if (algo === 'heap') {
            document.querySelectorAll('.tree-node').forEach(n => n.className = 'tree-node');
        } else {
            bars.forEach(b => {
                if (!b.classList.contains("sorted")) b.className = "bar";
            });
        }
    }
if(algo === "dijkstra"){

const lastStep = [...steps].reverse().find(s => s.distances);

if(lastStep){

const resultBox = document.getElementById("dijkstraResult");
const finalBox = document.getElementById("finalDistances");

if(resultBox && finalBox){

resultBox.style.display="block";
finalBox.innerHTML="";

for(const node in lastStep.distances){

const item=document.createElement("div");
item.classList.add("final-distance");

item.textContent=node+" : "+lastStep.distances[node];

finalBox.appendChild(item);

}

}

}

}

    return arr;
}            