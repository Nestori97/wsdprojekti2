var checkbox = document.getElementById("is_correct");
var correctInput = document.getElementById("correct");

// kuuntele formia
document.querySelector("form").addEventListener("submit", function(event) {
    if (checkbox.checked) {
        correctInput.value = "true"; // laita correct value true
    } else {
        correctInput.value = "false"; // laita correct value false
    }
});

