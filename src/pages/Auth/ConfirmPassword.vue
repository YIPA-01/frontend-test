<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useForm } from '../../composables/useApi.js';
import GuestLayout from '../../Layouts/GuestLayout.vue';
import InputError from '../../components/InputError.vue';
import InputLabel from '../../components/InputLabel.vue';
import PrimaryButton from '../../components/PrimaryButton.vue';
import TextInput from '../../components/TextInput.vue';

const form = useForm({
    password: '',
});

const router = useRouter();
const route = useRoute();

const submit = async () => {
    try {
        // This would typically call a confirm password endpoint
        await form.post('/confirm-password');
        
        // Redirect to the intended route or dashboard
        const redirectTo = route.query.redirect || '/dashboard';
        router.push(redirectTo);
    } catch (error) {
        // Form errors are handled by the useForm composable
        console.error('Password confirmation error:', error);
    }
};
</script>

<template>
    <GuestLayout>
        <Head title="Confirm Password" />

        <div class="mb-4 text-sm text-gray-600">
            This is a secure area of the application. Please confirm your
            password before continuing.
        </div>

        <form @submit.prevent="submit">
            <div>
                <InputLabel for="password" value="Password" />
                <TextInput
                    id="password"
                    type="password"
                    class="mt-1 block w-full"
                    v-model="form.password"
                    required
                    autocomplete="current-password"
                    autofocus
                />
                <InputError class="mt-2" :message="form.errors.password" />
            </div>

            <div class="mt-4 flex justify-end">
                <PrimaryButton
                    class="ms-4"
                    :class="{ 'opacity-25': form.processing }"
                    :disabled="form.processing"
                >
                    Confirm
                </PrimaryButton>
            </div>
        </form>
    </GuestLayout>
</template>
