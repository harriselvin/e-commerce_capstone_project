<template>
    <div class="shipping-container">
        <div class="shipping-content">
            <div class="shipping-heading shipping-title">
                <h2>Shipping Policy</h2>
            </div>
            <div class="shipping-title">
                <h4>1. Shipping Locations</h4>
                <p>
                    We ship to select countries. Please check our website for the latest list of available destinations.
                </p>
            </div>
            <div class="shipping-title">
                <h4>2. Shipping Costs</h4>
                <p>
                    Shipping costs vary based on your location, order weight, and shipping method. The total shipping cost will be displayed at checkout.
                </p>
            </div>
            <div class="shipping-title">
                <h4>3. Delivery Time</h4>
                <p>Estimated delivery times are as follows:</p>
                <ul>
                    <li><span>Domestic Shipping</span>: 3-7 business days.</li>
                    <li><span>International Shipping</span>: 7-21 business days.</li>
                </ul>
                <p>
                    Please note that these times may vary due to unforeseen circumstances such as customs delays.
                </p>
            </div>
            <div class="shipping-title">
                <h4>4. Order Processing</h4>
                <p>
                    Orders are processed within 1-2 business days. You will receive a confirmation email with a tracking number once your order is shipped.
                </p>
            </div>
            <div class="shipping-title">
                <h4>5. Lost or Damaged Packages</h4>
                <p>
                    If your package is lost or arrives damaged, please contact us within 48 hours of delivery. We will work to resolve the issue, which may include a replacement or refund.
                </p>
            </div>
            <div class="shipping-title">
                <h4>6. Customs and Import Duties</h4>
                <p>
                    International customers are responsible for any customs duties, taxes, or fees imposed by their country.
                </p>
            </div>
        </div>
        <div class="shipping-footer">
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
    .shipping-container {
        margin: 10em 0 0;
        min-width: 45em;
    }
    .shipping-content {
        margin: 2em 5em 0;
        text-align: left;
    }
    .shipping-content p, li {
        font-size: 14px;
    }
    .shipping-content li {
        padding: .5em 0 0;
    }
    .shipping-content span {
        font-weight: bold;
    }
    .shipping-title {
        padding: .5em 0 0;
    }
    .shipping-footer {
        margin: 5em -.5em 0;
    }
</style>