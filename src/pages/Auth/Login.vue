<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuth } from '../../composables/useAuth.js';
import Checkbox from '../../components/Checkbox.vue';
import GuestLayout from '../../Layouts/GuestLayout.vue';
import InputError from '../../components/InputError.vue';
import InputLabel from '../../components/InputLabel.vue';
import PrimaryButton from '../../components/PrimaryButton.vue';
import TextInput from '../../components/TextInput.vue';

const router = useRouter();
const route = useRoute();
const { login, loading, error } = useAuth();

const form = ref({
    email: '',
    password: '',
    remember: false,
});

const errors = ref({});
const status = ref(route.query.status || '');
const canResetPassword = ref(true); // This would come from your backend config

const submit = async () => {
    errors.value = {};
    
    try {
        console.log('Starting login process...');
        const response = await login({
            email: form.value.email,
            password: form.value.password,
            remember: form.value.remember,
        });
        
        console.log('Login response:', response);
        console.log('Current user after login:', response.user);
        console.log('Is admin:', response.user?.is_admin);
        
        // Redirect to intended page or admin dashboard
        const redirectTo = route.query.redirect || '/admin/dashboard';
        console.log('Redirecting to:', redirectTo);
        router.push(redirectTo);
    } catch (err) {
        console.error('Login error:', err);
        form.value.password = '';
        
        if (err.response?.data?.errors) {
            errors.value = err.response.data.errors;
        } else {
            errors.value.general = err.response?.data?.message || 'Login failed';
        }
    }
};
</script>

<template>
    <GuestLayout>
        <div v-if="status" class="mb-4 text-sm font-medium text-green-600">
            {{ status }}
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

            <div class="mt-4">
                <InputLabel for="password" value="Password" />

                <TextInput
                    id="password"
                    type="password"
                    class="mt-1 block w-full"
                    v-model="form.password"
                    required
                    autocomplete="current-password"
                />

                <InputError class="mt-2" :message="errors.password" />
            </div>

            <div class="mt-4 block">
                <label class="flex items-center">
                    <Checkbox name="remember" v-model:checked="form.remember" />
                    <span class="ms-2 text-sm text-gray-600"
                        >Remember me</span
                    >
                </label>
            </div>

            <div class="mt-4 flex items-center justify-end">
                <router-link
                    v-if="canResetPassword"
                    to="/forgot-password"
                    class="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Forgot your password?
                </router-link>

                <PrimaryButton
                    class="ms-4"
                    :class="{ 'opacity-25': loading }"
                    :disabled="loading"
                >
                    Log in
                </PrimaryButton>
            </div>
        </form>
    </GuestLayout>
</template>
