<template>
	<div class="admin-container">
		<div v-if="loading">
			<PageSpinnerComp/>
		</div>
		<div v-else-if="adminProducts">
			<div class="admin-users">
				<div class="admin-heading">
					<h2>User Table</h2>
				</div>
				<div class="user-actions action-btn">
					<div class="add-user">
						<button class="add" @click="showModal = true">Add</button>
					</div>
					<div>
						<select name="user-sort sort" id="user-sort">
							<option value="1">Sorted A-Z</option>
							<option value="2">Sorted Z-A</option>
						</select>
					</div>
					<div>
						<add-user-comp v-if="showModal" @close="showModal = false" @add-user="handleAddUser"/>
					</div>
				</div>
				<table border="1px" class="table-head user-table">
					<thead>
						<th class="user-avatar">Profile</th>
						<th class="name">Name</th>
						<th class="surname">Surname</th>
						<th class="age">Age</th>
						<th class="gender">Gender</th>
						<th class="country">Country</th>
						<th class="role">Role</th>
						<th class="email">Email</th>
						<th class="edit">Edit</th>
						<th class="delete">Remove</th>
					</thead>
				</table>
				<div class="admin-user-box" v-for="user in adminUsers" :key="user">
						<card-comp :users="user">
							<template #userSlot>
								<div class="table-container">
									<table border="1" class="user-table">
										<tbody>
											<tr>
												<td class="user-avatar"><img :src="user.userProfile" :alt="user.firstName"></td>
												<td class="name">{{ user.firstName }}</td>
												<td class="surname">{{ user.lastName }}</td>
												<td class="age">{{ user.age }}</td>
												<td class="gender">{{ user.gender }}</td>
												<td class="country">{{ user.country }}</td>
												<td class="role">{{ user.userRole }}</td>
												<td class="email">{{ user.email }}</td>
												<td class="edit">
													<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
														<path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
													</svg>
												</td>
												<td class="delete">
													<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-x" viewBox="0 0 16 16">
														<path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m.256 7a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z"/>
														<path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m-.646-4.854.646.647.646-.647a.5.5 0 0 1 .708.708l-.647.646.647.646a.5.5 0 0 1-.708.708l-.646-.647-.646.647a.5.5 0 0 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 .708-.708"/>
													</svg>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</template>
						</card-comp>
					</div>
			</div>
			<div class="admin-products">
				<div class="admin-heading">
					<h2>Product Table</h2>
				</div>
				<div class="product-actions action-btn">
					<div class="add-product">
						<button class="add">Add</button>
					</div>
					<div>
						<select name="product-sort sort" id="product-sort">
							<option value="1">Sorted A-Z</option>
							<option value="2">Sorted Z-A</option>
						</select>
					</div>
				</div>
				<table border="1px" class="table-head product-table">
					<thead>
						<th class="product-image">Profile</th>
						<th class="name">Name</th>
						<th class="price">Price</th>
						<th class="quantity">Quantity</th>
						<th class="category">Category</th>
						<th class="description">Description</th>
						<th class="edit">Edit</th>
						<th class="delete">Remove</th>
					</thead>
				</table>
				<div class="admin-products">
					<div class="admin-prod-box" v-for="item in adminProducts" :key="item">
						<card-comp :getCartItems="item">
							<template #getCartItemSlot>
								<div class="table-container">
									<table border="1" class="product-table">
										<tbody>
											<tr>
												<td class="product-image"><img :src="item.prodUrl" :alt="item.prodName"></td>
												<td class="name">{{ item.prodName }}</td>
												<td class="price">{{ item.price }}</td>
												<td class="quantity">{{ item.quantity }}</td>
												<td class="category">{{ item.category }}</td>
												<td class="description">{{ item.prodDesc }}</td>
												<td class="edit">
													<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
														<path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
													</svg>
												</td>
												<td class="delete">
													<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
														<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
														<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
													</svg>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</template>
						</card-comp>
					</div>
				</div>
			</div>
		</div>
		<div v-else class="error-admin">
			<p>Failed to Fetch Product Data</p>
		</div>
	</div>
