<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useApi } from '../../../composables/useApi.js';
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Switch
} from '@/components';

const props = defineProps({
  mode: {
    type: String,
    required: true,
    validator: value => ['create', 'edit'].includes(value)
  },
  education: {
    type: Object,
    default: () => ({
      school: '',
      degree: '',
      field: '',
      start_date: '',
      end_date: '',
      description: '',
      is_visible: true
    })
  }
});

const router = useRouter();
const api = useApi();

const form = reactive({
  school: props.education.school || '',
  degree: props.education.degree || '',
  field: props.education.field || '',
  start_date: props.education.start_date || '',
  end_date: props.education.end_date || '',
  description: props.education.description || '',
  is_visible: Boolean(props.education.is_visible ?? true)
});

const errors = ref({});
const processing = ref(false);

const submit = async () => {
  processing.value = true;
  errors.value = {};

  try {
    if (props.mode === 'create') {
      await api.post('/admin/education', form);
      console.log('Education created successfully');
      // You could show a success toast here
      router.push('/admin/education');
    } else {
      await api.put(`/admin/education/${props.education.id}`, form);
      console.log('Education updated successfully');
      // You could show a success toast here
      router.push('/admin/education');
    }
  } catch (error) {
    console.error('Form submission errors:', error);
    if (error.response?.data?.errors) {
      errors.value = error.response.data.errors;
    }
    // You could show an error toast here
  } finally {
    processing.value = false;
  }
};
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>{{ mode === 'create' ? 'Add New Education' : 'Edit Education' }}</CardTitle>
    </CardHeader>
    <CardContent>
      <form @submit.prevent="submit" class="space-y-4">
        <div>
          <Label for="school">School</Label>
          <Input
            id="school"
            v-model="form.school"
            type="text"
            placeholder="Enter school name"
            :class="{ 'border-destructive ring-destructive': errors.school }"
          />
          <span v-if="errors.school" class="text-sm text-destructive">{{ errors.school[0] }}</span>
        </div>

        <div>
          <Label for="degree">Degree</Label>
          <Input
            id="degree"
            v-model="form.degree"
            type="text"
            placeholder="Enter degree"
            :class="{ 'border-destructive ring-destructive': errors.degree }"
          />
          <span v-if="errors.degree" class="text-sm text-destructive">{{ errors.degree[0] }}</span>
        </div>

        <div>
          <Label for="field">Field of Study</Label>
          <Input
            id="field"
            v-model="form.field"
            type="text"
            placeholder="Enter field of study"
            :class="{ 'border-destructive ring-destructive': errors.field }"
          />
          <span v-if="errors.field" class="text-sm text-destructive">{{ errors.field[0] }}</span>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <Label for="start_date">Start Date</Label>
            <Input
              id="start_date"
              v-model="form.start_date"
              type="date"
              :class="{ 'border-destructive ring-destructive': errors.start_date }"
            />
            <span v-if="errors.start_date" class="text-sm text-destructive">{{ errors.start_date[0] }}</span>
          </div>

          <div>
            <Label for="end_date">End Date</Label>
            <Input
              id="end_date"
              v-model="form.end_date"
              type="date"
              :class="{ 'border-destructive ring-destructive': errors.end_date }"
            />
            <span v-if="errors.end_date" class="text-sm text-destructive">{{ errors.end_date[0] }}</span>
          </div>
        </div>

        <div>
          <Label for="description">Description</Label>
          <textarea
            id="description"
            v-model="form.description"
            rows="4"
            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Enter education description"
            :class="{ 'border-destructive': errors.description }"
          />
          <span v-if="errors.description" class="text-sm text-destructive">{{ errors.description[0] }}</span>
        </div>

        <div class="flex items-center space-x-2">
          <Switch id="is_visible" v-model="form.is_visible" />
          <Label for="is_visible">Visible</Label>
        </div>
      </form>
    </CardContent>
    <CardFooter class="flex justify-end">
      <Button type="submit" @click="submit" :disabled="processing">
        {{ mode === 'create' ? 'Create Education' : 'Update Education' }}
      </Button>
    </CardFooter>
  </Card>
</template> 