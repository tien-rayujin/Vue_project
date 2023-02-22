<template>
    <div class="day-event" :style="getEventBackgroundColor">
        <div v-if="!event.edit">
            <span class="has-text-centered details">{{ event.detail }}</span>
            <div class="has-text-centered icons">
                <i class="fa fa-pencil-square edit-icon"
                    @click="editEvent(day.id, event.detail)"></i>
                <i class="fa-solid fa-trash-can"
                    @click="deleteEvent(day.id, event.detail)"></i>
            </div>
        </div>
        <div v-if="!!event.edit">
            <input type="text" :placeholder="event.detail" v-model="newEventDetail">
            <div class="has-text-centered icons">
                <i class="fa-solid fa-check"
                    @click="updateEvent(day.id, event.detail, newEventDetail)"></i>
            </div>
        </div>
    </div>
</template>

<script>
import { store } from "../store.js"
export default {
    name: "CalendarEvent",
    props: ['event', 'day'],
    data() {
        return {
            newEventDetail: ''
        }
    },  
    computed: {
        getEventBackgroundColor() {
            const colors = ['#FF9999', '#85D6FF', '#99FF99'];
            let randomColor = colors[Math.floor(Math.random() * colors.length)];
            return `background-color: ${randomColor}`;
        }
    },
    methods: {
        editEvent(dayId, eventDetail) {
            store.editEvent(dayId, eventDetail);
        },
        updateEvent(dayId, originalEventDetail, updatedEventDetail) {
            if(updatedEventDetail === '') updatedEventDetail = originalEventDetail
            store.updateEvent(dayId, originalEventDetail, updatedEventDetail)
            this.newEventDetail = ''
        },
        deleteEvent(dayId, eventDetail) {
            store.deleteEvent(dayId, eventDetail)
        }
    }
}
</script>

<style lang="scss" scoped>
.day-event {
    margin-top: 6px;
    margin-bottom: 6px;
    display: block;
    color: #4C4C4C;
    padding: 5px;

    .details {
        display: block;
    }

    .icons .fa {
        padding: 0 2px;
    }

    input {
        background: none;
        border: 0;
        border-bottom: 1px solid #FFF;
        width: 100%;

        &:focus {
            outline: none;
        }
    }
}
</style>