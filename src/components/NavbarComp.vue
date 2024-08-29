<template>
  <div class="nav-container">
    <nav class="navbar">
      <div class="home-page">
        <router-link to="/home">Home</router-link> 
      </div>
      <div class="other-pages">
        <router-link to="/shop">Shop</router-link> |
        <router-link to="/about">About</router-link>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  
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
  .navbar .other-pages {
    margin-right: 2.5em;
  }
</style>