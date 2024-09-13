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
					<form @submit.prevent="handleSubmit" enctype="multipart/form-data">
						<label for="profile">Profile Picture:
							<input type="file" name="profile" id="profile" accept="image/*" @change="handleProfileChange">
						</label>
						<label for="username">Firstname:
							<input type="text" id="username" v-model="firstName">
						</label>
						<label for="surname">Surname:
							<input type="text" name="surname" id="surname" v-model="lastName">
						</label>
						<label for="age">Age:
							<input type="text" name="age" id="age" min="1" v-model="age">
						</label>
						<label for="gender">Gender:
							Male
							<input type="radio" name="gender" id="gender-male" v-model="gender">
							Female
							<input type="radio" name="gender" id="gender-female" v-model="gender">
						</label>
						<label for="role">Role:
							<select name="role" id="role" v-model="userRole">
								<option value="user">User</option>
								<option value="admin">Admin</option>
							</select>
						</label>
						<label for="email">Email:
							<input type="email" name="email" id="email" v-model="email">
						</label>
						<label class="input-group" for="password">Password:
							<input :type="passwordType" name="password" id="password" v-model="password" autocomplete="current-password">
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
			firstName: '',
			lastName: '',
			age: '',
			gender: '',
			userRole: '',
			email: '',
			password: '',
			profile: null,
			passwordType: 'password',
			passwordIcon: 'fa-eye',
		}
	},
	methods: {
		handleSubmit() {
			if (!this.firstName.trim() || !this.lastName.trim() || !this.email.trim() || !this.password.trim() || !this.userRole) {
				alert('All fields are required');
				return;
			}

			const userData = {
				firstName: this.firstName,
				lastName: this.lastName,
				age: this.age,
				gender: this.gender,
				userRole: this.userRole,
				profileFile: this.profileFile
			}

			const formData = new FormData();
			formData.append('user', JSON.stringify(userData))
			if (this.profileFile) {
				formData.append('profileFile', this.profileFile)
			}

			console.log('User data being sent:', userData);
			console.log('Profile file:', this.profileFile);
			
			// const formData = new FormData();
			// formData.append('firstName', this.firstName);
			// formData.append('lastName', this.lastName);
			// formData.append('age', this.age);
			// formData.append('gender', this.gender);
			// formData.append('userRole', this.userRole);
			// formData.append('email', this.email);
			// formData.append('password', this.password);
			// formData.append('profile', this.profile);

			try {
				this.$store.dispatch('addAdminUser', userData);
				this.resetForm()
			} catch (error) {
				console.error('Error adding user:', error);
			}

		},
		resetForm() {
			// Reset form fields
			this.firstName = '';
			this.lastName = '';
			this.age = '';
			this.gender = '';
			this.userRole = '';
			this.email = '';
			this.password = '';
			this.profileFile = null;
		},
		handleProfileChange(event) {
			const file = event.target.files[0]
			const reader = new FileReader()

			reader.onload = (e) => {
				this.avatarUrl = e.target.result
			}

			if (file) {
				reader.readAsDataURL(file)
			}
		},
		togglePasswordVisibility() {
			this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
			this.passwordIcon = this.passwordType === 'password' ? 'fa-eye' : 'fa-eye-slash';
		},
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
		border-radius: 10px;
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
		margin: 0 1em 1em;
		border-bottom: 1px solid black;
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
		color: grey;
	}

	@media only screen and (max-width: 500px) {
		.user-modal {
			right: 11%;
			width: 45em;
			height: 25%;
		}
	}

	@media only screen and (max-width: 320px) {
		.user-modal {
			right: 11%;
			width: 45em;
			height: 15%;
		}
	}
</style>