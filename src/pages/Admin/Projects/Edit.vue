<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useApi } from '../../../composables/useApi.js';
import AdminLayout from '../../../Layouts/AdminLayout.vue';
import ProjectForm from './Form.vue';

const route = useRoute();
const api = useApi();

const loading = ref(false);
const project = ref(null);

const loadProject = async () => {
    loading.value = true;
    try {
        const response = await api.get(`/admin/projects/${route.params.id}`);
        project.value = response.data;
    } catch (error) {
        console.error('Failed to load project:', error);
        // You could redirect to projects index or show an error
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    loadProject();
});
</script>

<template>
    <AdminLayout>
        <template #header>
            <h2 class="text-xl font-semibold text-foreground">Edit Project</h2>
        </template>

        <div class="container py-6">
            <!-- Loading State -->
            <div v-if="loading" class="flex justify-center py-8">
                <div class="text-sm text-muted-foreground">Loading project...</div>
            </div>

            <!-- Project Form -->
            <ProjectForm
                v-else-if="project"
                mode="edit"
                :project="project"
            />

            <!-- Error State -->
            <div v-else class="text-center py-8">
                <div class="text-sm text-muted-foreground">Project not found</div>
            </div>
        </div>
    </AdminLayout>
</template> 