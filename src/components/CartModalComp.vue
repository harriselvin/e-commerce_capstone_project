<template>
    <div>
        <div v-if="show" class="modal-overlay">
            <div class="modal-container" :class="{ show: show }">
                <div class="modal" :class="{ show: show }">
                    <div class="modal-heading">
                        <h2 class="back-to-shop" @click="$emit('close')">></h2>
                        <h2>Cart</h2>
                    </div>
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
                                                <p>R <span class="price">{{ (item.product.price * item.quantity).toFixed(2) }}</span></p>
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
                                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                            </svg>
                                        </div>
                                    </div>
                                </template>
                            </card-comp>
                        </div>
                        <div class="checkout-btn">
                            <div class="cart-total-price">
                                <p>Total: R {{ totalCartPrice }}</p>
                            </div>
                            <div class="cart-actions">
                                <button @click="handleCheckout">Checkout</button>
                                <button>Clear</button>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <p>Your cart is empty.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import CardComp from './CardComp.vue';

export default {
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
        }
    },
    methods: {
        closeModal() {
            this.$emit('close')
        },
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
                // this.quantity = 1;
                this.$store.commit('updateQuantity', { productId, quantity: 1 })
            } else {
                // this.quantity = value
                this.$store.commit('updateQuantity', { productId, quantity: value })
            }
        },
        checkout() {
            this.$emit('cart')
        }
    },
    watch: {
        '$store.state.isAuthenticated'(newVal) {
            if (newVal) {
                this.$store.dispatch('addToCartDatabase', this.cartItems)
            }
        }
    },
    mounted() {
        this.$store.dispatch('getCartItems')
    }
}
</script>
<style scoped>
    .modal-container {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        visibility: hidden;
        background-color: rgba(0, 0, 0, .5);
        transition: .5s ease-in-out;
    }
    .modal {
        position: absolute;
        top: 6em;
        right: 0;
        transform: translateX(100%);
        background-color: #fff;
        border: 1px solid #ddd;
        width: 400px;
        height: 100%;
        max-height: 80vh;
        transition: transform .5s ease-in-out;
        overflow-y: auto;
    }
    .modal-heading {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #000;
        color: #fff;
        margin: 0;
        padding: 0 1em;
        position: sticky;
        top: 0;
    }
    .back-to-shop {
        cursor: pointer;
    }
    .modal-container.show {
        visibility: visible;
    }
    .modal.show {
        transform: translateX(0);
    }
    .cart-content {
        min-height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .cart-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: .5em;
    }
    .cart-box img {
        height: 8em;
    }
    .cart-prod-quan {
        display: flex;
        align-items: center;
    }
    .cart-prod-quan p {
        padding: 0 .5em;
    }
    .cart-prod-quan input {
        width: 4em;
        height: 2em;
        padding: 0 .3em;
    }
    .cart-actions {
        display: flex;
        gap: .5em;
    }
    .checkout-btn {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #000;
        margin: 0;
        padding: 1em 0;
        position: sticky;
        width: 100%;
        bottom: 0;
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