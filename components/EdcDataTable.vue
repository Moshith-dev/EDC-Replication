<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';
import type { IColumn, TTableItem } from '~/types/common';

const props = defineProps<{
  columns: IColumn[];
  tableData: TTableItem<any>[];
  emptyMessage?: string;
}>();

const emit = defineEmits<{
  "on-row-click": [rowDetails: TTableItem<any>];
}>();

const tableClasses = computed(() => ({
  "w-full table-auto border-collapse border border-gray-300": true,
}));

const handleRowClick = (row: TTableItem<any>) => {
  emit("on-row-click", row);
};
</script>

<template>
  <div class="flex flex-col gap-[1rem]">
    <table :class="tableClasses">
      <thead>
        <tr class="bg-gray-100">
          <th v-for="column in columns" :key="column.header" class="font-bold text-[1.1rem] p-2 text-left border-b">
            {{ column.header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="tableData.length === 0">
          <td :colspan="columns.length" class="text-center py-4 text-gray-500">
            {{ emptyMessage || "No records found." }}
          </td>
        </tr>
        <tr v-for="(row, index) in tableData" :key="index" @click="handleRowClick(row)" class="cursor-pointer hover:bg-gray-50">
          <td v-for="column in columns" :key="column.field" class="p-2 border-b">
            {{ row[column.field] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
/* Table Styling */
table {
  width: 100%;
  border-collapse: collapse;
  margin: 0 auto;
}

thead {
  background-color: #f4f4f4;
}

th, td {
  padding: 0.8rem;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

th {
  font-weight: bold;
}

tr:hover {
  background-color: #f9fafb;
}

/* Empty message styling */
td.text-center {
  color: #888;
  font-style: italic;
}

/* Row hover effect */
tr:hover {
  background-color: #f1f5f9;
}
</style>
