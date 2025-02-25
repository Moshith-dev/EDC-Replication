<script setup lang="ts">
import { ref } from 'vue';

const props = withDefaults(defineProps<{
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  error?: string;
}>(), {
  label: '',
  placeholder: '',
  disabled: false,
  readonly: false,
  error: '',
});
const localValue = ref("");
</script>

<template>
  <div class="text-input-container">
    <label v-if="label" :for="label" class="text-lg font-medium">
      {{ label }}
    </label>
    <input type="text" v-model="localValue" :placeholder="placeholder" :disabled="disabled" :readonly="readonly"
      class="text-input" />
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </div>
</template>


<style scoped>
.text-input-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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
