<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    breadCrumbDetails: string[];
    type?: "clinical-trials" | "discrepancy-modal";
  }>(),
  {
    type: "clinical-trials",
  }
);

const labelClasses = computed(() => ({
  "font-bold": true,
  "text-[1.2rem] lg:text-[1.3rem] accent-text": props.type === "clinical-trials",
  "text-[1.3rem] lg:text-[1.4rem]": props.type === "discrepancy-modal",
}));


const getArrayLength = (arr: string[]) => arr.length;
</script>

<template>
  <section
    v-if="getArrayLength(breadCrumbDetails) > 0"
    class="flex flex-row items-center gap-[1rem] mb-[2rem]"
  >
    <template
      v-for="(breadCrumbDetailRow, breadCrumbDetailRowIndex) of breadCrumbDetails"
      :key="breadCrumbDetailRowIndex"
    >
      <span
        v-if="breadCrumbDetailRowIndex < getArrayLength(breadCrumbDetails) - 1"
        :class="[labelClasses]"
      >
        <a href="#" class="text-blue-600 hover:underline">{{ breadCrumbDetailRow }}</a>
      </span>

      <!-- Last breadcrumb item (not a link) -->
      <span
        v-else
        :class="[labelClasses, 'opacity-60']"
      >
        {{ breadCrumbDetailRow }}
      </span>

      <!-- Add a separator ("/") between the breadcrumbs -->
      <span
        v-if="breadCrumbDetailRowIndex < getArrayLength(breadCrumbDetails) - 1"
        class="text-gray-600"
      >
        /
      </span>
    </template>
  </section>
</template>

<style scoped>
/* You can add any additional styles here if needed */
</style>
