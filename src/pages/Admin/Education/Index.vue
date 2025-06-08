<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useApi } from '../../../composables/useApi.js';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Switch
} from '@/components'
import AdminLayout from '../../../Layouts/AdminLayout.vue';

const router = useRouter();
const api = useApi();

const loading = ref(false);
const education = ref([]);

const loadEducation = async () => {
    loading.value = true;
    try {
        const response = await api.get('/admin/education');
        education.value = response.data;
    } catch (error) {
        console.error('Failed to load education:', error);
        // You could show a toast error here
    } finally {
        loading.value = false;
    }
};

const deleteEducation = async (id) => {
    if (confirm('Are you sure you want to delete this education entry?')) {
        try {
            await api.delete(`/admin/education/${id}`);
            // Remove from local state
            education.value = education.value.filter(item => item.id !== id);
            // You could show a success toast here
        } catch (error) {
            console.error('Failed to delete education:', error);
            // You could show an error toast here
        }
    }
};

const toggleVisibility = async (educationItem) => {
    try {
        const updatedEducation = {
            ...educationItem,
            is_visible: !educationItem.is_visible
        };
        
        await api.put(`/admin/education/${educationItem.id}`, updatedEducation);
        
        // Update local state
        const index = education.value.findIndex(item => item.id === educationItem.id);
        if (index !== -1) {
            education.value[index] = { ...education.value[index], is_visible: !education.value[index].is_visible };
        }
        
        // You could show a success toast here
    } catch (error) {
        console.error('Failed to update education visibility:', error);
        // You could show an error toast here
    }
};

onMounted(() => {
    loadEducation();
});
</script>

<template>
  <AdminLayout>
    <template #header>
      <h2 class="text-xl font-semibold text-foreground">Education Management</h2>
    </template>

    <div class="container py-6">
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Education List</CardTitle>
          <Button @click="router.push('/admin/education/create')">
            Add New Education
          </Button>
        </CardHeader>
        <CardContent>
          <!-- Loading State -->
          <div v-if="loading" class="flex justify-center py-8">
            <div class="text-sm text-muted-foreground">Loading education...</div>
          </div>

          <!-- Education Table -->
          <Table v-else>
            <TableHeader>
              <TableRow>
                <TableHead>School</TableHead>
                <TableHead>Degree</TableHead>
                <TableHead>Field</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Visible</TableHead>
                <TableHead class="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-if="education.length === 0 && !loading">
                <TableCell colspan="6" class="text-center">No education entries found.</TableCell>
              </TableRow>
              <TableRow v-for="item in education" :key="item.id">
                <TableCell>{{ item.school }}</TableCell>
                <TableCell>{{ item.degree }}</TableCell>
                <TableCell>{{ item.field }}</TableCell>
                <TableCell>{{ item.start_date }} - {{ item.end_date || 'Present' }}</TableCell>
                <TableCell>
                  <Switch
                    :model-value="item.is_visible"
                    @update:model-value="toggleVisibility(item)"
                  />
                </TableCell>
                <TableCell class="text-right">
                  <div class="flex justify-end gap-2">
                    <Button variant="outline" size="sm" @click="router.push(`/admin/education/${item.id}/edit`)">
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      @click="deleteEducation(item.id)"
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  </AdminLayout>
</template> 