<template>
  <div class="shop-container">
    <shop-comp/>
    <h1>This is the Shop Page</h1>
    <div v-for="prods in productsData" :key="prods">
      <card-comp :products="prods">
        <template #productsSlot>
          <div>
            {{ prods.prodName }}
          </div>
        </template>
      </card-comp>
    </div>
  </div>
</template>

<script>
import CardComp from '@/components/CardComp.vue';
import ShopComp from '@/components/ShopComp.vue';

export default {
  components: {
    CardComp,
    ShopComp
  },
  computed: {
    productsData() {
      return this.$store.state.products
    }
  },
  methods: {
    getProducts() {
      return this.$store.dispatch('getProducts')
    }
  },
  mounted() {
    this.getProducts()
  }
}
</script>
<style>
  .shop-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: -.5em;
  }
</style>