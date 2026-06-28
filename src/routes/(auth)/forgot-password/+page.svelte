<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	import { resolve } from '$app/paths';
	import { goto } from '$app/navigation';

	let loading = $state(false);

	let email = $state('');
	let dateOfBirth = $state('');

	let newPassword = $state('');
	let confirmPassword = $state('');

	let showNewPassword = $state(false);
	let showConfirmPassword = $state(false);

	let verificationMessage = $state('');
	let verificationColor = $state('');

async function resetPassword() {

	verificationMessage = '';
	verificationColor = '';

email = email.trim().toLowerCase();

if (!email) {
	verificationColor = 'red';
	verificationMessage = 'College email is required.';
	return;
}

const collegeEmailRegex =
	/^[a-zA-Z0-9._%+-]+@sonatech\.ac\.in$/;

if (!collegeEmailRegex.test(email)) {
	verificationColor = 'red';
	verificationMessage = 'Use your college email address.';
	return;
}

	if (!dateOfBirth) {
		verificationColor = 'red';
		verificationMessage = 'Date of Birth is required.';
		return;
	}

	if (!newPassword) {
		verificationColor = 'red';
		verificationMessage = 'New password is required.';
		return;
	}

	if (!confirmPassword) {
		verificationColor = 'red';
		verificationMessage = 'Confirm password is required.';
		return;
	}

	if (newPassword !== confirmPassword) {
		verificationColor = 'red';
		verificationMessage = 'Passwords do not match.';
		return;
	}

	try {
		loading = true;
		const response = await fetch(
			'http://localhost:5000/api/reset-password',
			{
				method: 'POST',

				headers: {
					'Content-Type': 'application/json'
				},

				body: JSON.stringify({
					email,
					dob: dateOfBirth,
					newPassword
				})
			}
		);

		const result = await response.json();
			loading = false;
		if (result.success) {

			verificationColor = 'green';

			verificationMessage =
				'Password changed successfully.';

			setTimeout(() => {

				goto(resolve('/student-login'));

			}, 1500);

		}
		else {

			verificationColor = 'red';

			verificationMessage = result.message;
		}

	}
	catch {
		loading=false;
		verificationColor = 'red';

		verificationMessage =
			'Backend server not running.';
	}
}

	function toggleNewPassword() {
		showNewPassword = !showNewPassword;
	}

	function toggleConfirmPassword() {
		showConfirmPassword = !showConfirmPassword;
	}
</script>

<div class="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 via-white to-sky-100">

	<Header />

	<main class="relative flex flex-1 items-center justify-center px-4 py-10">

		<!-- Background Glow -->

		<div class="pointer-events-none absolute inset-0 overflow-hidden">

			<div
				class="absolute left-0 top-10 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl"
			></div>

			<div
				class="absolute bottom-10 right-0 h-96 w-96 rounded-full bg-sky-400/20 blur-3xl"
			></div>

		</div>

		<!-- Forgot Password Card -->

		<div
			class="relative z-10 w-full max-w-md rounded-3xl border border-white/40 bg-white/80 p-8 shadow-2xl backdrop-blur-md"
		>

			<!-- Title -->

			<div class="mb-8 text-center">

				<h1 class="text-4xl font-bold text-blue-950">
					Forgot Password
				</h1>

				<p class="mt-3 text-slate-600">
					Enter your college email, date of birth and new password.
				</p>

			</div>

			<form
				class="flex flex-col gap-5"
				onsubmit={(event) => {
					event.preventDefault();
				}}
			>

				<!-- College Email -->

				<div class="flex flex-col gap-2">

					<label
						for="email"
						class="text-sm font-semibold text-slate-700"
					>
						College Email ID
					</label>

					<input
						id="email"
						type="email"
						bind:value={email}
						placeholder="Enter your college email"
						class="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
					/>

				</div>

				<!-- Date of Birth -->

				<div class="flex flex-col gap-2">

					<label
						for="dob"
						class="text-sm font-semibold text-slate-700"
					>
						Date of Birth
					</label>

					<input
						id="dob"
						type="date"
						bind:value={dateOfBirth}
						class="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
					/>

				</div>

				<!-- Verification Message -->

				{#if verificationMessage}

					<div
						class={`rounded-xl border p-4 text-sm font-medium ${
							verificationColor === 'green'
								? 'border-green-300 bg-green-100 text-green-700'
								: 'border-red-300 bg-red-100 text-red-700'
						}`}
					>

						{#if verificationColor === 'green'}

							✔ {verificationMessage}

						{:else}

							✖ {verificationMessage}

						{/if}

					</div>

				{/if}
				<!-- New Password -->

				<div class="flex flex-col gap-2">

					<label
						for="newPassword"
						class="text-sm font-semibold text-slate-700"
					>
						New Password
					</label>

					<div class="relative">

						<input
							id="newPassword"
							type={showNewPassword ? 'text' : 'password'}
							bind:value={newPassword}
							placeholder="Enter new password"
							class="block w-full rounded-xl border border-slate-300 px-4 py-3 pr-14 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:opacity-60"
						/>

						<button
							type="button"
							class="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full hover:bg-slate-100"
							onclick={toggleNewPassword}
						>
							{showNewPassword ? '🔓' : '🔒'}
						</button>

					</div>

				</div>

				<!-- Confirm Password -->

				<div class="flex flex-col gap-2">

					<label
						for="confirmPassword"
						class="text-sm font-semibold text-slate-700"
					>
						Confirm Password
					</label>

					<div class="relative">

						<input
							id="confirmPassword"
							type={showConfirmPassword ? 'text' : 'password'}
							bind:value={confirmPassword}
							placeholder="Confirm new password"
							class="block w-full rounded-xl border border-slate-300 px-4 py-3 pr-14 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:opacity-60"
						/>

						<button
							type="button"
							class="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full hover:bg-slate-100"
							onclick={toggleConfirmPassword}
						>
							{showConfirmPassword ? '🔓' : '🔒'}
						</button>

					</div>

				</div>

				<!-- Reset Password -->

<button
	type="button"
	disabled={loading}
	class="w-full rounded-xl bg-gradient-to-r from-blue-700 to-sky-500 py-3 font-semibold text-white shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
	onclick={resetPassword}
>
	{loading ? 'Updating Password...' : 'Reset Password'}
</button>

				<!-- Back to Login -->

				<p class="text-center text-sm text-slate-600">

					Remember your password?

					<a
						href={resolve('/student-login')}
						class="font-semibold text-blue-700 hover:underline"
					>
						Back to Login
					</a>

				</p>

			</form>

		</div>

	</main>

	<Footer />

</div>          