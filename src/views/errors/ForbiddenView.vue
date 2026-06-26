<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 p-4">
    <div class="text-center">
      <p class="text-8xl font-black text-red-200">403</p>
      <h1 class="text-2xl font-bold text-gray-900 mt-4">Akses Ditolak</h1>
      <p class="text-gray-500 mt-2">Anda tidak memiliki izin untuk mengakses halaman ini.</p>
      <div class="mt-6 flex gap-3 justify-center">
        <button
          @click="$router.back()"
          class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm"
        >
          ← Kembali
        </button>
        <router-link
          to="/"
          class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm"
        >
          🏠 Ke Dashboard
        </router-link>
      </div>
    </div>
  </div>
</template>