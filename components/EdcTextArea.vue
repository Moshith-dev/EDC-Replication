<script setup lang="ts">
  const modelValue = defineModel<string | null>({ default: null });

  const props = withDefaults(defineProps<{
    cols?: number;
    rows?: number;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    readonly?: boolean;
    error?: string;
    showCharacterCount?: boolean;
    max?: number;
  }>(), {
    cols: 50,
    rows: 4,
    label: "",
    placeholder: "",
    disabled: false,
    required: false,
    readonly: false,
    error: "",
    showCharacterCount: false,
    max: 1000,
  });

  watch(
    () => modelValue.value,
    (newValue) => {
      if (newValue && newValue.length > props.max) {
        modelValue.value = newValue.slice(0, props.max);
      }
    },
  );
</script>

<template>
  <div class="container">
    <label v-if="props.label" class="text-lg font-medium">{{ props.label }} <span v-if="props.required">*</span></label>
    <textarea v-model="modelValue" :rows="props.rows" :cols="props.cols" :disabled="props.disabled" :placeholder="props.placeholder" :readonly="props.readonly" />
    <div v-if="props.showCharacterCount && !props.readonly">
      <span>{{ modelValue?.length || 0 }} / {{ props.max }}</span>
    </div>
    <div v-if="props.error" class="error-text">
      <span>{{ props.error }}</span>
    </div>
  </div>
</template>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .error-text {
    color: red;
    font-size: 0.875rem;
  }
  textarea {
    resize: none;
    padding: 0.5rem;
    border: 1px solid #ccc;
  }
</style>
