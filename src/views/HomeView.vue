<template>
  <div class="home">
    <div v-if="loading">
      <page-spinner-comp/>
    </div>
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
        <div class="offer-sec" :style="{'background-image': `url(${equipment.soccerField})`}">
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
      <div class="home-comp">
        <home-comp/>
      </div>
      <div class="shop-category">
        <div class="cat-title">
          <h3>Shop By <br> Category</h3>
        </div>
        <div class="categories">
          <div class="cat-balls" :style="{'background-image': `url(${equipment.ballCategory})`}">
            <div class="balls">
              <router-link :to="{name: 'shop', query: {category: 'balls'}}">
                <button>Balls</button>
              </router-link>
            </div>
          </div>
          <div class="cat-boots" :style="{'background-image': `url(${equipment.bootCategory})`}">
            <div class="boots">
              <router-link :to="{name: 'shop', query: {category: 'boots'}}">
                <button>Boots</button>
              </router-link>
            </div>
          </div>
          <div class="cat-jerseys" :style="{'background-image': `url(${equipment.jerseyCategory})`}">
            <div class="jerseys">
              <router-link :to="{name: 'shop', query: {category: 'jerseys'}}">
                <button>Jerseys</button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HomeComp from '@/components/HomeComp.vue';
import PageSpinnerComp from '@/components/PageSpinnerComp.vue';

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
        tackle: 'https://static.vecteezy.com/system/resources/previews/020/624/231/non_2x/soccer-players-with-soccerball-at-the-stadium-during-the-match-photo.jpg',
        ballCategory: 'https://media.istockphoto.com/id/526823786/photo/intense-portrait-of-football-player-looking-at-the-ball.jpg?s=612x612&w=0&k=20&c=3nxdSyzBfNoEfPzeJkNdLdgYsetzGhC90MwkpTqvwZU=',
        jerseyCategory: 'https://www.spized.com/media/b1/b1/89/1671449478/Trikotnummern-Fussball.jpg',
        bootCategory: 'https://assets.adidas.com/images/w_940,f_auto,q_auto/1b185887757947d0ad278cf7cf753ef9_9366/JH9012_HM3_hover.jpg'
      }
    }
  },
  components: {
    HomeComp,
    PageSpinnerComp
  },
  computed: {
    productsData() {
      return this.$store.state.products
    },
  },
  methods: {
    async getProducts() {
      try {
        await this.$store.dispatch('getProducts')

        this.loading = false
      } catch (error) {
        console.error("Failed to fetch product data:", error);
      }
    },
  },
  mounted() {
    try {
      this.getProducts()
    } catch (error) {
      console.error("Failed to fetch product data:", error);
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
  .soccer-ball-img {
    min-width: 15em;
  }
  .soccer-ball-img img {
    width: 100%;
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
    transition: .3s;
  }
  .shop-now-btn button:hover {
    background-color: white;
    color: orangered;
    border: 1px solid orangered;
  }
  .shop-now-btn button:active {
    scale: .9;
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
  .offer-head, .cat-title {
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
  .shop-category {
    background-color: orangered;
    margin: 1em 0;
    padding: 0 1em;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .cat-title {
    text-align: right;
    color: white;
    padding: 1em 0 0;
  }
  .categories {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20em, 1fr));
    gap: 1em;
    width: 100%;
  }
  .categories button {
    padding: .2em 2em;
    margin: 3em 0 0;
    -webkit-text-stroke: 2px orangered;
    color: white;
    background-color: transparent;
    backdrop-filter: blur(.2em);
    border: 2px solid lightgrey;
    border-radius: 5em;
    font-size: 2rem;
    font-weight: 600;
    text-transform: uppercase;
    cursor: pointer;
    transition: .5s;
  }
  .categories button:hover {
    background-color: lightgrey;
  }
  .categories button:active {
    scale: .9;
  }
  .shop-category .cat-balls, .cat-boots, .cat-jerseys {
    background-size: cover;
    background-repeat: no-repeat;
    height: 30em;
    width: 100%;
    object-fit: cover;
    border: 2px solid lightgrey;
  } 
  .cat-jerseys {
    margin: 0 0 5em;
  }

  @media only screen and (min-height: 701px) and (max-height: 900px)  {
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
    .soccer-ball-img, .home-comp {
      min-width: 80vh;
    }
    .offer-box {
      height: 40vh;
      margin-right: 1em;
    }
    .offer-sec {
      min-width: 80vh;
      margin: 0 0 -20em;
      overflow: hidden;
    }
    .shop-category {
      min-width: 46em;
    }
    .categories {
      grid-template-columns: repeat(auto-fit, minmax(30em, 1fr));
    }
  }
</style>