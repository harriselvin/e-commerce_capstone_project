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
    min-width: 100vw;
    background-color: white;
    top: 0;
  }

  .navbar a {
    font-weight: bold;
    color: #2c3e50;
  }

  .navbar a.router-link-exact-active {
    color: #42b983;
  }
  .navbar .other-pages {
    margin-right: 2.5em;
  }
</style>