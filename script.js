document.addEventListener('DOMContentLoaded', () => {
    generateSquares();
    generateCubes();
    generateTables();
    generateConsecutive();
    generateFractions();
    
    document.getElementById('start-btn').addEventListener('click', startTest);
    document.getElementById('submit-btn').addEventListener('click', submitTest);
    document.getElementById('home-btn').addEventListener('click', () => {
        location.reload();
    });

    // Keyboard navigation: Enter moves to next input
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            if (e.target.classList.contains('test-input')) {
                e.preventDefault();
                const inputs = Array.from(document.querySelectorAll('.test-input'));
                const index = inputs.indexOf(e.target);
                if (index > -1 && index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }
            }
        }
    });
});

let timerInterval;
let startTime;

function formatTime(seconds) {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}

function startTest() {
    document.getElementById('home-screen').classList.add('hidden');
    document.getElementById('test-screen').classList.remove('hidden');
    
    startTime = Date.now();
    timerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        document.getElementById('timer-display').innerText = formatTime(elapsed);
    }, 1000);
    
    const firstInput = document.querySelector('.test-input');
    if (firstInput) firstInput.focus();
}

function generateSquares() {
    const container = document.getElementById('squares-grid');
    for (let i = 11; i <= 125; i++) {
        const item = document.createElement('div');
        item.className = 'grid-item';
        const label = document.createElement('label');
        label.innerHTML = `${i}² =`;
        const input = document.createElement('input');
        input.type = 'number';
        input.step = 'any';
        input.className = 'test-input';
        input.dataset.section = 'Squares';
        input.dataset.question = `${i}²`;
        input.dataset.answer = i * i;
        
        item.appendChild(label);
        item.appendChild(input);
        container.appendChild(item);
    }
}

function generateCubes() {
    const container = document.getElementById('cubes-grid');
    for (let i = 1; i <= 30; i++) {
        const item = document.createElement('div');
        item.className = 'grid-item';
        const label = document.createElement('label');
        label.innerHTML = `${i}³ =`;
        const input = document.createElement('input');
        input.type = 'number';
        input.step = 'any';
        input.className = 'test-input';
        input.dataset.section = 'Cubes';
        input.dataset.question = `${i}³`;
        input.dataset.answer = i * i * i;
        
        item.appendChild(label);
        item.appendChild(input);
        container.appendChild(item);
    }
}

