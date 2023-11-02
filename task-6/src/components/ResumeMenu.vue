<template>
    <MegaMenu :model="items">
        <template #start>
            <img
                alt="logo"
                src="./../assets/logo.png"
                height="42"
                class="mr-2"
            />
        </template>
        <template #item="{ label, item, props, hasSubmenu }">
            <router-link
                v-if="item.route"
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
            <a
                v-else
                :href="item.url"
                :target="item.target"
                v-bind="props.action"
            >
                <span v-bind="props.icon" />
                <span v-bind="props.label">{{ label }}</span>
                <span
                    :class="[hasSubmenu && 'pi pi-fw pi-angle-down']"
                    v-bind="props.submenuicon"
                />
            </a>
        </template>
    </MegaMenu>
</template>

<script>
import MegaMenu from "primevue/megamenu";
import { ref } from "vue";

export default {
    name: "ResumeMenu",
    components: {
        MegaMenu,
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
