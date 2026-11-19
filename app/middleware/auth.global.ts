import { getCookie } from 'h3'

export default defineNuxtRouteMiddleware((to) => {
  const authCookie = useCookie<string | null>('google_auth', {
    path: '/',
    sameSite: 'lax',
  })
  const hasServerSession = import.meta.server
    ? getCookie(useRequestEvent()!, 'google_auth') === '1'
    : false

  if (import.meta.server) {
    if (to.path === '/login' && hasServerSession) {
      return navigateTo('/discover')
    }

    if (to.path !== '/login' && !hasServerSession) {
      return navigateTo('/login')
    }

    return
  }

  const user = localStorage.getItem('google_user')

  if (to.path === '/login' && user) {
    authCookie.value = '1'
    return navigateTo('/discover')
  }

  if (to.path !== '/login' && !user) {
    return navigateTo('/login')
  }
})
