<script setup lang="ts">
  // Define props for the modal component
  const props = defineProps({
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    closeText: {
      type: String,
      default: 'Close',
    },
  });

  // Define emit for closing the modal
  const emit = defineEmits<{
    (e: 'update:show', value: boolean): void;
  }>();

  // Function to close the modal
  const closeModal = () => {
    emit('update:show', false);
  };
</script>

<template>
  <!-- Modal container, only visible when `show` prop is true -->
  <div v-if="props.show" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <!-- Modal header with title -->
      <div class="modal-header">
        <h3>{{ props.title }}</h3>
      </div>

      <!-- Modal body (slot for custom content) -->
      <div class="modal-body">
        <slot></slot>
      </div>

      <!-- Modal footer with a close button -->
      <div class="modal-footer">
        <button @click="closeModal" class="close-btn">{{ props.closeText }}</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.5rem;
}

.modal-body {
  font-size: 1rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
}

.close-btn {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.close-btn:hover {
  background-color: #0056b3;
}
</style>
