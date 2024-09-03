<template>
    <div class="cookie-container">
        <div class="cookie-content">
            <div class="cookie-heading">
                <h1>Cookie Policy</h1>
            </div>
            <div class="cookie-title">
                <h4>1. What Are Cookies?</h4>
                <p>
                    Cookies are small text files stored on your device to help improve your experience on our website.
                </p>
            </div>
            <div class="cookie-title">
                <h4>2. Types of Cookies We Use</h4>
                <ul>
                    <li><span>Essential Cookies</span>: Necessary for website functionality.</li>
                    <li><span>Performance Cookies</span>: Help us understand website usage and improve user experience.</li>
                    <li><span>Marketing Cookies</span>: Used to deliver relevant advertisements and promotions.</li>
                </ul>
            </div>
            <div class="cookie-title">
                <h4>3. How to Manage Cookies</h4>
                <p>
                    You can control or delete cookies through your browser settings. However, disabling cookies may affect your experience on our website.
                </p>
            </div>
            <div class="cookie-title">
                <h4>4. Third-Party Cookies</h4>
                <p>
                    We may use third-party cookies for analytics and advertising purposes. These cookies are subject to the privacy policies of the third parties.
                </p>
            </div>
            <div class="cookie-title">
                <h4>5. Changes to This Policy</h4>
                <p>
                    We may update this Cookie Policy periodically. Changes will be posted on this page.
                </p>
            </div>
            <div class="cookie-title">
                <h4>6. Contact Us</h4>
                <p>
                    For any questions regarding our use of cookies, email us at support@pitchperfect.com.
                </p>
            </div>
        </div>
        <div class="cookie-footer">
            <footer-comp/>
        </div>
    </div>
</template>
<script>
import FooterComp from '@/components/FooterComp.vue'
export default {
  components: { 
        FooterComp 
    },
    
}
</script>
<style>
    .cookie-container {
        margin: 10em 0 0;
        min-width: 45em;
    }
    .cookie-content {
        margin: 2em 5em 0;
        text-align: left;
    }
    .cookie-content p, li {
        font-size: 14px;
    }
    .cookie-content li {
        padding: .5em 0 0;
    }
    .cookie-content span {
        font-weight: bold;
    }
    .cookie-title {
        padding: .5em 0 0;
    }
    .cookie-footer {
        margin: 5em -.5em 0;
    }
</style>