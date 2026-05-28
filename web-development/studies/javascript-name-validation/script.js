const submitBtn = document.getElementById("submitBtn");
const nameInput = document.getElementById("name");

submitBtn.addEventListener("click", function(){
    if (nameInput.value === "") {
        alert("Please enter your name");
    } else {
        alert("Hello, " + nameInput.value + "!");
    }
});