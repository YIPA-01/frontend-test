<script setup>
import { computed } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps({
  href: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
  class: {
    type: String,
    default: '',
  },
})

const classes = computed(() => {
  return cn(
    'inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors hover:text-foreground/80',
    {
      'text-foreground border-b-2 border-primary': props.active,
      'text-foreground/60': !props.active,
    },
    props.class
  )
})
</script>

<template>
  <router-link :to="href" :class="classes">
    <slot />
  </router-link>
</template> 