<template>
  <div class="shop-container">
    <shop-comp/>
    <div class="prod-sec">
      <div class="prod-box">
        <div v-for="prods in productsData" :key="prods">
          <card-comp :products="prods">
            <template #productsSlot>
              <div class="products">
                <div class="img">
                  <img :src=prods.prodUrl :alt=prods.prodName>
                </div>
              </div>
            </template>
          </card-comp>
        </div>
      </div>
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
  .prod-sec {
    margin: 5em 0 0;
  }
  .prod-box {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(25em, 1fr));
    gap: 1.1em;
    margin: 2em;
  }
  .img {
    position: relative;
    width: clamp(5em, 100vw, 26em);
    overflow: hidden;
    transition: .5s ease;
  }
  .img img {
    width: 100%;
    height: 35em;
  }
  .img::after {
    content: "Quick View";
    background-color: lightgrey;
    padding: 1.5em 0;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    transform: translateY(100%);
    z-index: 1;
    transition: transform .5s, opacity .5s;
    opacity: 0;
    animation: slide-up .5s forwards;
  }
  .img:hover {
    transform: translateY(0);
    opacity: 1;
  }
  .img:not(:hover)::after {
    animation: slide-down 0.5s forwards;
    transform-style: flat;
    transform: translateY(100%);
    opacity: 0;
  }

  @keyframes slide-up {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slide-down {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(100%);
    opacity: 0;
  }
}
</style>