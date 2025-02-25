<script setup lang="ts">
const modelValue = defineModel<string | number | null>({ default: null });

const props = withDefaults(
  defineProps<{
    label: string;
    title?: string;
    name: string;
    value: string | number;
    checked?: boolean;
    disabled?: boolean;
    required?: boolean;
  }>(),
  {
    label: "",
    name: "",
    value: "",
    checked: false,
    disabled: false,
    required: false,
  }
);

const emit = defineEmits<{
  "on-change": [selectedValue: string];
}>();

const preSelected = ref<boolean>(props.checked);
const getInputId = computed(() => props.name + "-" + props.value);

const onChange = (event: Event) => {
  const selectedValue = (event.currentTarget as HTMLInputElement).value;
  emit("on-change", selectedValue);
};

onMounted(() => {
  if (modelValue.value === props.value) preSelected.value = true;
});
</script>

<template>
  <div class="flex flex-col">
    <p v-if="title">{{ title }}</p>
    <div class="flex items-center gap-2">
      <input :id="getInputId" :value="props.value" type="radio" :name="props.name" :checked="preSelected"
        :disabled="props.disabled" :required="props.required" @change="onChange" />
      <label :for="getInputId" :class="{ 'text-gray-400': props.disabled }">
        {{ props.label }}
      </label>
    </div>
  </div>
</template>

<style scoped>
input[type="radio"] {
  width: 1rem;
  height: 1rem;
}

label {
  font-size: 1rem;
  cursor: pointer;
}
</style>
