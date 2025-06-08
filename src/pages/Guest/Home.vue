<script setup>
import { ref, onMounted } from 'vue';
import { useApi } from '../../composables/useApi.js';
import GuestLayout from '../../Layouts/GuestLayout.vue';

// Import section components
import HeroSection from '../../components/guest/home/HeroSection.vue';
import AboutSection from '../../components/guest/home/AboutSection.vue';
import ServicesSection from '../../components/guest/home/ServicesSection.vue';
import SkillsSection from '../../components/guest/home/SkillsSection.vue';
import ProjectsSection from '../../components/guest/home/ProjectsSection.vue';
import ContactSection from '../../components/guest/home/ContactSection.vue';

const api = useApi();
const loading = ref(false);
const projects = ref([]);
const skills = ref([]);
const education = ref([]);

const loadHomeData = async () => {
    loading.value = true;
    try {
        const [projectsData, skillsData, educationData] = await Promise.all([
            api.get('/projects').catch(() => ({ data: [] })),
            api.get('/skills').catch(() => ({ data: [] })),
            api.get('/education').catch(() => ({ data: [] }))
        ]);
        
        projects.value = projectsData.data;
        skills.value = skillsData.data;
        education.value = educationData.data;
    } catch (error) {
        console.error('Failed to load home data:', error);
        // Fallback to empty arrays - page will still render
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    loadHomeData();
});
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