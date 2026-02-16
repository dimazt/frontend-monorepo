<template>
    <div class="mobile-page">
        <!-- Greeting -->
        <div class="greeting-section">
            <h1 class="greeting-title">Halo, {{ user.name }} 👋</h1>
            <p class="greeting-subtitle">{{ todayDate }}</p>
        </div>

        <!-- Quick Stats -->
        <div class="stats-grid">
            <div class="stat-card stat-blue">
                <i class="pi pi-calendar stat-icon"></i>
                <div class="stat-content">
                    <span class="stat-value">5</span>
                    <span class="stat-label">Booking Aktif</span>
                </div>
            </div>
            <div class="stat-card stat-green">
                <i class="pi pi-check-circle stat-icon"></i>
                <div class="stat-content">
                    <span class="stat-value">3</span>
                    <span class="stat-label">Approved</span>
                </div>
            </div>
            <div class="stat-card stat-amber">
                <i class="pi pi-clock stat-icon"></i>
                <div class="stat-content">
                    <span class="stat-value">2</span>
                    <span class="stat-label">Pending</span>
                </div>
            </div>
            <div class="stat-card stat-red">
                <i class="pi pi-car stat-icon"></i>
                <div class="stat-content">
                    <span class="stat-value">12</span>
                    <span class="stat-label">Kendaraan</span>
                </div>
            </div>
        </div>

        <!-- Quick Actions -->
        <div class="section-header">
            <h2>Aksi Cepat</h2>
        </div>
        <div class="quick-actions">
            <!-- <router-link :to="{ name: 'booking.create' }" class="action-btn action-primary">
                <i class="pi pi-plus-circle"></i>
                <span>Buat Booking</span>
            </router-link>
            <router-link :to="{ name: 'booking.list' }" class="action-btn action-secondary">
                <i class="pi pi-list"></i>
                <span>Booking Saya</span>
            </router-link>
            <router-link :to="{ name: 'vehicle.status' }" class="action-btn action-tertiary">
                <i class="pi pi-car"></i>
                <span>Cek Kendaraan</span>
            </router-link> -->
        </div>

        <!-- Recent Bookings -->
        <!-- <div class="section-header">
            <h2>Booking Terbaru</h2>
            <router-link :to="{ name: 'booking.list' }" class="see-all">Lihat Semua</router-link>
        </div> -->
        <div class="booking-list">
            <div v-for="(booking, i) in recentBookings" :key="i" class="booking-card">
                <div class="booking-card-header">
                    <Tag :value="booking.status" :severity="getStatusSeverity(booking.status)" />
                    <span class="booking-date">{{ booking.date }}</span>
                </div>
                <div class="booking-card-body">
                    <p class="booking-destination">{{ booking.destination }}</p>
                    <p class="booking-vehicle">{{ booking.vehicle }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAuth } from '@/composables/useAuth';

const { user } = useAuth();

