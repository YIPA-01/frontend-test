<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Button } from '@/components'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components'

const props = defineProps({
  project: {
    type: Object,
    required: true
  }
})

const currentIndex = ref(0)
const isDialogOpen = ref(false)
const dialogImageIndex = ref(0)

// Computed properties
const images = computed(() => {
  return props.project.images || []
})

const hasImages = computed(() => {
  return images.value.length > 0
})

const currentImage = computed(() => {
  if (!hasImages.value) return null
  return images.value[currentIndex.value]
})

const currentDialogImage = computed(() => {
  if (!hasImages.value) return null
  return images.value[dialogImageIndex.value]
})

// Navigation methods
const nextImage = () => {
  if (images.value.length > 1) {
    currentIndex.value = (currentIndex.value + 1) % images.value.length
  }
}

const previousImage = () => {
  if (images.value.length > 1) {
    currentIndex.value = currentIndex.value === 0 ? images.value.length - 1 : currentIndex.value - 1
  }
}

const goToImage = (index) => {
  if (index >= 0 && index < images.value.length) {
    currentIndex.value = index
  }
}

// Dialog navigation methods
const nextDialogImage = () => {
  if (images.value.length > 1) {
    dialogImageIndex.value = (dialogImageIndex.value + 1) % images.value.length
  }
}

const previousDialogImage = () => {
  if (images.value.length > 1) {
    dialogImageIndex.value = dialogImageIndex.value === 0 ? images.value.length - 1 : dialogImageIndex.value - 1
  }
}

const goToDialogImage = (index) => {
  if (index >= 0 && index < images.value.length) {
    dialogImageIndex.value = index
  }
}

// Dialog methods
const openDialog = (imageIndex = null) => {
  dialogImageIndex.value = imageIndex !== null ? imageIndex : currentIndex.value
  isDialogOpen.value = true
}

const closeDialog = () => {
  isDialogOpen.value = false
}

// Error handling
const handleImageError = (event) => {
  console.error('Failed to load image:', event.target.src)
  // You could set a fallback image here if needed
}

// Keyboard navigation
const handleKeydown = (event) => {
  if (isDialogOpen.value) {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault()
        previousDialogImage()
        break
      case 'ArrowRight':
        event.preventDefault()
        nextDialogImage()
        break
      case 'Escape':
        event.preventDefault()
        closeDialog()
        break
    }
  } else if (hasImages.value && images.value.length > 1) {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault()
        previousImage()
        break
      case 'ArrowRight':
        event.preventDefault()
        nextImage()
        break
    }
  }
}

// Lifecycle
onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden group">
    <!-- Main Image Display -->
    <div v-if="hasImages" class="relative w-full h-full">
      <img
        :src="currentImage.url"
        :alt="`${project.title} - Image ${currentIndex + 1}`"
        class="w-full h-full object-cover transition-opacity duration-300 cursor-pointer hover:opacity-90"
        @error="handleImageError"
        @click="openDialog(currentIndex)"
      />
      
      <!-- Click to view overlay -->
      <div class="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-200 cursor-pointer flex items-center justify-center opacity-0 group-hover:opacity-100" @click="openDialog(currentIndex)">
        <div class="bg-white bg-opacity-90 rounded-full p-2">
          <svg class="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path>
          </svg>
        </div>
      </div>
      
      <!-- Navigation Arrows (show only if multiple images) -->
      <template v-if="images.length > 1">
        <button
          @click.stop="previousImage"
          class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-opacity-70 z-10"
          aria-label="Previous image"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        
        <button
          @click.stop="nextImage"
          class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-opacity-70 z-10"
          aria-label="Next image"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </template>
      
      <!-- Image Counter -->
      <div v-if="images.length > 1" class="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm z-10">
        {{ currentIndex + 1 }} / {{ images.length }}
      </div>
      
      <!-- Dot Indicators (show only if multiple images) -->
      <div v-if="images.length > 1" class="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        <button
          v-for="(image, index) in images"
          :key="image.id"
          @click.stop="goToImage(index)"
          :class="[
            'w-2 h-2 rounded-full transition-all duration-200',
            index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50 hover:bg-opacity-75'
          ]"
          :aria-label="`Go to image ${index + 1}`"
        ></button>
      </div>
    </div>
    
    <!-- Placeholder when no images -->
    <div v-else class="flex items-center justify-center w-full h-full bg-gray-200">
      <div class="text-center text-gray-500">
        <svg class="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
        <p class="text-sm">No images available</p>
      </div>
    </div>
  </div>

  <!-- Image Dialog -->
  <Dialog v-model:open="isDialogOpen">
    <DialogContent class="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
      <DialogHeader class="p-6 pb-2 relative">
        <DialogTitle class="text-xl font-semibold pr-10">
          {{ project.title }}
          <span v-if="images.length > 1" class="text-sm font-normal text-muted-foreground ml-2">
            ({{ dialogImageIndex + 1 }} of {{ images.length }})
          </span>
        </DialogTitle>
        
        <!-- Close Button -->
        <button
          @click="closeDialog"
          class="absolute right-6 top-6 p-2 rounded-full hover:bg-muted transition-colors duration-200"
          aria-label="Close dialog"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </DialogHeader>
      
      <div class="relative">
        <!-- Dialog Image Display -->
        <div class="relative bg-black">
          <img
            v-if="currentDialogImage"
            :src="currentDialogImage.url"
            :alt="`${project.title} - Image ${dialogImageIndex + 1}`"
            class="w-full max-h-[70vh] object-contain"
            @error="handleImageError"
          />
          
          <!-- Dialog Navigation Arrows -->
          <template v-if="images.length > 1">
            <button
              @click="previousDialogImage"
              class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-70 text-white p-3 rounded-full hover:bg-opacity-90 transition-all duration-200"
              aria-label="Previous image"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            
            <button
              @click="nextDialogImage"
              class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-70 text-white p-3 rounded-full hover:bg-opacity-90 transition-all duration-200"
              aria-label="Next image"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </template>
        </div>
        
        <!-- Dialog Thumbnails -->
        <div v-if="images.length > 1" class="p-4 bg-background border-t">
          <div class="flex gap-2 justify-center overflow-x-auto">
            <button
              v-for="(image, index) in images"
              :key="image.id"
              @click="goToDialogImage(index)"
              :class="[
                'flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200',
                index === dialogImageIndex ? 'border-primary' : 'border-transparent hover:border-muted-foreground'
              ]"
            >
              <img
                :src="image.url"
                :alt="`Thumbnail ${index + 1}`"
                class="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template> 