import useLogin from '@/compositions/useLogin'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { Ref } from 'vue'

type User = {
  phone: string
  point: number
  isAdmin: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): { accessToken: string | null; user: User } => ({
    accessToken: null,
    user: {
      phone: '',
      point: 0,
      isAdmin: false,
    },
  }),
  getters: {
    isLogin(): boolean {
      return !!this.accessToken
    },
  },
  actions: {
    async authLogin(phone: Ref<string>) {
      const { login } = useLogin(phone)

      const token = await login()

      this.setToken(token)
    },
    setToken(token: string) {
      this.accessToken = token

      localStorage.setItem('token', token)
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
