<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useApi } from '../../../composables/useApi.js';
import AdminLayout from '../../../Layouts/AdminLayout.vue';
import { Button } from '@/components';
import { Card, CardContent, CardHeader, CardTitle } from '@/components';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components';

const router = useRouter();
const api = useApi();

const loading = ref(false);
const projects = ref([]);

const loadProjects = async () => {
    loading.value = true;
    try {
        const response = await api.get('/admin/projects');
        projects.value = response.data;
    } catch (error) {
        console.error('Failed to load projects:', error);
        // You could show a toast error here
    } finally {
        loading.value = false;
    }
};

const deleteProject = async (projectId) => {
    if (confirm('Are you sure you want to delete this project?')) {
        try {
            await api.delete(`/admin/projects/${projectId}`);
            // Remove from local state
            projects.value = projects.value.filter(project => project.id !== projectId);
            // You could show a success toast here
        } catch (error) {
            console.error('Failed to delete project:', error);
            // You could show an error toast here
        }
    }
};

const toggleVisibility = async (project) => {
    try {
        const updatedProject = {
            ...project,
            is_visible: !project.is_visible
        };
        
        await api.put(`/admin/projects/${project.id}`, updatedProject);
        
        // Update local state
        const index = projects.value.findIndex(p => p.id === project.id);
        if (index !== -1) {
            projects.value[index] = { ...projects.value[index], is_visible: !projects.value[index].is_visible };
        }
        
        // You could show a success toast here
    } catch (error) {
        console.error('Failed to update project visibility:', error);
        // You could show an error toast here
    }
};

onMounted(() => {
    loadProjects();
});
</script>

<template>
    <AdminLayout>
        <template #header>
            <div class="flex items-center justify-between">
                <h2 class="text-xl font-semibold text-foreground">Projects Management</h2>
                <Button @click="router.push('/admin/projects/create')">
                    Add New Project
                </Button>
            </div>
        </template>

        <div class="container py-6">
            <Card>
                <CardHeader>
                    <CardTitle>Projects</CardTitle>
                </CardHeader>
                <CardContent>
                    <!-- Loading State -->
                    <div v-if="loading" class="flex justify-center py-8">
                        <div class="text-sm text-muted-foreground">Loading projects...</div>
                    </div>

                    <!-- Projects Table -->
                    <Table v-else>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Technologies</TableHead>
                                <TableHead>Images</TableHead>
                                <TableHead>Visibility</TableHead>
                                <TableHead class="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow v-for="project in projects" :key="project.id">
                                <TableCell>
                                    <div>
                                        <div class="font-medium">{{ project.title }}</div>
                                        <div class="text-sm text-muted-foreground truncate max-w-xs">
                                            {{ project.description }}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div class="flex flex-wrap gap-1">
                                        <span 
                                            v-for="tech in project.technologies?.slice(0, 3)" 
                                            :key="tech"
                                            class="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs text-primary"
                                        >
                                            {{ tech }}
                                        </span>
                                        <span 
                                            v-if="project.technologies?.length > 3"
                                            class="inline-flex items-center rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground"
                                        >
                                            +{{ project.technologies.length - 3 }}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div class="flex items-center gap-2">
                                        <div 
                                            v-if="project.images?.length > 0"
                                            class="flex -space-x-2"
                                        >
                                            <img 
                                                v-for="(image, index) in project.images.slice(0, 3)" 
                                                :key="image.id"
                                                :src="image.url" 
                                                :alt="`Project image ${index + 1}`"
                                                class="h-8 w-8 rounded-full border-2 border-background object-cover"
                                            />
                                        </div>
                                        <span class="text-sm text-muted-foreground">
                                            {{ project.images?.length || 0 }} image{{ project.images?.length !== 1 ? 's' : '' }}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        size="sm"
                                        :variant="project.is_visible ? 'outline' : 'ghost'"
                                        @click="toggleVisibility(project)"
                                    >
                                        {{ project.is_visible ? 'Visible' : 'Hidden' }}
                                    </Button>
                                </TableCell>
                                <TableCell class="text-right">
                                    <div class="flex items-center justify-end gap-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            @click="router.push(`/admin/projects/${project.id}/edit`)"
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            @click="deleteProject(project.id)"
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                            <TableRow v-if="projects.length === 0 && !loading">
                                <TableCell
                                    colspan="5"
                                    class="h-24 text-center text-muted-foreground"
                                >
                                    No projects found. Start by adding a new project.
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    </AdminLayout>
</template> 