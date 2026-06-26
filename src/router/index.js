import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'

// Layouts
import AuthLayout      from '@/layouts/AuthLayout.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'

// Auth views
import LoginView from '@/views/auth/LoginView.vue'

// Admin views
import AdminDashboard    from '@/views/admin/DashboardView.vue'
import AdminSuratMasuk   from '@/views/admin/SuratMasukView.vue'
import AdminSuratKeluar  from '@/views/admin/SuratKeluarView.vue'
import AdminDisposisi    from '@/views/admin/DisposisiView.vue'
import AdminArsip        from '@/views/admin/ArsipView.vue'
import AdminLaporan      from '@/views/admin/LaporanView.vue'

// Kepsek views
import KepsekDashboard   from '@/views/kepsek/DashboardView.vue'
import KepsekSuratMasuk  from '@/views/kepsek/SuratMasukView.vue'
import KepsekSuratKeluar from '@/views/kepsek/SuratKeluarView.vue'
import KepsekDisposisi   from '@/views/kepsek/DisposisiView.vue'

// Error views
import NotFoundView  from '@/views/errors/NotFoundView.vue'
import ForbiddenView from '@/views/errors/ForbiddenView.vue'

const routes = [
  // ─── AUTH ─────────────────────────────────────────────────────────────────
  {
    path: '/',
    component: AuthLayout,
    children: [
      {
        path: '',
        redirect: '/login'
      },
      {
        path: 'login',
        name: 'login',
        component: LoginView,
        meta: { guestOnly: true }
      }
    ]
  },

  // ─── ADMIN ────────────────────────────────────────────────────────────────
  {
    path: '/admin',
    component: DashboardLayout,
    meta: { requiresAuth: true, role: 'admin' },
    children: [
      {
        path: '',
        redirect: '/admin/dashboard'
      },
      {
        path: 'dashboard',
        name: 'admin.dashboard',
        component: AdminDashboard,
        meta: { title: 'Dashboard', breadcrumb: ['Dashboard'] }
      },
      {
        path: 'surat-masuk',
        name: 'admin.surat-masuk',
        component: AdminSuratMasuk,
        meta: { title: 'Surat Masuk', breadcrumb: ['Surat Masuk'] }
      },
      {
        path: 'surat-keluar',
        name: 'admin.surat-keluar',
        component: AdminSuratKeluar,
        meta: { title: 'Surat Keluar', breadcrumb: ['Surat Keluar'] }
      },
      {
        path: 'disposisi',
        name: 'admin.disposisi',
        component: AdminDisposisi,
        meta: { title: 'Disposisi', breadcrumb: ['Disposisi'] }
      },
      {
        path: 'arsip',
        name: 'admin.arsip',
        component: AdminArsip,
        meta: { title: 'Arsip Digital', breadcrumb: ['Arsip Digital'] }
      },
      {
        path: 'laporan',
        name: 'admin.laporan',
        component: AdminLaporan,
        meta: { title: 'Laporan', breadcrumb: ['Laporan'] }
      }
    ]
  },

  // ─── KEPALA SEKOLAH ───────────────────────────────────────────────────────
  {
    path: '/kepsek',
    component: DashboardLayout,
    meta: { requiresAuth: true, role: 'kepala_sekolah' },
    children: [
      {
        path: '',
        redirect: '/kepsek/dashboard'
      },
      {
        path: 'dashboard',
        name: 'kepsek.dashboard',
        component: KepsekDashboard,
        meta: { title: 'Dashboard', breadcrumb: ['Dashboard'] }
      },
      {
        path: 'surat-masuk',
        name: 'kepsek.surat-masuk',
        component: KepsekSuratMasuk,
        meta: { title: 'Surat Masuk', breadcrumb: ['Surat Masuk'] }
      },
      {
        path: 'surat-keluar',
        name: 'kepsek.surat-keluar',
        component: KepsekSuratKeluar,
        meta: { title: 'Surat Keluar', breadcrumb: ['Surat Keluar'] }
      },
      {
        path: 'disposisi',
        name: 'kepsek.disposisi',
        component: KepsekDisposisi,
        meta: { title: 'Disposisi', breadcrumb: ['Disposisi'] }
      }
    ]
  },

  // ─── ERROR PAGES ──────────────────────────────────────────────────────────
  {
    path: '/403',
    name: 'forbidden',
    component: ForbiddenView
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation Guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  console.log("isLoggedIn:", authStore.isLoggedIn)
  console.log("userRole:", authStore.userRole)
  console.log("to:", to.fullPath)
  console.log("meta:", to.meta)
  // Halaman hanya untuk guest (belum login)
  if (to.meta.guestOnly && authStore.isLoggedIn) {
    const role = authStore.userRole
    if (role === 'admin') return next({ name: 'admin.dashboard' })
    return next({ name: 'kepsek.dashboard' })
  }

  // Halaman yang perlu login
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    return next({ name: 'login' })
  }

  // Cek role — hanya kalau sudah login DAN halaman memang butuh auth
  if (to.meta.requiresAuth && to.meta.role && authStore.isLoggedIn && authStore.userRole !== to.meta.role) {
    return next({ name: 'forbidden' })
  }

  next()
})

export default router