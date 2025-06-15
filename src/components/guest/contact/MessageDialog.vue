<script setup>
import { reactive, ref } from 'vue';
import { useApi } from '../../../composables/useApi.js';
import { Button, Label, Input, Textarea } from '@/components';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../../ui/dialog';
import { useToast } from '../../../composables/useToast.js';


const props = defineProps({
    triggerText: {
        type: String,
        default: 'Start a Conversation'
    },
    variant: {
        type: String,
        default: 'default'
    },
    size: {
        type: String,
        default: 'default'
    }
});

const api = useApi();
const { success, error } = useToast();

const form = reactive({
    name: '',
    email: '',
    content: ''
});

const errors = ref({});
const processing = ref(false);
const isOpen = ref(false);

const submit = async () => {
    processing.value = true;
    errors.value = {};

    try {
        await api.post('/contact', form);
        
        // Reset form
        form.name = '';
        form.email = '';
        form.content = '';
        
        // Close dialog
        isOpen.value = false;
        
        // Show success message
        success('Message sent successfully! We will get back to you soon.');
    } catch (apiError) {
        console.error('Failed to send message:', apiError);
        if (apiError.response?.data?.errors) {
            errors.value = apiError.response.data.errors;
        } else {
            error('Failed to send message. Please try again.');
        }
    } finally {
        processing.value = false;
    }
};
</script>

<template>
    <Dialog v-model:open="isOpen">
        <DialogTrigger>
            <Button :variant="variant" :size="size" @click="isOpen = true">
                {{ triggerText }}
            </Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Send a Message</DialogTitle>
                <DialogDescription>
                    Send me a message and I'll get back to you as soon as possible.
                </DialogDescription>
            </DialogHeader>
            <form @submit.prevent="submit" class="space-y-6 mt-4">
                <div class="space-y-2">
                    <Label for="name">Name</Label>
                    <Input
                        id="name"
                        v-model="form.name"
                        type="text"
                        placeholder="Your name"
                        :class="{ 'border-destructive ring-destructive': errors.name }"
                    />
                    <p v-if="errors.name" class="text-sm text-destructive">
                        {{ errors.name[0] }}
                    </p>
                </div>

                <div class="space-y-2">
                    <Label for="email">Email</Label>
                    <Input
                        id="email"
                        v-model="form.email"
                        type="email"
                        placeholder="your.email@example.com"
                        :class="{ 'border-destructive ring-destructive': errors.email }"
                    />
                    <p v-if="errors.email" class="text-sm text-destructive">
                        {{ errors.email[0] }}
                    </p>
                </div>

                <div class="space-y-2">
                    <Label for="content">Message</Label>
                    <Textarea
                        id="content"
                        v-model="form.content"
                        placeholder="Your message..."
                        rows="4"
                        :class="{ 'border-destructive ring-destructive': errors.content }"
                    />
                    <p v-if="errors.content" class="text-sm text-destructive">
                        {{ errors.content[0] }}
                    </p>
                </div>

                <div class="flex justify-end gap-3">
                    <Button 
                        type="button" 
                        variant="outline"
                        @click="isOpen = false"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        :disabled="processing"
                    >
                        Send Message
                    </Button>
                </div>
            </form>
        </DialogContent>
    </Dialog>
</template> 