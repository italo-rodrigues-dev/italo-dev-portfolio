const actionButtons = document.querySelectorAll(".action-button");

actionButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const color = button.getAttribute("data-color");
        if (color === "random") {
            const randomColor = Math.floor(Math.random() * 16777215).toString(16);
            document.body.style.backgroundColor = "#" + randomColor;
        } else {
            document.body.style.backgroundColor = color;
        }
    });
});