
<script lang="ts" setup>
import { useRouter } from 'vue-router';
import type { IColumn, TTableItem } from '~/types/common';


const router = useRouter();
const goToRegister = () => {
    router.push('/register');
};

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

</script>
<template>
    <div class="flex flex-col items-center justify-center gap-4 p-5 px-96">
        <EdcAccordion title="Accordion 1" description="This is the description of the accordion." :customStyles="{
            wrapper: 'border: 1px solid #333; border-radius: 5px; margin: 10px 0;',
            title: 'color: #003366;',
            content: 'color: #333; font-style: italic;'
        }" />
        <EdcBreadcrumb :breadCrumbDetails="['Home', 'Products', 'Categories', 'Electronics']"
            type="discrepancy-modal" />
        <div class="flex flex-col items-center justify-center gap-4 p-5">
            <EdcDataTable :columns="columns" :tableData="tableData" emptyMessage="No data available"
                @on-row-click="handleRowClick" />
        </div>
        <EdcSearchBar placeholder="Search for items..." :isDebounce="true" :debounceDelay="300" />
        <EdcTabView :tabs="['Tab1', 'Tab2', 'Tab3']">
            <template #Tab1>
                <p>This is the content for Tab 3.</p>
            </template>
            <template #Tab2>
                <p>This is the content for Tab 3.</p>
            </template>
            <template #Tab3>
                <p>This is the content for Tab 3.</p>
            </template>
        </EdcTabView>

        <EdcActionButton label="Register" @click="goToRegister" labelClass="text-xl text-white font-bold"
            type="submit" />
    </div>
</template>
