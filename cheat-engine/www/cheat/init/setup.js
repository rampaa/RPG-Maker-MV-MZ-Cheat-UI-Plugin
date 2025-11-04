// RPG MV API : https://kinoar.github.io/rmmv-doc-web/index.html

import '../libs/vue.js'
import '../libs/vuetify.js'

import MainComponent from '../MainComponent.js'

// initialize vue
new Vue({
    vuetify: new Vuetify(),
    components: { MainComponent }
}).$mount('#app')
