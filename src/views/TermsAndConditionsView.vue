<template>
    <div class="terms-container">
        <div class="terms-content">
            <div class="terms-heading">
                <h2>Terms & Conditions</h2>
            </div>
            <div class="terms-intro terms-title">
                <h4>Introduction</h4>
                <p>
                    Welcome to Pitch Perfect Online Store ("we", "our", or "us"). These Terms and Conditions ("Terms") govern your use of our website, services, and products. By accessing or using our website, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you must not use our website.
                </p>
            </div>
            <div class="terms-title">
                <h4>2. Products and Services</h4>
                <p>
                    We offer a variety of soccer equipment, including but not limited to soccer balls, boots, and jerseys. All products are subject to availability. We reserve the right to discontinue any product at any time.
                </p>
            </div>
            <div class="terms-title">
                <h4>3. Orders and Payment</h4>
                <p class="terms-subheading">3.1 <span>Order Placement</span></p>
                <p>
                    Orders can be placed through our website or by contacting our customer service team. By placing an order, you agree that all information provided is accurate and complete.
                </p>
                <p class="terms-subheading">3.2 <span>Payment Methods</span></p>
                <p>
                    We accept credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. Payment must be received in full before your order is processed. Prices are subject to change without notice.
                </p>
                <p class="terms-subheading">3.3 <span>Order Changes and Cancellations</span></p>
                <p>
                    If you wish to change or cancel your order, please contact us immediately. Changes or cancellations may not be possible once the order is in progress.
                </p>
            </div>
            <div class="terms-title">
                <h4>4. Shipping and Delivery</h4>
                <p class="terms-subheading">4.1 <span>Domestic and International Shipping</span></p>
                <p>
                    We offer shipping to select countries. Shipping costs and delivery times vary based on location. Once an order is shipped, we will provide a tracking number via email.
                </p>
                <p class="terms-subheading">4.2 <span>Delivery Issues</span></p>
                <p>
                    If you encounter any issues with delivery or receive a damaged item, please contact our customer service team within 48 hours of delivery. We will work to resolve the issue, which may include a replacement or refund.
                </p>
            </div>
            <div class="terms-title">
                <h4>5. Returns and Refunds</h4>
                <p class="terms-subheading">5.1 <span>Return Policy</span></p>
                <p>
                    We offer a 30-day return policy on most items. To be eligible for a return, the product must be unused, in its original packaging, and in the same condition as when received. Proof of purchase is required.
                </p>
                <p class="terms-subheading">5.2 <span>Refunds</span></p>
                <p>
                    Once we receive your return, we will inspect the item and notify you of the status of your refund. If approved, the refund will be processed to your original payment method within a specified timeframe.
                </p>
            </div>
            <div class="terms-title">
                <h4>6. Discounts and Promotions</h4>
                <p>
                    We may offer discounts and promotions from time to time. These offers are subject to specific terms and conditions, which will be communicated at the time of the offer. Discounts cannot be combined with other offers unless stated otherwise.
                </p>
            </div>
            <div class="terms-title">
                <h4>7. Limitation of Liability</h4>
                <p>
                    To the maximum extent permitted by law, we are not liable for any direct, indirect, incidental, special, or consequential damages arising from your use of our website or products.
                </p>
            </div>
            <div class="terms-title">
                <h4>8. Governing Law</h4>
                <p>
                    These Terms and Conditions are governed by and construed in accordance with the laws of South Africa. Any disputes will be resolved in the courts of South Africa.
                </p>
            </div>
            <div class="terms-title">
                <h4>9. Changes to Terms</h4>
                <p>
                    We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting on our website. Continued use of the website following any changes constitutes acceptance of the new Terms.
                </p>
            </div>
            <div class="terms-title">
                <h4>10. Contact Us</h4>
                <p>
                    If you have any questions about these Terms, please contact us at support@pitchperfect.com or +27 12 345 6789.
                </p>
            </div>
        </div>
        <div class="terms-footer">
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
    .terms-container {
        margin: 10em 0 0;
        min-width: 45em;
    }
    .terms-content {
        margin: 2em 5em 0;
        text-align: left;
    }
    .terms-content p {
        font-size: 14px;
    }
    .terms-title {
        padding: .5em 0 0;
    }
    .terms-subheading {
        padding: .5em 0;
    }
    .terms-subheading span {
        font-weight: bold;
    }
</style>