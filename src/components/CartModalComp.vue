<template>
    <div>
        <div v-if="isModalOpen">
            <div class="modal-container" :class="{ show: show }">
                <div class="modal" :class="{ show: show }">
                    <div class="modal-heading">
                        <h2 class="back-to-shop" @click="$emit('close')">></h2>
                        <h2>Cart</h2>
                    </div>
                </div>
            </div>
            <div>
                <ul>
                    <li v-for="(item, index) in cart" :key="index">
                        {{ item.product.prodName }}
                        ({{ item.quantity }})
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        show: {
            type: Boolean
        }
    },
    computed: {
        cart() {
            return this.$store.state.cart
        }
    },
    methods: {
        closeModal() {
            this.$emit('close')
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