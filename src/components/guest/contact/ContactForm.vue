<script setup>
import { useForm } from '../../../composables/useApi.js';
import {
    Button,
    Card,
    CardContent,
    Label,
    Input,
    Textarea,
} from '@/components';

const form = useForm({
    name: '',
    email: '',
    content: ''
});

const submit = async () => {
    try {
        await form.post('/contact', {
            onSuccess: () => {
                form.reset();
                // You can add a toast notification here
            }
        });
    } catch (error) {
        // Error handling is already done in the useForm composable
        console.error('Contact form error:', error);
    }
};
</script>

<template>
    <Card>
        <CardContent class="p-6">
            <form @submit.prevent="submit" class="space-y-6">
                <div class="space-y-2">
                    <Label for="name">Name</Label>
                    <Input
                        id="name"
                        v-model="form.name"
                        type="text"
                        placeholder="Your name"
                        :class="{ 'border-destructive ring-destructive': form.errors.name }"
                    />
                    <p v-if="form.errors.name" class="text-sm text-destructive">
                        {{ form.errors.name }}
                    </p>
                </div>

                <div class="space-y-2">
                    <Label for="email">Email</Label>
                    <Input
                        id="email"
                        v-model="form.email"
                        type="email"
                        placeholder="your.email@example.com"
                        :class="{ 'border-destructive ring-destructive': form.errors.email }"
                    />
                    <p v-if="form.errors.email" class="text-sm text-destructive">
                        {{ form.errors.email }}
                    </p>
                </div>

                <div class="space-y-2">
                    <Label for="content">Message</Label>
                    <Textarea
                        id="content"
                        v-model="form.content"
                        placeholder="Your message..."
                        rows="5"
                        :class="{ 'border-destructive ring-destructive': form.errors.content }"
                    />
                    <p v-if="form.errors.content" class="text-sm text-destructive">
                        {{ form.errors.content }}
                    </p>
                </div>

                <Button
                    type="submit"
                    class="w-full"
                    :disabled="form.processing"
                >
                    Send Message
                </Button>
            </form>
        </CardContent>
    </Card>
</template> 