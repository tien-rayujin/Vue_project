const state = {
    notes: [],
    timestamps: [],
}

const mutations = {
    // the first param (even if not declared) is the state
    // the optional second param is the payload (the data)
    ADD_NOTE(state, payload) {
        let newNote = payload;
        state.notes.push(newNote)
    },
    ADD_TIMESTAMP(state, payload) {
        let newTimestamp = payload;
        state.timestamps.push(newTimestamp)
    },
}

const actions = {
    // the first param (even if not declared) is the context
    // the optional second param is the payload (the data)
    // context object allow to access the state, getters, commit, dispatch

    // use commit to call a mutation
    addNote(context, payload){
        context.commit('ADD_NOTE', payload)
    },
    addTimeStamp(context, payload){
        context.commit('ADD_TIMESTAMP', payload)
    },
}

const getters = {
    // the first param (even if not declared) is the state
    // getNotes(state) {
    //     return state.notes
    // },
    // getTimeStamps(state) {
    //     return state.timestamps
    // },
    // getNoteCount(state) {
    //     return state.notes.length
    // },


    getNote: state => state.notes,
    getTimeStamps: state => state.timestamps,
    getNoteCount: state => state.notes.length,
}

const store = Vuex.createStore({
    // adding an object with just a shorthand to define both key : value
    state,  // state: state
    mutations, // mutations: mutations
    actions, // actions: actions
    getters // getters: getters
})


const inputComponent = {
    template: `<input 
                class="input is-small" type="text"
                v-model="input"
                @keyup.enter="monitorEnterKey"
                placeholder="Enter a note"/>`,
    props: ['placeholder'],
    data() {
        return {
            input: '',
        }
    },
    methods: {
        monitorEnterKey() {
            if(!this.input) return;
           this.$store.dispatch('addNote', this.input)
           this.$store.dispatch('addTimeStamp', new Date().toLocaleString())
           this.input = ''
        }
    },

}

const noteCountComponent = {
    template: `<div class="note-count">
    Note count: <strong>{{ noteCount }}</strong>
    </div>`,
    computed: {
        noteCount() {
            return this.$store.getters.getNoteCount
        }
    }
}

const app = Vue.createApp({
    components: {
        'input-component': inputComponent,
        'note-count-component': noteCountComponent
    },
    computed: {
        notes() {
            return this.$store.getters.getNote
        },
        timestamps(){
            return this.$store.getters.getTimeStamps
        }
    }
})

app.use(store); // use event bus to share data between components (global) : Vuex
app.mount("#app")