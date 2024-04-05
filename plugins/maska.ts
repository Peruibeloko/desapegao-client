import { vMaska } from "maska"

///@ts-ignore
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("maska", vMaska)
})