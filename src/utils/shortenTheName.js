const short = (word, length) => {
    if(word.length > length) {
        let newWord = ""
        let wordToArr = word.split('')

        for(let i = 0; i < length - 3; i++) {
            newWord += wordToArr[i]
        }

        return newWord + "..."
    }

    return word
}

export default short