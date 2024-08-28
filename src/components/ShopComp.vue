<template>
  <div class="container">
    <div class="shop-section">
      <div class="text-sec">
        <div class="text">
          <h2>Shop Now</h2>
        </div> 
      </div>
      <div class="image">
        <img :src='backgroundImg' alt='Image'>
      </div> 
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      backgroundImg: 'https://i.pinimg.com/736x/29/6c/93/296c93f3bd54c365485ea1e1ec3cb8d0.jpg',
      image1: 'https://www.shutterstock.com/shutterstock/videos/4710557/thumb/2.jpg?ip=x480',
      image2: 'https://image1.masterfile.com/getImage/NjE0LTA1NjYyMjg3ZW4uMDAwMDAwMDA=AL7m0s/614-05662287en_Masterfile.jpg',
      image3: 'https://us.123rf.com/450wm/dotshock/dotshock1211/dotshock121100682/16715137-soccer-player-doing-kick-with-ball-on-football-stadium-field-isolated-on-black-background.jpg?ver=6'
    }
  },
}
</script>
<style>
  .shop-section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20em, 1fr));
    justify-content: center;
    align-items: center;
  }
  .text-sec {
    background-color: orangered;
    height: 99%;
    display: flex;
    align-items: center;
  }
  .text {
    margin: 4em 0 0 4em;
    width: clamp(5em, 100vw, 40em);
  }
  .text h2 {
    text-align: left;
    font-size: 270%;
    color: white;
  }
  .image img {
    width: clamp(20em, 100vw, 100%);
    height: 100%;
  }
</style>