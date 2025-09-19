export default defineNuxtRouteMiddleware((to, from) => {
  const { user } = useSanctumAuth()

  // Define public routes that don't require authentication
  const publicRoutes = ['/login', '/register', '/forgot-password']
  
  // If user is authenticated and trying to access login/register pages, redirect to tasks
  if (user.value && (to.path === '/login')) {
    return navigateTo('/tasks')
  }
  
  // Skip authentication check for other public routes
  if (publicRoutes.includes(to.path)) {
    return
  }

  // Redirect to login if user is not authenticated
  if(!user.value) {
    return navigateTo('/login')
  }
})
