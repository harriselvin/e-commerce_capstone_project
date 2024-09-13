<template>
	<div>
		<div class="admin-product-modal">
			<div class="product-modal">
				<div class="modal-head">
					<div>
						<p>Add product</p>
					</div>
					<div>
						<button @click="$emit('close')">Close</button>
					</div>
				</div>
				<div class="product-form">
					<form @submit.prevent="handleProductSubmit" enctype="multipart/form-data">
						<label for="profile">Picture:
							<input type="file" name="profile" id="profile" accept="image/*" @change="handleProfileChange">
						</label>
						<label for="productname">Name:
							<input type="text" id="productname" v-model="prodName">
						</label>
						<label for="price">Price:
							<input type="text" name="price" id="price" min="0" step="0.01" v-model="price">
						</label>
						<label for="quantity">Quantity:
							<input type="text" name="quantity" id="quantity" min="1" value="1" v-model="quantity">
						</label>
						<label for="category">Category:
							<input type="text" name="category" id="category" v-model="category">
						</label>
						<label for="description">Description:
							<textarea name="description" id="description" v-model="description"></textarea>
						</label>
						<div>
							<button type="submit">Add product</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		show: {
			type: Boolean
		},
	},
	data() {
		return {
			prodName: '',
			price: '',
			quantity: '',
			category: '',
			description: '',
            profile: null
		}
	},
	methods: {
		handleProductSubmit() {
			// const formData = {
			// 	name: this.name,
			// 	price: this.price,
			// 	quantity: this.quantity,
			// 	category: this.category,
			// 	description: this.description,
			// 	profile: this.profile
			// }

			const formData = new FormData();
			formData.append('prodName', this.prodName);
			formData.append('price', this.price);
			formData.append('quantity', this.quantity);
			formData.append('category', this.category);
			formData.append('description', this.description);
			formData.append('profile', this.profile);

			this.$emit('add-product', formData)
		}
	},
	handleProfileChange(event) {
		this.profileFile = event.target.files[0]
	},
}
</script>
<style scoped>
	.admin-product-modal {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, .5);
		transition: .5s ease-in-out;
	}
	.product-modal {
		position: absolute;
		top: 8em;
		right: 31%;
		transform: translateX(100%);
		background-color: #fff;
		border: 1px solid #ddd;
		width: 400px;
		height: 70%;
		transition: transform .5s ease-in-out;
		border-radius: 10px;
	}
	.admin-product-modal.show {
			visibility: visible;
	}
	.product-modal {
			transform: translateX(0);
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}
	.input-group {
			position: relative;
	}
	.modal-head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 1em 1em;
		border-bottom: 1px solid black;
	}
	.product-form {
		display: grid;
		padding: 0;
		margin: 0;
		justify-content: center;
		text-align: left;
	}
	.eye-icon {
		position: absolute;
		top: 2px;
		right: 7.5em;
		cursor: pointer;
		color: grey;
	}

	@media only screen and (max-width: 500px) {
		.product-modal {
			right: 11%;
			width: 45em;
			height: 25%;
		}
	}

	@media only screen and (max-width: 320px) {
		.product-modal {
			right: 11%;
			width: 45em;
			height: 15%;
		}
	}
</style>