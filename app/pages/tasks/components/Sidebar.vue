<template>
  <div class="w-80 bg-gray-50 border-r border-gray-200 overflow-y-auto h-full shadow-lg lg:shadow-none">
    <div class="lg:hidden flex justify-between items-center p-4 border-b border-gray-200 bg-white">
      <h2 class="text-lg font-semibold text-gray-800">Navigation</h2>
      <button 
        @click="closeSidebar"
        class="text-gray-600 hover:text-black transition-colors p-1 rounded-full hover:bg-gray-100"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    
    <div class="p-4 lg:p-6">
      <div class="space-y-1">
        <div class="bg-black text-white rounded-lg px-3 lg:px-4 py-2 lg:py-3 font-medium cursor-pointer text-sm lg:text-base">
          Today
        </div>
        
        <div class="text-gray-700 px-3 lg:px-4 py-2 lg:py-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors text-sm lg:text-base">
          Yesterday
        </div>
        
        <div class="text-gray-700 px-3 lg:px-4 py-2 lg:py-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors text-sm lg:text-base">
          Sunday, July 27
        </div>
        
        <div class="pt-3 lg:pt-4">
          <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 lg:px-4 py-1 lg:py-2">
            Last week
          </h3>
          <div class="space-y-1">
            <div class="text-gray-700 px-3 lg:px-4 py-2 lg:py-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors text-sm lg:text-base">
              Saturday, July 26
            </div>
            <div class="text-gray-700 px-3 lg:px-4 py-2 lg:py-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors text-sm lg:text-base">
              Friday, July 25
            </div>
            <div class="text-gray-700 px-3 lg:px-4 py-2 lg:py-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors text-sm lg:text-base">
              Thursday, July 24
            </div>
            <div class="text-gray-700 px-3 lg:px-4 py-2 lg:py-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors text-sm lg:text-base">
              Wednesday, July 23
            </div>
            <div class="text-gray-700 px-3 lg:px-4 py-2 lg:py-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors text-sm lg:text-base">
              Tuesday, July 22
            </div>
            <div class="text-gray-700 px-3 lg:px-4 py-2 lg:py-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors text-sm lg:text-base">
              Monday, July 21
            </div>
            <div class="text-gray-700 px-3 lg:px-4 py-2 lg:py-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors text-sm lg:text-base">
              Sunday, July 20
            </div>
          </div>
        </div>
        
        <div class="pt-3 lg:pt-4">
          <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 lg:px-4 py-1 lg:py-2">
            3rd Week of July
          </h3>
          <div class="space-y-1">
            <div class="text-gray-700 px-3 lg:px-4 py-2 lg:py-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors text-sm lg:text-base">
              Saturday, July 19
            </div>
            <div class="text-gray-700 px-3 lg:px-4 py-2 lg:py-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors text-sm lg:text-base">
              Friday, July 18
            </div>
            <div class="text-gray-700 px-3 lg:px-4 py-2 lg:py-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors text-sm lg:text-base">
              Thursday, July 17
            </div>
            <div class="text-gray-700 px-3 lg:px-4 py-2 lg:py-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors text-sm lg:text-base">
              Wednesday, July 16
            </div>
            <div class="text-gray-700 px-3 lg:px-4 py-2 lg:py-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors text-sm lg:text-base">
              Tuesday, July 15
            </div>
            <div class="text-gray-700 px-3 lg:px-4 py-2 lg:py-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors text-sm lg:text-base">
              Monday, July 14
            </div>
            <div class="text-gray-700 px-3 lg:px-4 py-2 lg:py-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors text-sm lg:text-base">
              Sunday, July 13
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type Emits = {
  close: []
}

const emit = defineEmits<Emits>()

const closeSidebar = () => {
  emit('close')
}
</script>

<style scoped>
</style>
