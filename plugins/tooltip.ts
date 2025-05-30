import { Tooltip } from '@/components/common'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin({
  name: 'tooltip',
  async setup (nuxtApp) {
    nuxtApp.vueApp.directive('tooltip', Tooltip)
  }
})
