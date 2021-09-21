const textarea = document.getElementById("textarea");
const submitBtn = document.getElementById("submit-btn");
const resultsDiv = document.getElementById("results");
const action = document.getElementById("action");
const cat = document.getElementById("cat")


async function getSentim() {
    resultsDiv.innerHTML = "<div class='lds-ellipsis'><div></div><div></div><div></div><div></div></div>" //"loading" indicator
    const response = await fetch("https://sentim-api.herokuapp.com/api/v1/", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: 
            JSON.stringify({text: textarea.value})
    });
    if (!response.ok) {
        alert(`HTTP-Error ${response.status}`)
        resultsDiv.textContent = 'An error occurred.'
        getCat(response.status)
    }
    const result = await response.json();
    const polarity = result.result.polarity // get polarity.
    const type = result.result.type // get type.
    resultsDiv.textContent = `polarity: ${polarity} , type: ${type}`
    colorResult(type)
    getCat(response.status)
    
}

function colorResult(type) {
    if (type === "positive") resultsDiv.style.color = "green"
    else if (type === "neutral") resultsDiv.style.color = "#474747"
    else if  (type === "negative") resultsDiv.style.color = "red"
}

function getCat(status) {
    cat.src = `https://http.cat/${status}.jpg`
    cat.width = 350
}


submitBtn.addEventListener("click",getSentim)
