<template>
    <div class="refund-container">
        <div class="refund-content">
            <div class="refund-heading refund-title">
                <h2>Refund Policy</h2>
            </div>
            <div class="refund-title">
                <h4>1. Returns</h4>
                <p>We offer a 30-day return policy on most items. To be eligible for a return:</p>
                <ul>
                    <li>The product must be unused and in its original packaging.</li>
                    <li>Proof of purchase is required.</li>
                </ul>
                <p>To initiate a return, contact us at support@pitchperfect.com.</p>
            </div>
            <div class="refund-title">
                <h4>2. Refunds</h4>
                <p>
                    Once we receive and inspect your returned item, we will notify you of the approval or rejection of your refund. Approved refunds will be processed to your original payment method within 5-10 business days.
                </p>
            </div>
            <div class="refund-title">
                <h4>3. Non-Refundable Items</h4>
                <p>Certain items are non-refundable, including:</p>
                <ul>
                    <li>Customized or personalized products.</li>
                    <li>Gift cards.</li>
                    <li>Final sale items.</li>
                </ul>
            </div>
            <div class="refund-title">
                <h4>4. Exchanges</h4>
                <p>
                    We only replace items if they are defective or damaged. If you need an exchange, please contact us at support@pitchperfect.com.
                </p>
            </div>
        </div>
        <div class="refund-footer">
            <footer-comp/>
        </div>
    </div>
</template>
<script>
import FooterComp from '@/components/FooterComp.vue';

export default {
    components: {
        FooterComp
    }
}
</script>
<style>
    .refund-container {
        margin: 10em 0 0;
        min-width: 45em;
    }
    .refund-content {
        margin: 2em 5em 0;
        text-align: left;
    }
    .refund-content p, li {
        font-size: 14px;
    }
    .refund-content li {
        padding: .5em 0 0;
    }
    .refund-title {
        padding: .5em 0 0;
    }
    .refund-footer {
        margin: 5em -.5em 0;
    }
</style>