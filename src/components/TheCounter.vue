<template>
  <!-- <h3>{{ fCounter }}</h3> -->
  <h3>{{ finalCounter }}</h3>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    // state dapat diambil atau diwakilkan menggunakan computed property, why computed property ? itu karena computed property seperti yang diketahui dapat istilahnya ngewatch suatu data dan mengembalikannya sebagai data baru begitu.
    // counter() {
    //   return this.$store.getters.finalCounter;
    // },
    // Just in case, anda tidak senang dengan cara membuat computed property sebelumnya, kalian dapat menggunakan yang dinamakan mapGetters() untuk mendapatkan seluruh method pada getters yang ada di store. Untuk membawa getters kesini itu dapt dengan cara menggunakan spread operator dan tulis functionnya, kemudian pada parameternya kita tulis dalam array method apa saja yang mau diambil, misalnya finalCounter maka jadinya gini : ...mapGetters([finalCounter]). Kalo mau aliasing juga bisa dengan cara ngirim ke parameternya itu sebuah object jadinya gini : ...mapGetters({ finalCounter : 'finalCount'}). Gitu!!!
    // Contoh aliasing
    // ...mapGetters({
    //   fCounter: 'finalCounter',
    // }),
    // contoh biasa aja
    ...mapGetters('numbers', ['finalCounter']), // Penulisan jika terdapat name space, diparameter pertama harus nama namespace nya dulss.
  },
};
</script>

<style></style>
