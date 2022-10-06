<template>
  <h3>{{ counter }}</h3>
  <p>We do more...</p>
</template>

<script>
export default {
  computed: {
    // state dapat diambil atau diwakilkan menggunakan computed property, why computed property ? itu karena computed property seperti yang diketahui dapat istilahnya ngewatch suatu data dan mengembalikannya sebagai data baru begitu.
    counter() {
      return this.$store.getters['numbers/normalizeCounter']; // Penulisan jika terdapat namespace
    },
  },
};
</script>

<style></style>
