<template>
    <div class="cart-container">
        <div class="cart-heading">
            <h2>Checkout Page</h2>
        </div>
        <div>
            <div class="cart-content" v-if="cartItems.length > 0">
                <div v-for="item in cartItems" :key="item.product.id" class="cart-item">
                    <card-comp :addCartItems="item">
                        <template #addCartItemSlot>
                            <div class="cart-box">
                                <img :src="item.product.prodUrl" :alt="item.product.prodName" class="cart-item-img">
                                <div class="cart-item-details">
                                    <div class="cart-prod-name">
                                        <h3>{{ item.product.prodName }}</h3>
                                    </div>
                                    <div class="cart-prod-price">
                                        <p class="price">R <span>{{ (item.product.price * item.quantity).toFixed(2) }}</span></p>
                                    </div>
                                    <div class="cart-prod-quan">
                                        <p>Quantity</p>
                                        <input @input="updateQuantity($event, item.product.id)" type="number" name="quantity"
                                        :disabled="quantityDisable(item.quantity)"
                                        min="1"
                                        :value="item.quantity">
                                    </div>
                                </div>
                                <div>
                                    <svg @click="removeFromCart(item.id)" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                    </svg>
                                </div>
                            </div>
                            <hr>
                        </template>
                    </card-comp>
                </div>
                <div class="checkout-btn">
                    <div class="cart-total-price">
                        <p class="total-price">Total: R {{ totalCartPrice }}</p>
                    </div>
                    <div class="cart-actions">
                        <button @click="addItemToCart(item.product)">Checkout</button>
                        <button>Clear</button>
                    </div>
                </div>
            </div>
            <div v-else>
                <p>Your cart is empty.</p>
            </div>
        </div>
    </div>
</template>
<script>
import CardComp from '@/components/CardComp.vue';

export default {
    data() {
        return {
            loading: true
        }
    },
    components: {
        CardComp
    },
    props: {
        show: {
            type: Boolean
        },
    },
    computed: {
        cartItems() {
            console.log(this.$store.state.cart)
            return this.$store.state.cart
        },
        isAuthenticated() {
            return this.$store.state.isAuthenticated
        },
        totalCartPrice() {
            return this.cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0).toFixed(2);
        },
        cartData() {
            return this.$store.state.cartItems
        }
    },
    methods: {
        handleCheckout() {
            if (this.isAuthenticated) {
                this.$store.dispatch('addToCartDatabase', this.cartItems)
            } else {
                alert('Please log in or sign up to complete the checkout.')
                this.$router.push({ name: 'login' })
            }
        },
        quantityDisable(quantity) {
            return quantity <= 0;
        },
        updateQuantity(event, productId) {
            const value = parseInt(event.target.value);
            if (isNaN(value) || value < 1) {
                this.$store.commit('updateQuantity', { productId, quantity: 1 })
            } else {
                this.$store.commit('updateQuantity', { productId, quantity: value })
            }
        },
        checkout() {
            this.$emit('cart')
        },
        addItemToCart(product) {
            this.$store.dispatch('addToCart', product)
        },
        removeFromCart(itemId) {
            this.$emit('remove-from-cart', itemId);
            const cartItems = this.cartItems.filter(item => item.id !== itemId);
            this.$store.commit('UPDATE_CART_ITEMS', cartItems);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));

            if (this.authenticated) {
                this.$store.dispatch('removeFromCartDatabase', itemId);
            }
        },
    },
    watch: {
        '$store.state.isAuthenticated'(newVal) {
            if (newVal) {
                this.$store.dispatch('addToCartDatabase', this.cartItems)
            }
        }
    },
    mounted() {
        this.$store.dispatch('getCartItems').then(() => {
            this.loading = false
        })
    }
}
</script>
<style scoped>
    .cart-container {
        margin: 10em 0 0;
        min-width: 45em;
    }
    hr {
        width: 80%;
    }
    .back-to-shop {
        cursor: pointer;
    }
    .cart-content {
        min-height: 65vh;
    }
    .cart-box {
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: .5em;
    }
    .cart-box img {
        height: 10em;
    }
    .cart-item-details {
        text-align: left;
    }
    .cart-prod-quan {
        display: flex;
        align-items: center;
    }
    .cart-prod-quan p {
        padding-right: 2em;
    }
    .cart-prod-quan input {
        width: 4em;
        height: 2em;
        padding: 0 .3em;
    }
    .checkout-btn {
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-top: 1px solid black;
        background-color: grey;
        margin-left: -.5em;
        padding: 0;
        width: 100%;
        position: fixed;
        bottom: 0;
    }
    .total-price {
        color: white;
    }
    .cart-actions {
        display: flex;
        gap: .5em;
    }
    .checkout-btn button {
        padding: .5em 1em;
        color: orangered;
        transition: .3s;
        cursor: pointer;
        border-radius: 4px;
    }
    .checkout-btn button:hover {
        color: white;
        background-color: orangered;
    }
    .bi-trash {
        cursor: pointer;
        transition: .3s;
    }
    .bi-trash:hover {
        color: orangered;
    }
</style>