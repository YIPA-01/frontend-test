<script setup>
import AdminLayout from '../../../Layouts/AdminLayout.vue';
import ProjectForm from './Form.vue';
</script>

<template>
    <AdminLayout>
        <template #header>
            <h2 class="text-xl font-semibold text-foreground">Create Project</h2>
        </template>

        <div class="container py-6">
            <ProjectForm mode="create" />
        </div>
    </AdminLayout>
</template> 