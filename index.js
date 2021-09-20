const textarea = document.getElementById("textarea");
const submitBtn = document.getElementById("submit-btn");
const resultsDiv = document.getElementById("results");
const action = document.getElementById("action");
const cat = document.getElementById("cat")


async function getSentim() {
    resultsDiv.innerHTML = "<div class='lds-ellipsis'><div></div><div></div><div></div><div></div></div>"
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
    if(!response.ok) throw Error(result.error);
    resultsDiv.textContent = JSON.stringify(result.result)
    for (let sentence of result.sentences) {
        let p =  document.createElement("p")
        p.textContent = JSON.stringify(sentence)
        getTypeColor(sentence)
        resultsDiv.appendChild(p)
    }
    getCat(response.status)
    
}

function getTypeColor(sentence){
    let type  = sentence.sentiment.type
    console.log(type)
}

function getCat(status) {
    catImg = document.createElement("img")
    catImg.src = `https://http.cat/${status}.jpg`
    catImg.width = 350
    document.body.appendChild(catImg)
}


submitBtn.addEventListener("click",getSentim)
