<script setup>
import { ref, onMounted } from 'vue';
import { useApi } from '../../composables/useApi.js';
import GuestLayout from '../../Layouts/GuestLayout.vue';
import EducationTimeline from '../../components/guest/education/EducationTimeline.vue';
import { Card, CardContent, CardHeader, CardTitle } from '@/components';

const api = useApi();

const loading = ref(false);
const education = ref([]);

const loadEducation = async () => {
    loading.value = true;
    try {
        const response = await api.get('/education');
        education.value = response.data;
    } catch (error) {
        console.error('Failed to load education:', error);
        // You could show a toast error here
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    loadEducation();
});
</script>

<template>
    <GuestLayout>
        <div class="container py-12">
            <Card>
                <CardHeader>
                    <CardTitle class="text-2xl font-bold tracking-tight">Education</CardTitle>
                </CardHeader>
                <CardContent class="pt-6">
                    <!-- Loading State -->
                    <div v-if="loading" class="flex justify-center py-8">
                        <div class="text-sm text-muted-foreground">Loading education...</div>
                    </div>

                    <!-- Education Timeline -->
                    <EducationTimeline v-else :education="education" />
                </CardContent>
            </Card>
        </div>
    </GuestLayout>
</template> 