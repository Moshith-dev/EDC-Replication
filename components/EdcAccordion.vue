<script setup lang="ts">
  import { ref, watch } from 'vue'
  
  const props = defineProps<{
    title: string
    description: string
    customStyles: {
      wrapper?: string
      title?: string
      content?: string
    }
  }>()
  // Define props with default styles and autoOpen feature
  
  const isOpen = ref(false)
  
  const toggle = () => {
    isOpen.value = !isOpen.value
  }
  
  
  </script>
  <template>
    <div :style="customStyles.wrapper" class="accordion-wrapper">
      <div
        :style="customStyles.title"
        class="accordion-header"
        @click="toggle"
       
      >
        <span>{{ title }}</span>
        <button class="accordion-toggle">
          {{ isOpen ? '−' : '+' }}
        </button>
      </div>
      <div v-if="isOpen" :style="customStyles.content" class="accordion-content">
        <p>{{ description }}</p>
      </div>
    </div>
  </template>
  <style scoped>
  .accordion-wrapper {
    margin: 10px 0;
  }
  
  .accordion-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    font-weight: bold;  
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f0f0f0;
  }
  
  .accordion-toggle {
    font-size: 20px;
    background: none;
    border: none;
    cursor: pointer;
  }
  
  .accordion-content {
    padding: 10px;
    background-color: #f9f9f9;
    border-top: 1px solid #ccc;
    border-radius: 0 0 4px 4px;
  }
  </style>
  