<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    label: string;
    checked: boolean;
    required: boolean;
    inputClass?: string;
    labelClass?: string;
  }>(),
  {
    label: "",
    checked: false,
    required: false,
    inputClass: "h-6 w-6 border-2 border-gray-400 rounded",
    labelClass: "",
  }
);

const emit = defineEmits<{
  "on-change": [checked: boolean];
}>();

const modelValue = ref(props.checked);



// Update the model value when checkbox changes
function onChange() {
  emit("on-change", modelValue.value);
}
</script>

<template>
  <div class="checkbox-container">
      <input
        v-model="modelValue"
        type="checkbox"
        :class="inputClass"
        :checked="props.checked"
        @change="onChange"
        :aria-required="props.required ? 'true' : 'false'"
      />
      <span v-if="props.label" :class="labelClass">{{ props.label }}</span>
  </div>
</template>

<style scoped>
.checkbox-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
}

input[type="checkbox"] {
  cursor: pointer;
}


</style>
