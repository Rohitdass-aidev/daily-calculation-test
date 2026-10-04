const fs = require('fs');

class MockElement {
    constructor(tag) {
        this.tag = tag;
        this.children = [];
        this.dataset = {};
        this.className = '';
        this.innerHTML = '';
        this.innerText = '';
        this.type = '';
        this.step = '';
    }
    appendChild(child) { this.children.push(child); }
    forEach(cb) { this.children.forEach(cb); }
}

const mockDocument = {
    elements: {},
    getElementById: function(id) {
        if (!this.elements[id]) {
            this.elements[id] = new MockElement('div');
        }
        return this.elements[id];
    },
    createElement: (tag) => new MockElement(tag)
};

global.document = mockDocument;

const code = fs.readFileSync('script.js', 'utf-8');
// Only run the generation functions
eval(code.match(/function generateSquares[\s\S]*?(?=function isCorrect)/)[0]);

generateSquares();
generateCubes();
generateTables();
generateConsecutive();
generateFractions();

// Verify counts
const squaresCount = document.getElementById('squares-grid').children.length;
const cubesCount = document.getElementById('cubes-grid').children.length;

let tablesInputCount = 0;
const tableRows = document.getElementById('tables-grid').children;
for (let i = 1; i < tableRows.length; i++) {
    const tr = tableRows[i];
    for (let j = 1; j < tr.children.length; j++) {
        const td = tr.children[j];
        if (td.children[0] && td.children[0].className.includes('table-input')) {
            tablesInputCount++;
        }
    }
}

const consecutiveCount = document.getElementById('consecutive-grid').children.length;

let fractionsCount = 0;
for (let i = 1; i <= 4; i++) {
    const col = document.getElementById(`frac-col-${i}`);
    if (col && col.children) {
        fractionsCount += col.children.length;
    }
}

console.log("Squares:", squaresCount, "Expected: 115");
console.log("Cubes:", cubesCount, "Expected: 30");
console.log("Tables inputs:", tablesInputCount, "Expected: 140");
console.log("Consecutive:", consecutiveCount, "Expected: 9");
console.log("Fractions:", fractionsCount, "Expected: 52");

const total = squaresCount + cubesCount + tablesInputCount + consecutiveCount + fractionsCount;
console.log("Total:", total, "Expected: 346");

const allQuestions = new Set();
let duplicates = 0;

function check(q) {
    if (allQuestions.has(q)) {
        console.log("Duplicate question found:", q);
        duplicates++;
    }
    allQuestions.add(q);
}

document.getElementById('squares-grid').children.forEach(item => {
    check(item.children[1].dataset.question); 
});
document.getElementById('cubes-grid').children.forEach(item => {
    check(item.children[1].dataset.question);
});
for (let i = 1; i < tableRows.length; i++) {
    const tr = tableRows[i];
    for (let j = 1; j < tr.children.length; j++) {
        const input = tr.children[j].children[0];
        check(input.dataset.question);
    }
}
document.getElementById('consecutive-grid').children.forEach(item => {
    check(item.children[1].dataset.question);
});
for (let i = 1; i <= 4; i++) {
    document.getElementById(`frac-col-${i}`).children.forEach(item => {
        check(item.children[1].dataset.question);
    });
}

console.log("Total unique questions:", allQuestions.size);
console.log("Duplicates:", duplicates);
