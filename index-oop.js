const search = {
    articleContent: "",
    getContent: function() {
        search.articleContent = document.getElementsByTagName('article')[0].innerHTML
        //why does 'this' refers to the window here?
    },
    userInput: "",
    getUserInput: function(event) {
        event.preventDefault();
        document.getElementById("error").innerHTML = ("")
        let inputText = document.getElementById("searchField");
        let inputRegex = new RegExp(inputText.value, 'gi');
        this.userInput = inputRegex
    },
    displayInputError: function() {
        return document.getElementById("error").innerHTML = (`Please enter a valid search term`)
    },
    matches: [],
    findMatch: function() {
        this.matches = [...this.articleContent.matchAll(this.userInput)]
    },
    displayMatchError: function() {
        return document.getElementById("error").innerHTML = (`Your search did not return any result.`)
    },
    wordMatched: [],
    recordWordMatched: function() {
        this.wordMatched = [];
        for(const match of this.matches) {
            this.wordMatched.push(match[0])
        }
    },
    wordStart: [],
    recordWordStart: function() {
        this.wordStart = [];
        for (const match of this.matches) {
            this.wordStart.push(match.index)
        }
    },
    wordEnd: [],
    recordWordEnd: function() {
        this.wordEnd = [];
        for (const match of this.matches) {
            this.wordEnd.push(match.index + match[0].length)
        }
    },
    highlight: [],
    highlightWord: function() {
        this.highlight = [];
        this.highlight = this.wordMatched.map(word => {
            return word.replace(word, `<span class="match">${word}</span>`)
        })
    },
    preText: '',
    getPreText: function () {
        this.preText = '';
        this.preText = this.articleContent.substring(0, this.wordStart[0])
    },
    midText: [],
    getMidText: function () {
        this.midText = [];
        for (let i = 0; i < this.wordStart.length; i++) {
            this.midText.push(this.articleContent.substring(this.wordEnd[i], this.wordStart[i + 1]))
        }
    },
    postText: [],
    assemblePostText: function() {
        let midCount = 0;
        this.postText = [];
        while (midCount < this.matches.length) {
            this.postText.push(this.highlight[midCount] + this.midText[midCount])
            midCount++
        }
    },
    renderText: function() {
        document.getElementById("error").innerHTML = (`${this.matches.length} result(s) found.`)
        document.getElementsByTagName('article')[0].innerHTML =
        (this.preText + this.postText.join(""))
    },
    displayMatch: function() {
        search.recordWordMatched()
        search.recordWordStart()
        search.recordWordEnd()
        search.highlightWord()
        search.getPreText()
        search.getMidText()
        search.assemblePostText()
        search.renderText()
    }
}

document.addEventListener('DOMContentLoaded', search.getContent, false);
document
    .getElementById("getSearchInput")
    .onclick = function() {
        search.getUserInput(event)
        if (search.userInput === '') {
            return search.displayInputError()
        }
        search.findMatch()
        if (search.matches.length === 0) {
            return search.displayMatchError()
        }
        search.displayMatch()
    }