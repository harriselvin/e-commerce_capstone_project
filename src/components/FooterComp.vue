<template>
    <div class="footer-container">
        <div class="footer">
            <div class="footer-logo">
                <router-link :to="{name: 'home'}">
                    <img :src="darkLogo" alt="Logo">
                </router-link>
            </div>
            <div class="subscription">
                <div>
                    <div class="sub-title">
                        <h4>Subcribe</h4>
                    </div>
                    <div class="sub-text">
                        <p>
                            Subscribe to our newsletter and be among the first to hear about new arrivals and special offers.
                        </p>
                    </div>
                </div>
                <form class="subscribe" @submit="notify($event)" action="https://formsubmit.co/harriselvin6@gmail.com" method="POST" enctype="multipart/form-data" ref="form">
                    <p v-if="errors.length">
                        <b>
                            Please correct the following error(s):
                        </b>
                        <ul>
                            <li v-for="error in errors" :key="error">
                                {{ error }}
                            </li>
                        </ul>
                    </p>
                    <label for="sub-input">
                        <p>Email*</p>
                        <input type="text" name="subscribe" id="subscribe" v-model="subscribe" :class="{ 'invalid-email': isFocused && !isValidEmail }" @focus="isFocused = true">
                    </label>
                    <div class="sub-btn">
                        <button type="sumbit">Subscribe</button>
                    </div>
                </form>
            </div>
            <div class="address">
                <div>
                    <div class="add-title">
                        <h4>Address</h4>
                    </div>
                    <div class="add-text">
                        <p>
                            120 Phineas Avenue, <br>
                            Southern Suburbs, <br>
                            Cape Town, 8000, <br>
                            SA
                        </p>
                    </div>
                </div>
                <div>
                    <div class="social-links">
                        <p>
                            <a href="https://www.facebook.com/" target="_black">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
                                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
                                </svg>
                            </a>
                        </p>
                        <p>
                            <a href="https://www.instagram.com/" target="_blank">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
                                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
                                </svg>
                            </a>
                        </p>
                        <p>
                            <a href="https://x.com/" target="_blank">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-twitter-x" viewBox="0 0 16 16">
                                    <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
                                </svg>
                            </a>
                        </p>
                    </div>
                </div>
            </div>
            <div class="menu">
                <div>
                    <h4>Menu</h4>
                </div>
                <div class="list-group-items">
                    <router-link class="menu-link" :to="{name: 'shop'}">
                        <p class="list-item">Shop</p>
                    </router-link>
                    <router-link class="menu-link" :to="{name: 'shop', query: {category: 'balls'}}">
                        <p class="list-item">Balls</p>
                    </router-link>
                    <router-link class="menu-link" :to="{name: 'shop', query: {category: 'boots'}}">
                        <p class="list-item">Boots</p>
                    </router-link>
                    <router-link class="menu-link" :to="{name: 'shop', query: {category: 'jerseys'}}">
                        <p class="list-item">Jerseys</p>
                    </router-link>
                    <router-link class="menu-link" :to="{name: 'faq'}">
                        <p class="list-item">FAQ</p>
                    </router-link>
                    <router-link class="menu-link" :to="{name: 'termsAndConditions'}">
                        <p class="list-item">Terms & Conditions</p>
                    </router-link>
                    <router-link class="menu-link" :to="{name: 'privacyPolicy'}">
                        <p class="list-item">Privacy Policy</p>
                    </router-link>
                    <router-link class="menu-link" :to="{name: 'shippingPolicy'}">
                        <p class="list-item">Shipping Policy</p>
                    </router-link>
                    <router-link class="menu-link" :to="{name: 'refundPolicy'}">
                        <p class="list-item">Refund Policy</p>
                    </router-link>
                    <router-link class="menu-link" :to="{name: 'cookiePolicy'}">
                        <p class="list-item">Cookie Policy</p>
                    </router-link>
                </div>
            </div>
        </div>
        <hr>
        <div class="copyright">
            &copy; <span class="date">{{ new Date().getFullYear() }}</span> by Pitch Perfect Online Store | All Rights Reserved
        </div>
    </div>
</template>
<script>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    data() {
        return {
            darkLogo: 'https://harriselvin.github.io/hostedImages/Images/Dark_Mode_PP_Logo.png',
            subscribe: '',
            errors: [],
            isFocused: false,
            toastId: '',
            toastIds: [],
            name: "App",
            setup() {
                const notify = () => {
                toast("Wow so easy !", {
                    autoClose: 1000,
                }); // ToastOptions
                }
                return { notify };
            }
        }
    },
    methods: {
        notify(event) {
            this.errors = []

            if (!this.subscribe) {
                this.errors.push("Email is required")
            } else if (!this.isValidEmail) {
                this.errors.push("Invalid email")
            }

            if (this.errors.length) {
                event.preventDefault()

            } else {
                const toastId = toast.info(
                '!Subscribed successfully',
                {
                rtl: true,
                limit: 3,
                position: toast.POSITION.TOP_CENTER,
                },
                );
                this.toastIds.push(toastId);
            }
        }
    },
    computed: {
        isValidEmail() {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            return emailRegex.test(this.subscribe)
        }
    }
}
</script>
<style>
    .footer-container {
        background-color: black;
        color: white;
        width: 100%;
    }
    .footer {
        display: flex;
        justify-content: space-evenly;
        text-align: left;
        margin: -1em 0 0;
    }
    .footer > * {
        flex: 1;
    }
    .footer-logo img {
        width: clamp(10em, 100%, 100%);
    }
    .footer h4 {
        text-transform: uppercase;
    }
    .footer p, button {
        font-size: 12px;
    }
    .footer-logo {
        padding: 2em 0 0 2em;
    }
    .subscription, .address, .menu {
        padding: 5em 0 2em 5em;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .subscribe {
        display: flex;
        align-items: center;
        gap: 1em;
        margin: 0 0 1em;
    }
    .subscribe input {
        background-color: transparent;
        border: none;
        border-bottom: 1px solid white;
        padding: .5em 0;
        color: white;
        padding: 1em;
        font-size: 12px;
    }
    .subscribe input:focus {
        outline: 2px solid white;
    }
    .sub-btn button {
        padding: 1em 3em;
        border-radius: 10em;
        border: 2px solid white;
        background-color: black;
        color: white;
        transition: .5s;
        cursor: pointer;
    }
    .sub-btn button:hover {
        background-color: white;
        color: black;
    }
    .invalid-email {
        outline: 2px solid red;
    }
    .copyright {
        padding: 1em 0;
        margin: 0 0 -.5em;
        font-size: 12px;
    }
    .social-links {
        display: flex;
    }
    .social-links p {
        padding: 0 .4em;
    }
    .social-links a {
        color: white;
    }
    .list-group-items .menu-link {
        text-decoration: none;
        color: white;
        transition: .2s;
    }
    .list-group-items .menu-link:hover {
        opacity: .7;
    }
    @media only screen and (max-width: 900px)  {
        .footer-container {
            min-width: 45em;
        }
        .subscribe {
            flex-wrap: wrap;
        }
    }
</style>