// Define an interface for our counter state
interface CounterState {
  count: number;
}

// Function to update the DOM with the current count
function updateDisplay(state: CounterState): void {
  const counterElement = document.getElementById("counter");
  if (counterElement) {
    counterElement.textContent = state.count.toString();
  } else {
      console.error("Counter element not found");
  }
}

// Initial state
let counterState: CounterState = { count: 0 };

// Function to increment the counter
function incrementCounter(): void {
  counterState.count++;
  updateDisplay(counterState);
}

// Function to decrement the counter
function decrementCounter(): void {
    counterState.count--;
    updateDisplay(counterState);
}

// Add event listeners after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const incrementButton = document.getElementById("increment");
    const decrementButton = document.getElementById("decrement");
    if (incrementButton && decrementButton) {
        incrementButton.addEventListener("click", incrementCounter);
        decrementButton.addEventListener("click", decrementCounter);
        updateDisplay(counterState); // Initial display
    } else {
        console.error("Buttons not found");
    }
});
