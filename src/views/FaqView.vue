<template>
  <div class="faq-container">
    <div v-if="loading">
      <page-spinner-comp/>
    </div>
    <div v-else-if="faqData" class="faq-sec">
      <div class="faq-title">
        <h2>FAQ</h2>
      </div>
      <div class="accordion">
        <div v-for="(faq, index) in faqData" :key="faq">
          <card-comp :faq="faq">
            <template #faqSlot>
              <div class="faq-box" @click="toggleDropdown(index)">
                <div class="faq-question">
                  <p>{{ faq.FAQid }}</p>
                  <p>. {{ faq.questions }}</p>
                </div>
                <div class="faq-dropdown">
                  {{ expandedIndex === index ? '-' : '+'}}
                </div>
              </div>
              <div class="faq-answer" :class="{show: expandedIndex === index}">
                <p class="accordion-reveal">{{ faq.answers }}</p>
              </div>
            </template>
          </card-comp>
        </div>
      </div>
      <div class="faq-footer">
        <footer-comp/>
      </div>
    </div>
    <div v-else class="error-faq">
      <p>Failed to Fetch FAQ Data</p>
    </div>
  </div>
</template>

<script>
import CardComp from '@/components/CardComp.vue';
import PageSpinnerComp from '@/components/PageSpinnerComp.vue';
import FooterComp from '@/components/FooterComp.vue';

export default {
    data() {
    return {
      loading: true,
      expandedIndex: 0
    }
  },
  components: {
    CardComp,
    PageSpinnerComp,
    FooterComp
  },
  computed: {
    faqData() {
      return this.$store.state.faq
    },
  },
  methods: {
    async getFaq() {
      try {
        await this.$store.dispatch('getFaq')
        this.loading = false

      } catch (error) {
        console.error("Failed to fetch faq data:", error);
      }
    },
    toggleDropdown(index) {
        this.expandedIndex = this.expandedIndex === index ? null : index
    },
  },
  mounted() {
    try {
      this.getFaq()
    } catch (error) {
      console.error("Failed to fetch faq data:", error);
    }
  }
}
</script>
<style>
  .faq-container {
    min-width: 45em;
  }
  .faq-title {
    margin: 10em 0 0;
  }
  .accordion {
    text-align: left;
    margin: 0 5em 0;
    padding: 0 0 5em;
  }
  .faq-box {
    height: 6em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }
  .faq-answer {
    max-height: 0;
    overflow: hidden;
    transition: max-height .5s;
    border-bottom: 1px solid grey;
    padding: 0 0 1em;
  }
  .faq-question {
    font-weight: 600;
    display: flex;
  }
  .faq-answer.show {
    max-height: 100vh;
    overflow: visible;
  }
  .accordion-reveal {
    font-size: 14px;
  }
  .faq-footer {
    margin: 5em -.5em 0;
  }
  .error-faq {
    margin: 10em 0 0;
  }
</style>