<template>
  <div>
    <video
      ref="videoElement"
      class="video-js vjs-big-play-centered"
      controls
      playsinline
      preload="metadata"
      :poster="poster"
    />
    <v-alert v-if="playerError" class="mt-4" type="error" variant="tonal" role="alert">
      {{ playerError }}
    </v-alert>
  </div>
</template>

<script setup lang="ts">
import 'video.js/dist/video-js.css'

const props = defineProps<{
  src: string
  poster?: string
}>()

const videoElement = ref<HTMLVideoElement | null>(null)
const playerError = ref('')
let player: {
  dispose: () => void
  on: (event: string, listener: () => void) => void
} | undefined

onMounted(async () => {
  if (!videoElement.value) {
    playerError.value = 'The video player could not be initialized.'
    return
  }

  try {
    const videojs = (await import('video.js')).default
    player = videojs(videoElement.value, {
      controls: true,
      responsive: true,
      fluid: true,
      sources: [{ src: props.src, type: 'video/mp4' }],
    })
    player.on('error', () => {
      playerError.value = 'The video could not be played. Check your connection and try again.'
    })
  } catch (error) {
    console.error('Unable to initialize the Video.js player:', error)
    playerError.value = 'The video player could not be loaded. Please try again later.'
  }
})

onBeforeUnmount(() => {
  player?.dispose()
})
</script>
