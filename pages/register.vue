<script setup lang="ts">
import { ref, watch } from "vue";

const nameInput = ref<any>(null);
const emailInput = ref<any>(null);
const summary = ref<any>(null);
const role = ref<any>(null);
const emailError = ref("");
const showModal = ref(false);
const isChecked = ref(false);
const gender = ref("");

const handleGenderChange = (value: string) => {
    gender.value = value;
    console.log("Selected Gender:", value);
};

const handleRegister = () => {
    if (!nameInput.value || !emailInput.value || !isChecked.value) {
        alert("Please fill all required fields and accept the terms.");
        return;
    }
    showModal.value = true;
};

watch(
    () => emailInput.value?.localValue,
    (newValue) => {
        emailError.value = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newValue || '')
            ? ''
            : 'Invalid email address.';
    }
);
</script>
<template>
    <div class="flex justify-center items-center min-h-screen bg-gray-100">
        <div class="w-full flex flex-col gap-5 max-w-lg bg-white shadow-lg rounded-lg p-10 border border-gray-300">
            <h1 class="text-3xl font-bold text-center mb-2">Registration Form</h1>

            <EdcTextInput ref="nameInput" label="Name" placeholder="Enter your name" />
            <EdcTextInput ref="emailInput" label="Email" placeholder="Enter your email" :error="emailError" />

            <div>
                <p class="text-lg font-medium mb-2">Gender</p>
                <div class="flex flex-col gap-1 pl-4">
                    <EdcRadio label="Male" name="gender" value="Male" @on-change="handleGenderChange" />
                    <EdcRadio label="Female" name="gender" value="Female" @on-change="handleGenderChange" />
                </div>
            </div>

            <EdcCalendar label="Date of Birth" />

            <EdcDropdown v-model="role" label="Role"
                :options="['Full Stack Developer', 'Data Analyst', 'Test Engineer']" placeholder="Choose an option" />

            <EdcTextArea v-model="summary" label="Summary" placeholder="Type your message here" :max="500"
                showCharacterCount required />

            <EdcCheckbox v-model="isChecked" label="Accept Terms and Conditions" :required="true"
                labelClass="text-blue-600 font-semibold text-lg" />

            <div class="text-center mt-4">
                <EdcActionButton label="Register" @click="handleRegister" labelClass="text-xl text-white font-bold"
                    class="bg-blue-600 hover:bg-blue-700 py-2 px-6 rounded-md" type="submit" />
            </div>

            <EdcPopupModal v-model:show="showModal" title="Successfully Registered" closeText="Done" />
        </div>
    </div>
</template>
