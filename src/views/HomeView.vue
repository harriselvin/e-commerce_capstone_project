<template>
  <div class="home">
    <h1>This is the Home Page</h1>
    <div v-if="home">

    </div>
    <div v-else>
      <!-- <page-spinner-comp/> -->
    </div>
  </div>
</template>
<script>
// import PageSpinnerComp from '@/components/PageSpinnerComp.vue';

export default {
  components: {
    // PageSpinnerComp
  }
}
</script>
<style>
  .home {
    margin: 10em 0 0;
  }
</style>