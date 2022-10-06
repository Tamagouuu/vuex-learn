import { createApp } from 'vue';
import { createStore } from 'vuex';

import App from './App.vue';

const app = createApp(App);

// Oke-oke, sedikit saya jelaskan untuk behavior ketika kita membuat module terpisah, nanti dijelaskan lagi iya awokawok. Okeudah istirahat sekarang sakit perut. Oke jadi kalo mau buat modul terpisah udah pasti data dari statenya udah pasti jadi local dan ngga bisa diakses luar. Dan juga kita ngga bisa ngakses secara langsung dari module ke rootStore. Nahayo bingung, ngga lah ez ni bozz. Kalo misalnya kita ini ngakses dari sebuah modul ngakses yang ada di root itu ngga bakal bisa, karena semua yang ada di module itu sifatnya local. Tapi tetep bisa ngakses dengan cara, memberi parameter seperti rootState, rootGetters dll.

// Oke sekarang kita akan belajar menggunakan namaspace, why we use namespace. Itu karena namespace akan mempermudah kita ketika kita membuat aplikasi yang lebih besar, yang pastinya nanti akan ada name clash. Name clash apaan tuh, name class yang dimaksuk disini kalo misalnya terdapat nama mutation atau pun action yang nantinya sama, hal ini yang bisa buat bingung, maka dari itu lah dibutuhkan yang namanya namespace.

const counterModule = {
  namespaced: true,
  state() {
    return {
      counter: 0,
    };
  },
  mutations: {
    increment(state) {
      state.counter = state.counter + 2;
    },
    increase(state, payload) {
      state.counter = state.counter + payload.value;
    },
  },
  actions: {
    increment(context) {
      setTimeout(() => {
        context.commit('increment');
      }, 2000);
    },
    increase(context, payload) {
      context.commit('increase', payload);
    },
  },
  getters: {
    finalCounter(state) {
      return state.counter * 2;
    },
    normalizeCounter(_, getters) {
      if (getters.finalCounter < 0) {
        return 0;
      }

      if (getters.finalCounter > 100) {
        return 100;
      }

      return getters.finalCounter;
    },
  },
};

const store = createStore({
  // Konsep modeule ini digunakan untuk menggabungkan suatu state yang terpisah menjadi satu level yang sama
  modules: {
    // numbers: counterModule,
    // atau tulis nama variabel modulenya aja
    // Untuk menulis namespace wajib menggunakan key and value pairs misalnya seperti ini :
    numbers: counterModule,
  },
  // Bisa dibilang state ini merupakan suatu data yang bisa diakses dimanapun
  state() {
    return {
      isLoggedIn: false,
    };
  },
  // Mutation ini ada bisa dibilang sebuah method yang nantinya itu digunakan untuk ngupdate data state. Lah bang, kan bisa akses langsung ke state terus tambahin, apa susahnya?. Gini lho john tak jelasin. Kalo misalnya ni kita buat method dimasing masing componen yang ngelakuin hal yang sama, bayangin tiba tiba kita mau ganti method tersebut untuk ditambah dengan angka yang lain, pastinya dong kita harus ngubah satu-satu hal tersebut. Nah makanya hal tersebut kan ngga begitu efektif jadinya, maknay dibuatlah muatation ini prevent hal tersebut. Untuk mengakases mutations itu kita dapat menggunakan this.$store.commit('nama mutasi'). Mudah mudah paham john.
  mutations: {
    // increment(state) {
    //   state.counter = state.counter + 2;
    // },
    // Next nih john, sekarang ada istilah alien baru ni, namanya payload. Yup seperti arti namnya payload artinya muatan ya. Artinya si payload ini membawa argument yang telah dimasukkan kedalam function yang nanti dapatnya dapat digunakan untuk proses dalam suatu mutasi. Misalnya nih aku mau commit this.$store.commit('increase', {value : 2}). Otomatis payloadnya akan terisi dengan value, yang dapat diakses dalam mutations begitu john.
    // increase(state, payload) {
    //   state.counter = state.counter + payload.value;
    // },

    setAuth(state, { status }) {
      state.isLoggedIn = status;
    },
  },

  // Next lagi nih, terus ada muncul peradaban baru nih getters namanya. Getters nih pungsinya mirip kek computed property, sama sama function yang fungsinya itu mengolah atau mengeksekusi kode dulu baru di output. Nah bang aku ada pertanyaan lagi, kenapa pakek getters? Kenapa ngga langsung aja gitu kalo misalnya mau dikali 2 langsung dikali atau misalnya mau di kasi kondisi tertentu langsng aja kasi, kenapa ribet?. Oke oke hal tersebut persisi kayak nanya kenapa kita makai mutation kan, nah sebenarnya jawabannya juga mirip nih, kalo misalnya kita makai getters nanti si getters lah yang akan mengouput data yang akan ditampilkan. Nah misalanya ada kasus yang dimana kita perlu menormalisasi value kita jika misalnya diatas 100 maka valuenya itu akan diubah menjadi 70. Nah dengan getters dia akan mencerna dulu tuh data yang akan di output, hingga dapat menghasilkan hasil yang diharapkan. Getters dapat diakses dengan this.$store.getters.namagetters, trus juga getter ini menerima dua parameter nih, yang pertama state, yang kedua getters lainnya. Fungsi dari getter lainnya di parameter sih nantinya biar mempermudah jika suatu getter bergantung pada getter lainnya.
  getters: {
    userIsAuthenticated(state) {
      return state.isLoggedIn;
    },
  },
  // Duhh ini lagi, muncul lagi kalimat alien nih actions. Apalagi ni fungsinya pak?. Oke actions ini fungsinya ketika kita ingin menjalankan suatu mutasi secara asynchronous. Waitt kenapa ngga langsung di mutation aja gitu, kan ga perlu ribet gitu buat function baru dll. Hal tersebut dilakukan karena ketika kita berbicara tentang mutasi, itu hanya terkait pada perubahan data disana tidak dapat terjadi delay ataupun jeda sedikit pun mengingat di mutasi sangat memedulikan perubahan data pada state. Sedangkan pada action tidak, pada action justru sebaliknya, ketika kita ingin melakukan logika yang lebih rumit seperti asynchrounus dll, itu akan lebih baik dilakukan disini. Karena action memang diperuntukkan untuk logika bisnis. Oke jadi gini anggep aja si mutasi ini orang yang hanya mengantarkan data saja, sedangkan si action adalah orang yang mengolah data. Terus kenapa di mutasi juga ada logika kayak misalnya mau buat value itu ditambah dua segala macem. Kalo hanya logika sederhana itu tidak masalah dikarenakan pada mutasi itu kembali lagi dia hanya peduli dengan perubahan data, sedangkan jika ada perubahan data yang rumit nantinya pasti akan menganggu pertukaran data yang lainnya sehingga lebih baik di lakukan diaction, karena action sendiri bisa menjalakan banyak mutation. Sebenarnya ngga masalah sih kita ngakses secara langsung mutasi itu kalo ngga ada logika rumit, cumann.... kalo bisa tidak ada logika rumit puun bagus juga sih, balik lagi ke prefrensi kalian masing masing. Action dijalankan dengan menerima context sebagai parameternya.
  actions: {
    login(context) {
      context.commit('setAuth', { status: true });
    },
    logout(context) {
      context.commit('setAuth', { status: false });
    },
  },
});

app.use(store);

app.mount('#app');
