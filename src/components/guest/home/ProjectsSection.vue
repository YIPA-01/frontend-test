<script setup>
import { Button } from '@/components'
import Card from '../../ui/card/Card.vue'
import ProjectImageCarousel from '../../ProjectImageCarousel.vue'

const props = defineProps({
  projects: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <!-- Projects Section -->
  <section class="container py-24 relative overflow-hidden">
    <!-- Floating Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div 
        v-for="i in 10" 
        :key="i"
        class="absolute w-2 h-2 bg-primary/15 rounded-full animate-float-gentle"
        :style="{
          top: Math.random() * 100 + '%',
          left: Math.random() * 100 + '%',
          animationDelay: Math.random() * 4 + 's',
          animationDuration: (3 + Math.random() * 2) + 's'
        }"
      />
    </div>
    
    <div class="mx-auto max-w-7xl relative">
      <!-- Header -->
      <div class="mx-auto max-w-2xl text-center">
        <div class="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
          <div class="w-2 h-2 bg-primary rounded-full animate-pulse mr-2"></div>
          <span class="text-sm font-medium text-primary">Portfolio</span>
        </div>
        
        <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">Featured Projects</h2>
        <p class="mt-4 text-lg text-muted-foreground" style="animation-delay: 0.2s;">
          Showcasing some of my recent work and achievements
        </p>
      </div>
      
      <!-- Projects Grid -->
      <div class="mt-16 grid gap-8 sm:grid-cols-2">
        <Card 
          v-for="(project, index) in projects" 
          :key="project.id"
          class="group overflow-hidden"
          :style="{ animationDelay: (index * 0.2) + 's' }"
        >
          <ProjectImageCarousel :project="project" />
          
          <div class="p-6">
            <h3 class="text-2xl font-semibold">{{ project.title }}</h3>
            <p class="mt-2 text-muted-foreground">{{ project.description }}</p>
            
            <div class="mt-4 flex flex-wrap gap-2">
              <span 
                v-for="tech in project.technologies" 
                :key="tech"
                class="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
              >
                {{ tech }}
              </span>
            </div>
            
            <!-- Action Buttons -->
            <div class="mt-6 flex gap-3">
              <!-- GitHub Button -->
              <a 
                v-if="project.github_url"
                :href="project.github_url" 
                target="_blank" 
                rel="noopener noreferrer"
                class="flex-1"
              >
                <Button variant="outline" class="w-full group">
                  <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span class="group-hover:translate-x-0.5 transition-transform duration-200">GitHub</span>
                </Button>
              </a>
              
              <!-- Live Preview Button -->
              <a 
                v-if="project.live_url"
                :href="project.live_url" 
                target="_blank" 
                rel="noopener noreferrer"
                class="flex-1"
              >
                <Button class="w-full group">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                  </svg>
                  <span class="group-hover:translate-x-0.5 transition-transform duration-200">Live Preview</span>
                </Button>
              </a>
              
              <!-- If no live URL, show GitHub only or placeholder -->
              <div v-if="!project.live_url && project.github_url" class="flex-1">
                <Button variant="ghost" disabled class="w-full cursor-not-allowed opacity-50">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                  </svg>
                  Coming Soon
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      <!-- View All Button -->
      <!-- <div class="mt-12 text-center" style="animation-delay: 0.6s;">
        <Link :href="route('guest.projects.index')">
          <Button variant="outline" size="lg" class="h-12 px-8 group hover:border-primary/50 transition-all duration-300 hover:scale-105">
            <span class="group-hover:translate-x-1 transition-transform duration-300">View All Projects</span>
            <svg class="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </Button>
        </Link>
      </div> -->
    </div>
  </section>
</template> 