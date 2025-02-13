<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{ tabs: string[] }>();
const selectedTab = ref(props.tabs[0]); // Set first tab as default
</script>

<template>
  <div class="tab-container">
    <!-- Tab Headers -->
    <div class="tab-header">
      <span
        v-for="tab in tabs"
        :key="tab"
        :class="['tab-item', { active: selectedTab === tab }]"
        @click="selectedTab = tab"
      >
        {{ tab }}
      </span>
    </div>

    <!-- Tab Content -->
    <div class="tab-content">
      <slot :name="selectedTab"></slot>
    </div>
  </div>
</template>

<style scoped>
/* Tab Container */
.tab-container {
  width: 100%;
}

/* Tab Header */
.tab-header {
  display: flex;
  border-bottom: 2px solid #ddd;
  margin-bottom: 10px;
}

/* Tab Item */
.tab-item {
  padding: 10px 15px;
  cursor: pointer;
  font-weight: bold;
  transition: color 0.3s ease;
}


/* Active Tab */
.active {
  border-bottom: 3px solid#969a9e;
  color: #969a9e;
}

/* Tab Content */
.tab-content {
  padding: 15px;
  background: #f9f9f9;
  border-radius: 5px;
}
</style>