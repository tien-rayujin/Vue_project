<template>
    <div>
        <h2>{{ storeState.numbers }}</h2>
        <number-submit />
    </div>
</template>
<script>
import { store } from './store.js';
import NumberSubmit from './NumberSubmit.vue';
export default {
    name: 'NumberDisplay',
    data() {
        return {
            storeState: store.state
        }
    },
    components: {
        'number-submit': NumberSubmit
    }
}
</script>