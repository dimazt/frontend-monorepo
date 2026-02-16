import { computed, reactive, readonly } from 'vue';

const layoutConfig = reactive({
    preset: 'Aura',
    primary: 'emerald',
    surface: null,
    darkTheme: false,
    menuMode: 'overlay', // Always overlay on mobile
});

const layoutState = reactive({
    sidebarVisible: false,
    profileSidebarVisible: false,
    activeMenuItem: null,
    // Keep these for backward compat with AppMenuItem
    staticMenuDesktopInactive: false,
    overlayMenuActive: false,
    staticMenuMobileActive: false,
    menuHoverActive: false,
});

export function useLayout() {
    const setPrimary = (value) => {
        layoutConfig.primary = value;
    };

    const setSurface = (value) => {
        layoutConfig.surface = value;
    };

    const setPreset = (value) => {
        layoutConfig.preset = value;
    };

    const setActiveMenuItem = (item) => {
        layoutState.activeMenuItem = item.value || item;
    };

    const setMenuMode = (mode) => {
        layoutConfig.menuMode = mode;
    };

    const toggleDarkMode = () => {
        if (!document.startViewTransition) {
            executeDarkModeToggle();
            return;
        }
        document.startViewTransition(() => executeDarkModeToggle());
    };

    const executeDarkModeToggle = () => {
        layoutConfig.darkTheme = !layoutConfig.darkTheme;
        document.documentElement.classList.toggle('app-dark');
    };

    // Mobile: toggle sidebar overlay
    const onMenuToggle = () => {
        layoutState.sidebarVisible = !layoutState.sidebarVisible;
        layoutState.staticMenuMobileActive = layoutState.sidebarVisible;
        layoutState.overlayMenuActive = layoutState.sidebarVisible;

        // Block scroll on the scroll area
        if (layoutState.sidebarVisible) {
            document.body.classList.add('blocked-scroll');
        } else {
            document.body.classList.remove('blocked-scroll');
        }
    };

    const closeSidebar = () => {
        layoutState.sidebarVisible = false;
        layoutState.staticMenuMobileActive = false;
        layoutState.overlayMenuActive = false;
        document.body.classList.remove('blocked-scroll');
    };

    const resetMenu = () => {
        closeSidebar();
        layoutState.menuHoverActive = false;
    };

    const isSidebarActive = computed(() => layoutState.sidebarVisible);
    const isDarkTheme = computed(() => layoutConfig.darkTheme);
    const getPrimary = computed(() => layoutConfig.primary);
    const getSurface = computed(() => layoutConfig.surface);

    return {
        layoutConfig: readonly(layoutConfig),
        layoutState: readonly(layoutState),
        onMenuToggle,
        closeSidebar,
        isSidebarActive,
        isDarkTheme,
        getPrimary,
        getSurface,
        setActiveMenuItem,
        toggleDarkMode,
        setPrimary,
        setSurface,
        setPreset,
        resetMenu,
        setMenuMode,
    };
}