<template>
  <div class="h-full overflow-y-auto p-4 lg:p-6">
    <div class="space-y-3 lg:space-y-4">
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @toggle="handleToggleTask"
        @delete="handleDeleteTask"
      />
    </div>
    
    <div v-if="tasks.length === 0" class="flex flex-col items-center justify-center h-48 lg:h-64 text-gray-500 px-4">
      <svg class="w-12 h-12 lg:w-16 lg:h-16 mb-3 lg:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
      <p class="text-base lg:text-lg font-medium text-center">No tasks yet</p>
      <p class="text-xs lg:text-sm text-center mt-1">Add your first task below to get started!</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TaskItem from './TaskItem.vue'

interface Task {
  id: string
  text: string
  completed: boolean
  createdAt: Date
}

type Emits = {
  'task-updated': []
}

const emit = defineEmits<Emits>()

const tasks = ref<Task[]>([
  {
    id: '1',
    text: 'I need to change the background color to white for the login page',
    completed: false,
    createdAt: new Date()
  },
  {
    id: '2',
    text: 'Fix issue in unable to click the submit button for the edit task dialog',
    completed: false,
    createdAt: new Date()
  },
  {
    id: '3',
    text: 'Fix an error message is shown when creating a task but the task was still created',
    completed: true,
    createdAt: new Date()
  }
])

const handleToggleTask = (id: string) => {
  const task = tasks.value.find(t => t.id === id)
  if (task) {
    task.completed = !task.completed
    emit('task-updated')
  }
}

const handleDeleteTask = (id: string) => {
  const index = tasks.value.findIndex(t => t.id === id)
  if (index > -1) {
    tasks.value.splice(index, 1)
    emit('task-updated')
  }
}

defineExpose({
  addTask: (text: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date()
    }
    tasks.value.unshift(newTask)
    emit('task-updated')
  },
  getTasks: () => tasks.value
})
</script>

<style scoped>
</style>
