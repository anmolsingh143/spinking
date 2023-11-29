let history = [];

function spinWheel() {
    const betType = document.getElementById("betType").value.toLowerCase();
    const betAmount = parseFloat(document.getElementById("betAmount").value);
    const result = Math.floor(Math.random() * 37); // 0 to 36

    const resultMessage = document.getElementById("result");

    if (isNaN(betAmount) || betAmount <= 0) {
        resultMessage.innerText = "Invalid bet amount. Please enter a positive number.";
        return;
    }

    const payout = determinePayout(betType, betAmount, result);
    const winMessage = `The wheel spins and lands on ${result}. You ${payout > 0 ? 'win' : 'lose'} ${payout} chips!`;

    resultMessage.innerText = winMessage;
    history.push({ result: result, betType: betType, payout: payout });

    displayHistory();
}

function determinePayout(betType, betAmount, result) {
    if (betType === 'even') {
        return result % 2 === 0 ? betAmount : 0;
    } else if (betType === 'odd') {
        return result % 2 !== 0 ? betAmount : 0;
    } else {
        return betType == result ? 36 * betAmount : 0;
    }
}

function displayHistory() {
    const historyDiv = document.getElementById("history");
    historyDiv.innerHTML = "<h2>Game History</h2>";

    history.forEach((item, index) => {
        const historyItem = document.createElement("p");
        historyItem.innerText = `Game ${index + 1}: Result - ${item.result}, Bet Type - ${item.betType}, Payout - ${item.payout}`;
        historyDiv.appendChild(historyItem);
    });
}
