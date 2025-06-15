<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuth } from '../../composables/useAuth.js';
import GuestLayout from '../../Layouts/GuestLayout.vue';
import InputError from '../../components/InputError.vue';
import InputLabel from '../../components/InputLabel.vue';
import PrimaryButton from '../../components/PrimaryButton.vue';
import TextInput from '../../components/TextInput.vue';

const route = useRoute();
const router = useRouter();
const { resetPassword, loading, error } = useAuth();

// Get token and email from URL query parameters
const token = route.query.token || '';
const email = route.query.email || '';

const form = ref({
    token: token,
    email: email,
    password: '',
    password_confirmation: '',
});

const errors = ref({});

const submit = async () => {
    errors.value = {};
    
    try {
        await resetPassword(
            form.value.token,
            form.value.email,
            form.value.password,
            form.value.password_confirmation
        );
        
        // Redirect to login page with success message
        router.push({
            name: 'login',
            query: { status: 'Password reset successfully! You can now log in.' }
        });
    } catch (err) {
        form.value.password = '';
        form.value.password_confirmation = '';
        
        if (err.response?.data?.errors) {
            errors.value = err.response.data.errors;
        } else {
            errors.value.general = err.response?.data?.message || 'Password reset failed';
        }
    }
};
</script>

<template>
    <GuestLayout>
        <div v-if="error" class="mb-4 text-sm font-medium text-red-600">
            {{ error }}
        </div>

        <form @submit.prevent="submit">
            <div>
                <InputLabel for="email" value="Email" />

                <TextInput
                    id="email"
                    type="email"
                    class="mt-1 block w-full"
                    v-model="form.email"
                    required
                    autofocus
                    autocomplete="username"
                />

                <InputError class="mt-2" :message="errors.email" />
            </div>

            <div class="mt-4">
                <InputLabel for="password" value="Password" />

                <TextInput
                    id="password"
                    type="password"
                    class="mt-1 block w-full"
                    v-model="form.password"
                    required
                    autocomplete="new-password"
                />

                <InputError class="mt-2" :message="errors.password" />
            </div>

            <div class="mt-4">
                <InputLabel
                    for="password_confirmation"
                    value="Confirm Password"
                />

                <TextInput
                    id="password_confirmation"
                    type="password"
                    class="mt-1 block w-full"
                    v-model="form.password_confirmation"
                    required
                    autocomplete="new-password"
                />

                <InputError
                    class="mt-2"
                    :message="errors.password_confirmation"
                />
            </div>

            <div class="mt-4 flex items-center justify-end">
                <PrimaryButton
                    :class="{ 'opacity-25': loading }"
                    :disabled="loading"
                >
                    Reset Password
                </PrimaryButton>
            </div>
        </form>
    </GuestLayout>
</template>
