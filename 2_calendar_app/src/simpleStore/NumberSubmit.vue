<template>
    <div>
        <input v-model="newNumber" type="number" />
        <button @click="pushNewNumber(newNumber)">Add new number</button>
    </div>
</template>
<script>
import { store } from './store.js';
export default {
    name: 'NumberSubmit',
    data() {
        return {
            newNumber: 0
        }
    },
    methods: {
        pushNewNumber(newNumber) {
            console.log('pushNewNumber called with ' + newNumber);
            console.log('store.state.numbers before push: ' + store.state.numbers);
            store.pushNewNumber(newNumber);
            console.log('store.state.numbers after push: ' + store.state.numbers);
        }
    }
}
</script>