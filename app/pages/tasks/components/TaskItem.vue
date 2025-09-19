<template>
  <div class="bg-white border border-gray-200 rounded-full px-4 lg:px-6 py-3 lg:py-4 flex items-center justify-between hover:shadow-md transition-shadow">
    <div class="flex items-center space-x-3 lg:space-x-4 flex-1 min-w-0">
      <button
        @click="toggleComplete"
        :class="[
          'w-5 h-5 lg:w-6 lg:h-6 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0',
          task.completed 
            ? 'bg-black border-black text-white' 
            : 'border-gray-300 hover:border-gray-400'
        ]"
      >
        <svg v-if="task.completed" class="w-3 h-3 lg:w-4 lg:h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
      </button>
      
      <span 
        :class="[
          'text-gray-800 flex-1 text-sm lg:text-base truncate',
          task.completed ? 'line-through text-gray-500' : ''
        ]"
      >
        {{ task.text }}
      </span>
    </div>
    
    <button
      @click="deleteTask"
      class="text-gray-400 hover:text-red-500 transition-colors p-1 flex-shrink-0"
      v-if="!task.completed"
    >
      <svg class="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
interface Task {
  id: string
  text: string
  completed: boolean
  createdAt: Date
}

interface Props {
  task: Task
}

type Emits = {
  toggle: [id: string]
  delete: [id: string]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const toggleComplete = () => {
  emit('toggle', props.task.id)
}

const deleteTask = () => {
  emit('delete', props.task.id)
}
</script>

<style scoped>
</style>
