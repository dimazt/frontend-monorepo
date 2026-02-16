<script setup>
import { useLayout } from '@/layout/composables/layout';
import { useRoute } from 'vue-router';
import { onBeforeMount, ref, watch, computed } from 'vue';
import { ucWords } from '@/helpers/general_helper';

const { layoutState, setActiveMenuItem, closeSidebar } = useLayout();
const route = useRoute();

const props = defineProps({
    item: { type: Object, default: () => ({}) },
    index: { type: Number, default: 0 },
    root: { type: Boolean, default: true },
    parentItemKey: { type: String, default: null },
});

const isActiveMenu = ref(false);
const itemKey = ref(null);

onBeforeMount(() => {
    itemKey.value = props.parentItemKey ? props.parentItemKey + '-' + props.index : String(props.index);
    const activeItem = layoutState.activeMenuItem;
    isActiveMenu.value = activeItem === itemKey.value || (activeItem && activeItem.startsWith(itemKey.value + '-'));
    if (props.item.url && checkActiveRoute(props.item)) {
        setActiveMenuItem(itemKey.value);
        isActiveMenu.value = true;
    }
});

watch(() => layoutState.activeMenuItem, (newVal) => {
    isActiveMenu.value = newVal === itemKey.value || (newVal && newVal.startsWith(itemKey.value + '-'));
});

watch(() => route.name, () => {
    if (props.item.url && checkActiveRoute(props.item)) {
        setActiveMenuItem(itemKey.value);
        isActiveMenu.value = true;
    }
});

function itemClick(event, item) {
    if (item.disabled) { event.preventDefault(); return; }

    // If leaf item (has url, no submenu), close sidebar
    if (item.url && !item.submenu) {
        closeSidebar();
    }

    if (item.command) {
        item.command({ originalEvent: event, item });
    }

    const foundItemKey = item.submenu ? (isActiveMenu.value ? props.parentItemKey : itemKey.value) : itemKey.value;
    setActiveMenuItem(foundItemKey);
}

function checkActiveRoute(item) {
    if (item.url && route.name === item.url) return true;
    if (item.url && route.path === item.url) return true;
    return false;
}

const isItemOrChildActive = computed(() => {
    if (props.item.url && checkActiveRoute(props.item)) return true;
    if (props.item.submenu) {
        return props.item.submenu.some(child => {
            if (child.url && checkActiveRoute(child)) return true;
            if (child.submenu) {
                return child.submenu.some(gc => gc.url && checkActiveRoute(gc));
            }
            return false;
        });
    }
    return false;
});

const isVisible = computed(() => props.item.visible !== false);
</script>

<template>
    <li v-if="isVisible" :class="{
        'layout-root-menuitem': root,
        'active-menuitem': isActiveMenu || isItemOrChildActive
    }">
        <!-- Root section title -->
        <div v-if="root && !item.parent_id && item.submenu" class="layout-menuitem-root-text">
            {{ item.name.toUpperCase() }}
        </div>

        <!-- Item with submenu -->
        <a v-if="(!item.url || item.submenu)" @click="itemClick($event, item)"
            :class="[item.class, { 'active-route': isItemOrChildActive }]" tabindex="0">
            <i :class="`pi ${item.icon}`" class="layout-menuitem-icon"></i>
            <span class="layout-menuitem-text">{{ ucWords(item.name) }}</span>
            <i class="pi pi-fw pi-angle-down layout-submenu-toggler" v-if="item.submenu"></i>
        </a>

        <!-- Leaf item with URL -->
        <router-link v-else-if="item.url" :to="{ name: item.url }" @click="itemClick($event, item)"
            :class="[item.class, { 'active-route': checkActiveRoute(item) }]" tabindex="0">
            <i :class="`pi ${item.icon}`" class="layout-menuitem-icon"></i>
            <span class="layout-menuitem-text">{{ ucWords(item.name) }}</span>
        </router-link>

        <!-- Submenu -->
        <Transition v-if="item.submenu" name="layout-submenu">
            <ul v-show="root ? true : isActiveMenu" class="layout-submenu">
                <app-menu-item v-for="(child, i) in item.submenu" :key="`${child.id}-${i}`" :index="i" :item="child"
                    :parentItemKey="itemKey" :root="false" />
            </ul>
        </Transition>
    </li>
</template>

<style scoped>
/* Touch-friendly sizing for mobile */
li a {
    min-height: 2.75rem;
}
</style>