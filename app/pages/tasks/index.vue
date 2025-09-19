<template>
  <div class="h-screen w-full bg-white flex flex-col overflow-hidden">
    <Header @toggle-mobile-menu="toggleMobileMenu" />
    
    <div class="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
      <ClientOnly>
        <div 
          v-if="showMobileMenu"
          class="lg:hidden fixed inset-0 bg-transparent bg-opacity-20 backdrop-blur-sm z-40 transition-opacity duration-300"
          @click="closeMobileMenu"
        ></div>
      </ClientOnly>
      
      <ClientOnly>
        <div 
          :class="[
            'lg:block lg:relative lg:translate-x-0 transition-all duration-300 ease-out',
            showMobileMenu 
              ? 'block fixed left-0 top-0 h-full z-50 translate-x-0 opacity-100' 
              : 'hidden lg:block -translate-x-full lg:translate-x-0 opacity-0 lg:opacity-100'
          ]"
        >
          <Sidebar @close="closeMobileMenu" />
        </div>
        <template #fallback>
          <div class="lg:block lg:relative lg:translate-x-0 hidden lg:block">
            <Sidebar @close="closeMobileMenu" />
          </div>
        </template>
      </ClientOnly>
      
      <div class="flex-1 flex flex-col min-h-0">
        <div class="flex-1 overflow-hidden">
          <ClientOnly>
            <TaskList ref="taskListRef" />
            <template #fallback>
              <div class="h-full overflow-y-auto p-4 lg:p-6">
                <div class="flex flex-col items-center justify-center h-48 lg:h-64 text-gray-500 px-4">
                  <div class="animate-pulse">
                    <div class="h-4 bg-gray-200 rounded w-48 mb-2"></div>
                    <div class="h-4 bg-gray-200 rounded w-32"></div>
                  </div>
                </div>
              </div>
            </template>
          </ClientOnly>
        </div>
        
        <div class="flex-shrink-0">
          <ClientOnly>
            <AddTask @task-added="handleTaskAdded" />
            <template #fallback>
              <div class="p-4 lg:p-6 border-t border-gray-200 bg-white">
                <div class="animate-pulse">
                  <div class="h-10 bg-gray-200 rounded"></div>
                </div>
              </div>
            </template>
          </ClientOnly>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'
import TaskList from './components/TaskList.vue'
import AddTask from './components/AddTask.vue'

definePageMeta({
  layout: false
})

const taskListRef = ref<InstanceType<typeof TaskList> | null>(null)

const showMobileMenu = ref(false)

const handleTaskAdded = (taskText: string) => {
  if (taskListRef.value) {
    taskListRef.value.addTask(taskText)
  }
}

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const closeMobileMenu = () => {
  showMobileMenu.value = false
}
</script>

<style scoped>
</style>