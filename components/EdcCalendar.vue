<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

const showCalendar = ref(false);
const selectedDate = ref<Date | null>(null);
const tempDate = ref<Date | null>(null);
const currentDate = ref(new Date());

const props = withDefaults(
  defineProps<{ label?: string }>(),
  { label: "" }
);

const monthYear = computed(() => {
  return currentDate.value.toLocaleString('default', { month: 'long', year: 'numeric' });
});

const calendarDays = computed(() => {
  const firstDayOfMonth = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 0);
  const days = new Array(firstDayOfMonth.getDay()).fill(null);

  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    days.push(new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), i));
  }
  return days;
});

const selectDate = (date: Date | null) => {
  tempDate.value = date;
};

const confirmDate = () => {
  selectedDate.value = tempDate.value;
  showCalendar.value = false;
};

const cancelSelection = () => {
  tempDate.value = selectedDate.value;
  showCalendar.value = false;
};

const formattedDate = computed(() => {
  return selectedDate.value ? selectedDate.value.toLocaleDateString('en-GB') : '';
});

const prevMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1);
};

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1);
};

// Close calendar when clicking outside
const calendarRef = ref<HTMLElement | null>(null);

const handleClickOutside = (event: MouseEvent) => {
  if (calendarRef.value && !calendarRef.value.contains(event.target as Node)) {
    showCalendar.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div class="calendar-wrapper" ref="calendarRef">
    <label v-if="props.label" class="text-lg font-medium">{{ label }}</label>
    <input 
      type="text" 
      placeholder="-- Select Date --" 
      :value="formattedDate" 
      @click="showCalendar = !showCalendar" 
      readonly 
      class="calendar-input"
    />
    <div v-if="showCalendar" class="calendar-dropdown">
      <div class="calendar-header">
        <button @click="prevMonth">&#8249;</button>
        <span>{{ monthYear }}</span>
        <button @click="nextMonth">&#8250;</button>
      </div>
      <div class="calendar-grid">
        <div 
          v-for="(date, index) in calendarDays" 
          :key="index" 
          :class="['calendar-date', { 'selected': tempDate && date && date.toDateString() === tempDate.toDateString() }]"
          @click="selectDate(date)"
        >
          {{ date ? date.getDate() : '' }}
        </div>
      </div>
      <div class="calendar-actions">
        <button @click="cancelSelection">Cancel</button>
        <button @click="confirmDate">Confirm</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calendar-wrapper {
  position: relative;
  width: 300px;
}
.calendar-input {
  width: 100%;
  padding: 8px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
}
.calendar-dropdown {
  position: absolute;
  top: 73px;
  width: 300px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  padding: 10px;
  z-index: 1000;
}
.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
}
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  text-align: center;
}
.calendar-date {
  padding: 8px;
  cursor: pointer;
}
.calendar-date:hover, .selected {
  background: #007bff;
  color: white;
  border-radius: 4px;
}
.calendar-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
button {
  padding: 5px 10px;
  border: none;
  background: #3a8ce4;
  color: white;
  cursor: pointer;
  border-radius: 4px;
}
button:hover {
  background: #4d96e3;
}
</style>
