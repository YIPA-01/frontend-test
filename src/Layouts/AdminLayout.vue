<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth.js';
import ApplicationLogo from '../components/ApplicationLogo.vue';
import {
    Dropdown,
    DropdownTrigger,
    DropdownContent,
    DropdownItem,
    NavLink,
    Button,
    ThemeSwitcher
} from '@/components';
import Toast from '../components/Toast.vue';
import { ToastProvider } from '../components/ui/toast';
import { useToast } from '../composables/useToast';

const showingNavigationDropdown = ref(false);
const route = useRoute();
const router = useRouter();
const { user, logout } = useAuth();
const { messages, showSuccess, showError } = useToast();

const handleLogout = async () => {
    try {
        await logout();
    } catch (error) {
        console.error('Logout error:', error);
    }
};

// Helper function to check if route is active
const isRouteActive = (routeName) => {
    return route.name && route.name.startsWith(routeName);
};
</script>

<template>
    <ToastProvider>
        <div>
            <div class="min-h-screen bg-background">
                <nav class="border-b">
                    <!-- Primary Navigation Menu -->
                    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div class="flex h-16 justify-between">
                            <div class="flex">
                                <!-- Logo -->
                                <div class="flex shrink-0 items-center">
                                    <router-link to="/admin/dashboard">
                                        <ApplicationLogo class="block h-9 w-auto fill-current text-foreground" />
                                    </router-link>
                                </div>

                                <!-- Navigation Links -->
                                <div class="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                    <NavLink to="/admin/dashboard" :active="isRouteActive('admin.dashboard')">
                                        Dashboard
                                    </NavLink>
                                    <NavLink to="/admin/skills" :active="isRouteActive('admin.skills')">
                                        Skills
                                    </NavLink>
                                    <NavLink to="/admin/education" :active="isRouteActive('admin.education')">
                                        Education
                                    </NavLink>
                                    <NavLink to="/admin/projects" :active="isRouteActive('admin.projects')">
                                        Projects
                                    </NavLink>
                                    <NavLink to="/admin/messages" :active="isRouteActive('admin.messages')">
                                        Messages
                                    </NavLink>
                                </div>
                            </div>

                            <div class="hidden sm:ml-6 sm:flex sm:items-center">
                                <!-- Theme Switcher -->
                                <ThemeSwitcher />

                                <!-- Settings Dropdown -->
                                <div class="ml-3 relative">
                                    <Dropdown align="right" width="48">
                                        <template #trigger>
                                            <DropdownTrigger>
                                                <Button variant="ghost" class="gap-2">
                                                    {{ user?.name }}
                                                    <svg
                                                        class="h-4 w-4"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fill-rule="evenodd"
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                            clip-rule="evenodd"
                                                        />
                                                    </svg>
                                                </Button>
                                            </DropdownTrigger>
                                        </template>

                                        <DropdownContent>
                                            <DropdownItem>
                                                <button @click="handleLogout" class="w-full text-left">
                                                    Log Out
                                                </button>
                                            </DropdownItem>
                                        </DropdownContent>
                                    </Dropdown>
                                </div>
                            </div>

                            <!-- Hamburger -->
                            <div class="-mr-2 flex items-center sm:hidden">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    @click="showingNavigationDropdown = !showingNavigationDropdown"
                                >
                                    <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                        <path
                                            :class="{
                                                hidden: showingNavigationDropdown,
                                                'inline-flex': !showingNavigationDropdown,
                                            }"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                        <path
                                            :class="{
                                                hidden: !showingNavigationDropdown,
                                                'inline-flex': showingNavigationDropdown,
                                            }"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </Button>
                            </div>
                        </div>
                    </div>

                    <!-- Responsive Navigation Menu -->
                    <div
                        :class="{
                            block: showingNavigationDropdown,
                            hidden: !showingNavigationDropdown,
                        }"
                        class="sm:hidden"
                    >
                        <div class="space-y-1 pb-3 pt-2">
                            <NavLink to="/admin/dashboard" :active="isRouteActive('admin.dashboard')" class="block px-3 py-2">
                                Dashboard
                            </NavLink>
                            <NavLink to="/admin/skills" :active="isRouteActive('admin.skills')" class="block px-3 py-2">
                                Skills
                            </NavLink>
                            <NavLink to="/admin/education" :active="isRouteActive('admin.education')" class="block px-3 py-2">
                                Education
                            </NavLink>
                            <NavLink to="/admin/projects" :active="isRouteActive('admin.projects')" class="block px-3 py-2">
                                Projects
                            </NavLink>
                            <NavLink to="/admin/messages" :active="isRouteActive('admin.messages')" class="block px-3 py-2">
                                Messages
                            </NavLink>
                        </div>

                        <!-- Responsive Settings Options -->
                        <div class="border-t pb-1 pt-4">
                            <div class="px-4">
                                <div class="text-base font-medium">{{ user?.name }}</div>
                                <div class="text-sm text-muted-foreground">{{ user?.email }}</div>
                            </div>

                            <div class="mt-3 space-y-1">
                                <Button
                                    variant="ghost"
                                    class="w-full justify-start px-4 py-2"
                                    @click="handleLogout"
                                >
                                    Log Out
                                </Button>
                            </div>
                        </div>
                    </div>
                </nav>

                <!-- Page Heading -->
                <header v-if="$slots.header" class="border-b bg-background shadow-sm">
                    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <slot name="header" />
                    </div>
                </header>

                <!-- Page Content -->
                <main>
                    <slot />
                </main>
            </div>

            <!-- Toast Messages -->
            <template v-for="msg in messages" :key="msg.id">
                <Toast :variant="msg.type">
                    {{ msg.message }}
                </Toast>
            </template>
        </div>
    </ToastProvider>
</template> 