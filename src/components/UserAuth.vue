<template>
  <button @click="login" v-if="!userIsAuthenticated">Login</button>
  <button @click="logout" v-else>Logout</button>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  methods: {
    login() {
      this.$store.dispatch('login');
    },
    logout() {
      this.$store.dispatch('logout');
    },
  },
  computed: {
    ...mapGetters(['userIsAuthenticated']),
  },
};
</script>
