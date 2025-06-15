<script setup>
import AdminLayout from '../../../Layouts/AdminLayout.vue'
import EducationForm from './Form.vue'
</script>

<template>
  <AdminLayout>
    <template #header>
      <h2 class="text-xl font-semibold text-foreground">Create Education</h2>
    </template>

    <div class="container py-6">
      <EducationForm mode="create" />
    </div>
  </AdminLayout>
</template> 