<template>
    <div class="flex flex-col items-center justify-center gap-4 p-5">
        <div class="w-full">
            <EdcAccordion title="Accordion 1" description="This is the description of the first accordion."
                :customStyles="{
                    wrapper: 'border: 1px solid #333; border-radius: 5px; margin: 10px 0; ',
                    title: 'color: #003366; ',
                    content: 'color: #333; font-style: italic;'
                }" :autoOpen="false" />
            <EdcAccordion title="Accordion 2" description="This is the description of the second accordion."
                :customStyles="{
                    wrapper: 'border: 1px solid #333; border-radius: 5px; margin: 10px 0;',
                    title: 'color: #003366;',
                    content: 'color: #333; font-style: italic;'
                }" :autoOpen="true" />
        </div>
        <EdcActionButton label="Click me" @click="handleClick" labelClass="text-xl text-white font-bold"
            type="submit" />
        <EdcBreadcrumb :breadCrumbDetails="['Home', 'Products', 'Categories', 'Electronics']"
            type="discrepancy-modal" />
            <EdcCalendar  />
        <EdcCheckbox :checked="isChecked" label="Accept Terms and Conditions" :required="true"
            labelClass="text-blue-600 font-semibold text-xl" />

        <div class="flex flex-col items-center justify-center gap-4 p-5">
            <EdcDataTable :columns="columns" :tableData="tableData" emptyMessage="No data available"
                @on-row-click="handleRowClick" />
        </div>
        <EdcDropdown label="Dropdown" :options="['A', 'B', 'C']" placeholder="Choose an option" />
        <div>
            <EdcActionButton label="PopUp" @click="showModal = true" labelClass="text-xl text-white font-bold"
                type="submit" />
            <EdcPopupModal v-model:show="showModal" title="Alert Notification" closeText="Close" />
        </div>
        <div>
            <EdcRadio label="Option 1" name="options" value="option1" :checked="true" />
            <EdcRadio label="Option 2" name="options" value="option2" />
        </div>
        <EdcSearchBar placeholder="Search for items..." :isDebounce="true" :debounceDelay="300" />
        <EdcTabView :tabs="['Tab1', 'Tab2', 'Tab3']" />
        <EdcTextArea label="Your Message" placeholder="Type your message here" :max="500" showCharacterCount required />
        <EdcTextInput v-model="inputValue" label="Name" placeholder="Enter your name" :error="errorMessage" />

    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import EdcRadio from '~/components/EdcRadio.vue';
import type { IColumn, TTableItem } from '~/types/common';

const showModal = ref(false);
const isChecked = ref(false);
const columns: IColumn[] = [
    { header: 'Name', field: 'name' },
    { header: 'Age', field: 'age' },
    { header: 'City', field: 'city' },
];

const tableData: TTableItem<any>[] = [
    { name: 'John Doe', age: 28, city: 'New York' },
    { name: 'Jane Doe', age: 34, city: 'Los Angeles' },
    { name: 'Alice Smith', age: 25, city: 'Chicago' },
];

function handleRowClick(row: TTableItem<any>) {
    console.log('Row clicked:', row);
}

function handleClick() {
    console.log('Button clicked');
}
const inputValue = ref('');
const errorMessage = ref('');
watch(inputValue, (newValue) => {
    errorMessage.value = newValue.length < 3 ? 'Name must be at least 3 characters long.' : '';
});

</script>