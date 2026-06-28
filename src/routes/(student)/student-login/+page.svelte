<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { resolve } from '$app/paths';
	import { loginStudent } from '$lib/services/authService';
	import { goto } from '$app/navigation';

	let email = $state('');
	let password = $state('');
	let showPassword = $state(false);

	let loading = $state(false);
	let errorMessage = $state('');
	let successMessage = $state('');
	
async function handleLogin() {
	errorMessage = '';
	successMessage = '';

	email = email.trim().toLowerCase();
	password = password.trim();

	if (!email) {
		errorMessage = 'College email is required.';
		return;
	}

	if (!password) {
		errorMessage = 'Password is required.';
		return;
	}

	const collegeEmailRegex =
		/^[a-zA-Z0-9._%+-]+@sonatech\.ac\.in$/;

	if (!collegeEmailRegex.test(email)) {
		errorMessage = 'Use your college email address.';
		return;
	}

	loading = true;

	const result = await loginStudent(email, password);

	loading = false;

if (result.success) {
	successMessage = 'Login successful.';

	email = '';
	password = '';

	setTimeout(() => {

		if (result.profile?.profileCompleted) {
			goto(resolve('/(student)/student-dashboard'));
		} else {
			goto(resolve('/(student)/student-register'));
		}

	}, 1000);
} else {
		switch (result.message) {
			case 'Firebase: Error (auth/user-not-found).':
				errorMessage = 'Account not found.';
				break;

			case 'Firebase: Error (auth/wrong-password).':
				errorMessage = 'Incorrect password.';
				break;

			case 'Firebase: Error (auth/invalid-credential).':
				errorMessage = 'Invalid email or password.';
				break;

			case 'Firebase: Error (auth/invalid-email).':
				errorMessage = 'Invalid email address.';
				break;

			case 'Firebase: Error (auth/too-many-requests).':
				errorMessage =
					'Too many attempts. Please try again later.';
				break;

			default:
				errorMessage =
					result.message ?? 'Something went wrong.';
		}
	}
}

	function togglePassword() {
		showPassword = !showPassword;
	}
</script>

<div class="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 via-white to-sky-100">
	<Header />

	<main class="relative flex flex-1 items-center justify-center px-4 py-10">
		<!-- Background Glow -->
		<div class="absolute inset-0 overflow-hidden pointer-events-none">
			<div
				class="absolute left-0 top-10 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl"
			></div>

			<div
				class="absolute right-0 bottom-10 h-96 w-96 rounded-full bg-sky-400/20 blur-3xl"
			></div>
		</div>

		<!-- Login Card -->
		<div
			class="relative z-10 w-full max-w-md rounded-3xl border border-white/40 bg-white/80 p-8 shadow-2xl backdrop-blur-md"
		>
<div class="mb-8 text-center">
	<h1 class="text-4xl font-bold text-blue-950">
		Student Login
	</h1>
</div>
	{#if errorMessage}
	<div class="mb-4 rounded-xl bg-red-100 p-3 text-center text-sm font-medium text-red-700">
		{errorMessage}
	</div>
{/if}

{#if successMessage}
	<div class="mb-4 rounded-xl bg-green-100 p-3 text-center text-sm font-medium text-green-700">
		{successMessage}
	</div>
{/if}
<form
	class="flex flex-col gap-5"
	onsubmit={(e) => {
		e.preventDefault();
		handleLogin();
	}}
>
	<!-- Email -->

	<div class="flex flex-col gap-2">
		<label
			for="email"
			class="text-sm font-semibold text-slate-700"
		>
			College Email
		</label>

<input
	id="email"
	bind:value={email}
	type="email"
	autocomplete="email"
	disabled={loading}
	placeholder="student@sonatech.ac.in"
	class="block w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-700 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
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
			placeholder="Enter your password"
			class="block w-full rounded-xl border border-slate-300 px-4 py-3 pr-14 text-slate-700 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
			autocomplete="current-password"
			disabled={loading}
		/>

<button
	type="button"
	disabled={loading}
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
			class="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
		>
			Forgot Password?
		</a>
	</div>

	<!-- Login Button -->

<button
	type="submit"
	disabled={loading}
	class="w-full rounded-xl bg-gradient-to-r from-blue-700 to-sky-500 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-50"
>
	{loading ? 'Logging in...' : 'Login'}
</button>

	<!-- Signup -->

	<p class="text-center text-sm text-slate-600">
		Don't have an account?

		<a
			href={resolve('/student-signup')}
			class="font-semibold text-blue-700 hover:underline"
		>
			Sign Up
		</a>
	</p>
</form>
		</div>
	</main>

	<Footer />
</div>