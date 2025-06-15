<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useAuth } from '../../composables/useAuth.js';
import GuestLayout from '../../Layouts/GuestLayout.vue';
import InputError from '../../components/InputError.vue';
import InputLabel from '../../components/InputLabel.vue';
import PrimaryButton from '../../components/PrimaryButton.vue';
import TextInput from '../../components/TextInput.vue';

const route = useRoute();
const { forgotPassword, loading, error } = useAuth();

const form = ref({
    email: '',
});

const errors = ref({});
const status = ref(route.query.status || '');
const success = ref('');

const submit = async () => {
    errors.value = {};
    success.value = '';
    
    try {
        const response = await forgotPassword(form.value.email);
        success.value = response.message || 'Password reset link sent to your email!';
        form.value.email = '';
    } catch (err) {
        if (err.response?.data?.errors) {
            errors.value = err.response.data.errors;
        } else {
            errors.value.general = err.response?.data?.message || 'Failed to send reset email';
        }
    }
};
</script>

<template>
    <GuestLayout>
        <div class="mb-4 text-sm text-gray-600">
            Forgot your password? No problem. Just let us know your email
            address and we will email you a password reset link that will allow
            you to choose a new one.
        </div>

        <div
            v-if="status"
            class="mb-4 text-sm font-medium text-green-600"
        >
            {{ status }}
        </div>

        <div v-if="success" class="mb-4 text-sm font-medium text-green-600">
            {{ success }}
        </div>

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

            <div class="mt-4 flex items-center justify-end">
                <PrimaryButton
                    :class="{ 'opacity-25': loading }"
                    :disabled="loading"
                >
                    Email Password Reset Link
                </PrimaryButton>
            </div>
        </form>
    </GuestLayout>
</template>
