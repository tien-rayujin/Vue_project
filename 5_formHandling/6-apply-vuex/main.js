const InputForm = {
    template: `
        <div class="input-form">
            <form @submit="submitForm" class="ui form">
                <div class="field">
                    <input 
                        :value="newItem"  
                        @input="onInputChange"
                        name="NEW_ITEM"
                        type="text" 
                        placeholder="Add an item !">
                    <span style="float: right">{{ newItemLength }}/20</span>
                    <span style="color: red">{{ fieldErrors.newItem }}</span>
                    <span v-if="isNewItemInputLimitExceeded"
                        style="color: red; display: block">Must be under twenty characters</span>
                </div>

                <div class="field">
                    <label>Email</label>
                    <input
                        :value="email"
                        @input="onInputChange"
                        name="EMAIL"
                        type="text"
                        placeholder="What's your email?"/>
                    <span style="color: red">{{ fieldErrors.email }}</span>
                </div>

                <div class="field">
                    <label>Urgency</label>
                    <select 
                        :value="urgency" 
                        @input="onInputChange"
                        name="URGENCY"
                        class="ui fluid search dropdown">
                        <option disabled value="">Please select one</option>
                        <option>Nonessential</option>
                        <option>Moderate</option>
                        <option>Urgent</option>
                    </select>
                    <span style="color: red">{{ fieldErrors.urgency }}</span>
                    <span v-if="isNotUrgent"
                        style="color: red; display: block">Must be moderate to urgent</span>
                </div>

                <div class="field">
                    <div class="ui checkbox">
                        <input 
                            :checked="termsAndConditions" 
                            @change="onInputChange"
                            name="TERMS_AND_CONDITIONS"
                            type="checkbox">
                        <label>I accpet the terms and conditions</label>
                        <span style="color: red">{{ fieldErrors.termsAndConditions }}</span>
                    </div>
                </div>

                <button v-if="saveStatus === 'SAVING'" disabled class="ui button">
                    Saving...
                </button>
                <button v-if="saveStatus === 'SUCCESS'" :disabled="isNewItemInputLimitExceeded || isNotUrgent" class="ui button">
                    Saved! Submit another
                </button>
                <button v-if="saveStatus === 'ERROR'" :disabled="isNewItemInputLimitExceeded || isNotUrgent" class="ui button">
                    Save Failed - Retry?
                </button>
                <button v-if="saveStatus === 'READY'" :disabled="isNewItemInputLimitExceeded || isNotUrgent" class="ui button">
                    Submit
                </button>
        
                {{ newItem + ' ' + email + ' ' + urgency + ' ' + termsAndConditions }}
                <div class="ui segment">
                    <h4 class="ui header">Items</h4>
                    <ul>
                        <div v-if="loading" class="ui active inline loader"></div>
                        <li v-for="item in items" class="item"> {{ item }} </li>
                    </ul>
                </div>
            </form>
        </div>
    `,
    data() {
        return {
            fieldErrors: {
                newItem: undefined,
                email: undefined,
                urgency: undefined,
                termsAndConditions: undefined
            },
            loading: false,
            saveStatus: 'READY',    // READY, SAVING, SUCCESS, ERROR
        }
    },
    created() {
        this.loading = true;
        this.$store.dispatch('loadItems')
            .then(response => {
                this.loading = false;
            })
            .catch(error => {
                console.log(error);
            })
    },
    computed: Vuex.mapGetters({
        newItem: 'newItem',
        newItemLength: 'newItemLength',
        isNewItemInputLimitExceeded: 'isNewItemInputLimitExceeded',
        email: 'email',
        urgency: 'urgency',
        isNotUrgent: 'isNotUrgent',
        termsAndConditions: 'termsAndConditions',
        items: 'items'
    }),
    methods: {
        onInputChange(evt) {
            const element = evt.target;
            const value = 
                element.name === "TERM_AND_CONDITIONS" 
                    ? element.checked 
                    : element.value;
            this.$store.commit(`UPDATE_${element.name}`, value);
        },
        submitForm(evt) {
            // this.newItem = ''
            evt.preventDefault()

            this.fieldErrors = this.validateForm(this.fields)
            if (Object.keys(this.fieldErrors).length) return;    // if there are errors, don't submit

            const items = [...this.items, this.newItem]

            this.saveStatus = 'SAVING'

            this.$store.dispatch('saveItems', items)
                .then(() => {
                    this.saveStatus = 'SUCCESS'
                })
                .catch(error => {
                    console.log(error);
                    this.saveStatus = 'ERROR'
                })
            // this.items.push(`${this.fields.newItem} - ${this.fields.email} - ${this.fields.urgency} - ${this.fields.termsAndConditions ? 'Accepted' : 'Not accepted'}`)

        },
        validateForm(fields) {
            // check if fields are truthiness (not empty)
            const errors = {}
            if (!this.newItem) errors.newItem = "New Item Required";
            if (!this.email || !this.isEmail(this.email)) errors.email = "Email Required";
            if (!this.urgency) errors.urgency = "Urgency Required";
            if (!this.termsAndConditions) errors.termsAndConditions = "Terms and Conditions have to be approved";

            return errors;
        },
        isEmail(email) {
            const re = /\S+@\S+\.\S+/;
            return re.test(email);
        }
    }
}

Vue.createApp({
    components: {
        'input-form': InputForm
    }
}).use(window.state).mount("#app")