const todayDate = computed(() => {
    return new Date().toLocaleDateString('id-ID', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
});

const recentBookings = ref([
    { destination: 'Site Pit 3 - Hauling Road', vehicle: 'Toyota Hilux B 1234 CD', date: '14 Feb 2026', status: 'Approved' },
    { destination: 'Workshop Area', vehicle: 'Mitsubishi Pajero B 5678 EF', date: '13 Feb 2026', status: 'Pending' },
    { destination: 'Port Jetty', vehicle: 'Toyota Fortuner B 9012 GH', date: '12 Feb 2026', status: 'Selesai' },
    { destination: 'Port Jetty', vehicle: 'Toyota Fortuner B 9012 GH', date: '12 Feb 2026', status: 'Selesai' },
    { destination: 'Port Jetty', vehicle: 'Toyota Fortuner B 9012 GH', date: '12 Feb 2026', status: 'Selesai' },
    { destination: 'Port Jetty', vehicle: 'Toyota Fortuner B 9012 GH', date: '12 Feb 2026', status: 'Selesai' },
    { destination: 'Port Jetty', vehicle: 'Toyota Fortuner B 9012 GH', date: '12 Feb 2026', status: 'Selesai' },
    { destination: 'Port Jetty', vehicle: 'Toyota Fortuner B 9012 GH', date: '12 Feb 2026', status: 'Selesai' },
    { destination: 'Port Jetty', vehicle: 'Toyota Fortuner B 9012 GH', date: '12 Feb 2026', status: 'Selesai' },
    { destination: 'Port Jetty', vehicle: 'Toyota Fortuner B 9012 GH', date: '12 Feb 2026', status: 'Selesai' },
    { destination: 'Port Jetty', vehicle: 'Toyota Fortuner B 9012 GH', date: '12 Feb 2026', status: 'Selesai' },
    { destination: 'Port Jetty', vehicle: 'Toyota Fortuner B 9012 GH', date: '12 Feb 2026', status: 'Selesai' },
    { destination: 'Port Jetty', vehicle: 'Toyota Fortuner B 9012 GH', date: '12 Feb 2026', status: 'Selesai' },
    { destination: 'Port Jetty', vehicle: 'Toyota Fortuner B 9012 GH', date: '12 Feb 2026', status: 'Selesai' },
]);

function getStatusSeverity(status) {
    const map = { 'Approved': 'success', 'Pending': 'warn', 'Selesai': 'info', 'Ditolak': 'danger' };
    return map[status] || 'secondary';
}
</script>

<style scoped>
.mobile-page {
    padding: 0 0 1rem 0;
}
.greeting-section {
    margin-bottom: 1.25rem;
}
.greeting-title {
    font-size: 1.25rem;
    font-weight: 700;
    margin: 0;
    color: var(--text-color);
}
.greeting-subtitle {
    font-size: 0.8rem;
    color: var(--text-color-secondary);
    margin: 0.25rem 0 0 0;
}

/* Stats Grid */
.stats-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
}
.stat-card {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.875rem;
    border-radius: 12px;
    background: var(--surface-card);
    border: 1px solid var(--surface-border);
}
.stat-icon {
    font-size: 1.25rem;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    flex-shrink: 0;
}
.stat-blue .stat-icon { background: #eff6ff; color: #3b82f6; }
.stat-green .stat-icon { background: #f0fdf4; color: #22c55e; }
.stat-amber .stat-icon { background: #fffbeb; color: #f59e0b; }
.stat-red .stat-icon { background: #fef2f2; color: #ef4444; }
.stat-content {
    display: flex;
    flex-direction: column;
}
.stat-value {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text-color);
    line-height: 1;
}
.stat-label {
    font-size: 0.7rem;
    color: var(--text-color-secondary);
    margin-top: 0.15rem;
}

/* Section Header */
.section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.75rem;
}
.section-header h2 {
    font-size: 1rem;
    font-weight: 700;
    margin: 0;
    color: var(--text-color);
}
.see-all {
    font-size: 0.8rem;
    color: var(--primary-color);
    text-decoration: none;
    font-weight: 600;
}

/* Quick Actions */
.quick-actions {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 0.25rem;
}
.action-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
    border-radius: 12px;
    text-decoration: none;
    min-width: 100px;
    flex: 1;
    text-align: center;
    transition: transform 0.15s;
}
.action-btn:active { transform: scale(0.96); }
.action-btn i { font-size: 1.25rem; }
.action-btn span { font-size: 0.75rem; font-weight: 600; }
.action-primary { background: var(--primary-color); color: white; }
.action-secondary { background: #eff6ff; color: #2563eb; }
.action-tertiary { background: #f0fdf4; color: #16a34a; }

/* Booking List */
.booking-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}
.booking-card {
    background: var(--surface-card);
    border: 1px solid var(--surface-border);
    border-radius: 12px;
    padding: 0.875rem;
}
.booking-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5rem;
}
.booking-date {
    font-size: 0.7rem;
    color: var(--text-color-secondary);
}
.booking-card-body {}
.booking-destination {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--text-color);
    margin: 0 0 0.2rem 0;
}
.booking-vehicle {
    font-size: 0.75rem;
    color: var(--text-color-secondary);
    margin: 0;
}
</style>