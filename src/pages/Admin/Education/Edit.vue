<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useApi } from '../../../composables/useApi.js';
import AdminLayout from '../../../Layouts/AdminLayout.vue';
import EducationForm from './Form.vue';

const route = useRoute();
const api = useApi();

const loading = ref(false);
const education = ref(null);

const loadEducation = async () => {
    loading.value = true;
    try {
        const response = await api.get(`/admin/education/${route.params.id}`);
        education.value = response.data;
    } catch (error) {
        console.error('Failed to load education:', error);
        // You could redirect to education index or show an error
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    loadEducation();
});
</script>

<template>
    <AdminLayout>
        <template #header>
            <h2 class="text-xl font-semibold text-foreground">Edit Education</h2>
        </template>

        <div class="container py-6">
            <!-- Loading State -->
            <div v-if="loading" class="flex justify-center py-8">
                <div class="text-sm text-muted-foreground">Loading education...</div>
            </div>

            <!-- Education Form -->
            <EducationForm
                v-else-if="education"
                mode="edit"
                :education="education"
            />

            <!-- Error State -->
            <div v-else class="text-center py-8">
                <div class="text-sm text-muted-foreground">Education not found</div>
            </div>
        </div>
    </AdminLayout>
</template>