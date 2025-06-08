<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useApi } from '../../../composables/useApi.js';
import AdminLayout from '../../../Layouts/AdminLayout.vue';
import { Button } from '@/components';
import { Card, CardContent, CardHeader, CardTitle } from '@/components';

const route = useRoute();
const router = useRouter();
const api = useApi();

const loading = ref(false);
const message = ref(null);

const loadMessage = async () => {
    loading.value = true;
    try {
        const response = await api.get(`/admin/messages/${route.params.id}`);
        message.value = response.data;
    } catch (error) {
        console.error('Failed to load message:', error);
        // You could show a toast error here
        router.push('/admin/messages');
    } finally {
        loading.value = false;
    }
};

const deleteMessage = async () => {
    if (confirm('Are you sure you want to delete this message?')) {
        try {
            await api.delete(`/admin/messages/${message.value.id}`);
            // You could show a success toast here
            router.push('/admin/messages');
        } catch (error) {
            console.error('Failed to delete message:', error);
            // You could show an error toast here
        }
    }
};

const toggleRead = async () => {
    try {
        await api.put(`/admin/messages/${message.value.id}/toggle-read`);
        
        // Update local state
        message.value = { ...message.value, is_read: !message.value.is_read };
        
        // You could show a success toast here
    } catch (error) {
        console.error('Failed to toggle message read status:', error);
        // You could show an error toast here
    }
};

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

onMounted(() => {
    loadMessage();
});
</script>

<template>
    <AdminLayout>
        <template #header>
            <div class="flex items-center justify-between">
                <h2 class="text-xl font-semibold text-foreground">View Message</h2>
                <Button
                    variant="outline"
                    @click="router.push('/admin/messages')"
                >
                    Back to Messages
                </Button>
            </div>
        </template>

        <div class="container py-6">
            <!-- Loading State -->
            <div v-if="loading" class="flex justify-center py-8">
                <div class="text-sm text-muted-foreground">Loading message...</div>
            </div>

            <!-- Message Details -->
            <Card v-else-if="message">
                <CardHeader>
                    <div class="flex items-start justify-between">
                        <div>
                            <CardTitle class="text-lg">{{ message.name }}</CardTitle>
                            <p class="text-sm text-muted-foreground mt-1">
                                {{ message.email }}
                            </p>
                            <p class="text-xs text-muted-foreground mt-1">
                                Received on {{ formatDate(message.created_at) }}
                            </p>
                        </div>
                        <div class="flex items-center gap-2">
                            <Button
                                size="sm"
                                :variant="message.is_read ? 'ghost' : 'outline'"
                                @click="toggleRead"
                            >
                                {{ message.is_read ? 'Mark as Unread' : 'Mark as Read' }}
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div class="space-y-4">
                        <div>
                            <h3 class="text-sm font-medium text-muted-foreground mb-2">Message:</h3>
                            <div class="bg-muted/50 p-4 rounded-lg">
                                <p class="whitespace-pre-wrap text-sm">{{ message.content }}</p>
                            </div>
                        </div>

                        <div class="flex items-center gap-2 pt-4 border-t">
                            <Button
                                variant="outline"
                                :href="`mailto:${message.email}?subject=Re: Your message&body=Hi ${message.name},%0A%0AThank you for your message:%0A%0A${encodeURIComponent(message.content)}%0A%0A`"
                                target="_blank"
                            >
                                Reply via Email
                            </Button>
                            <Button
                                variant="destructive"
                                @click="deleteMessage"
                            >
                                Delete Message
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <!-- Error State -->
            <Card v-else>
                <CardContent class="py-8">
                    <div class="text-center text-muted-foreground">
                        <p>Message not found.</p>
                        <Button
                            variant="outline"
                            class="mt-4"
                            @click="router.push('/admin/messages')"
                        >
                            Back to Messages
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    </AdminLayout>
</template> 