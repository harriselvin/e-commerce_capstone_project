<template>
	<div>
		<div class="admin-user-modal">
			<div class="user-modal">
				<div class="modal-head">
					<div>
						<p>Add User</p>
					</div>
					<div>
						<button @click="$emit('close')">Close</button>
					</div>
				</div>
				<div class="user-form">
					<form @submit.prevent="addUser">
						<label for="profile">Profile Picture:
							<input type="file" name="profile" id="profile" accept="image/jpg, image/png image/gif">
						</label>
						<label for="username">Firstname:
							<input type="text" id="username" v-model="newUser.name" required>
						</label>
						<label for="surname">Surname:
							<input type="text" name="surname" id="surname" v-model="newUser.surname" required>
						</label>
						<label for="age">Age:
							<input type="text" name="age" id="age" v-model="newUser.age">
						</label>
						<label for="gender">Gender:
							Male
							<input type="radio" name="gender" id="gender" v-model="newUser.gender">
							Female
							<input type="radio" name="gender" id="gender" v-model="newUser.gender">
						</label>
						<label for="role">Role:
							<select name="role" id="role" v-model="newUser.role">
								<option value="admin">User</option>
								<option value="admin">Admin</option>
							</select>
						</label>
						<label for="email">Email:
							<input type="email" name="email" id="email" v-model="newUser.email" required>
						</label>
						<label class="input-group" for="password">Password:
							<input :type="passwordType" name="password" id="password" v-model="password">
							<span class="eye-icon" @click="togglePasswordVisibility">
								<i class="fas" :class="passwordIcon"></i>
							</span>
						</label>
						<div>
							<button type="submit">Add User</button>
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
			newUser: {
				name: '',
				surname: '',
				age: '',
				gender: '',
				country: '',
				role: '',
				email: '',
				password: '',
			},
			passwordType: 'password',
			passwordIcon: 'fa-eye',
		}
	},
	methods: {
		addUser() {
			this.$store.dispatch('addAdminUser', this.newUser)
      .then(() => {
        console.log('User added successfully')
        this.newUser = {
					name: '',
					surname: '',
					age: '',
					gender: '',
					country: '',
					role: '',
					email: '',
					password: ''
				}
      })
      .catch(error => {
        console.error('Error adding user:', error)
      })
		}
	},
	togglePasswordVisibility() {
		if (this.passwordType === 'password') {
			this.passwordType = 'text';
			this.passwordIcon = 'fa-eye-slash';
		} else {
			this.passwordType = 'password';
			this.passwordIcon = 'fa-eye';
		}
	},
}
</script>
<style scoped>
    .admin-user-modal {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(0, 0, 0, .5);
        transition: .5s ease-in-out;
    }
    .user-modal {
        position: absolute;
        top: 8em;
        right: 31%;
        transform: translateX(100%);
        background-color: #fff;
        border: 1px solid #ddd;
        width: 400px;
        height: 70%;
        transition: transform .5s ease-in-out;
    }
		.admin-user-modal.show {
        visibility: visible;
    }
    .user-modal {
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
			margin: 0 1em;
		}
		.user-form {
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
			color: black;
    }

		@media only screen and (max-width: 500px) {
			.user-modal {
				right: 11%;
        width: 45em;
        height: 20%;
			}
		}
</style>