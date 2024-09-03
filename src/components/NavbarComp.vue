<template>
  <div class="nav-container">
    <nav class="navbar">
      <div class="home-page">
        <router-link to="/">
          <img class="logo-img" :src="lightLogo" alt="Logo">
        </router-link> 
      </div>
      <div class="other-pages">
        <router-link to="/shop">Shop</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/contact">Contact</router-link> |
        <router-link to="/cart">Cart</router-link> |
        <router-link to="/login">Login</router-link> 
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  data() {
    return {
      lightLogo: 'https://harriselvin.github.io/hostedImages/Images/Light_Mode_PP_Logo.png',
    }
  }
}
</script>
<style>
  .nav-container {
    margin: -.5em;
  }
  .navbar {
    padding: 2em 1em;
    display: flex;
    justify-content: space-between;
    position: fixed;
    min-width: 100%;
    background-color: white;
    top: 0;
    z-index: 1;
  }

  .navbar a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
    transition: .3s;
  }

  .navbar a:hover {
    color: orangered;
  }

  .navbar a.router-link-exact-active {
    color: orangered;
  }
  .navbar .logo-img {
    width: 3em;
  }
  .navbar .other-pages {
    margin-right: 2.5em;
    display: flex;
  }
  .navbar .other-pages > * {
    padding: 0 1em;
  }
</style>