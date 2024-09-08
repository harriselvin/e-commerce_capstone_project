<template>
    <div>
        <div v-if="show" class="modal-overlay">
            <div class="modal-container" :class="{ show: show }">
                <div class="modal" :class="{ show: show }">
                    <div class="modal-heading">
                        <h2 class="back-to-shop" @click="$emit('close')">></h2>
                        <h2>Cart</h2>
                    </div>
                    <div v-if="cartItems.length > 0">
                        <div v-for="item in cartItems" :key="item.product.id" class="cart-item">
                            <card-comp :cartItems="item">
                                <template #cartItemSlot>
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
                                                value="item.quantity">
                                            </div>
                                            <p>Total: R {{ (item.product.price * item.quantity).toFixed(2) }}</p>
                                        </div>
                                    </div>
                                </template>
                            </card-comp>
                        </div>
                        <div class="checkout-btn">
                            <button @click="handleCheckout">Checkout</button>
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
    }
}
</script>
<style>
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
        transition: transform .5s ease-in-out;
    }
    .modal-heading {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #000;
        color: #fff;
        margin: 0;
        padding: 0 1em;
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
    .cart-box {
        display: flex;
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
</style>