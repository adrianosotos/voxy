import Vue from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowDownWideShort, faArrowUpWideShort } from '@fortawesome/free-solid-svg-icons'

Vue.config.productionTip = false

library.add(
  faArrowDownWideShort,
  faArrowUpWideShort
)

new Vue({
  render: h => h(App),
}).$mount('#app')
