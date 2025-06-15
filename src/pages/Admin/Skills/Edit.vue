<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useApi } from '../../../composables/useApi.js';
import AdminLayout from '../../../Layouts/AdminLayout.vue';
import SkillForm from './Form.vue';

const route = useRoute();
const api = useApi();

const loading = ref(false);
const skill = ref(null);

const loadSkill = async () => {
    loading.value = true;
    try {
        const response = await api.get(`/admin/skills/${route.params.id}`);
        skill.value = response.data;
    } catch (error) {
        console.error('Failed to load skill:', error);
        // You could redirect to skills index or show an error
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    loadSkill();
});
</script>

<template>
    <AdminLayout>
        <template #header>
            <h2 class="text-xl font-semibold text-foreground">Edit Skill</h2>
        </template>

        <div class="container py-6">
            <!-- Loading State -->
            <div v-if="loading" class="flex justify-center py-8">
                <div class="text-sm text-muted-foreground">Loading skill...</div>
            </div>

            <!-- Skill Form -->
            <SkillForm
                v-else-if="skill"
                mode="edit"
                :skill="skill"
            />

            <!-- Error State -->
            <div v-else class="text-center py-8">
                <div class="text-sm text-muted-foreground">Skill not found</div>
            </div>
        </div>
    </AdminLayout>
</template>