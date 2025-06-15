<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useApi } from '../../../composables/useApi.js';
import {
    Button,
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
    Label,
    Input,
    Switch,
    SkillLevel
} from '@/components';

const props = defineProps({
    mode: {
        type: String,
        required: true,
        validator: (value) => ['create', 'edit'].includes(value)
    },
    skill: {
        type: Object,
        default: () => ({
            name: '',
            level: '',
            is_visible: true
        })
    }
});

const router = useRouter();
const api = useApi();

const form = reactive({
    name: props.skill.name || '',
    level: String(props.skill.level || ''),
    is_visible: Boolean(props.skill.is_visible ?? true)
});

const errors = ref({});
const processing = ref(false);

const submit = async () => {
    processing.value = true;
    errors.value = {};

    try {
        if (props.mode === 'create') {
            await api.post('/admin/skills', form);
            console.log('Skill created successfully');
            // You could show a success toast here
            router.push('/admin/skills');
        } else {
            await api.put(`/admin/skills/${props.skill.id}`, form);
            console.log('Skill updated successfully');
            // You could show a success toast here
            router.push('/admin/skills');
        }
    } catch (error) {
        console.error('Form submission error:', error);
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
            <CardTitle>{{ mode === 'create' ? 'Add New Skill' : 'Edit Skill' }}</CardTitle>
        </CardHeader>
        <form @submit.prevent="submit">
            <CardContent class="space-y-6">
                <!-- Name Input -->
                <div class="space-y-2">
                    <Label for="name">Name</Label>
                    <Input
                        id="name"
                        v-model="form.name"
                        type="text"
                        placeholder="Enter skill name"
                        :class="{ 'border-destructive ring-destructive': errors.name }"
                    />
                    <p v-if="errors.name" class="text-sm text-destructive">
                        {{ errors.name[0] }}
                    </p>
                </div>

                <!-- Level Input -->
                <div class="space-y-4">
                    <div class="flex items-center justify-between">
                        <Label for="level">Level</Label>
                        <span class="text-sm text-muted-foreground">{{ form.level }}%</span>
                    </div>
                    <div class="grid gap-4">
                        <Input
                            id="level"
                            v-model="form.level"
                            type="text"
                            inputmode="numeric"
                            pattern="[0-9]*"
                            placeholder="Enter skill level (0-100)"
                            :class="{ 'ring-destructive': errors.level }"
                        />
                        <SkillLevel :level="Number(form.level) || 0" className="w-full" />
                    </div>
                    <p v-if="errors.level" class="text-sm text-destructive">
                        {{ errors.level[0] }}
                    </p>
                </div>

                <!-- Visibility Toggle -->
                <div class="space-y-4">
                    <div class="flex items-center justify-between space-x-2">
                        <div class="space-y-0.5">
                            <Label for="is_visible">Visibility</Label>
                            <p class="text-sm text-muted-foreground">
                                Make this skill visible on your portfolio
                            </p>
                        </div>
                        <Switch
                            id="is_visible"
                            v-model="form.is_visible"
                            :class="{ 'ring-destructive': errors.is_visible }"
                        />
                    </div>
                    <p v-if="errors.is_visible" class="text-sm text-destructive">
                        {{ errors.is_visible[0] }}
                    </p>
                </div>
            </CardContent>

            <CardFooter class="flex justify-end space-x-2">
                <Button
                    type="button"
                    variant="outline"
                    @click="router.push('/admin/skills')"
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    :disabled="processing"
                >
                    {{ mode === 'create' ? 'Create Skill' : 'Update Skill' }}
                </Button>
            </CardFooter>
        </form>
    </Card>
</template> 