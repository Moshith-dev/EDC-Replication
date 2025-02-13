<script setup lang="ts">
const modelValue = defineModel<string | number | null>({ default: null });

const props = withDefaults(defineProps<{
  label: string;
  name: string;
  value: string | number;
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
}>(), {
  label: "",
  name: "",
  value: "",
  checked: false,
  disabled: false,
  required: false,
});

const emit = defineEmits<{
  "on-change": [selectedValue: string];
}>();

const preSelected = ref<boolean>(props.checked);

// Simple computed value for input ID
const getInputId = computed(() => props.name || props.label.toLowerCase().replace(/\s+/g, '_'));

// Simplified function for change event
const onChange = (event: Event) => {
  const selectedValue = (event.currentTarget as HTMLInputElement).value;
  emit("on-change", selectedValue);
};

onMounted(() => {
  // Set initial selection state
  if (modelValue.value === props.value) preSelected.value = true;
});
</script>

<template>
  <div class="flex items-center gap-2">
    <!-- Radio Input -->
    <input
      :id="getInputId"
      v-model?="modelValue"
      :value="props.value"
      type="radio"
      :name="props.name"
      :checked="preSelected"
      :disabled="props.disabled"
      :required="props.required"
      @change="onChange"
    />

    <!-- Label for radio button -->
    <label :for="getInputId" :class="{ 'text-gray-400': props.disabled }">{{ props.label }}</label>
  </div>
</template>

<style scoped>
/* Simplified styling */
input[type="radio"] {
  width: 1rem;
  height: 1rem;
}

label {
  font-size: 1rem;
  cursor: pointer;
}
</style>
