<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
useHead({
 title: 'CineVault — Discover your next favorite',
 meta: [
  { name: 'theme-color', content: '#0f1118' }
 ],
 script: [
 {
 src: 'https://accounts.google.com/gsi/client',
 async: true,
 defer: true
 }
 ]
})
</script>

<style>
html,
body,
#__nuxt {
  min-height: 100%;
  background: #0f1118;
}

body {
  color: #fff;
  font-family: Roboto, Arial, sans-serif;
}

a {
  color: inherit;
}
</style>