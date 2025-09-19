import { defineStore } from 'pinia'
import moment from 'moment'

export const useTaskStore = defineStore('task', {
  state: () => ({
    selectedDate: moment().format("M-D-YYYY"),
    selectedTaskId: null as string | null
  }),
  actions: {
    setSelectedDate(date: string) {
      this.selectedDate = date
    },
    setSelectedTaskId(taskId: string | null) {
      this.selectedTaskId = taskId
    }
  }
})
