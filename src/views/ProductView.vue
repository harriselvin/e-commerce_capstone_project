<template>
    <div class="prod-container">
        <div>
            <div v-if="loading">
                <page-spinner-comp/>
            </div>
            <div v-else-if="productData">
                <div>
                    <div class="routes">
                        <router-link class="router" :to="{name: 'home'}">
                            Home
                        </router-link> /
                        <router-link class="router" :to="{name: 'shop'}">
                            Shop
                        </router-link> /
                        <div class="cur-router">
                            {{ productData.prodName }}
                        </div>
                    </div>
                    <card-comp :product="productData">
                        <template #productSlot>
                            <div class="item-box">
                                <div class="prod-image">
                                    <img :src=productData.prodUrl :alt=productData.prodName>
                                    <div class="info-of-prod">
                                        <p>{{ productData.prodInfo }}</p>
                                    </div>
                                </div>
                                <div class="item-info">
                                    <div class="prod-name">
                                        <h3>{{ productData.prodName }}</h3>
                                    </div>
                                    <div class="prod-price">
                                        <p>R <span class="price">{{ totalPrice }}</span></p>
                                    </div>
                                    <div class="prod-quan">
                                        <p>Quantity</p>
                                        <input @input="updateQuantity($event)" type="number" name="quantity"
                                        :disabled="quantityDisable()"
                                        min="1">
                                    </div>
                                    <div class="prod-btn">
                                        <button @click="openModal">Add to Cart</button>
                                    </div>
                                    <div class="desc-boxes">
                                        <div v-for="(desc, index) in descriptions" :key="index" class="prod-desc">
                                            <div class="desc-box" @click="toggleDesc(index)">
                                                <div class="desc-heading">
                                                    <p>{{ desc.title }}</p>
                                                </div>
                                                <div class="desc-dropdown">
                                                    {{ expandedIndex === index ? '-' : '+' }}
                                                </div>
                                            </div>
                                            <div class="desc-of-prod" :class="{show: expandedIndex === index}">
                                                <p class="expansion">{{ desc.content }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </card-comp>
                </div>
                <div>
                    <cart-modal-comp :show="isModalOpen" @close="closeModal"/>
                </div>
                <div class="prod-footer">
                    <footer-comp/>
                </div>
            </div>
            <div v-else class="error-product">
                <p>Failed to Fetch Product Data</p>
            </div>
        </div>
    </div>
</template>
<script>
import CardComp from '@/components/CardComp.vue';
import { toRaw } from 'vue';
import PageSpinnerComp from '@/components/PageSpinnerComp.vue';
import CartModalComp from '@/components/CartModalComp.vue';
import FooterComp from '@/components/FooterComp.vue';

export default {
    data() {
        return {
            productId: null,
            loading: true,
            quantity: 1,
            isModalOpen: false,
            expandedIndex: 0,
            descriptions: [
                { title: "PRODUCT INFO", content: "" },
                { title: "RETURN & REFUND POLICY", content: "Returns are accepted within 30 days of delivery for a refund or exchange if items are in original condition. Contact customer service to initiate a return and receive a return shipping label. Return shipping costs are the customer’s responsibility, unless due to our error. Refunds are processed within 5-7 business days after receiving the item. More info can be found on the FAQ page" },
                { title: "SHIPPING INFO", content: "Standard Shipping: 5-7 days, free on orders over $50. Expedited Shipping: 2-3 days, $9.99 flat rate. Express Shipping: Next-day delivery, $19.99 flat rate. International shipping is available; rates and times vary. Orders are processed within 1-2 business days and come with tracking. More info can be found on the FAQ page" }
            ]
        }
    },
    props: {
        product: {
            type: Object,
            required: true
        }
    },
    components: {
        CardComp,
        PageSpinnerComp,
        CartModalComp,
        FooterComp
    },
    computed: {
        productData() {
          return this.$store.state.product
        },
        totalPrice() {
            return (this.productData.price * this.quantity).toFixed(2)
        }
    },
    methods: {
        async getProduct() {
            try {
                await this.$store.dispatch('getProduct', this.$route.params.id)
                this.loading = false

                const rawProductData = toRaw(this.productData)
                
                if (this.descriptions?.length > 0 && rawProductData && rawProductData.prodDesc) {
                    this.descriptions[0].content = rawProductData.prodDesc
                }
            } catch (error) {
                console.error("Failed to fetch product data:", error);
            }
        },
        quantityDisable() {
            return this.quantity <= 0;
        },
        updateQuantity(event) {
            const value = parseInt(event.target.value);
            if (isNaN(value) || value < 1) {
                this.quantity = 1;
            } else {
                this.quantity = value
            }
        },
        toggleDesc(index) {
            this.expandedIndex = this.expandedIndex === index ? null : index
        },
        openModal() {
            this.$store.dispatch('addToCart', {
                product: this.productData,
                quantity: this.quantity
            })
            this.isModalOpen = true
        },
        closeModal() {
            this.isModalOpen = false
        }
    },
    mounted() {
        this.productId = this.$route.params.id
        this.getProduct()
    },
    watch: {
        quantity(newValue) {
            if (newValue <= 0) {
                this.quantity = 1
            }
        }
    }
}
</script>
<style>
    .prod-container {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .routes {
        display: flex;
    }
    .routes .router {
        color: orangered;
    }
    .routes .router, .cur-router {
        text-decoration: none;
        padding: 0 .2em;
    }
    .routes .router:hover {
        text-decoration: underline;
    }
    .item-box {
        display: flex;
        flex-wrap: wrap;
        gap: 1em;
    }
    .prod-image {
        flex: 1 1 30em;
        min-width: 6em;
        display: flex;
        justify-content: center;
        flex-direction: column;
        max-width: 30em;
        margin-left: 10%;
    }
    .prod-image img {
        height: auto;
        max-height: 40em;
        border: 2px solid lightgrey;
        object-fit: cover;
    }
    .info-of-prod {
        margin: 2em 0 1cqi;
    }
    .item-info {
        flex: 1 1 10em;
        min-width: 6em;
        padding: 1em;
        margin-right: 10%;
        text-align: left;
    }
    .item-info h3 {
        width: 100%;
    }
    .prod-quan input {
        width: 4em;
        padding: .3em;
    }
    .prod-btn {
        margin: 1em 0;
    }
    .prod-btn button {
        padding: .5em 0;
        width: 100%;
        background-color: rgb(255, 119, 0);
        color: white;
    }
    .prod-btn button:active {
        background-color: orangered;
    }
    .desc-box {
        border-bottom: 1px solid grey;
        height: 3em;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
    }
    .desc-heading {
        font-weight: 500;
    }
    .desc-of-prod {
        max-height: 0;
        overflow: hidden;
        transition: max-height .5s;
    }
    .desc-of-prod.show {
        max-height: 100vh;
        overflow: visible;
    }
    .desc-dropdown {
        color: grey;
        height: 1em;
        transition: .5s;
    }
    .desc-dropdown:hover {
        opacity: .8;
    }
    .prod-footer {
        margin: 5em 0 0;
    }
    .error-product {
        margin: 10em 0 0;
    }
    @media only screen and (max-width: 700px) {
        .item-info {
            margin: 0;
        }
    }
</style>