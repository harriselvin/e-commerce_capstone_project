<template>
  <div class="home">
    <!-- <div v-if="loading">
      <page-spinner-comp/>
    </div> -->
    <div>
      <div class="home-head">
        <div class="home-store">
          <div class="soccer-ball-img">
            <img :src="equipment.soccerBall" alt="Soccer Ball">
          </div>
          <div class="shop-now">
            <div class="shop-now-text">
              <h1>Pitch Perfect: <br>Gear Up for Greatness</h1>
              <p>Where Every Play Creates a Memory</p>
            </div>
            <div class="shop-now-btn">
              <router-link :to="{name: 'shop'}">
                <button>Shop Now</button>
              </router-link>
            </div>
          </div>
        </div>
        <div class="home-main-img">
          <div class="bicycle-img">
            <img :src="equipment.bicyleKick" alt="Man kicking a ball">
          </div>
        </div>
      </div>
      <div class="we-offer">
        <div class="offer-sec" :style="{'background-image': 'url(' + equipment.soccerField + ')'}">
          <div class="offer-box">
            <div class="offer-head">
              <h3>What We <br> Offer</h3>
            </div>
            <div class="offer-list">
              <ul>
                <div class="list-item">
                  <div class="right-arrow">►</div>
                  <div class="right-arrow">►</div>
                  <div class="right-arrow">►</div>
                </div>
                <div class="list-item">
                  <div>Free shipping over R1000</div>
                  <div>24/7 availability</div>
                  <div>Best prices guaranteed</div>
                </div>
                <div class="list-item">
                  <div class="stars">★★★★★</div>
                  <div class="stars">★★★★★</div>
                  <div class="stars">★★★★★</div>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import PageSpinnerComp from '@/components/PageSpinnerComp.vue';

export default {
  data() {
    return {
      loading: true,
      equipment: {
        shooter: 'https://www.shutterstock.com/shutterstock/videos/4710557/thumb/2.jpg?ip=x480',
        acrobat: 'https://image1.masterfile.com/getImage/NjE0LTA1NjYyMjg3ZW4uMDAwMDAwMDA=AL7m0s/614-05662287en_Masterfile.jpg',
        bicyleKick: 'https://imgcdn.stablediffusionweb.com/2024/5/6/a487afe5-c04f-4ec9-ac6f-01feb1a91ca2.jpg',
        volley: 'https://us.123rf.com/450wm/dotshock/dotshock1211/dotshock121100682/16715137-soccer-player-doing-kick-with-ball-on-football-stadium-field-isolated-on-black-background.jpg?ver=6',
        soccerBall: 'https://img.freepik.com/free-photo/success-grass-soccer-ball-generated-by-ai_188544-9819.jpg',
        soccerField: 'https://c4.wallpaperflare.com/wallpaper/29/423/819/sports-football-field-night-light-goal-grayscale-photo-of-soccer-goal-wallpaper-preview.jpg',
        defending: 'https://st.depositphotos.com/1000423/2111/i/450/depositphotos_21113831-stock-photo-two-football-players-striking-the.jpg',
        tackle: 'https://static.vecteezy.com/system/resources/previews/020/624/231/non_2x/soccer-players-with-soccerball-at-the-stadium-during-the-match-photo.jpg'
      }
    }
  },
  components: {
    // PageSpinnerComp
  },
  methods: {
    getHomeData() {
      this.loading = false;
    }
  }
}
</script>
<style>
  .home {
    margin: 5em 0 0;
  }
  .home-head {
    display: flex;
  }
  .home-head > .home-store, .home-main-img {
    flex: 1;
  }
  .shop-now {
    text-align: left;
    color: orangered;
    overflow: hidden;
  }
  .shop-now-text h1 {
    text-transform: uppercase;
    font-weight: 900;
    font-size: 2.1em;
  }
  .shop-now-text p {
    font-weight: 500;
  }
  .shop-now-btn button {
    padding: 1em 3em;
    font-weight: 500;
    text-transform: uppercase;
    background-color: orangered;
    color: white;
    border-radius: 20px;
    cursor: pointer;
    outline: none;
    border: none;
    transition: .5s;
  }
  .shop-now-btn button:hover {
    background-color: white;
    color: orangered;
    border: 1px solid orangered;
  }
  .bicycle-img img {
    width: 100%;
    height: 100vh;
    overflow: hidden;
  }
  .we-offer {
    margin: 0;
  }
  .offer-sec {
    min-height: 90vh; 
    background-size: 100%;
    background-repeat: no-repeat;
    object-fit: cover;
    overflow: hidden;
    margin: -.25em 0 0;
  }
  .offer-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: end;
    height: 90vh;
    text-align: right;
    margin-right: 5em;
    color: white;
  }
  .offer-head {
    font-size: 2.5em;
    text-transform: uppercase;
  }
  .offer-list ul {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .offer-list .list-item {
    list-style: none;
    margin-right: 2em;
  }
  .offer-list .list-item div {
    padding: 1em;
    border-bottom: 2px solid white;
  }
  .offer-list .right-arrow {
    color: orangered;
  }
  .offer-list .stars {
    color: orangered;
    margin: -.2em 0;
  }

  @media only screen and (min-height: 701px) and (max-height: 850px)  {
    .bicycle-img img {
      display: none;
    }
    .shop-now-btn {
      margin: 0 0 1em;
    }
    .offer-box {
      height: 55vh;
      margin-right: 1em;
    }
  }

  @media only screen and (max-width: 700px) {
    .bicycle-img img {
      display: none;
    }
    .shop-now-btn {
      margin: 0 0 1em;
    }
    .offer-box {
      height: 40vh;
      margin-right: 1em;
    }
    .offer-sec {
      min-width: 80vh;
      overflow: hidden;
    }
  }
</style>