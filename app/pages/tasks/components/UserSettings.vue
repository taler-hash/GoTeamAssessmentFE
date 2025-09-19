<template>
  <div class="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
    <div class="px-4 py-3 border-b border-gray-100">
      <div class="flex items-center space-x-3">
        <div class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
          <svg class="h-5 w-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
        <div>
          <p class="text-sm font-medium text-gray-900">User</p>
          <p class="text-xs text-gray-500">user@example.com</p>
        </div>
      </div>
    </div>
    
    <div class="py-1">
      <button
        @click="handleLogout"
        class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center space-x-3"
      >
        <svg class="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        <span>Logout</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from "primevue/usetoast";
const toast = useToast();
const { logout } = useSanctumAuth()

const handleLogout = async () => {
  try {
    await logout()
    await navigateTo('/login')
    toast.add({ severity: 'success', summary: 'Success', detail: 'Logged out successfully', life: 3000 });
  } catch (error) {
    console.error('Logout failed:', error)
    toast.add({ severity: 'error', summary: 'Error', detail: 'Logout failed', life: 3000 });
  }
}
</script>