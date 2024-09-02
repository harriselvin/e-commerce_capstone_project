<template>
    <div class="home-comp">
        <div class="best-seller-head">
            <h3>Best <br> Sellers</h3>
        </div>
        <div class="best-sellers">
            <div v-for="seller in sellerData" :key="seller">
                <card-comp :bestSellers="seller">
                    <template #bestSellerSlot>
                        <router-link class="seller-router" :to="{name: 'bestSeller', params:{id: seller.bestSellerID}}">
                            <div class="seller-img-box">
                                <div class="seller-img">
                                    <img :src="seller.sellerUrl" :alt="seller.sellerName">
                                </div>
                            </div>
                        </router-link>
                        <div class="seller-content-box">
                            <div>
                                <h5>{{ seller.sellerName }}</h5>
                                <p>R{{ seller.sellerPrice }}</p>
                            </div>
                        </div>
                    </template>
                </card-comp>
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
    computed: {
        sellerData() {
            return this.$store.state.bestSellers
        },
    },
    methods: {
        async getBestSellers() {
        try {
            await this.$store.dispatch('getBestSellers')

            this.loading = false
        } catch (error) {
            console.error("Failed to fetch best sellers data:", error);
        }
        },
    },
    mounted() {
        try {
            this.getBestSellers()
        } catch (error) {
            console.error("Failed to fetch best sellers data:", error);
        }
    }
}
</script>
<style>
    .best-seller-head {
        font-size: 2.5em;
        min-width: 15em;
        margin: 1em 0 0;
        text-align: left;
        text-transform: uppercase;
    }
    .best-sellers {
        display: grid;
        gap: 1em;
        margin: 0 auto;
        grid-template-columns: repeat(auto-fit, minmax(15em, 1fr));
    }
    .seller-img-box{
        position: relative;
    }
    .seller-img::after {
        content: "Best Seller";
        padding: 3px 10px;
        background-color: green;
        position: absolute;
        top: 0;
        left: 0;
        font-size: 13px;
        color: white;
    }
    .seller-img img {
        height: 20em;
        width: 100%;
        object-fit: cover;
        border: 2px solid lightgrey;
    }
    .seller-content-box {
        text-align: left;
    }
    .seller-content-box p {
        font-size: 13px;
    }
</style>