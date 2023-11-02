<template>
    <Menubar :model="items">
        <template #start>
            <img
                alt="logo"
                src="./../assets/logo.png"
                height="42"
                class="mr-2"
            />
        </template>
        <template #item="{ label, item, props }">
            <router-link
                v-slot="routerProps"
                :to="item.route"
                custom
            >
                <a
                    :href="routerProps.href"
                    v-bind="props.action"
                    @click="routerProps.navigate"
                >
                    <span v-bind="props.icon" />
                    <span v-bind="props.label">{{ label }}</span>
                </a>
            </router-link>
        </template>
    </Menubar>
</template>

<script>
import Menubar from 'primevue/menubar';
import { ref } from "vue";

export default {
    name: "ResumeMenu",
    components: {
        Menubar,
    },

    setup() {
        const items = ref([
            {
                label: "База резюме",
                icon: "pi pi-users",
                route: "/",
            },
            {
                label: "Создать резюме",
                icon: "pi pi-plus-circle",
                route: "/add",
            },
        ]);

        return {
			items
        };
    },
};
</script>

<style></style>
