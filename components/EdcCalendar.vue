<script setup lang="ts">
  import { ref, computed } from 'vue';
  
  const showCalendar = ref(false);
  const selectedDate = ref<Date | null>(null);
  const currentDate = ref(new Date());
  
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const toggleCalendar = () => {
    showCalendar.value = !showCalendar.value;
  };
  
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
    if (!date) return;
    selectedDate.value = date;
    showCalendar.value = false;
  };
  
  const formattedDate = computed(() => {
    return selectedDate.value ? selectedDate.value.toDateString() : '';
  });
  
  const prevMonth = () => {
    currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1);
  };
  
  const nextMonth = () => {
    currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1);
  };
  
  const isSelected = (date: Date | null) => {
    return selectedDate.value && date && date.toDateString() === selectedDate.value.toDateString();
  };
  </script>
<template>
    <div class="calendar-wrapper">
      <label for="date-input" class="calendar-label">Select Date</label>
      <input 
        id="date-input"
        type="text"
        :value="formattedDate" 
        @click="toggleCalendar" 
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
          <div v-for="day in daysOfWeek" :key="day" class="calendar-day">{{ day }}</div>
          <div 
            v-for="(date, index) in calendarDays" 
            :key="index" 
            :class="['calendar-date', { 'selected': isSelected(date) }]"
            @click="selectDate(date)">
            {{ date ? date.getDate() : '' }}
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
  
  <style scoped>
  .calendar-wrapper {
    position: relative;
    width: 300px;
    font-family: Arial, sans-serif;
  }
  
  .calendar-label {
    display: block;
    margin-bottom: 5px;
    font-size: 14px;
  }
  
  .calendar-input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
  }
  
  .calendar-dropdown {
    position: absolute;
    top: 70px;
    width: 350px;
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
  
  .calendar-day, .calendar-date {
    padding: 8px;
    cursor: pointer;
  }
  
  .calendar-date:hover, .selected {
    background: #007bff;
    color: white;
    border-radius: 4px;
  }
  </style>
  