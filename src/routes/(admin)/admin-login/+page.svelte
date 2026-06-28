<script>
import Header from '$lib/components/Header.svelte';
import Footer from '$lib/components/Footer.svelte';

import { loginAdmin } from '$lib/services/adminAuthService';

import { goto } from '$app/navigation';
import { resolve } from '$app/paths';

let email = $state('');

let password = $state('');

let showPassword = $state(false);

let loading = $state(false);

let errorMessage = $state('');

async function handleLogin() {

	errorMessage = '';

	email = email.trim().toLowerCase();

	if (!email) {

		errorMessage = 'Admin email is required.';
		return;

	}

	const emailRegex =
		/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	if (!emailRegex.test(email)) {

		errorMessage = 'Enter a valid email address.';
		return;

	}

	if (!password) {

		errorMessage = 'Password is required.';
		return;

	}

	loading = true;

	const result = await loginAdmin(
		email,
		password
	);

	loading = false;

	if (result.success) {

		goto(resolve('/admin-dashboard'));

		return;

	}

	switch (result.message) {

		case 'Firebase: Error (auth/invalid-credential).':
			errorMessage = 'Invalid email or password.';
			break;

		case 'Firebase: Error (auth/user-not-found).':
			errorMessage = 'Admin account not found.';
			break;

		case 'Firebase: Error (auth/wrong-password).':
			errorMessage = 'Incorrect password.';
			break;

		case 'Access denied.':
			errorMessage = 'You are not an administrator.';
			break;

		case 'Admin account not found.':
			errorMessage = 'Admin account not found.';
			break;

		default:
			errorMessage =result.message ?? 'Something went wrong.';
			break;

	}

}

function togglePassword() {
	showPassword = !showPassword;
}
</script>

<div class="flex min-h-screen flex-col bg-gradient-to-br from-slate-100 via-white to-blue-100">

	<Header />

	<main class="relative flex flex-1 items-center justify-center px-4 py-10">

		<!-- Background -->

		<div class="pointer-events-none absolute inset-0 overflow-hidden">

			<div
				class="absolute left-0 top-10 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl"
			></div>

			<div
				class="absolute bottom-10 right-0 h-96 w-96 rounded-full bg-slate-500/20 blur-3xl"
			></div>

		</div>

		<!-- Login Card -->

		<div
			class="relative z-10 w-full max-w-md rounded-3xl border border-white/40 bg-white/80 p-8 shadow-2xl backdrop-blur-md"
		>

			<!-- Title -->

			<div class="mb-8 text-center">

				<div class="mb-4 text-6xl">
					🛡️
				</div>

				<h1 class="text-4xl font-bold text-blue-950">
					Admin Login
				</h1>

				<p class="mt-3 text-slate-600">
					Laboratory Equipment Booking System
				</p>

			</div>

{#if errorMessage}

<div
	class="mb-6 rounded-xl bg-red-100 p-3 text-center font-medium text-red-700"
>
	{errorMessage}
</div>

{/if}

			<form
				class="flex flex-col gap-5"
				onsubmit={(event) => {
					event.preventDefault();
					handleLogin();
				}}
			>

				<!-- Admin Email -->

				<div class="flex flex-col gap-2">

					<label
						for="adminId"
						class="text-sm font-semibold text-slate-700"
					>
						Admin Email
					</label>

<input
	id="adminId"
	bind:value={email}
	type="email"
	placeholder="Enter Admin Email"
	disabled={loading}
	class="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
/>

				</div>

				<!-- Password -->

				<div class="flex flex-col gap-2">

					<label
						for="password"
						class="text-sm font-semibold text-slate-700"
					>
						Password
					</label>

					<div class="relative">

						<input
							id="password"
							bind:value={password}
							type={showPassword ? 'text' : 'password'}
							placeholder="Enter Password"
							disabled={loading}
							class="w-full rounded-xl border border-slate-300 px-4 py-3 pr-14 outline-none transition duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
						/>

						<button
							type="button"
							class="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full hover:bg-slate-100"
							onclick={togglePassword}
						>
							{showPassword ? '🔓' : '🔒'}
						</button>

					</div>

				</div>

				<!-- Forgot Password -->

				<div class="text-right">

					<a
						href={resolve('/forgot-password')}
						class="text-sm font-medium text-blue-600 hover:underline"
					>
						Forgot Password?
					</a>

				</div>

				<!-- Login -->

<button
	type="submit"
	disabled={loading}
	class="w-full rounded-xl bg-gradient-to-r from-blue-700 to-sky-500 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-50"
>
	{loading ? 'Signing In...' : 'Admin Login'}
</button>

			</form>

		</div>

	</main>

	<Footer />

</div>