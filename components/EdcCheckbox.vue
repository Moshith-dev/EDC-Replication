<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    label?: string;
    modelValue?: boolean;
    required?: boolean;
    inputClass?: string;
    labelClass?: string;
  }>(),
  {
    label: "",
    modelValue: false,
    required: false,
    inputClass: "h-4 w-4 border-2 border-gray-400 rounded",
    labelClass: "",
  }
);
const model = defineModel<boolean>({ default: true });
</script>

<template>
  <label class="checkbox-container">
    <input
      v-model="model"
      type="checkbox"
      :class="inputClass"
      :aria-required="props.required ? 'true' : 'false'"
    />
    <span v-if="props.label" :class="labelClass">{{ props.label }}</span>
  </label>
</template>

<style scoped>
.checkbox-container {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  cursor: pointer;
}

input[type="checkbox"] {
  cursor: pointer;
}
</style>
