<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core';
import { ref, computed, watch } from 'vue';

import type { TNullableString } from "~/types/common";

// Define the model value for the search query
const modelValue = ref<TNullableString>(null);

// Define the component props
const props = withDefaults(
  defineProps<{
    placeholder?: string;
    isDebounce?: boolean;
    debounceDelay?: number;
    disabled?: boolean;
  }>(),
  {
    placeholder: "Search...",
    isDebounce: true,
    debounceDelay: 500,
    disabled: false,
  }
);

// Define the emit events
const emit = defineEmits<{
  "on-input": [searchQuery: TNullableString];
  "on-search": [searchQuery: TNullableString];
}>();

const inputClasses = computed(() => ({
  "outline-none w-[500px] p-2 border border-gray-500 rounded": true,
  "bg-gray-100": props.disabled,
}));

// Handle input change with optional debounce
const handleInputChange = () => {
  if (props.isDebounce) {
    debouncedSearch();
  } else {
    emit("on-input", modelValue.value);
  }
};

// Debounced search function
const debouncedSearch = useDebounceFn(() => {
  emit("on-search", modelValue.value);
}, props.debounceDelay);

// Clear the search field
const handleClearSearch = () => {
  modelValue.value = null;
  emit("on-search", null);
};

// Watch for model value changes and reset null values
watch(() => modelValue.value, (newValue) => {
  if (!newValue) modelValue.value = null;
});
</script>

<template>
  <div class="flex flex-col gap-2">
    <!-- Search Input Container -->
    <div class="relative flex items-center gap-2">
      <input
        v-model?="modelValue"
        type="text"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :class="inputClasses"
        @input="handleInputChange"
      />
      
      <!-- Clear Button -->
      <button
        v-if="modelValue"
        @click="handleClearSearch"
        :disabled="props.disabled"
        class="absolute right-2 text-gray-500"
      >
        ✖
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Optional: Customize styles further */
input {
  transition: all 0.3s ease;
}
button {
  cursor: pointer;
  border: none;
  background: none;
  font-size: 1rem;
}
</style>
