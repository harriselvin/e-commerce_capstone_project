<template>
  <div class="shop-container">
    <div v-if="loading">
      <page-spinner-comp/>
    </div>
    <div v-else>
      <shop-comp/>
      <div class="prod-sec">
        <div class="prod-box">
          <div v-for="prods in productsData" :key="prods">
            <card-comp :products="prods">
              <template #productsSlot>
                <div class="products">
                  <router-link class="prod-btn" :to="{name: 'product', params:{id: prods.prodID}}">
                    <div class="img">
                      <img :src=prods.prodUrl :alt=prods.prodName>
                    </div>
                  </router-link>
                  <div class="prod-info">
                    <h3>{{ prods.prodName }}</h3>
                    <p>R{{ prods.price }}</p>
                  </div>
                </div>
              </template>
            </card-comp>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardComp from '@/components/CardComp.vue';
import ShopComp from '@/components/ShopComp.vue';
import PageSpinnerComp from '@/components/PageSpinnerComp.vue';

export default {
  data() {
    return {
      loading: true,
    }
  },
  components: {
    CardComp,
    ShopComp,
    PageSpinnerComp
  },
  computed: {
    productsData() {
      return this.$store.state.products
    },
  },
  methods: {
    async getProducts() {
      try {
        await this.$store.dispatch('getProducts')

        this.loading = false
      } catch (error) {
        console.error("Failed to fetch product data:", error);
      }
    },
  },
  mounted() {
    try {
      this.getProducts()
    } catch (error) {
      console.error("Failed to fetch product data:", error);
    }
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
    grid-template-columns: repeat(auto-fit, minmax(20em, 1fr));
    gap: 1.1em;
    margin: 2em;
  }
  .img {
    position: relative;
    width: clamp(0, 100vw, 23em);
    overflow: hidden;
    transition: .5s ease;
  }
  .img img {
    width: 100%;
    height: 30em;
    object-fit: cover;
    border: 1px solid #e6e6e6;
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
    transition: transform .5s, opacity .5s;
    opacity: 0;
    animation: slide-up .5s forwards;
    color: #353531;
  }
  .img:hover {
    transform: translateY(0);
    opacity: 1;
    cursor: pointer;
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

  .prod-info {
    text-align: left;
  }
</style>