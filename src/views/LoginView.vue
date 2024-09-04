<template>
    <div class="login-container">
        <div class="login-logo">
            <img :src="lightLogo" alt="Logo" loading="lazy">
        </div>
        <form v-if="signUp" class="login-form">
            <div class="login-heading">
                <h3>Welcome Back!</h3>
            </div>
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
            <div class="login">
                <div class="input-group name">
                    <input type="text" name="email" autocomplete="off" class="input" v-model="username" :class="{ 'invalid-login-email': isFocused && !isValidEmail }" @focus="isFocused = true">
                    <label class="user-label">Email</label>
                </div>
            </div>
            <div class="login">
                <div class="input-group password">
                    <input :type="passwordType" name="password" autocomplete="off" class="input" v-model="loginPassword">
                    <label class="user-label">Password</label>
                    <span class="eye-icon" @click="togglePasswordVisibility">
                        <i class="fas" :class="passwordIcon"></i>
                    </span>
                </div>
            </div>
            <div class="login">
                <div class="input-group button">
                    <button class="login-btn" @click.stop.prevent="loginUser()" >Sign In</button>
                </div>
            </div>
            <div>
                <div>
                    <p>Don't have an account? <span class="sign-up" @click="signUp = !signUp">Sign Up</span></p>
                </div>
            </div>
        </form>
        <form v-else>
            <div class="signup-heading">
                <h3>Welcome!</h3>
            </div>
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
            <div class="login">
                <div class="input-group name">
                    <input type="text" name="name" autocomplete="off" class="input" v-model="firstName">
                    <label class="user-label">Name</label>
                </div>
            </div>
            <div class="login">
                <div class="input-group name">
                    <input type="text" name="email" autocomplete="off" class="input" v-model="email" :class="{ 'invalid-login-email': isFocused && !isValidEmail }" @focus="isFocused = true">
                    <label class="user-label">Email</label>
                </div>
            </div>
            <div class="login">
                <div class="input-group password">
                    <input :type="passwordType" name="password" autocomplete="off" v-model="password" class="input">
                    <label class="user-label">Password</label>
                    <span class="eye-icon" @click="togglePasswordVisibility">
                        <i class="fas" :class="passwordIcon"></i>
                    </span>
                </div>
            </div>
            <div class="login">
                <div class="input-group button">
                    <button class="login-btn" @submit="addUser">Sign Up</button>
                </div>
            </div>
            <div>
                <div>
                    <p>Already have an account? <span class="sign-up" @click="signUp = !signUp">Sign In</span></p>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
import 'vue3-toastify/dist/index.css';

export default {
    data() {
        return {
            lightLogo: 'https://harriselvin.github.io/hostedImages/Images/Light_Mode_PP_Logo.png',
            passwordType: 'password',
            passwordIcon: 'fa-eye',
            login: '',
            errors: [],
            isFocused: false,
            toastId: '',
            toastIds: [],
            firstName: '',
            email: '',
            password: '',
            username: '',
            loginPassword: '',
            signUp: true
        }
    },
    methods: {
        togglePasswordVisibility() {
            if (this.passwordType === 'password') {
                this.passwordType = 'text';
                this.passwordIcon = 'fa-eye-slash';
            } else {
                this.passwordType = 'password';
                this.passwordIcon = 'fa-eye';
            }
        },
        addUser() {
        this.$store.dispatch('addUser', this.$data)
        },
        loginUser() {
            this.$store.dispatch('loginUser', { email: this.username, password: this.loginPassword })

            // this.errors = []

            // if (!this.login) {
            //     this.errors.push("Email is required")
            // } else if (!this.isValidEmail) {
            //     this.errors.push("Invalid email")
            // }

            // if (this.errors.length) {
            //     event.preventDefault()

            // }
        }
    },computed: {
        isValidEmail() {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            return emailRegex.test(this.login)
        }
    }
}
</script>
<style>
    .login-container {
        margin: 8em 0 0;
    }
    .login-logo img {
        width: 8em;
        padding: 0 0 1em;
    }
    .login-logo, form {
        min-width: 20em;
    }
    .login-heading {
        margin: 0 0 3em;
    }
    form {
        display: flex;
        flex-direction: column;
        gap: 1em;
    }
    .login {
        display: flex;
        justify-content: center;
    }
    .input-group {
        position: relative;
    }
    .input {
        border: solid 1.5px #9e9e9e;
        border-radius: 1rem;
        background: none;
        padding: 1rem 2rem 1rem 1rem;
        font-size: 1rem;
        transition: border 150ms cubic-bezier(0.4,0,0.2,1);
    }
    .user-label {
        position: absolute;
        left: 15px;
        color: #e8e8e8;
        pointer-events: none;
        transform: translateY(1rem);
        transition: 150ms cubic-bezier(0.4,0,0.2,1);
    }
    .input:focus, .input:valid {
        outline: none;
        border: 1.5px solid #729ed8;
    }
    .input:focus ~ label, .input:valid ~ label {
        transform: translateY(-50%) scale(0.8);
        background-color: white;
        padding: 0 .2em;
        color: #2196f3;
    }
    .login-btn {
        border: solid 1.5px #9e9e9e;
        border-radius: 1rem;
        background: #729ed8;
        color: white;
        padding: .5rem 2rem;
        font-size: 1rem;
        transition: .5s;
        cursor: pointer;
        min-width: 16em;
    }
    .login-btn:hover {
        opacity: .8;
    }
    .login-btn:active {
        transform: scale(0.95);
    }
    .invalid-login-email {
        border: 1.5px solid red;
    }
    .eye-icon {
        position: absolute;
        top: 1em;
        right: 10px;
        cursor: pointer;
        color: #9e9e9e;
    }
    .sign-up {
        font-weight: bold;
        text-decoration: underline;
        cursor: pointer;
        transition: .3s;
    }
    .sign-up:hover {
        color: orangered;
    }
</style>