export const store = {
    state: {
        numbers: [1, 2, 3, 4, 5]
    },
    pushNewNumber(newNumberString){
        this.state.numbers.push(parseInt(newNumberString)) 
    }
}