</template>
<script>
import PageSpinnerComp from '@/components/PageSpinnerComp.vue';
import CardComp from '@/components/CardComp.vue';
import AddUserComp from '@/components/AddUserComp.vue';

export default {
	data() {
		return {
			loading: true,
			showModal: false
		}
	},
	components: {
		PageSpinnerComp,
		CardComp,
		AddUserComp
	},
	computed: {
		adminProducts() {
			return this.$store.state.products
		},
		adminUsers() {
			return this.$store.state.users
		},
		filteredProducts() {
			const category = this.$route.query.category
			if (category) {
				return this.adminProducts.filter(product => product.category === category)
			} else {
				return this.adminProducts
			}
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
		async getUsers() {
      try {
        await this.$store.dispatch('getUsers')

        this.loading = false
      } catch (error) {
        console.error("Failed to fetch users data:", error);
      }
    },
		async handleAddUser() {
			if (!this.name || !this.surname || !this.age || !this.gender || !this.country || !this.role || !this.email || !this.password) {
				alert('All fields are required')
			}
			
			const userData = {
				name: this.name,
				email: this.email,
				password: this.password,
				address: this.address
			}

			try {
				const response = await this.$store.dispatch('addUser', userData)
				console.log('User added successfully:', response.data);
			} catch (error) {
				console.error('Failed to add user:', error);
			}
		}
	},
	async mounted() {
    try {
      await this.getProducts()
			await this.getUsers()
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }
}
</script>
<style scoped>
	.admin-container {
		margin: 8em 0 0;
		display: flex;
		justify-content: center;
		align-items: center;
		min-width: 60em;
	}
	.action-btn {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 2em 0;
		gap: 1em;
	}
	.action-btn .add {
		padding: 1em 3em;
		cursor: pointer;
	}
	.action-btn select {
		padding: 1em 2em;
		cursor: pointer;
	}
	.user-avatar img {
		width: 3em;
		min-width: 3em;
		object-fit: cover;
	}
	.user-table .name {
		width: clamp(1em, 100vw, 7em);
	}
	.user-table .surname {
		width: clamp(1em, 100vw, 7em);
	}
	.user-table .age {
		width: clamp(1em, 100vw, 2em);
	}
	.user-table .gender {
		width: clamp(1em, 100vw, 4em);
	}
	.user-table .country {
		width: clamp(1em, 100vw, 4em);
	}
	.user-table .role {
		width: clamp(1em, 100vw, 3em);
	}
	.user-table .email {
		width: clamp(1em, 100vw, 15em);
	}
	.user-table .edit {
		width: clamp(1em, 100vw, 5em);
	}
	.user-table .edit .bi-pencil {
		transition: .3s;
		cursor: pointer;
	}
	.user-table .edit .bi-pencil:hover {
		color: orangered;
	}
	.user-table .delete {
		width: clamp(1em, 100vw, 5em);
	}
	.user-table .delete .bi-person-x {
		transition: .3s;
		cursor: pointer;
	}
	.user-table .delete .bi-person-x:hover {
		color: red;
	}
	.product-image img {
		width: 3em;
		min-width: 3em;
		object-fit: cover;
	}
	.product-table .name {
		width: clamp(1em, 100vw, 7em);
	}
	.product-table .price {
		width: clamp(1em, 100vw, 5em);
	}
	.product-table .quantity {
		width: clamp(1em, 100vw, 5em);
	}
	.product-table .category {
		width: clamp(1em, 100vw, 5em);
	}
	.product-table .description {
		width: clamp(10em, 100vw, 20em);
	}
	.product-table .edit {
		width: clamp(1em, 100vw, 5em);
	}
	.product-table .edit .bi-pencil {
		transition: .3s;
		cursor: pointer;
	}
	.product-table .edit .bi-pencil:hover {
		color: orangered;
	}
	.product-table .delete {
		width: clamp(1em, 100vw, 5em);
	}
	.product-table .delete .bi-trash {
		transition: .5s;
		cursor: pointer;
	}
	.product-table .delete .bi-trash:hover {
		color: red;
	}
</style>