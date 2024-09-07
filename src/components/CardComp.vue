<template>
  <div class="slots">
    <div v-if="loading">
        <slot name="loadingSlot">
            <p>Loading...</p>
        </slot>
    </div>
    <div v-else-if="typeof products == 'object'">
        <slot name="productsSlot">
            <p>products.prodName</p>
            <p>products.prodDesc</p>
            <p>products.prodInfo</p>
        </slot>
    </div>
    <div v-else-if="typeof product == 'object'">
        <slot name="productSlot">
            <p>product.prodName</p>
            <p>product.prodDesc</p>
            <p>product.prodInfo</p>
        </slot>
    </div>
    <div v-else-if="typeof bestSellers == 'object'">
        <slot name="bestSellerSlot">
            <p>bestSellers.sellerName</p>
            <p>bestSellers.sellerPrice</p>
            <p>bestSellers.sellerUrl</p>
        </slot>
    </div>
    <div v-else-if="typeof faq == 'object'">
        <slot name="faqSlot">
            <p>faq.FAQid</p>
            <p>faq.questions</p>
            <p>faq.answers</p>
        </slot>
    </div>
    <div v-else-if="typeof cartItems == 'object'">
        <slot name="cartItemSlot">
            <p>cartItems.cartID</p>
            <p>cartItems.prodID</p>
            <p>cartItems.quantity</p>
        </slot>
    </div>
    <div v-else>
        <slot name="noStockSlot">
            <h2>Out of stock</h2>
        </slot>
    </div>
  </div>
</template>
<script>
export default {
  props: ['products', 'product', 'bestSellers', 'faq', 'cartItems'],
  data() {
    return {
        loading: true
    }
  },
  mounted() {
    this.loading = false;
  }
}
</script>
<style>
  /* .slots {
      overflow-x: hidden;
  } */
</style>