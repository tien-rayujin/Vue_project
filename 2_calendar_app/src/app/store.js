import { seedData } from './seed.js'
import { reactive } from 'vue'

export const store = {
    state: {
        data: reactive(seedData)
    },
    getActiveDay() {
        return this.state.data.find(day => day.active)
    },
    setActiveDay(dayId) {
        this.state.data.map(dayObj => {
            dayObj.id === dayId ? dayObj.active = true : dayObj.active = false
        })
    },
    submitEvent(eventDetails) {
        const activeDay = this.getActiveDay()
        activeDay.events.push({ detail: eventDetails, edit: false })
    },
    editEvent(dayId, eventDetails){
        this.resetEditOfAllEvents();
        const eventObj = this.getEventObj(dayId, eventDetails)

        eventObj.edit = true
    },
    resetEditOfAllEvents() {
        this.state.data.map(dataObj => {
            dataObj.events.map(event => {
                event.edit = false
            })
        })
    },
    updateEvent(dayId, originalEventDetail, updatedEventDetail) {
        const eventObj = this.getEventObj(dayId, originalEventDetail)
        // set the event detail to the new detial
        // and turn off editting
        eventObj.detail = updatedEventDetail
        eventObj.edit = false
    },
    deleteEvent(dayId, eventDetail){
        const dayObj = this.state.data.find(day => day.id === dayId)
        const eventIndexToRemove = dayObj.events.findIndex(
            event => event.detail === eventDetail
        )
        dayObj.events.splice(eventIndexToRemove, 1)
    },



    getEventObj(dayId, eventDetail){
        const dayObj = this.state.data.find(day => day.id === dayId)
        return dayObj.events.find(event => event.detail === eventDetail)
    }
}