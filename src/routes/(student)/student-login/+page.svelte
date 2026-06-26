<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { resolve } from '$app/paths';

	let email = $state('');
	let password = $state('');
	let showPassword = $state(false);

	function handleLogin() {
		console.log('Login');
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
			Register Number
		</label>

		<input
			id="email"
			bind:value={email}
			type="email"
			placeholder="Enter your register number"
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
			class="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
		>
			Forgot Password?
		</a>
	</div>

	<!-- Login Button -->

	<button
		type="submit"
		class="w-full rounded-xl bg-gradient-to-r from-blue-700 to-sky-500 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
	>
		Login
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