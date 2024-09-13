<template>
    <div class="contact-container">
      <h2>Contact Us</h2>
			<div>
				<p>
          <strong>Email:</strong>
          <a href="mailto:support@pitchperfect.com">support@pitchperfect.com</a>
        </p>
        <p>
          <strong>Phone:</strong>
          <a href="tel:+27123456789">+27 12 345 6789</a>
        </p>
			</div>
			<p>If you have any queries, please refer to our <a href="/faq">FAQ page</a>. If you can't find what you're looking for, feel free to fill in the form below and we'll get back to you.</p>
      <form @submit.prevent="handleSubmit" action="https://formsubmit.co/harriselvin6@gmail.com" method="POST" enctype="multipart/form-data" ref="form">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" name="name" id="name" v-model="formData.name" />
          <span v-if="errors.name" class="error">{{ errors.name }}</span>
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" name="email" id="email" v-model="formData.email" />
          <span v-if="errors.email" class="error">{{ errors.email }}</span>
        </div>
        <div class="form-group">
          <label for="phone">Phone:</label>
          <input type="tel" name="phone" id="phone" v-model="formData.phone" />
          <span v-if="errors.phone" class="error">{{ errors.phone }}</span>
        </div>
        <div class="form-group">
          <label for="message">Message:</label>
          <textarea id="message" name="message" v-model="formData.message"></textarea>
          <span v-if="errors.message" class="error">{{ errors.message }}</span>
        </div>
        <button type="submit">Send Message</button>
      </form>
    </div>
  </template>
  
  <script>
  import { toast } from 'vue3-toastify';
  import 'vue3-toastify/dist/index.css';

  export default {
    data() {
      return {
        formData: {
          name: '',
          email: '',
          phone: '',
          message: '',
          toastId: '',
          toastIds: [],
          setup() {
						const notify = () => {
						toast("Wow so easy !", {
								autoClose: 1000,
						}); // ToastOptions
						}
						return { notify };
					}
        },
        errors: {}
      }
    },
    methods: {
      handleSubmit() {
        const { name, email, phone, message } = this.formData
        let errors = {}
  
        if (!name) {
          errors.name = 'Please enter your name'
        }
        if (!email) {
          errors.email = 'Please enter your email'
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
          errors.email = 'Please enter a valid email'
        }
        if (!phone) {
          errors.phone = 'Please enter your phone number'
        }
        if (!message) {
          errors.message = 'Please enter a message'
        }
  
        if (Object.keys(errors).length > 0) {
          this.errors = errors
        } else {
          // Form is valid, send the message
          this.$refs.form.submit()
          
					toast.info(
						'!form submitted successfully',
						{
						rtl: true,
						limit: 3,
						position: toast.POSITION.TOP_CENTER,
						},
					);
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .contact-container {
    margin: 10em 0 0;
    min-width: 45em;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2em;
    background-color: #f7f7f7;
    border: 1px solid #ddd;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    margin-bottom: 10px;
  }
  
  input, textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
  }
  
  .error {
    color: red;
    font-size: 12px;
    margin-top: 10px;
  }
  
  button[type="submit"] {
    background-color: #333;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
		transition: .3s;
  }
  
  button[type="submit"]:hover {
    background-color: orangered;
  }
	p {
		margin: 1em 0 2em;
	}
	a {
		color: #333;
		transition: .3s;
	}
	a:hover {
		color: orangered;
	}
  </style>