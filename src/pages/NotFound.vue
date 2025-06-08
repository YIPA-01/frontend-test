<template>
  <div class="min-h-screen flex items-center justify-center bg-background">
    <div class="max-w-md mx-auto text-center px-4">
      <div class="mb-8">
        <h1 class="text-9xl font-bold text-primary opacity-50">404</h1>
      </div>
      
      <div class="mb-8 space-y-4">
        <h2 class="text-2xl font-bold text-foreground">Page Not Found</h2>
        <p class="text-muted-foreground">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
      </div>
      
      <div class="space-y-4">
        <button
          @click="$router.push('/')"
          class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          Go Home
        </button>
        
        <button
          @click="$router.back()"
          class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 ml-4"
        >
          Go Back
        </button>
      </div>
      
      <div class="mt-8 text-xs text-muted-foreground">
        If you believe this is an error, please contact the administrator.
      </div>
    </div>
  </div>
</template>

<script setup>
// 404 Not Found page component
</script>

<style scoped>
/* Component-specific styles if needed */
</style> 