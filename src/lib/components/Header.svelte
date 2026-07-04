<script>
	import { onMount } from 'svelte';

	import { auth } from '$lib/firebase/firebase';
	import { logout } from '$lib/services/authService';

	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	import { onAuthStateChanged } from 'firebase/auth';
	import ConfirmDialog from '$lib/components/ConfirmDialog.svelte';

	let { userType = 'guest' } = $props();

	let userEmail = $state('');

	let showMenu = $state(false);
	let showLogoutDialog = $state(false);

	/** @type {HTMLDivElement | null} */
	let menuRef = null;

	onMount(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			userEmail = user?.email ?? '';
		});

		document.addEventListener('click', handleClickOutside);

		return () => {
			unsubscribe();

			document.removeEventListener('click', handleClickOutside);

			document.body.style.overflow = '';
		};
	});

	function toggleMenu() {
		showMenu = !showMenu;
	}

	/**
	 * @param {MouseEvent} event
	 */
	function handleClickOutside(event) {
		const target =
			/** @type {Node} */
			(event.target);

		if (menuRef && !menuRef.contains(target)) {
			showMenu = false;
		}
	}

	function handleLogout() {
		showLogoutDialog = true;
	}

	async function confirmLogout() {
		showLogoutDialog = false;

		showMenu = false;

		await logout();

		document.body.style.overflow = '';

		if (userType === 'admin') {
			goto(resolve('/admin-login'));

			return;
		}

		goto(resolve('/student-login'));
	}

	function cancelLogout() {
		showLogoutDialog = false;
	}
</script>

<header
	class="sticky top-0 z-[100] overflow-visible border-b border-blue-700 bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 shadow-2xl"
>
	<div class="absolute inset-0 bg-blue-400/10 blur-3xl"></div>

	<div
		class="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:h-24 sm:px-6 lg:px-8"
	>
		<!-- Logo -->

		<div class="flex min-w-0 items-center gap-3">
			<div class="group">
				<img
					src="/logo.png"
					alt="Sona College Logo"
					class="h-12 w-12 object-contain drop-shadow-[0_0_18px_rgba(255,215,0,0.55)] transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_28px_rgba(255,215,0,0.95)] sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-20 lg:w-20"
				/>
			</div>

			<div class="min-w-0">
				<h2
					class="text-[10px] font-semibold uppercase tracking-widest text-blue-200 sm:text-xs md:text-sm"
				>
					Sona College of Technology
				</h2>

				<h1
					class="truncate text-sm font-bold tracking-wide text-white sm:text-lg md:text-xl lg:text-2xl"
				>
					Lab Equipment Booking System
				</h1>
			</div>
		</div>

		<!-- Right Section -->

		{#if userType === 'guest'}
			<div
				class="hidden lg:block rounded-full border border-green-400/40 bg-green-500/20 px-5 py-2 text-sm font-medium text-green-300 backdrop-blur-sm"
			>
				● Academic Portal
			</div>
		{:else if userType === 'student'}
			<div class="relative hidden lg:block" bind:this={menuRef}>
				<button
					type="button"
					class="group relative overflow-hidden rounded-full border border-cyan-400/40 bg-cyan-500/20 px-6 py-2 font-medium text-cyan-200 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.45)]"
					onclick={(event) => {
						event.stopPropagation();

						toggleMenu();
					}}
				>
					<span
						class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full"
					></span>

					<span class="relative">
						{userEmail}
					</span>
				</button>

				{#if showMenu}
					<div
						class="absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
					>
						<a
							href={resolve('/student-profile')}
							class="block px-5 py-3 text-slate-700 transition hover:bg-sky-100 hover:text-blue-700"
						>
							Student Profile
						</a>

						<hr class="border-slate-200" />

						<button
							type="button"
							class="block w-full px-5 py-3 text-left text-slate-700 transition hover:bg-red-500 hover:text-white"
							onclick={handleLogout}
						>
							Logout
						</button>
					</div>
				{/if}
			</div>
		{:else}
			<div class="hidden lg:block">
				<button
					type="button"
					class="rounded-xl bg-red-600 px-6 py-2 font-semibold text-white transition hover:bg-red-700"
					onclick={handleLogout}
				>
					Logout
				</button>
			</div>
		{/if}
	</div>
	<ConfirmDialog
		open={showLogoutDialog}
		title="Logout"
		message="Are you sure you want to logout?"
		confirmText="Logout"
		cancelText="Cancel"
		confirmColor="red"
		onConfirm={confirmLogout}
		onCancel={cancelLogout}
	/>
</header>
