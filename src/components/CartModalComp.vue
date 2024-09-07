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
                                            <h3>{{ item.product.prodName }}</h3>
                                            <p>Price: R {{ item.product.price }}</p>
                                            <p>Quantity: {{ item.quantity }}</p>
                                            <p>Total: R {{ (item.product.price * item.quantity).toFixed(2) }}</p>
                                        </div>
                                    </div>
                                </template>
                            </card-comp>
                        </div>
                        <button @click="handleCheckout">Checkout</button>
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
        width: 300px;
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
</style>