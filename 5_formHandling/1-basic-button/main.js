const ButtonRow = {
    // @click we pass a function like onHoodieClick instead of onHoodieClick()
    // first case: we pass a function onHoodieClick
    // second case: we pass the result of calling a function onHoodieClick
    template: `
        <div>
            <button @click="onButtonClick" class="ui button"
                name="button-hoddie" value="hoodie">Hoddie</button>
            <button @click="onButtonClick" class="ui button"
                name="button-tee" value="tee">Tee</button>
            <button @click="onButtonClick" class="ui button"
                name="button-fitted-cap" value="fitted-cap">Fitted Cap</button>
            <button @click="onButtonClick" class="ui button"
                name="button-jacket" value="jacket">Jacket</button>
        </div>
    `,
    methods: {
        // thy function passed to @click (@keyup, @input) are event handlers
        // thee function will be called when that event occurs and ALWAYS receive an event object as first argument
        onButtonClick(evt) {
            // evt target refers to the element that triggered the event
            const button = evt.target
            console.log(`The user clicked ${button.name}: ${button.value}`);
        }
    }
}

const app = {
    template: ``,
    components: {
        'button-row': ButtonRow
    }
}
Vue.createApp(app).mount('#app')