function generateTables() {
    const table = document.getElementById('tables-grid');
    
    let headerRow = document.createElement('tr');
    let corner = document.createElement('th');
    corner.innerText = '×';
    headerRow.appendChild(corner);
    for (let c = 1; c <= 10; c++) {
        let th = document.createElement('th');
        th.innerText = c;
        headerRow.appendChild(th);
    }
    table.appendChild(headerRow);
    
    for (let r = 12; r <= 25; r++) {
        let tr = document.createElement('tr');
        let rowHead = document.createElement('th');
        rowHead.innerText = r;
        tr.appendChild(rowHead);
        
        for (let c = 1; c <= 10; c++) {
            let td = document.createElement('td');
            const input = document.createElement('input');
            input.type = 'number';
            input.step = 'any';
            input.className = 'test-input table-input';
            input.dataset.section = 'Tables';
            input.dataset.question = `${r} × ${c}`;
            input.dataset.answer = r * c;
            td.appendChild(input);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}

function generateConsecutive() {
    const container = document.getElementById('consecutive-grid');
    for (let i = 11; i <= 19; i++) {
        const item = document.createElement('div');
        item.className = 'grid-item';
        const label = document.createElement('label');
        label.innerHTML = `${i} × ${i+1} =`;
        const input = document.createElement('input');
        input.type = 'number';
        input.step = 'any';
        input.className = 'test-input';
        input.dataset.section = 'Consecutive Multiplication';
        input.dataset.question = `${i} × ${i+1}`;
        input.dataset.answer = i * (i + 1);
        
        item.appendChild(label);
        item.appendChild(input);
        container.appendChild(item);
    }
}

function generateFractions() {
    const fractionList = [
        '1/1', '1/2', '1/3', '1/4', '1/5', '1/6', '1/7', '1/8', '1/9', '1/10',
        '1/11', '1/12', '1/13', '1/14', '1/15', '1/16', '1/17', '1/18', '1/19', '1/20',
        '1/21', '1/22', '1/23', '1/24', '1/25', '5/6', '2/7', '3/7', '4/7', '5/7', '6/7',
        '3/8', '5/8', '7/8', '5/12', '7/12', '11/12', '1/13', '2/13', '3/14', '5/14',
        '3/16', '5/16', '9/16', '7/16', '15/16',
        '1/15', '2/15', '4/15', '8/15', '7/15', '14/15'
    ];

    const container = document.getElementById('fractions-grid');
    container.innerHTML = `
        <div class="frac-col" id="frac-col-1"></div>
        <div class="frac-col" id="frac-col-2"></div>
        <div class="frac-col" id="frac-col-3"></div>
        <div class="frac-col" id="frac-col-4"></div>
    `;
    
    fractionList.forEach((frac, index) => {
        let colId = 1;
        if (index >= 10 && index < 20) colId = 2;
        else if (index >= 20 && index < 31) colId = 3;
        else if (index >= 31) colId = 4;

        const col = document.getElementById(`frac-col-${colId}`);
        const [num, den] = frac.split('/').map(Number);
        const ans = (num / den) * 100;
        
        const item = document.createElement('div');
        item.className = 'grid-item fractions-item';
        const label = document.createElement('label');
        label.innerHTML = `${frac} &rarr;`;
        const input = document.createElement('input');
        input.type = 'number';
        input.step = 'any';
        input.className = 'test-input';
        input.dataset.section = 'Fractions';
        input.dataset.question = `${frac} &rarr;`;
        input.dataset.answer = ans;
        input.dataset.isFraction = "true";
        
        item.appendChild(label);
        item.appendChild(input);
        col.appendChild(item);
    });
}

function isCorrect(userInput, expectedValue) {
    if (userInput.trim() === '') return false;
    let num = parseFloat(userInput);
    if (isNaN(num)) return false;
    
    if (num === expectedValue) return true;
    if (Math.abs(num - expectedValue) < 0.0000001) return true;
    
    for (let i = 2; i <= 5; i++) {
        let factor = Math.pow(10, i);
        if (num === Math.floor(expectedValue * factor) / factor) return true;
        if (num === Math.ceil(expectedValue * factor) / factor) return true;
        if (num === Math.round(expectedValue * factor) / factor) return true;
    }
    return false;
}

function submitTest() {
    clearInterval(timerInterval);
    const endTime = Date.now();
    const totalSeconds = Math.floor((endTime - startTime) / 1000);
    
    document.getElementById('test-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    window.scrollTo(0, 0);
    
    const inputs = document.querySelectorAll('.test-input');
    let totalCorrect = 0;
    let totalQuestions = inputs.length;
    
    let sectionData = {
        'Squares': { correct: 0, total: 0 },
        'Cubes': { correct: 0, total: 0 },
        'Tables': { correct: 0, total: 0 },
        'Consecutive Multiplication': { correct: 0, total: 0 },
        'Fractions': { correct: 0, total: 0 }
    };
    
    let mistakesHTML = '';
    let unansweredCount = 0;
    
    inputs.forEach(input => {
        const section = input.dataset.section;
        const question = input.dataset.question;
        const expected = parseFloat(input.dataset.answer);
        const userVal = input.value;
        const isFraction = input.dataset.isFraction === "true";
        
        sectionData[section].total++;
        
        let correct = false;
        if (userVal.trim() === '') {
            unansweredCount++;
        } else {
            correct = isCorrect(userVal, expected);
        }
        
        if (correct) {
            sectionData[section].correct++;
            totalCorrect++;
        } else {
            const displayUser = userVal.trim() === '' ? '(blank)' : userVal;
            let displayExpected = expected;
            if (isFraction && expected % 1 !== 0) {
                displayExpected = Number(expected.toFixed(4));
            }
            if (isFraction) {
                displayExpected += '%';
            }
            
            mistakesHTML += `
                <div class="mistake-item">
                    <strong>${question}</strong>
                    <br>Your answer: ${displayUser}
                    <br>Correct answer: ${displayExpected}
                </div>
            `;
        }
    });
    
    let resultsHTML = '';
    for (const [secName, data] of Object.entries(sectionData)) {
        if (data.total === 0) continue;
        const accuracy = ((data.correct / data.total) * 100).toFixed(2);
        resultsHTML += `
            <div class="result-section">
                <h3>${secName}</h3>
                <p>Correct: ${data.correct} / ${data.total}</p>
                <p>Accuracy: ${accuracy}%</p>
            </div>
        `;
    }
    
    document.getElementById('results-container').innerHTML = resultsHTML;
    
    const overallAccuracy = ((totalCorrect / totalQuestions) * 100).toFixed(2);
    const avgTime = (totalSeconds / totalQuestions).toFixed(2);
    
    let overallHTML = `
        <p>${totalCorrect} / ${totalQuestions}</p>
        <p>${overallAccuracy}% Accuracy</p>
        <p>Total Time: ${formatTime(totalSeconds)}</p>
        <p>Average Time / Calculation: ${avgTime} sec</p>
    `;
    if (unansweredCount > 0) {
        overallHTML += `<p>Unanswered: ${unansweredCount}</p>`;
    }
    
    document.getElementById('overall-result').innerHTML = overallHTML;
    
    if (mistakesHTML === '') {
        mistakesHTML = '<p style="font-size: 1.125rem; color: #38a169; font-weight: 600;">Perfect! No mistakes.</p>';
    }
    document.getElementById('mistakes-container').innerHTML = mistakesHTML;
}
