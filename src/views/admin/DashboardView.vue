<template>
  <div class="space-y-6">
    <!-- Stat Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <StatCard label="Total Surat Masuk"  :value="stats.totalMasuk"   icon="📥" color="blue" />
      <StatCard label="Total Surat Keluar" :value="stats.totalKeluar"  icon="📤" color="purple" />
      <StatCard label="Disposisi Aktif"    :value="stats.disposisiAktif" icon="📋" color="yellow" />
      <StatCard label="Menunggu Persetujuan" :value="stats.menungguPersetujuan" icon="⏳" color="red" />
    </div>

    <!-- Dua kolom -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <NotificationList :items="notifikasi" :loading="loading" />
      <RecentActivity   :items="recentData" :loading="loading" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import StatCard         from '@/components/dashboard/StatCard.vue'
import NotificationList from '@/components/dashboard/NotificationList.vue'
import RecentActivity   from '@/components/dashboard/RecentActivity.vue'
import { useSuratMasukStore }  from '@/stores/suratMasuk.js'
import { useSuratKeluarStore } from '@/stores/suratKeluar.js'
import { useDisposisiStore }   from '@/stores/disposisi.js'
import { useArsipStore }       from '@/stores/arsip.js'
import { formatRelative } from '@/utils/formatDate.js'

const suratMasukStore  = useSuratMasukStore()
const suratKeluarStore = useSuratKeluarStore()
const disposisiStore   = useDisposisiStore()
const arsipStore       = useArsipStore()

const loading = ref(true)

const stats = ref({ totalMasuk: 0, totalKeluar: 0, disposisiAktif: 0, menungguPersetujuan: 0 })

const notifikasi = computed(() => {
  const items = []
  disposisiStore.list.slice(0, 5).forEach(d => {
    items.push({
      id: `d-${d.id}`,
      type: 'disposisi',
      message: `Disposisi untuk "${d.nomor_surat}" — ${d.perihal?.slice(0, 40)}...`,
      time: formatRelative(d.created_at)
    })
  })
  return items
})

const recentData = computed(() => arsipStore.list.slice(0, 8))

onMounted(async () => {
  try {
    await Promise.all([
      suratMasukStore.fetchAll({ limit: 1000 }),
      suratKeluarStore.fetchAll({ limit: 1000 }),
      disposisiStore.fetchAll(),
      arsipStore.fetchAll()
    ])

    stats.value = {
      totalMasuk:          suratMasukStore.pagination.total || suratMasukStore.list.length,
      totalKeluar:         suratKeluarStore.pagination.total || suratKeluarStore.list.length,
      disposisiAktif:      disposisiStore.list.filter(d => d.status !== 'selesai').length,
      menungguPersetujuan: suratKeluarStore.list.filter(s => s.status_persetujuan === 'menunggu').length
    }
  } finally {
    loading.value = false
  }
})
</script>