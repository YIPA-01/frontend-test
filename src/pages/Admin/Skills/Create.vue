<script setup>
import AdminLayout from '../../../Layouts/AdminLayout.vue';
import SkillForm from './Form.vue';
</script>

<template>
    <AdminLayout>
        <template #header>
            <h2 class="text-xl font-semibold text-foreground">Create Skill</h2>
        </template>

        <div class="container py-6">
            <SkillForm mode="create" />
        </div>
    </AdminLayout>
</template> 