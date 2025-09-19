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
        {{ task.description }}
      </span>
    </div>
    
    <button
      @click="deleteTask"
      class="text-gray-400 hover:text-red-500 transition-colors p-1 flex-shrink-0"
      v-if="!task.completed"
    >
      <LucideTrash class="w-4 h-4 lg:w-5 lg:h-5 text-red-500 cursor-pointer hover:scale-105 transition-all duration-200" />
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Task } from '@/models/Task';
import { useTaskStore } from '@/stores/task';

const toast = useToast()
const taskStore = useTaskStore()
const props = defineProps<{
  task: Task
}>()

const toggleComplete = async () => {
  if(props.task.completed) {
    toast.add({
      severity: 'error',
      summary: 'Task is already completed',
      life: 3000,
    })
    return
  }

  await useApiRequest({
    endpoint: `tasks/${props.task.id}`,
    method: 'PUT',
    body: {
      date: props.task.date,
      description: props.task.description,
      completed: true,
    },
  })

  toast.add({
    severity: 'success',
    summary: 'Task completed successfully',
    life: 3000,
  })
  taskStore.setSelectedTaskId(null)
}

const deleteTask = async () => {
  await useApiRequest({
    endpoint: `tasks/${props.task.id}`,
    method: 'DELETE',
  })

  toast.add({
    severity: 'success',
    summary: 'Task deleted successfully',
    life: 3000,
  })
  taskStore.setSelectedTaskId(null)
}
</script>
