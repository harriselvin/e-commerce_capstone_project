<template>
  <div>
    <div class="about">
      <h1>About Us</h1>
      <p>Welcome to our e-commerce website, where soccer enthusiasts can find the best equipment for their game!</p>
      <img :src="lightLogo" alt="Logo" class="logo">
      <div class="about-content">
        <h2>Our Story</h2>
        <p>We're passionate about soccer and dedicated to providing top-quality gear for players of all levels.</p>
        <h2>Our Mission</h2>
        <p>To help soccer players achieve their goals by offering the best selection of soccer boots, balls, and jerseys at competitive prices.</p>
        <h2>Contact Us</h2>
        <p>
          <strong>Business Hours:</strong>
          <br>Monday - Friday: 9am - 7pm
          <br>Weekends: 10am - 6pm
        </p>
        <p>
          <strong>Email:</strong>
          <a href="mailto:support@pitchperfect.com">support@pitchperfect.com</a>
        </p>
        <p>
          <strong>Phone:</strong>
          <a href="tel:+27123456789">+27 12 345 6789</a>
        </p>
        <p>
          Need more information? Check out our <a href="/faq">FAQ page</a> for answers to common questions.
        </p>
      </div>
    </div>
    <div>
      <footer-comp/>
    </div>
  </div>
</template>
<script>
import FooterComp from '@/components/FooterComp.vue'

export default {
  data() {
    return {
      lightLogo: 'https://harriselvin.github.io/hostedImages/Images/Light_Mode_PP_Logo.png',
    }
  },
  components: {
    FooterComp
  }
}
</script>
<style scoped>
  .about {
    margin: 10em 0 0;
    min-width: 41em;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2em;
    background-color: #f7f7f7;
    border: 1px solid #ddd;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .logo {
    width: 10em;
    margin-bottom: 20px;
  }
  
  .about-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }
  
  h1, h2, a {
    color: #333;
    margin-bottom: 10px;
    transition: .3s;
  }
  
  p {
    margin-bottom: 20px;
  }
  
  a:hover {
    color: orangered;
  }
</style>