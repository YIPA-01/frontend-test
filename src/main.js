import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from './composables/useAuth.js'
import App from './App.vue'
import './app.css'

// Create router with all routes
const router = createRouter({
  history: createWebHistory('/frontend-test/'),
  routes: [
    // Guest routes
    { 
      path: '/', 
      component: () => import('./pages/Guest/Home.vue'), 
      name: 'home',
      meta: { title: 'Reda Yahyani - Full Stack Developer' }
    },
    { 
      path: '/contact', 
      component: () => import('./pages/Guest/Contact.vue'), 
      name: 'contact',
      meta: { title: 'Contact Me' }
    },
    { 
      path: '/education', 
      component: () => import('./pages/Guest/Education.vue'), 
      name: 'education',
      meta: { title: 'Education' }
    },
    
    // Auth routes (guest only)
    { 
      path: '/login', 
      component: () => import('./pages/Auth/Login.vue'), 
      name: 'login',
      meta: { title: 'Login', guestOnly: true }
    },
    { 
      path: '/register', 
      component: () => import('./pages/Auth/Register.vue'), 
      name: 'register',
      meta: { title: 'Register', guestOnly: true }
    },
    { 
      path: '/forgot-password', 
      component: () => import('./pages/Auth/ForgotPassword.vue'), 
      name: 'forgot-password',
      meta: { title: 'Forgot Password', guestOnly: true }
    },
    { 
      path: '/reset-password', 
      component: () => import('./pages/Auth/ResetPassword.vue'), 
      name: 'reset-password',
      meta: { title: 'Reset Password', guestOnly: true }
    },
    { 
      path: '/verify-email', 
      component: () => import('./pages/Auth/VerifyEmail.vue'), 
      name: 'verify-email',
      meta: { title: 'Verify Email', requiresAuth: true }
    },
    { 
      path: '/confirm-password', 
      component: () => import('./pages/Auth/ConfirmPassword.vue'), 
      name: 'confirm-password',
      meta: { title: 'Confirm Password', requiresAuth: true }
    },
    
    // Admin routes (protected)
    { 
      path: '/admin', 
      redirect: '/admin/dashboard',
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    { 
      path: '/admin/dashboard', 
      component: () => import('./pages/Admin/Dashboard.vue'), 
      name: 'admin.dashboard',
      meta: { title: 'Admin Dashboard', requiresAuth: true, requiresAdmin: true }
    },
    
    // Admin Skills routes
    { 
      path: '/admin/skills', 
      component: () => import('./pages/Admin/Skills/Index.vue'), 
      name: 'admin.skills.index',
      meta: { title: 'Manage Skills', requiresAuth: true, requiresAdmin: true }
    },
    { 
      path: '/admin/skills/create', 
      component: () => import('./pages/Admin/Skills/Create.vue'), 
      name: 'admin.skills.create',
      meta: { title: 'Create Skill', requiresAuth: true, requiresAdmin: true }
    },
    { 
      path: '/admin/skills/:id/edit', 
      component: () => import('./pages/Admin/Skills/Edit.vue'), 
      name: 'admin.skills.edit',
      meta: { title: 'Edit Skill', requiresAuth: true, requiresAdmin: true }
    },
    
    // Admin Projects routes
    { 
      path: '/admin/projects', 
      component: () => import('./pages/Admin/Projects/Index.vue'), 
      name: 'admin.projects.index',
      meta: { title: 'Manage Projects', requiresAuth: true, requiresAdmin: true }
    },
    { 
      path: '/admin/projects/create', 
      component: () => import('./pages/Admin/Projects/Create.vue'), 
      name: 'admin.projects.create',
      meta: { title: 'Create Project', requiresAuth: true, requiresAdmin: true }
    },
    { 
      path: '/admin/projects/:id/edit', 
      component: () => import('./pages/Admin/Projects/Edit.vue'), 
      name: 'admin.projects.edit',
      meta: { title: 'Edit Project', requiresAuth: true, requiresAdmin: true }
    },
    
    // Admin Education routes
    { 
      path: '/admin/education', 
      component: () => import('./pages/Admin/Education/Index.vue'), 
      name: 'admin.education.index',
      meta: { title: 'Manage Education', requiresAuth: true, requiresAdmin: true }
    },
    { 
      path: '/admin/education/create', 
      component: () => import('./pages/Admin/Education/Create.vue'), 
      name: 'admin.education.create',
      meta: { title: 'Add Education', requiresAuth: true, requiresAdmin: true }
    },
    { 
      path: '/admin/education/:id/edit', 
      component: () => import('./pages/Admin/Education/Edit.vue'), 
      name: 'admin.education.edit',
      meta: { title: 'Edit Education', requiresAuth: true, requiresAdmin: true }
    },
    
    // Admin Messages routes
    { 
      path: '/admin/messages', 
      component: () => import('./pages/Admin/Messages/Index.vue'), 
      name: 'admin.messages.index',
      meta: { title: 'Messages', requiresAuth: true, requiresAdmin: true }
    },
    { 
      path: '/admin/messages/:id', 
      component: () => import('./pages/Admin/Messages/Show.vue'), 
      name: 'admin.messages.show',
      meta: { title: 'View Message', requiresAuth: true, requiresAdmin: true }
    },
    
    // Profile routes (protected)
    { 
      path: '/profile', 
      component: () => import('./pages/Profile/Edit.vue'), 
      name: 'profile.edit',
      meta: { title: 'Profile Settings', requiresAuth: true }
    },
    
    // Catch all 404
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('./pages/NotFound.vue'),
      meta: { title: 'Page Not Found' }
    }
  ]
})

// Route guards
router.beforeEach(async (to, from, next) => {
  console.log('Route guard triggered:', { to: to.path, from: from.path });
  
  const { isAuthenticated, isAdmin, fetchUser } = useAuth()
  
  console.log('Auth state:', { 
    isAuthenticated: isAuthenticated.value, 
    isAdmin: isAdmin.value,
    hasToken: !!localStorage.getItem('auth_token')
  });
  
  // Try to fetch user if we have a token but no user data
  if (localStorage.getItem('auth_token') && !isAuthenticated.value) {
    console.log('Fetching user data...');
    try {
      await fetchUser()
      console.log('User fetched successfully');
    } catch (error) {
      console.log('Failed to fetch user, removing token');
      // Token is invalid, remove it
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user')
    }
  }
  
  // Check if route requires authentication
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    console.log('Route requires auth, redirecting to login');
    next({ name: 'login', query: { redirect: to.fullPath } })
    return
  }
  
  // Check if route requires admin access
  if (to.meta.requiresAdmin && !isAdmin.value) {
    console.log('Route requires admin, user is not admin, redirecting to home');
    next({ name: 'home' })
    return
  }
  
  // Check if route is guest only (redirect authenticated users)
  if (to.meta.guestOnly && isAuthenticated.value) {
    console.log('Guest only route, user is authenticated, redirecting to admin dashboard');
    next({ name: 'admin.dashboard' })
    return
  }
  
  // Set page title
  if (to.meta.title) {
    document.title = to.meta.title
  }
  
  console.log('Route guard passed, proceeding to:', to.path);
  next()
})

const app = createApp(App)
app.use(router)
app.mount('#app') 
