interface Card {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string; // Use color instead of image
    isDragging: boolean;
    offsetX: number;
    offsetY: number;
    dropped: boolean;
}

interface CounterState {
    count: number;
}

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

const targetX = 400;
const targetY = 100;
const targetWidth = 100;
const targetHeight = 150;

let counterState: CounterState = { count: 0 };
let cards: Card[] = [];
let isDragging = false;
let currentCard: Card | null = null;

function updateDisplay(state: CounterState): void {
    const counterElement = document.getElementById("counter");
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
    for (const card of cards) {
        ctx.fillStyle = card.color;
        ctx.fillRect(card.x, card.y, card.width, card.height);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.strokeRect(card.x, card.y, card.width, card.height);
    }
}

function isOverTarget(card: Card): boolean {
    return card.x + card.width > targetX &&
           card.x < targetX + targetWidth &&
           card.y + card.height > targetY &&
           card.y < targetY + targetHeight;
}

function handleMouseDown(e: MouseEvent) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    for (let i = cards.length - 1; i >= 0; i--) {
        const card = cards[i];
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

function handleMouseMove(e: MouseEvent) {
    if (!isDragging || !currentCard) return;

    const rect = canvas.getBoundingClientRect();
    currentCard.x = e.clientX - rect.left - currentCard.offsetX;
    currentCard.y = e.clientY - rect.top - currentCard.offsetY;
    drawCards();
}

function handleMouseUp() {
    if (!currentCard) return;
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

document.addEventListener('DOMContentLoaded', () => {
    const cardColors = ["lightblue", "lightgreen", "lightcoral"]; // Array of colors

    cards = cardColors.map((color, i) => ({
        x: 50 + i * 150,
        y: 50,
        width: 100,
        height: 150,
        color: color, // Assign color to card
        isDragging: false,
        offsetX: 0,
        offsetY: 0,
        dropped: false,
    }));

    drawCards();

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    updateDisplay(counterState);
});
