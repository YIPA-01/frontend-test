<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAuth } from '../../../composables/useAuth.js';
import { useForm } from '../../../composables/useApi.js';
import InputError from '../../../components/InputError.vue';
import InputLabel from '../../../components/InputLabel.vue';
import PrimaryButton from '../../../components/PrimaryButton.vue';
import TextInput from '../../../components/TextInput.vue';

const props = defineProps({
    mustVerifyEmail: {
        type: Boolean,
    },
    status: {
        type: String,
    },
});

const { user, resendEmailVerification } = useAuth();

const form = useForm({
    name: '',
    email: '',
});

// Initialize form with user data
onMounted(() => {
    if (user.value) {
        form.name = user.value.name || '';
        form.email = user.value.email || '';
    }
});

const isEmailUnverified = computed(() => {
    return props.mustVerifyEmail && user.value && !user.value.email_verified_at;
});

const submit = async () => {
    try {
        await form.patch('/profile', {
            onSuccess: () => {
                // Update user data in auth store if needed
                // This would typically be handled by the backend response
            }
        });
    } catch (error) {
        console.error('Profile update error:', error);
    }
};

const sendVerificationEmail = async () => {
    try {
        await resendEmailVerification();
    } catch (error) {
        console.error('Failed to send verification email:', error);
    }
};
</script>

<template>
    <section>
        <header>
            <h2 class="text-lg font-medium text-gray-900">
                Profile Information
            </h2>

            <p class="mt-1 text-sm text-gray-600">
                Update your account's profile information and email address.
            </p>
        </header>

        <form @submit.prevent="submit" class="mt-6 space-y-6">
            <div>
                <InputLabel for="name" value="Name" />

                <TextInput
                    id="name"
                    type="text"
                    class="mt-1 block w-full"
                    v-model="form.name"
                    required
                    autofocus
                    autocomplete="name"
                />

                <InputError class="mt-2" :message="form.errors.name" />
            </div>

            <div>
                <InputLabel for="email" value="Email" />

                <TextInput
                    id="email"
                    type="email"
                    class="mt-1 block w-full"
                    v-model="form.email"
                    required
                    autocomplete="username"
                />

                <InputError class="mt-2" :message="form.errors.email" />
            </div>

            <div v-if="isEmailUnverified">
                <p class="mt-2 text-sm text-gray-800">
                    Your email address is unverified.
                    <button
                        type="button"
                        @click="sendVerificationEmail"
                        class="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Click here to re-send the verification email.
                    </button>
                </p>

                <div
                    v-show="status === 'verification-link-sent'"
                    class="mt-2 text-sm font-medium text-green-600"
                >
                    A new verification link has been sent to your email address.
                </div>
            </div>

            <div class="flex items-center gap-4">
                <PrimaryButton :disabled="form.processing">Save</PrimaryButton>

                <Transition
                    enter-active-class="transition ease-in-out"
                    enter-from-class="opacity-0"
                    leave-active-class="transition ease-in-out"
                    leave-to-class="opacity-0"
                >
                    <p
                        v-if="form.recentlySuccessful"
                        class="text-sm text-gray-600"
                    >
                        Saved.
                    </p>
                </Transition>
            </div>
        </form>
    </section>
</template>
