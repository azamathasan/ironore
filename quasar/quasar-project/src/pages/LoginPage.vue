<template>
  <q-page padding class="row items-center justify-center">
    <!-- content -->
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

      <!-- <q-input
        filled
        v-model="name"
        label="Your name *"
        hint="Name and surname"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-input
        filled
        type="number"
        v-model="age"
        label="Your age *"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Please type your age',
          val => val > 0 && val < 100 || 'Please type a real age'
        ]"
      /> -->

      <!-- <q-toggle v-model="accept" label="I accept the license and terms" /> -->

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
    // const name = ref(null)
    // const age = ref(null)
    // const accept = ref(false)

    return {
      username,
      password,
      // name,
      // age,
      // accept,

      onSubmit () {
        authStore.login(username.value!, password.value!)
        // $q.notify({
        //     color: 'green-4',
        //     textColor: 'white',
        //     icon: 'cloud_done',
        //     message: 'Submitted'
        //   })
        // if (accept.value !== true) {
        //   $q.notify({
        //     color: 'red-5',
        //     textColor: 'white',
        //     icon: 'warning',
        //     message: 'You need to accept the license and terms first'
        //   })
        // }
        // else {
          
        // }
      },

      onReset () {
        username.value = null
        password.value = null
        // name.value = null
        // age.value = null
        // accept.value = false
      }
    }
  }
  // name: 'PageName'
})
</script>
