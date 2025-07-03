import { createApp } from 'vue'
import App from './App.vue'
// import App from './components/lowCode.vue'
// import App from './components/test/index.vue'
import elementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import {zhCn} from "element-plus/es/locale/index";

const app = createApp(App)
app.use(elementPlus, {
    locale: zhCn,
})
app.mount('#app')

