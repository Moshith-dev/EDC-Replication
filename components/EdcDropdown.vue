<script setup lang="ts">
  const props = defineProps({
    label: {
      type: String,
      default: '',
    },
    options: {
      type: Array as PropType<string[]>,
      required: true,
    },
    value: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: 'Select...',
    },
  });

  // Define emit for updating the value
  const emit = defineEmits<{
    (e: 'update:value', value: string): void;
  }>();

  // Function to handle option selection
  const handleSelection = (selectedValue: string) => {
    emit('update:value', selectedValue);
  };
</script>

<template>
  <div class="dropdown-container">
    <!-- Label for the dropdown -->
    <label v-if="props.label" class="dropdown-label">{{ props.label }}</label>

    <!-- Dropdown select element -->
    <select
      :disabled="props.disabled"
      :value="props.value"
      @change="handleSelection(($event.target as HTMLSelectElement).value)"
      class="dropdown-select"
    >
      <!-- Placeholder option -->
      <option value="" disabled selected v-if="!props.value">{{ props.placeholder }}</option>

      <!-- Dynamic options -->
      <option v-for="option in props.options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.dropdown-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.dropdown-label {
  font-size: 1rem;
  font-weight: bold;
}

.dropdown-select {
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  cursor: pointer;
}

.dropdown-select:disabled {
  background-color: #f0f0f0;
  cursor: not-allowed;
}
</style>
