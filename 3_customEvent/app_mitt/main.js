const emitter = mitt()

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
            emitter.emit("add-note", {
                note: this.input,
                timestamps: new Date().toLocaleString()
            })
            this.input = ''
        }
    }
}

const noteCountComponent = {
    template: `<div class="note-count">Note count: <strong>{{ noteCount }}</strong></div>`,
    data() {
        return {
            noteCount: 0,
        };
    },
    created() {
        emitter.on('add-note', () => this.noteCount ++)
    }
}


const app = {
    components: {
        'input-component': inputComponent,
        'note-count-component': noteCountComponent,
    },
    data() {
        return {
            notes: [],
            timestamps: [],
            placeholder: 'Enter a note'
        }
    },
    methods: {
        addNote(event) {
            if (!event.note) return
            this.notes.push(event.note)
            this.timestamps.push(event.timestamps)
        }
    },
    created() {
        emitter.on('add-note', (event) => this.addNote(event))
    }
}

Vue.createApp(app).mount('#app')