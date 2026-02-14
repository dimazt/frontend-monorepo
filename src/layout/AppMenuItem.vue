<!-- eslint-disable no-undef -->
<script setup>
import { useLayout } from '@/layout/composables/layout';
import { useRouter, useRoute } from 'vue-router';
import { onBeforeMount, ref, watch, computed } from 'vue';
import { ucWords } from '@/helpers/general_helper';

const { layoutState, setActiveMenuItem, onMenuToggle } = useLayout();
const router = useRouter();
const route = useRoute();

const props = defineProps({
    item: {
        type: Object,
        default: () => ({})
    },
    index: {
        type: Number,
        default: 0
    },
    root: {
        type: Boolean,
        default: true
    },
    parentItemKey: {
        type: String,
        default: null
    },
    depth: {
        type: Number,
        default: 0
    },
    searchQuery: {
        type: String,
        default: ''
    }
});

const isActiveMenu = ref(false);
const itemKey = ref(null);

onBeforeMount(() => {
    itemKey.value = props.parentItemKey ? props.parentItemKey + '-' + props.index : String(props.index);

    const activeItem = layoutState.activeMenuItem;
    
    // Update logic untuk mengecek active menu
    isActiveMenu.value = activeItem === itemKey.value || (activeItem && activeItem.startsWith(itemKey.value + '-'));
    
    // Jika item memiliki URL dan route saat ini cocok, set sebagai active
    if (props.item.url && checkActiveRoute(props.item)) {
        setActiveMenuItem(itemKey.value);
        isActiveMenu.value = true;
    }
});

watch(
    () => layoutState.activeMenuItem,
    (newVal) => {
        isActiveMenu.value = newVal === itemKey.value || (newVal && newVal.startsWith(itemKey.value + '-'));
    }
);

// Watch perubahan route untuk update active state
watch(
    () => route.name,
    () => {
        if (props.item.url && checkActiveRoute(props.item)) {
            setActiveMenuItem(itemKey.value);
            isActiveMenu.value = true;
        }
    }
);

function itemClick(event, item) {
    if (item.disabled) {
        event.preventDefault();
        return;
    }

    if (item.url && (layoutState.staticMenuMobileActive || layoutState.overlayMenuActive)) {
        onMenuToggle();
    }

    if (item.command) {
        item.command({ originalEvent: event, item: item });
    }

    const foundItemKey = item.submenu ? (isActiveMenu.value ? props.parentItemKey : itemKey.value) : itemKey.value;

    setActiveMenuItem(foundItemKey);
}

// Perbaiki fungsi checkActiveRoute untuk menggunakan route names
function checkActiveRoute(item) {
    // Primary check: berdasarkan nama route
    if (item.url && route.name === item.url) {
        return true;
    }
    
    // Fallback untuk backward compatibility dengan path
    if (item.url && route.path === item.url) {
        return true;
    }
    
    return false;
}

// Computed untuk mengecek apakah item atau child-nya active
const isItemOrChildActive = computed(() => {
    if (props.item.url && checkActiveRoute(props.item)) {
        return true;
    }
    
    if (props.item.submenu) {
        return props.item.submenu.some(child => {
            if (child.url && checkActiveRoute(child)) {
                return true;
            }
            // Recursive check untuk nested submenu
            if (child.submenu) {
                return child.submenu.some(grandchild => 
                    grandchild.url && checkActiveRoute(grandchild)
                );
            }
            return false;
        });
    }
    
    return false;
});

// Computed untuk mengecek apakah menu item visible
const isVisible = computed(() => {
    return props.item.visible !== false;
});
</script>

<template>
    <li v-if="isVisible" :class="{ 
        'layout-root-menuitem': root, 
        'active-menuitem': isActiveMenu || isItemOrChildActive
    }">
        <!-- Root menu title -->
        <div v-if="root && !item.parent_id && item.submenu" 
             class="layout-menuitem-root-text">
            {{ item.name.toUpperCase() }}
        </div>
        
        <!-- Menu item with submenu atau tanpa URL -->
        <a v-if="(!item.url || item.submenu)" 
           @click="itemClick($event, item)" 
           :class="[item.class, { 'active-route': isItemOrChildActive }]" 
           :target="item.target" 
           tabindex="0">
            <i :class="`pi ${item.icon}`" class="layout-menuitem-icon"></i>
            <span class="layout-menuitem-text">{{ ucWords(item.name) }}</span>
            <i class="pi pi-fw pi-angle-down layout-submenu-toggler" v-if="item.submenu"></i>
        </a>
        
        <!-- Menu item dengan URL dan tanpa submenu -->
        <router-link v-else-if="item.url"  
                     :to="{ name: item.url }" 
                     @click="itemClick($event, item)" 
                     :class="[item.class, { 'active-route': checkActiveRoute(item) }]" 
                     tabindex="0">
            <i :class="`pi ${item.icon}`" class="layout-menuitem-icon"></i>
            <span class="layout-menuitem-text">{{ ucWords(item.name) }}</span>
        </router-link>
        
        <!-- Submenu -->
        <Transition v-if="item.submenu" name="layout-submenu">
            <ul v-show="root ? true : isActiveMenu" class="layout-submenu">
                <app-menu-item v-for="(child, i) in item.submenu" 
                               :key="`${child.id}-${i}`" 
                               :index="i" 
                               :item="child" 
                               :parentItemKey="itemKey" 
                               :root="false">
                </app-menu-item>
            </ul>
        </Transition>
    </li>
</template>