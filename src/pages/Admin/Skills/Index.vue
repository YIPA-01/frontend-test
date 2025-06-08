<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useApi } from '../../../composables/useApi.js';
import AdminLayout from '../../../Layouts/AdminLayout.vue';
import { Button, SkillLevel } from '@/components';
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
const skills = ref([]);

const loadSkills = async () => {
    loading.value = true;
    try {
        const response = await api.get('/admin/skills');
        skills.value = response.data;
    } catch (error) {
        console.error('Failed to load skills:', error);
        // You could show a toast error here
    } finally {
        loading.value = false;
    }
};

const deleteSkill = async (skillId) => {
    if (confirm('Are you sure you want to delete this skill?')) {
        try {
            await api.delete(`/admin/skills/${skillId}`);
            // Remove from local state
            skills.value = skills.value.filter(skill => skill.id !== skillId);
            // You could show a success toast here
        } catch (error) {
            console.error('Failed to delete skill:', error);
            // You could show an error toast here
        }
    }
};

const toggleVisibility = async (skill) => {
    try {
        const updatedSkill = {
            ...skill,
            is_visible: !skill.is_visible
        };
        
        await api.put(`/admin/skills/${skill.id}`, updatedSkill);
        
        // Update local state
        const index = skills.value.findIndex(s => s.id === skill.id);
        if (index !== -1) {
            skills.value[index] = { ...skills.value[index], is_visible: !skills.value[index].is_visible };
        }
        
        // You could show a success toast here
    } catch (error) {
        console.error('Failed to update skill visibility:', error);
        // You could show an error toast here
    }
};

onMounted(() => {
    loadSkills();
});
</script>

<template>
    <AdminLayout>
        <template #header>
            <div class="flex items-center justify-between">
                <h2 class="text-xl font-semibold text-foreground">Skills Management</h2>
                <Button @click="router.push('/admin/skills/create')">
                    Add New Skill
                </Button>
            </div>
        </template>

        <div class="container py-6">
            <Card>
                <CardHeader>
                    <CardTitle>Skills</CardTitle>
                </CardHeader>
                <CardContent>
                    <!-- Loading State -->
                    <div v-if="loading" class="flex justify-center py-8">
                        <div class="text-sm text-muted-foreground">Loading skills...</div>
                    </div>

                    <!-- Skills Table -->
                    <Table v-else>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Level</TableHead>
                                <TableHead>Visibility</TableHead>
                                <TableHead class="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow v-for="skill in skills" :key="skill.id">
                                <TableCell>{{ skill.name }}</TableCell>
                                <TableCell>
                                    <SkillLevel :level="skill.level" />
                                </TableCell>
                                <TableCell>
                                    <Button
                                        size="sm"
                                        :variant="skill.is_visible ? 'outline' : 'ghost'"
                                        @click="toggleVisibility(skill)"
                                    >
                                        {{ skill.is_visible ? 'Visible' : 'Hidden' }}
                                    </Button>
                                </TableCell>
                                <TableCell class="text-right">
                                    <div class="flex items-center justify-end gap-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            @click="router.push(`/admin/skills/${skill.id}/edit`)"
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            @click="deleteSkill(skill.id)"
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                            <TableRow v-if="skills.length === 0 && !loading">
                                <TableCell
                                    colspan="4"
                                    class="h-24 text-center text-muted-foreground"
                                >
                                    No skills found. Start by adding a new skill.
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    </AdminLayout>
</template> 