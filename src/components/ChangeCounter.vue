<template>
  <button @click="inc">Add 2</button>
  <button @click="increase({ value: 12 })">Add 12</button>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  methods: {
    // addOne() {
    // 1. Cara tidak efektif dan tidak disarankan digunakan
    //   this.$store.state.counter++;
    // 2. Menggunakan mutation dengan commit
    //   this.$store.commit('increment');
    // 3. Menggunakan action dengan dispatch
    // this.$store.dispatch('increment');
    // },
    // 4. Sama seperti mapGetters kita juga memiliki mapActions untuk memapping action, untuk kegunaanya mirip miriplah kek mapGetter, tanpa basa basi yuk lah gas. Kalo map getters kita buatnya di computed sedang kan ini kita lakuinnya di method, sama seperti mapgetter dia juga bisa ditulis menjadi dua teknik.
    // ...mapActions(['increment']),
    ...mapActions('numbers', {
      // Penulisan jika menggunakan namespace, di parameter pertama harus ada namespace
      inc: 'increment',
      increase: 'increase',
    }),
  },
};
</script>

<style></style>
