<template>
  <q-page padding class="row items-center justify-center">
    <div class="q-pa-md" style="max-width: 400px">
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
      >
      <q-input
        filled
        v-model="username"
        label="Username *"
        hint="User login"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
      <q-input
        filled
        v-model="password"
        label="Password *"
        hint="User password"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
        <div>
          <q-btn label="Submit" type="submit" color="primary"/>
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { defineComponent, ref } from 'vue'
import { useAuthStore } from 'src/stores/auth';
export default defineComponent({
  setup () {
    const $q = useQuasar()

    const authStore = useAuthStore();

    const username = ref(null)
    const password  = ref(null)
    return {
      username,
      password,
      onSubmit () {
        authStore.login(username.value!, password.value!)
      },

      onReset () {
        username.value = null
        password.value = null
      }
    }
  }
})
</script>
