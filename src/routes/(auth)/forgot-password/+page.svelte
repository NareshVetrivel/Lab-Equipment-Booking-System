<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	import { resolve } from '$app/paths';
	import { goto } from '$app/navigation';

	let email = $state('');
	let dateOfBirth = $state('');

	let newPassword = $state('');
	let confirmPassword = $state('');

	let showNewPassword = $state(false);
	let showConfirmPassword = $state(false);

	let verified = $state(false);

	let verificationMessage = $state('');
	let verificationColor = $state('');

	function verifyStudent() {

		/* Dummy Verification
		   Replace with database verification later */

		if (
			email === 'naresh231@mca.sonatech.ac.in' &&
			dateOfBirth === '2004-06-15'
		) {

			verified = true;

			verificationColor = 'green';

			verificationMessage =
				'Student verified successfully. You can now reset your password.';

		} else {

			verified = false;

			verificationColor = 'red';

			verificationMessage =
				'College Email ID and Date of Birth do not match.';

		}
	}

	function resetPassword() {

		if (!verified) {

			alert('Please verify your details first.');

			return;

		}

		if (!newPassword || !confirmPassword) {

			alert('Please enter both password fields.');

			return;

		}

		if (newPassword !== confirmPassword) {

			alert('Passwords do not match.');

			return;

		}

		alert('Password reset successfully.');

		goto(resolve('/student-login'));

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
					Verify your details before resetting your password.
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

				<!-- Verify Button -->

				<button
					type="button"
					class="rounded-xl bg-gradient-to-r from-blue-700 to-sky-500 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
					onclick={verifyStudent}
				>
					Verify
				</button>

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
							disabled={!verified}
							class="block w-full rounded-xl border border-slate-300 px-4 py-3 pr-14 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:opacity-60"
						/>

						<button
							type="button"
							class="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full hover:bg-slate-100"
							onclick={toggleNewPassword}
							disabled={!verified}
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
							disabled={!verified}
							class="block w-full rounded-xl border border-slate-300 px-4 py-3 pr-14 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:opacity-60"
						/>

						<button
							type="button"
							class="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full hover:bg-slate-100"
							onclick={toggleConfirmPassword}
							disabled={!verified}
						>
							{showConfirmPassword ? '🔓' : '🔒'}
						</button>

					</div>

				</div>

				<!-- Reset Password -->

				<button
					type="button"
					disabled={!verified}
					class="w-full rounded-xl bg-gradient-to-r from-blue-700 to-sky-500 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-50"
					onclick={resetPassword}
				>
					Reset Password
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