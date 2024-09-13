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
						<button class="add" @click="showAddUserModal = true">Add</button>
					</div>
					<div>
						<select name="user-sort sort" id="user-sort" v-model="userSortOption">
							<option value="asc">Sort Name A-Z</option>
							<option value="desc">Sort Name Z-A</option>
						</select>
					</div>
					<div>
						<add-user-comp v-if="showAddUserModal" @close="showAddUserModal = false" @add-user="handleAddUser" />
					</div>
					<div>
						<edit-user-comp v-if="showEditUserModal" @close="showEditUserModal = false" @add-user="handleEditUser" />
					</div>
				</div>
				<table border="1px" class="table-head user-table">
					<thead>
						<th class="user-avatar">Profile</th>
						<th class="name">Name</th>
						<th class="surname">Surname</th>
						<th class="age">Age</th>
						<th class="gender">Gender</th>
						<th class="role">Role</th>
						<th class="email">Email</th>
						<th class="edit">Action</th>
						<th class="delete">Action</th>
					</thead>
				</table>
				<div class="admin-user-box" v-for="user in sortedUsers" :key="user.id">
						<card-comp :users="user">
							<template #userSlot>
								<div class="table-container">
									<table border="1" class="user-table">
										<tbody>
											<tr>
												<td class="user-avatar"><img :src="computedAvatarUrl" alt="User Avatar"></td>
												<td class="name">{{ user.firstName }}</td>
												<td class="surname">{{ user.lastName }}</td>
												<td class="age">{{ user.age }}</td>
												<td class="gender">{{ user.gender }}</td>
												<td class="role">{{ user.userRole }}</td>
												<td class="email">{{ user.email }}</td>
												<td class="edit">
													<svg @click="showEditUserModal = true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
														<path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
													</svg>
													
												</td>
												<td class="delete">
													<svg @click="deleteUser(user.id)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-x" viewBox="0 0 16 16">
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
						<button class="add" @click="showAddProdModal = true">Add</button>
					</div>
					<div>
						<select name="product-sort sort" id="product-sort" v-model="productSortOption">
							<option value="asc">Sort name A-Z</option>
							<option value="desc">Sort name Z-A</option>
						</select>
					</div>
					<div>
						<add-product-comp v-if="showAddProdModal" @close="showAddProdModal = false" @add-product="handleAddProduct" />
					</div>
					<div>
						<edit-product-comp v-if="showEditProductModal" @close="showEditProductModal = false" @add-user="handleEditProduct" />
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
						<th class="edit">Action</th>
						<th class="delete">Action</th>
					</thead>
				</table>
				<div class="admin-products">
					<div class="admin-prod-box" v-for="item in sortedProducts" :key="item.id">
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
													<svg @click="showEditProductModal = true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
														<path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
													</svg>
												</td>
												<td class="delete">
													<svg @click="deleteProduct(product.id)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
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
/* eslint-disable */
import PageSpinnerComp from '@/components/PageSpinnerComp.vue';
import CardComp from '@/components/CardComp.vue';
import AddUserComp from '@/components/AddUserComp.vue';
import EditUserComp from '@/components/EditUserComp.vue';
import EditProductComp from '@/components/EditProductComp.vue';
import { mapActions } from 'vuex';
import AddProductComp from '@/components/AddProductComp.vue';

