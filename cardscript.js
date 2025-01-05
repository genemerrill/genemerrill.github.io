var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var targetX = 400;
var targetY = 100;
var targetWidth = 100;
var targetHeight = 150;
var counterState = { count: 0 };
var cards = [];
var isDragging = false;
var currentCard = null;
function updateDisplay(state) {
    var counterElement = document.getElementById("counter");
    if (counterElement) {
        counterElement.textContent = state.count.toString();
    }
}
function drawTarget() {
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 3;
    ctx.strokeRect(targetX, targetY, targetWidth, targetHeight);
}
function drawCards() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawTarget();
    for (var _i = 0, cards_1 = cards; _i < cards_1.length; _i++) {
        var card = cards_1[_i];
        ctx.fillStyle = card.color;
        ctx.fillRect(card.x, card.y, card.width, card.height);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.strokeRect(card.x, card.y, card.width, card.height);
    }
}
function isOverTarget(card) {
    return card.x + card.width > targetX &&
        card.x < targetX + targetWidth &&
        card.y + card.height > targetY &&
        card.y < targetY + targetHeight;
}
function handleMouseDown(e) {
    var rect = canvas.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    for (var i = cards.length - 1; i >= 0; i--) {
        var card = cards[i];
        if (x >= card.x && x <= card.x + card.width && y >= card.y && y <= card.y + card.height) {
            card.isDragging = true;
            card.offsetX = x - card.x;
            card.offsetY = y - card.y;
            currentCard = card;
            isDragging = true;
            break;
        }
    }
}
function handleMouseMove(e) {
    if (!isDragging || !currentCard)
        return;
    var rect = canvas.getBoundingClientRect();
    currentCard.x = e.clientX - rect.left - currentCard.offsetX;
    currentCard.y = e.clientY - rect.top - currentCard.offsetY;
    drawCards();
}
function handleMouseUp() {
    if (!currentCard)
        return;
    currentCard.isDragging = false;
    isDragging = false;
    if (isOverTarget(currentCard) && !currentCard.dropped) {
        currentCard.dropped = true;
        counterState.count++;
        updateDisplay(counterState);
    }
    currentCard = null;
    drawCards();
}
document.addEventListener('DOMContentLoaded', function () {
    var cardColors = ["lightblue", "lightgreen", "lightcoral"]; // Array of colors
    cards = cardColors.map(function (color, i) { return ({
        x: 50 + i * 150,
        y: 50,
        width: 100,
        height: 150,
        color: color, // Assign color to card
        isDragging: false,
        offsetX: 0,
        offsetY: 0,
        dropped: false,
    }); });
    drawCards();
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    updateDisplay(counterState);
});
