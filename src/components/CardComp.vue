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
    <div v-else-if="typeof addCartItems == 'object'">
        <slot name="addCartItemSlot">
            <p>addCartItems.cartID</p>
            <p>addCartItems.prodID</p>
            <p>addCartItems.quantity</p>
        </slot>
    </div>
    <div v-else-if="typeof getCartItems == 'object'">
        <slot name="getCartItemSlot">
            <p>getCartItems.cartID</p>
            <p>getCartItems.prodID</p>
            <p>getCartItems.quantity</p>
        </slot>
    </div>
    <div v-else-if="typeof users == 'object'">
        <slot name="userSlot">
            <p>users.firstName</p>
            <p>users.lastName</p>
            <p>users.age</p>
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
  props: ['products', 'product', 'bestSellers', 'faq', 'addCartItems', 'getCartItems', 'users'],
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