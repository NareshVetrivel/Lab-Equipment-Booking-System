<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { resolve } from '$app/paths';

	let adminId = $state('');
	let password = $state('');
	let showPassword = $state(false);

	function handleLogin() {
		console.log('Admin Login');
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

			<form
				class="flex flex-col gap-5"
				onsubmit={(event) => {
					event.preventDefault();
					handleLogin();
				}}
			>

				<!-- Admin ID -->

				<div class="flex flex-col gap-2">

					<label
						for="adminId"
						class="text-sm font-semibold text-slate-700"
					>
						Admin ID
					</label>

					<input
						id="adminId"
						bind:value={adminId}
						type="text"
						placeholder="Enter Admin ID"
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
	class="w-full rounded-xl bg-gradient-to-r from-blue-700 to-sky-500 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
>
	Admin Login
</button>

			</form>

		</div>

	</main>

	<Footer />

</div>