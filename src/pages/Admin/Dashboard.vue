<script setup>
import { ref, onMounted } from 'vue';
import { useApi } from '../../composables/useApi.js';
import AdminLayout from '../../Layouts/AdminLayout.vue';
import { formatDistanceToNow } from 'date-fns';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter
} from '@/components';

const api = useApi();
const loading = ref(false);
const stats = ref({
    skills: { total: 0, visible: 0 },
    education: { total: 0, visible: 0 },
    projects: { total: 0, visible: 0 },
    messages: { total: 0, unread: 0 }
});
const recentMessages = ref([]);

const loadDashboardData = async () => {
    loading.value = true;
    try {
        const [statsData, messagesData] = await Promise.all([
            api.get('/admin/dashboard/stats'),
            api.get('/admin/dashboard/recent-messages')
        ]);
        
        stats.value = statsData.data;
        recentMessages.value = messagesData.data;
    } catch (error) {
        console.error('Failed to load dashboard data:', error);
        // You could show a toast error here
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    loadDashboardData();
});
</script>

<template>
    <AdminLayout>
        <template #header>
            <h2 class="text-2xl font-semibold leading-tight">
                Dashboard
            </h2>
        </template>

        <div class="py-12">
            <div class="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
                <!-- Loading State -->
                <div v-if="loading" class="flex justify-center">
                    <div class="text-sm text-muted-foreground">Loading dashboard...</div>
                </div>

                <!-- Stats Grid -->
                <div v-else class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <!-- Skills Stats -->
                    <Card>
                        <CardHeader>
                            <CardTitle>Skills</CardTitle>
                            <CardDescription>Manage your skills</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div class="space-y-1">
                                <p class="text-sm text-muted-foreground">Total: {{ stats.skills.total }}</p>
                                <p class="text-sm text-muted-foreground">Visible: {{ stats.skills.visible }}</p>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <router-link
                                to="/admin/skills"
                                class="text-sm text-primary hover:text-primary/80"
                            >
                                Manage Skills →
                            </router-link>
                        </CardFooter>
                    </Card>

                    <!-- Education Stats -->
                    <Card>
                        <CardHeader>
                            <CardTitle>Education</CardTitle>
                            <CardDescription>Manage your education</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div class="space-y-1">
                                <p class="text-sm text-muted-foreground">Total: {{ stats.education.total }}</p>
                                <p class="text-sm text-muted-foreground">Visible: {{ stats.education.visible }}</p>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <router-link
                                to="/admin/education"
                                class="text-sm text-primary hover:text-primary/80"
                            >
                                Manage Education →
                            </router-link>
                        </CardFooter>
                    </Card>

                    <!-- Projects Stats -->
                    <Card>
                        <CardHeader>
                            <CardTitle>Projects</CardTitle>
                            <CardDescription>Manage your projects</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div class="space-y-1">
                                <p class="text-sm text-muted-foreground">Total: {{ stats.projects.total }}</p>
                                <p class="text-sm text-muted-foreground">Visible: {{ stats.projects.visible }}</p>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <router-link
                                to="/admin/projects"
                                class="text-sm text-primary hover:text-primary/80"
                            >
                                Manage Projects →
                            </router-link>
                        </CardFooter>
                    </Card>

                    <!-- Messages Stats -->
                    <Card>
                        <CardHeader>
                            <CardTitle>Messages</CardTitle>
                            <CardDescription>View your messages</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div class="space-y-1">
                                <p class="text-sm text-muted-foreground">Total: {{ stats.messages.total }}</p>
                                <p class="text-sm text-muted-foreground">Unread: {{ stats.messages.unread }}</p>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <router-link
                                to="/admin/messages"
                                class="text-sm text-primary hover:text-primary/80"
                            >
                                View All Messages →
                            </router-link>
                        </CardFooter>
                    </Card>
                </div>

                <!-- Recent Messages -->
                <Card v-if="!loading">
                    <CardHeader>
                        <div class="flex items-center justify-between">
                            <div>
                                <CardTitle>Recent Messages</CardTitle>
                                <CardDescription>Your latest messages</CardDescription>
                            </div>
                            <router-link
                                v-if="recentMessages.length"
                                to="/admin/messages"
                                class="text-sm text-primary hover:text-primary/80"
                            >
                                View All →
                            </router-link>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div v-if="recentMessages.length" class="space-y-4">
                            <div
                                v-for="message in recentMessages"
                                :key="message.id"
                                class="border-b pb-4 last:border-0 last:pb-0"
                            >
                                <div class="flex items-start justify-between">
                                    <div>
                                        <div class="flex items-center gap-2">
                                            <h4 class="font-medium">
                                                {{ message.name }}
                                            </h4>
                                            <span
                                                v-if="!message.is_read"
                                                class="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
                                            >
                                                New
                                            </span>
                                        </div>
                                        <p class="text-sm text-muted-foreground">{{ message.email }}</p>
                                    </div>
                                    <router-link
                                        :to="`/admin/messages/${message.id}`"
                                        class="text-sm text-primary hover:text-primary/80"
                                    >
                                        View →
                                    </router-link>
                                </div>
                                <p class="mt-2 line-clamp-2 text-sm text-muted-foreground">
                                    {{ message.content }}
                                </p>
                                <p class="mt-1 text-xs text-muted-foreground">
                                    {{ formatDistanceToNow(new Date(message.created_at), { addSuffix: true }) }}
                                </p>
                            </div>
                        </div>
                        <p
                            v-else
                            class="py-4 text-center text-sm text-muted-foreground"
                        >
                            No messages yet.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    </AdminLayout>
</template> 