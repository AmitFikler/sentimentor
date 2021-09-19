const textarea = document.getElementById("textarea");
const submitBtn = document.getElementById("submit-btn");
const resultsDiv = document.getElementById("results");
const action = document.getElementById("action");


async function getSentim() {
    const response = await fetch("https://sentim-api.herokuapp.com/api/v1/", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: 
            JSON.stringify({text: textarea.value})
    });
    const result = await response.json();
    console.log(result);
}

submitBtn.addEventListener("click",getSentim);
