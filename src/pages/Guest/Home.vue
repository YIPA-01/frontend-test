<script setup>
import { ref } from 'vue';
import { mockProjects, mockSkills, mockEducation } from '../../data/mockData.js';
import GuestLayout from '../../Layouts/GuestLayout.vue';

// Import section components
import HeroSection from '../../components/guest/home/HeroSection.vue';
import AboutSection from '../../components/guest/home/AboutSection.vue';
import ServicesSection from '../../components/guest/home/ServicesSection.vue';
import SkillsSection from '../../components/guest/home/SkillsSection.vue';
import ProjectsSection from '../../components/guest/home/ProjectsSection.vue';
import ContactSection from '../../components/guest/home/ContactSection.vue';

// Use static data from mockData.js instead of API calls
const projects = ref(mockProjects.filter(project => project.featured));
const skills = ref(mockSkills);
const education = ref(mockEducation);
const loading = ref(false);
</script>

<template>
    <GuestLayout>
        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center min-h-screen">
            <div class="text-lg text-muted-foreground">Loading...</div>
        </div>

        <!-- Content -->
        <div v-else>
            <!-- Hero Section -->
            <HeroSection id="hero" />

            <!-- About Me Section -->
            <AboutSection id="about" :education="education" />

            <!-- Services Section -->
            <ServicesSection id="services" />

            <!-- Skills Section -->
            <SkillsSection id="skills" :skills="skills" />

            <!-- Projects Section -->
            <ProjectsSection id="projects" :projects="projects" />

            <!-- Contact CTA -->
            <ContactSection id="contact" />
        </div>
    </GuestLayout>
</template>

<style scoped>
/* Enhanced Keyframe Animations */
@import '../../app.css';
</style>