<script setup lang="ts">
  // Define the props for the text input component with explicit types and defaults
  const props = defineProps({
    label: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: '',
    },
  });

  const emit = defineEmits<{
    'update:value': [value: string];
  }>();

  const handleInputChange = (event: Event) => {
    const inputElement = event.target as HTMLInputElement;
    emit('update:value', inputElement.value);
  };
</script>

<template>
  <div class="text-input-container">

    <label v-if="props.label" :for="props.label" class="input-label">
      {{ props.label }}
    </label>

    <input
      v-bind="$attrs" 
      type="text"
      :value="props.value"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :readonly="props.readonly"
      @input="handleInputChange"
      class="text-input"
    />

    <div v-if="props.error" class="error-message">
      {{ props.error }}
    </div>
  </div>
</template>

<style scoped>
.text-input-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-label {
  font-size: 1.2rem;
  width: 500px;
  color: #333;
}

.text-input {
  padding: 0.5rem;
  font-size: 1rem;
  border: 2px solid #ccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
}

.text-input:disabled {
  background-color: #f1f1f1;
}

.error-message {
  color: red;
  font-size: 0.875rem;
}
</style>
