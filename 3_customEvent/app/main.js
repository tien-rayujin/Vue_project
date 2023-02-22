const inputComponent = {
    template: `<input 
                class="input is-small" type="text"
                v-model="input"
                @keyup.enter="monitorEnterKey"
                :placeholder="placeholder"/>`,
    props: ['placeholder'],
    data() {
        return {
            input: '',
        }
    },
    methods: {
        monitorEnterKey() {
            this.$emit("add-note", {
                note: this.input,
                timestamps: new Date().toLocaleString()
            })
            this.input = ''
        }
    },
    emits: ['add-note']
}


const app = {
    components: {
        'input-component': inputComponent
    },
    data() {
        return {
            notes: [],
            timestamps: [],
            placeholder: 'Enter a note'
        }
    },
    methods: {
        addNote(event){
            if(!event.note) return
            this.notes.push(event.note)
            this.timestamps.push(event.timestamps)
        }
    }
}

Vue.createApp(app).mount('#app')