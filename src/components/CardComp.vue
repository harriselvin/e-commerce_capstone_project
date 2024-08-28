<template>
  <div class="slots">
      <div v-if="typeof products == 'object'">
          <slot name="productsSlot">
              <p>products.prodName</p>
              <p>products.prodDesc</p>
              <p>products.prodInfo</p>
          </slot>
      </div>
      <!-- <div v-else-if="typeof education == 'object'">
          <slot name="educationSlot">
              <p>projects.description</p>
              <p>projects.year</p>
              <p>projects.institution</p>
          </slot>
      </div> -->
      <div v-else>
          <slot name="noStockSlot">
              <h2>Out of stock</h2>
          </slot>
      </div>
  </div>
</template>
<script>
export default {
  props: ['products']
}
</script>
<style>
  /* .slots {
      overflow-x: hidden;
  } */
</style>