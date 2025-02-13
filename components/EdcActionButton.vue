<script setup lang="ts">
const props = withDefaults(
    defineProps<{
    label: string;
    labelClass: string; 
    onClick: () => void;
    buttonstyle?: string;
    type?: "cancel" | "submit" | "delete";
}>(),
{
    labelClass: "",
    onClick: () => {},
    buttonstyle: "bg-indigo-500 hover:bg-indigo-700 py-2 px-4 rounded ",
    type: "submit",
    tabindex: 0,
}
);
const containerClasses = computed(() => ({
        container: true,
        [`${props.type}-container`]: true,
        [props.buttonstyle]: true,
        
    }));
    const labelClasses = computed(() => ({
        [props.labelClass]: true,
        "font-bold button-text": true,
        "text-[var(--color-gray-cancel-text)]": props.type === "cancel",
    }));

</script>

<template>
        <button :class="containerClasses"
                @click="onClick"
                type="button"
                >
            <span :class="labelClasses">{{ label }}</span>
        </button>
</template>

<style scoped>


</style>
