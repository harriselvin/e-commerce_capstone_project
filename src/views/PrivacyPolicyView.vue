<template>
    <div class="privacy-container">
        <div class="privacy-content">
            <div class="privacy-heading">
                <h1>Privacy Policy</h1>
            </div>
            <div class="privacy-intro privacy-title">
                <h4>1. Introduction</h4>
                <p>
                    We respect your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data.
                </p>
            </div>
            <div class="privacy-title">
                <h4>2. Information We Collect</h4>
                <ul>
                    <li><span class="bold">Personal Information</span>: Name, email address, phone number, shipping address, and payment details.
                    </li>
                    <li><span class="bold">Non-Personal Information</span>: Browser type, IP address, and website usage data.
                    </li>
                </ul>
            </div>
            <div class="privacy-title">
                <h4>3. How We Use Your Information</h4>
                <p>We use your information to:</p>
                <ul>
                    <li>Process and fulfill your orders.</li>
                    <li>Improve our website and services.</li>
                    <li>Send promotional offers, if consent is provided.</li>
                    <li>Respond to inquiries and provide customer support.</li>
                </ul>
            </div>
            <div class="privacy-title">
                <h4>4. Sharing Your Information</h4>
                <p>
                    We do not sell, rent, or trade your personal information. We may share data with third-party service providers to help us operate our business (e.g., payment processing, shipping).
                </p>
            </div>
            <div class="privacy-title">
                <h4>5. Your Rights</h4>
                <p>
                    You have the right to access, correct, or delete your personal information. To exercise these rights, contact us at support@pitchperfect.com.
                </p>
            </div>
            <div class="privacy-title">
                <h4>6. Security</h4>
                <p>
                    We implement security measures to protect your data. However, no method of transmission over the internet is 100% secure.
                </p>
            </div>
            <div class="privacy-title">
                <h4>7. Changes to This Policy</h4>
                <p>
                    We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date.
                </p>
            </div>
            <div class="privacy-title">
                <h4>8. Contact Us</h4>
                <p>
                    For questions or concerns, email us at support@pitchperfect.com.
                </p>
            </div>
        </div>
        <div class="privacy-footer">
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
    .privacy-container {
        margin: 10em 0 0;
        min-width: 45em;
    }
    .privacy-content {
        margin: 2em 5em 0;
        text-align: left;
    }
    .privacy-content p, li {
        font-size: 14px;
    }
    .privacy-content li {
        padding: .5em 0 0;
    }
    .privacy-title {
        padding: .5em 0 0;
    }
    .privacy-title span {
        font-weight: bold;
    }
    .privacy-footer {
        margin: 5em -.5em 0;
    }
</style>