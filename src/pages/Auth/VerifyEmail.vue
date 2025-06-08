<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useAuth } from '../../composables/useAuth.js';
import GuestLayout from '../../Layouts/GuestLayout.vue';
import PrimaryButton from '../../components/PrimaryButton.vue';

const route = useRoute();
const { resendEmailVerification, logout, loading, error } = useAuth();

const status = ref(route.query.status || '');
const success = ref('');
const errors = ref({});

const verificationLinkSent = computed(
    () => status.value === 'verification-link-sent' || !!success.value,
);

const submit = async () => {
    errors.value = {};
    success.value = '';
    
    try {
        const response = await resendEmailVerification();
        success.value = 'A new verification link has been sent to your email address.';
        status.value = 'verification-link-sent';
    } catch (err) {
        if (err.response?.data?.errors) {
            errors.value = err.response.data.errors;
        } else {
            errors.value.general = err.response?.data?.message || 'Failed to resend verification email';
        }
    }
};

const handleLogout = async () => {
    try {
        await logout();
    } catch (err) {
        // Logout errors are handled in the composable
    }
};
</script>

<template>
    <GuestLayout>
        <div class="mb-4 text-sm text-gray-600">
            Thanks for signing up! Before getting started, could you verify your
            email address by clicking on the link we just emailed to you? If you
            didn't receive the email, we will gladly send you another.
        </div>

        <div
            class="mb-4 text-sm font-medium text-green-600"
            v-if="verificationLinkSent"
        >
            {{ success || 'A new verification link has been sent to the email address you provided during registration.' }}
        </div>

        <div v-if="error" class="mb-4 text-sm font-medium text-red-600">
            {{ error }}
        </div>

        <form @submit.prevent="submit">
            <div class="mt-4 flex items-center justify-between">
                <PrimaryButton
                    :class="{ 'opacity-25': loading }"
                    :disabled="loading"
                >
                    Resend Verification Email
                </PrimaryButton>

                <button
                    type="button"
                    @click="handleLogout"
                    class="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Log Out
                </button>
            </div>
        </form>
    </GuestLayout>
</template>
