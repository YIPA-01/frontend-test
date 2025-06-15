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
const messages = ref([]);

const loadMessages = async () => {
    loading.value = true;
    try {
        const response = await api.get('/admin/messages');
        messages.value = response.data;
    } catch (error) {
        console.error('Failed to load messages:', error);
        // You could show a toast error here
    } finally {
        loading.value = false;
    }
};

const deleteMessage = async (messageId) => {
    if (confirm('Are you sure you want to delete this message?')) {
        try {
            await api.delete(`/admin/messages/${messageId}`);
            // Remove from local state
            messages.value = messages.value.filter(message => message.id !== messageId);
            // You could show a success toast here
        } catch (error) {
            console.error('Failed to delete message:', error);
            // You could show an error toast here
        }
    }
};

const toggleRead = async (message) => {
    try {
        await api.put(`/admin/messages/${message.id}/toggle-read`);
        
        // Update local state
        const index = messages.value.findIndex(m => m.id === message.id);
        if (index !== -1) {
            messages.value[index] = { ...messages.value[index], is_read: !messages.value[index].is_read };
        }
        
        // You could show a success toast here
    } catch (error) {
        console.error('Failed to toggle message read status:', error);
        // You could show an error toast here
    }
};

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

onMounted(() => {
    loadMessages();
});
</script>

<template>
    <AdminLayout>
        <template #header>
            <div class="flex items-center justify-between">
                <h2 class="text-xl font-semibold text-foreground">Messages Management</h2>
            </div>
        </template>

        <div class="container py-6">
            <Card>
                <CardHeader>
                    <CardTitle>Messages</CardTitle>
                </CardHeader>
                <CardContent>
                    <!-- Loading State -->
                    <div v-if="loading" class="flex justify-center py-8">
                        <div class="text-sm text-muted-foreground">Loading messages...</div>
                    </div>

                    <!-- Messages Table -->
                    <Table v-else>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Status</TableHead>
                                <TableHead>From</TableHead>
                                <TableHead>Message</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead class="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow 
                                v-for="message in messages" 
                                :key="message.id"
                                :class="{ 'bg-muted/50': !message.is_read }"
                            >
                                <TableCell>
                                    <Button
                                        size="sm"
                                        :variant="message.is_read ? 'ghost' : 'outline'"
                                        @click="toggleRead(message)"
                                    >
                                        {{ message.is_read ? 'Read' : 'Unread' }}
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <div>
                                        <div class="font-medium">{{ message.name }}</div>
                                        <div class="text-sm text-muted-foreground">
                                            {{ message.email }}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div class="max-w-md">
                                        <p class="truncate text-sm">{{ message.content }}</p>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div class="text-sm text-muted-foreground">
                                        {{ formatDate(message.created_at) }}
                                    </div>
                                </TableCell>
                                <TableCell class="text-right">
                                    <div class="flex items-center justify-end gap-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            @click="router.push(`/admin/messages/${message.id}`)"
                                        >
                                            View
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            @click="deleteMessage(message.id)"
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                            <TableRow v-if="messages.length === 0 && !loading">
                                <TableCell
                                    colspan="5"
                                    class="h-24 text-center text-muted-foreground"
                                >
                                    No messages found.
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    </AdminLayout>
</template> 