<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
    import { resolve } from '$app/paths';
	import { goto } from '$app/navigation';
	import { registerStudent } from '$lib/services/authService';

	let email = $state('');
	let password = $state('');
	let confirmPassword = $state('');

	let showPassword = $state(false);
	let showConfirmPassword = $state(false);
	let loading = $state(false);
	let errorMessage = $state('');
	let successMessage = $state('');

	function togglePassword() {
		showPassword = !showPassword;
	}

	function toggleConfirmPassword() {
		showConfirmPassword = !showConfirmPassword;
	}

async function handleSignup() {
errorMessage = '';
successMessage = '';

email = email.trim().toLowerCase();
password = password.trim();
confirmPassword = confirmPassword.trim();

if (!email) {
	errorMessage = 'College email is required.';
	return;
}

if (!password) {
	errorMessage = 'Password is required.';
	return;
}

if (!confirmPassword) {
	errorMessage = 'Confirm password is required.';
	return;
}

const collegeEmailRegex =
	/^[a-zA-Z0-9._%+-]+@sonatech\.ac\.in$/;

const passwordRegex =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

if (!collegeEmailRegex.test(email)) {
	errorMessage = 'Use your college email address.';
	return;
}

if (!passwordRegex.test(password)) {
	errorMessage =
		'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character.';
	return;
}

	if (password !== confirmPassword) {
		errorMessage = 'Passwords do not match.';
		return;
	}

	loading = true;

	const result = await registerStudent(email, password);

	loading = false;

	if (result.success) {
		successMessage = 'Account created successfully.';

		email = '';
		password = '';
		confirmPassword = '';

		setTimeout(() => {
			goto(resolve('/student-login'));
		}, 1500);
	} else {
		switch (result.message) {
	case 'Firebase: Error (auth/email-already-in-use).':
		errorMessage = 'Account already exists.';
		break;

	case 'Firebase: Error (auth/invalid-email).':
		errorMessage = 'Invalid college email.';
		break;

	case 'Firebase: Error (auth/weak-password).':
		errorMessage = 'Password is too weak.';
		break;

	default:
		errorMessage = result.message ?? 'Something went wrong.';
}
	}
}
</script>

<div class="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 via-white to-sky-100">
	<Header />

	<main class="relative flex flex-1 items-center justify-center px-4 py-10">
		<!-- Background Effects -->

		<div class="absolute inset-0 overflow-hidden pointer-events-none">
			<div
				class="absolute left-0 top-10 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl"
			></div>

			<div
				class="absolute right-0 bottom-10 h-96 w-96 rounded-full bg-sky-400/20 blur-3xl"
			></div>
		</div>

		<!-- Signup Card -->

		<div
			class="relative z-10 w-full max-w-md rounded-3xl border border-white/40 bg-white/80 p-8 shadow-2xl backdrop-blur-md"
		>
			<div class="mb-8 text-center">
				<h1 class="text-4xl font-bold text-blue-950">
					Student Sign Up
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
					handleSignup();
				}}
			>
				<!-- Email -->

				<div class="flex flex-col gap-2">
					<label
						class="text-sm font-semibold text-slate-700"
					>
						Email Address
					</label>

<input
	bind:value={email}
	type="email"
	autocomplete="email"
	disabled={loading}
						placeholder="student@sonatech.ac.in"
						class="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
					/>
				</div>

				<!-- Password -->

				<div class="flex flex-col gap-2">
					<label
						class="text-sm font-semibold text-slate-700"
					>
						Password
					</label>

					<div class="relative">
<input
	bind:value={password}
	type={showPassword ? 'text' : 'password'}
	autocomplete="new-password"
	disabled={loading}
							placeholder="Enter Password"
							class="w-full rounded-xl border border-slate-300 px-4 py-3 pr-14 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
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

				<!-- Confirm Password -->

				<div class="flex flex-col gap-2">
					<label
						class="text-sm font-semibold text-slate-700"
					>
						Confirm Password
					</label>

					<div class="relative">
<input
	bind:value={confirmPassword}
	type={showConfirmPassword ? 'text' : 'password'}
	autocomplete="new-password"
	disabled={loading}
							placeholder="Confirm Password"
							class="w-full rounded-xl border border-slate-300 px-4 py-3 pr-14 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
						/>

<button
	type="button"
	disabled={loading}
							class="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full hover:bg-slate-100"
							onclick={toggleConfirmPassword}
						>
							{showConfirmPassword ? '🔓' : '🔒'}
						</button>
					</div>
				</div>

				<!-- Signup Button -->

<button
	type="submit"
	disabled={loading}
	class="w-full rounded-xl bg-gradient-to-r from-blue-700 to-sky-500 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-50"
>
	{loading ? 'Creating Account...' : 'Create Account'}
</button>

				<!-- Login -->

				<p class="text-center text-sm text-slate-600">
					Already have an account?

					<a
						href={resolve('/(student)/student-login')}
						class="font-semibold text-blue-700 hover:underline"
					>
						Login
					</a>
				</p>
			</form>
		</div>
	</main>

	<Footer />
</div>