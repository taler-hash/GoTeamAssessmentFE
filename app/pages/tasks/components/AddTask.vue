<template>
  <div class="p-4 lg:p-6 border-t border-gray-200 bg-white">
    <form @submit.prevent="handleSubmit" class="flex items-center space-x-3 lg:space-x-4">
      <div class="flex-1">
        <input
          v-model="newTaskText"
          type="text"
          placeholder="What else do you need to do?"
          class="w-full px-3 lg:px-4 py-2 lg:py-3 text-sm lg:text-base border border-gray-300 rounded-full focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
          :disabled="isSubmitting"
        />
      </div>
      
      <button
        type="submit"
        :disabled="!newTaskText.trim() || isSubmitting"
        class="w-10 h-10 lg:w-12 lg:h-12 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex-shrink-0"
      >
        <svg 
          v-if="!isSubmitting" 
          class="w-4 h-4 lg:w-5 lg:h-5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        
        <svg 
          v-else 
          class="w-4 h-4 lg:w-5 lg:h-5 animate-spin" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </button>
    </form>
    
    <div 
      v-if="showSuccessMessage" 
      class="mt-2 lg:mt-3 text-xs lg:text-sm text-green-600 animate-fade-in text-center lg:text-left"
    >
      Task added successfully!
    </div>
    
    <div 
      v-if="errorMessage" 
      class="mt-2 lg:mt-3 text-xs lg:text-sm text-red-600 animate-fade-in text-center lg:text-left"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type Emits = {
  'task-added': [text: string]
}

const emit = defineEmits<Emits>()

const newTaskText = ref('')
const isSubmitting = ref(false)
const showSuccessMessage = ref(false)
const errorMessage = ref('')

const handleSubmit = async () => {
  if (!newTaskText.value.trim()) return
  
  isSubmitting.value = true
  errorMessage.value = ''
  
  try {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    emit('task-added', newTaskText.value.trim())
    
    showSuccessMessage.value = true
    setTimeout(() => {
      showSuccessMessage.value = false
    }, 3000)
    
    newTaskText.value = ''
    
  } catch (error: unknown) {
    console.error('Failed to add task:', error)
    errorMessage.value = 'Failed to add task. Please try again.'
    setTimeout(() => {
      errorMessage.value = ''
    }, 5000)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
</style>
