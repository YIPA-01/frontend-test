<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const props = defineProps({
    to: {
        type: [String, Object],
        required: true,
    },
    active: {
        type: Boolean,
        default: null,
    },
});

// Auto-detect active state if not explicitly provided
const isActive = computed(() => {
    if (props.active !== null) {
        return props.active;
    }
    
    // Auto-detect based on current route
    if (typeof props.to === 'string') {
        return route.path === props.to;
    }
    
    if (typeof props.to === 'object' && props.to.name) {
        return route.name === props.to.name;
    }
    
    return false;
});

const classes = computed(() =>
    isActive.value
        ? 'block w-full ps-3 pe-4 py-2 border-l-4 border-indigo-400 text-start text-base font-medium text-indigo-700 bg-indigo-50 focus:outline-none focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700 transition duration-150 ease-in-out'
        : 'block w-full ps-3 pe-4 py-2 border-l-4 border-transparent text-start text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out',
);
</script>

<template>
    <router-link :to="to" :class="classes">
        <slot />
    </router-link>
</template>
