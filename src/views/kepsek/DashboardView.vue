<template>
  <div class="space-y-6">
    <!-- Stat Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <StatCard label="Surat Masuk"       :value="stats.totalMasuk"    icon="📥" color="blue" />
      <StatCard label="Disposisi Masuk"   :value="stats.disposisiMasuk" icon="📋" color="yellow" />
      <StatCard label="Perlu Persetujuan" :value="stats.perluPersetujuan" icon="⏳" color="red" />
    </div>

    <!-- Notifikasi Disposisi -->
    <div class="card">
      <h3 class="font-semibold text-gray-900 mb-4">Disposisi Menunggu Tindakan</h3>
      <div class="space-y-3">
        <div
          v-for="item in disposisiMenunggu"
          :key="item.id"
          class="flex items-start gap-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl"
        >
          <span class="text-2xl">📋</span>
          <div>
            <p class="text-sm font-medium text-gray-900">{{ item.nomor_surat }}</p>
            <p class="text-xs text-gray-600 mt-0.5">{{ item.perihal }}</p>
            <p class="text-xs text-gray-400 mt-1">Dari: {{ item.pengirim }}</p>
          </div>
        </div>
        <div v-if="!disposisiMenunggu.length" class="text-center py-8 text-gray-400">
          <span class="block text-3xl mb-2">🎉</span>
          Tidak ada disposisi yang perlu ditindaklanjuti
        </div>
      </div>
    </div>

    <!-- Surat Keluar Menunggu Persetujuan -->
    <div class="card">
      <h3 class="font-semibold text-gray-900 mb-4">Surat Keluar Menunggu Persetujuan</h3>
      <div class="space-y-3">
        <div
          v-for="item in suratKeluar.filter(s => s.status_persetujuan === 'menunggu')"
          :key="item.id"
          class="flex items-start gap-4 p-4 bg-blue-50 border border-blue-200 rounded-xl"
        >
          <span class="text-2xl">📤</span>
          <div>
            <p class="text-sm font-medium text-gray-900">{{ item.nomor_surat }}</p>
            <p class="text-xs text-gray-600 mt-0.5">{{ item.perihal }}</p>
            <p class="text-xs text-gray-400 mt-1">Tujuan: {{ item.tujuan }}</p>
          </div>
        </div>
        <div v-if="!suratKeluar.filter(s => s.status_persetujuan === 'menunggu').length"
             class="text-center py-8 text-gray-400">
          <span class="block text-3xl mb-2">🎉</span>
          Tidak ada surat keluar yang menunggu persetujuan
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import StatCard from '@/components/dashboard/StatCard.vue'
import { useSuratMasukStore }  from '@/stores/suratMasuk.js'
import { useSuratKeluarStore } from '@/stores/suratKeluar.js'
import { useDisposisiStore }   from '@/stores/disposisi.js'

const suratMasukStore  = useSuratMasukStore()
const suratKeluarStore = useSuratKeluarStore()
const disposisiStore   = useDisposisiStore()

const suratKeluar = computed(() => suratKeluarStore.list)

const disposisiMenunggu = computed(() =>
  disposisiStore.list.filter(d => d.status === 'menunggu').slice(0, 5)
)

const stats = computed(() => ({
  totalMasuk:       suratMasukStore.pagination.total || suratMasukStore.list.length,
  disposisiMasuk:   disposisiStore.list.filter(d => d.status !== 'selesai').length,
  perluPersetujuan: suratKeluar.value.filter(s => s.status_persetujuan === 'menunggu').length
}))

onMounted(async () => {
  await Promise.all([
    suratMasukStore.fetchAll({ limit: 1000 }),
    suratKeluarStore.fetchAll({ limit: 1000 }),
    disposisiStore.fetchAll()
  ])
})
</script>