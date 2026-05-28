let counter = 0;
const incrementBtn = document.getElementById("incrementBtn");
const decrementBtn = document.getElementById("decrementBtn");
const numberDisplay = document.getElementById("number");

incrementBtn.addEventListener("click", () => {
    counter++;
    numberDisplay.textContent = counter;
});
decrementBtn.addEventListener("click", () => {
    counter--;
    numberDisplay.textContent = counter;
});