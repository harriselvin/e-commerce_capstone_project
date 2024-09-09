<template>
  <div class="shop-container">
    <div v-if="loading">
      <page-spinner-comp/>
    </div>
    <div v-else-if="productsData">
      <div class="shop-comp">
        <shop-comp/>
      </div>
      <div class="search-box">
        <form class="form">
            <label for="search">
                <input @input="searchInput = $event.target.value" required="" autocomplete="off" placeholder="search products by name" id="search" type="text">
                <div class="icon">
                    <svg stroke-width="2" stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="swap-on">
                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-linejoin="round" stroke-linecap="round"></path>
                    </svg>
                    <svg stroke-width="2" stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="swap-off">
                        <path d="M10 19l-7-7m0 0l7-7m-7 7h18" stroke-linejoin="round" stroke-linecap="round"></path>
                    </svg>
                </div>
                <button type="reset" class="close-btn">
                    <svg viewBox="0 0 20 20" class="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
                        <path clip-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" fill-rule="evenodd"></path>
                    </svg>
                </button>
            </label>
        </form>
      </div>
      <div class="prod-sec">
        <div class="prod-box">
          <div v-for="prods in searchProducts" :key="prods">
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
      <div class="footer-comp">
        <footer-comp/>
      </div>
    </div>
    <div v-else class="error-products">
      <p>Failed to Fetch Product Data</p>
    </div>
  </div>
</template>

<script>
import CardComp from '@/components/CardComp.vue';
import ShopComp from '@/components/ShopComp.vue';
import PageSpinnerComp from '@/components/PageSpinnerComp.vue';
import FooterComp from '@/components/FooterComp.vue'

export default {
  data() {
    return {
      loading: true,
      searchInput: '',
    }
  },
  components: {
    CardComp,
    ShopComp,
    PageSpinnerComp,
    FooterComp
  },
  computed: {
    productsData() {
      return this.$store.state.products
    },
    filteredProducts() {
      const category = this.$route.query.category
      if (category) {
        return this.productsData.filter(product => product.category === category)
      } else {
        return this.productsData
      }
    },
    searchProducts() {
      if (Array.isArray(this.productsData)) {
        const search = this.searchInput.toLowerCase()
        return this.filteredProducts.filter(product => {
          const productName = product.prodName.toLowerCase()
          return productName.includes(search)
        })
      } else {
        return []
      }
    }
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
    showModal() {
            // Toggle the modal container and modal classes
            document.querySelector('.modal-container').classList.toggle('show');
            document.querySelector('.modal').classList.toggle('show');
        }
  },
  async mounted() {
    try {
      await this.getProducts()
    } catch (error) {
      console.error("Failed to fetch product data:", error);
    }
  }
}
</script>
<style scoped>
  .shop-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .prod-sec, .shop-comp {
    margin: 5em -.5em 0;
    min-width: 45em;
  }
  .search-box {
    display: flex;
    justify-content: flex-end;
    margin: 5em 1.5em 0;  
    min-width: 40em;
  }
  .form {
    --input-bg: #FFf;
    --border-color: lightgrey;
  /*  background of input */
    --padding: 1.5em;
    --rotate: 80deg;
  /*  rotation degree of input*/
    --gap: 2em;
    /*  gap of items in input */
    --icon-change-color: orangered;
  /*  when rotating changed icon color */
    --height: 40px;
  /*  height */
    width: 250px;
    padding-inline-end: 1em;
  /*  change this for padding in the end of input */
    background: var(--input-bg);
    position: relative;
    border-radius: 4px;
    border: 1px solid var(--border-color);
  }

  .form label {
    display: flex;
    align-items: center;
    width: 100%;
    height: var(--height);
  }

  .form input {
    width: 100%;
    padding-inline-start: calc(var(--padding) + var(--gap));
    outline: none;
    background: none;
    border: 0;
  }
  /* style for both icons -- search,close */
  .form svg {
    /* display: block; */
    color: #111;
    transition: 0.3s cubic-bezier(.4,0,.2,1);
    position: absolute;
    height: 15px;
  }
  /* search icon */
  .icon {
    position: absolute;
    left: var(--padding);
    transition: 0.3s cubic-bezier(.4,0,.2,1);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  /* arrow-icon*/
  .swap-off {
    transform: rotate(-80deg);
    opacity: 0;
    visibility: hidden;
  }
  /* close button */
  .close-btn {
    /* removing default bg of button */
    background: none;
    border: none;
    right: calc(var(--padding) - var(--gap));
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #111;
    padding: 0.1em;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    transition: 0.3s;
    opacity: 0;
    transform: scale(0);
    visibility: hidden;
  }

  .form input:focus ~ .icon {
    transform: rotate(var(--rotate)) scale(1.3);
  }

  .form input:focus ~ .icon .swap-off {
    opacity: 1;
    transform: rotate(-80deg);
    visibility: visible;
    color: var(--icon-change-color);
  }

  .form input:focus ~ .icon .swap-on {
    opacity: 0;
    visibility: visible;
  }

  .form input:valid ~ .icon {
    transform: scale(1.3) rotate(var(--rotate))
  }

  .form input:valid ~ .icon .swap-off {
    opacity: 1;
    visibility: visible;
    color: var(--icon-change-color);
  }

  .form input:valid ~ .icon .swap-on {
    opacity: 0;
    visibility: visible;
  }

  .form input:valid ~ .close-btn {
    opacity: 1;
    visibility: visible;
    transform: scale(1);
    transition: 0s;
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
    max-width: 40em;
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
  .error-products {
    margin: 10em 0 0;
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