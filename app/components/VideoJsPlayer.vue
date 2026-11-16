<template>
  <video
    ref="videoElement"
    class="video-js vjs-big-play-centered"
    controls
    playsinline
    preload="metadata"
    :poster="poster"
  />
</template>

<script setup lang="ts">
import 'video.js/dist/video-js.css'

const props = defineProps<{
  src: string
  poster?: string
}>()

const videoElement = ref<HTMLVideoElement | null>(null)
let player: { dispose: () => void } | undefined

onMounted(async () => {
  if (!videoElement.value) return

  const videojs = (await import('video.js')).default
  player = videojs(videoElement.value, {
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{ src: props.src, type: 'video/mp4' }],
  })
})

onBeforeUnmount(() => {
  player?.dispose()
})
</script>
