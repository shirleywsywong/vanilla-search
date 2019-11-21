//get all the content in the article
const content = document.getElementsByTagName('article')[0].innerHTML

//get the search term from the input field
document.getElementById("getSearchInput").onclick = function (event) {
    event.preventDefault();
    document.getElementById("error").innerHTML = ("")
    let inputText = document.getElementById("searchField");
    let input = inputText.value;
    
    //check for valid input
    if (!input) {
        document.getElementById("error").innerHTML = (`Please enter a valid search term`)
    } else {
        findMatch(input);
    }
}

//find the matching word in the content
const findMatch = (input) => {
    let match = [...content.matchAll(input)]
    checkMatch(match)
}

//check to see if there's any search result
function checkMatch(matches) {
    if (matches.length == 0) {
        return document.getElementById("error").innerHTML = (`Your search did not return any result.`)
    }
    recordMatch(matches)
}

//record where the word is found
function recordMatch(matches) {
    let word = matches[0][0];
    let wordStart = [];
    let wordEnd = [];
    
    for (const match of matches) {
        wordStart.push(match.index)
        wordEnd.push(match.index + match[0].length)
    }

    highlightMatch(word, wordStart, wordEnd)
}

//highlight the matched word in the text
function highlightMatch(word, wordStart, wordEnd) {

    //replace the matched word with highlighting span
    let highlight = word.replace(word, `<span class="match">` + word + `</span>`)
    
    //get the content from the beginning to where the first word is
    let preText = content.substring(0, wordStart[0])
    
    //get all the content from where the 1st word ends to where the 2nd word begin
    let midText = []
    for (let i = 0; i<wordStart.length; i++) {
        midText.push(content.substring(wordEnd[i], wordStart[i+1]))
    }
    
    //assemble the highlighted word with the midtext
    let midCount = 0;
    let postText = [];
    while (midCount < wordStart.length) {
        postText.push(highlight + midText[midCount])
        midCount++
    }

    //push everything to the DOM
    document.getElementsByTagName('article')[0].innerHTML = 
    (preText + postText.join(" "))

}