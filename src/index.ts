import ui from '@nuxt/ui/vue-plugin'
import { createApp } from 'vue'

import * as chat from '@/composables/useModel/test'

import App from './App.vue'
import AppMenu from './AppMenu.vue'
import { HelperContext, HelperKey } from './composables/useHelper'

import AppStyle from '@/assets/main.css?inline'

export async function run<C extends HelperContext<C, T, S>, T, S>(ctx: HelperContext<C, T, S>) {
  function _connectedCallback(root: HTMLElement, App: any) {
    const shadow = root.attachShadow({ mode: 'open' })
    const style = document.createElement('style')
    style.innerText = AppStyle
    shadow.appendChild(style)

    const container = document.createElement('div')
    container.id = 'app-root'
    shadow.appendChild(container)

    const app = createApp(App)
    app.use(ui)
    app.provide(HelperKey, ctx as never)
    app.mount(container)
  }

  customElements.define(
    'boss-helper-job',
    class extends HTMLElement {
      connectedCallback() {
        _connectedCallback(this, App)
      }
    },
  )

  customElements.define(
    'boss-helper-menu',
    class extends HTMLElement {
      connectedCallback() {
        _connectedCallback(this, AppMenu)
      }
    },
  )
  await ctx.onMount()
  logger.info('BossHelper加载成功', chat)
}
