<template>
  <div class="flex items-center justify-between p-4 lg:p-6 border-b border-gray-200 bg-white">
    <div class="flex items-center space-x-3 lg:space-x-4">
      <div class="w-7 h-7 lg:w-8 lg:h-8 bg-black rounded flex items-center justify-center">
        <span class="text-white font-bold text-sm lg:text-lg">N</span>
      </div>
      <button 
        @click="toggleMobileMenu"
        class="lg:hidden text-gray-600 hover:text-black transition-colors"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
    
    <div class="md:flex flex-1 max-w-md mx-4 lg:mx-8">
        <AutoComplete 
          optionLabel="description"
          v-model="value" 
          :suggestions="items" 
          @complete="search" 
          class="w-full grow" 
          placeholder="Search"
          input-class="w-full"
          @change="handleChange"
        />
    </div>
    
    <div class="flex items-center space-x-3">
      <button class="md:hidden text-gray-600 hover:text-black transition-colors">
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
      
      <div class="relative group">
        <button class="w-7 h-7 lg:w-8 lg:h-8 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors">
          <svg class="h-4 w-4 lg:h-5 lg:w-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </button>
        <UserSettings />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import UserSettings from './UserSettings.vue'
import type { Task } from '@/models/Task'
import { useTaskStore } from '@/stores/task'
import moment from 'moment'

const value = ref('')
const items = ref<Task[]>([])
const taskStore = useTaskStore()

const search = async (event: any) => {
  const { data } = await useApiRequest({
    endpoint: 'tasks',
    method: 'GET',
    body: {
      search: event?.query
    }
  })

  items.value = data
}

type Emits = {
  'toggle-mobile-menu': []
}

const emit = defineEmits<Emits>()

const toggleMobileMenu = () => {
  emit('toggle-mobile-menu')
}

const handleChange = (event: any) => {
  if(event?.value instanceof Object) {
    taskStore.setSelectedTaskId(event?.value?.id)
    taskStore.setSelectedDate(event?.value?.date ?? moment().format('YYYY-MM-DD'))
  }
}
</script>