export default {
	data() {
		return {
			loading: true,
			showAddUserModal: false,
			showAddProdModal: false,
			showEditUserModal: false,
			showEditProductModal: false,
			userSortOption: 'asc',
			productSortOption: 'asc',
			defaultAvatarUrl: 'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=',
			avatarUrl: ''
		}
	},
	components: {
		PageSpinnerComp,
		CardComp,
		AddUserComp,
		EditUserComp,
		EditProductComp,
		AddProductComp
	},
	computed: {
		adminProducts() {
			return this.$store.state.products
		},
		users() {
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
		sortedUsers() {
			return this.users.slice().sort((a, b) => {
				return this.userSortOption === 'asc'
					? a.firstName.localeCompare(b.firstName)
					: b.firstName.localeCompare(a.firstName);
			});
		},
		sortedProducts() {
			return this.adminProducts.slice().sort((a, b) => {
				return this.productSortOption === 'asc'
					? a.prodName.localeCompare(b.prodName)
					: b.prodName.localeCompare(a.prodName);
			});
		},
		computedAvatarUrl() {
			return this.avatarUrl || this.defaultAvatarUrl
		}
	},
	methods: {
		...mapActions(['getProducts', 'getUsers', 'addAdminUser', 'editAdminUser', 'deleteUser', 'deleteProduct', 'editProduct', 'addProduct']),
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
		async handleAddUser(userData) {
			if (!userData.firstName || !userData.lastName || !userData.age || !userData.email || !userData.password) {
				alert('All fields are required')
				return
			}

			try {
				const response = await this.$store.dispatch('addAdminUser', userData)
				console.log('Admin user added successfully:', response.data);
			} catch (error) {
				console.error('Failed to add user:', error);
			}
		},
		async handleAddProduct(productData) {
			if (!productData.prodName || !productData.price || !productData.quantity || !productData.category) {
				alert('All fields are required')
				return
			}

			try {
				const response = await this.$store.dispatch('addProduct', productData)
				console.log('Product added successfully:', response.data);
			} catch (error) {
				console.error('Failed to add user:', error);
			}
		},
		async handleEditUser() {
			if (!this.firstName || !this.lastName || !this.age || !this.gender || !this.userRole || !this.email || !this.password) {
				alert('All fields are required')
			}
			
			const formData = {
				name: this.name,
				surname: this.surname,
				age: this.age, 
				gender: this.gender,
				role: this.role,
				email: this.email,
				password: this.password,
				profile: this.profile
			}

			try {
				const response = await this.$store.dispatch('editAdminUser', formData)
				console.log('Admin user added successfully:', response.data);
			} catch (error) {
				console.error('Failed to add admin user:', error);
			}
		},
		async handleEditProduct() {
			if (!this.prodName || !this.price || !this.quantity || !this.category || !this.description) {
				alert('All fields are required')
			}
			
			const formData = {
				prodName: this.prodName,
				price: this.price,
				quantity: this.quantity, 
				category: this.category,
				description: this.description,
				profile: this.profile
			}

			try {
				const response = await this.$store.dispatch('editProduct', formData)
				console.log('Product added successfully:', response.data);
			} catch (error) {
				console.error('Failed to add product:', error);
			}
		},
		deleteUser(userId) {
			if (confirm('Are you sure you want to delete this user?')) {
				this.$store.dispatch('deleteUser', userId)
					.then(() => {
						alert('User deleted successfully')
					})
				.catch((error) => {
					alert('Error deleting user:' + error.message)
				})
			}
		},
		deleteProduct(productId) {
			if (confirm('Are you sure you want to delete this product?')) {
				this.$store.dispatch('deleteProduct', productId)
					.then(() => {
						alert('Product deleted successfully')
					})
				.catch((error) => {
					alert('Error deleting product:' + error.message)
				})
			}
		},
		updateAvatar(newUrl) {
			this.avatarUrl = newUrl
		}
	},
	async mounted() {
    try {
      await this.getProducts()
			await this.getUsers()
			this.loading = false
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  },
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
	.user-avatar {
		width: 3em;
		min-width: 3em;
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
		width: clamp(1em, 100vw, 3em);
	}
	.user-table .gender {
		width: clamp(1em, 100vw, 4em);
	}
	.user-table .country {
		width: clamp(1em, 100vw, 4em);
	}
	.user-table .role {
		width: clamp(1em, 100vw, 4em);
	}
	.user-table .email {
		width: clamp(5em, 100vw, 15em);
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
		width: clamp(15em, 100vw, 18em);
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