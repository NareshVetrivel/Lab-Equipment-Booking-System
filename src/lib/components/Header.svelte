<script>
	import { onMount } from 'svelte';
	import { auth } from '$lib/firebase/firebase';
	import { logout } from '$lib/services/authService';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { onAuthStateChanged } from 'firebase/auth';

	let {
	showLogout = false,
	showUserMenu = false
} = $props();

	let userEmail = $state('');
	let showMenu = $state(false);
/** @type {HTMLDivElement | null} */
let menuRef = null;

onMount(() => {
	const unsubscribe = onAuthStateChanged(auth, (user) => {
		if (user) {
			userEmail = user.email ?? '';
		}
	});

	document.addEventListener('click', handleClickOutside);

	return () => {
		unsubscribe();
		document.removeEventListener('click', handleClickOutside);
	};
});
	async function handleLogout() {
		await logout();
		goto(resolve('/student-login'));
	}

	function toggleMenu() {
		showMenu = !showMenu;
	}

/**
 * @param {MouseEvent} event
 */
function handleClickOutside(event) {
	const target = /** @type {Node} */ (event.target);

	if (menuRef && !menuRef.contains(target)) {
		showMenu = false;
	}
}

</script>

<header
	class="sticky top-0 z-50 border-b border-blue-700 bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 shadow-2xl"
>
	<div class="absolute inset-0 bg-blue-400/10 blur-3xl"></div>

	<div
		class="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:h-24 sm:px-6 lg:px-8"
	>
		<!-- Logo + Title -->

		<div class="flex min-w-0 items-center gap-2 sm:gap-3 lg:gap-4">

			<div
				class="transition-all duration-300 hover:scale-110"
			>
				<img
					src="/logo.png"
					alt="Sona College Logo"
					class="h-12 w-12 object-contain drop-shadow-[0_0_18px_rgba(255,215,0,0.5)] transition-all duration-300 sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-20 lg:w-20"
				/>
			</div>

			<div class="min-w-0">

				<h2
					class="text-[10px] font-semibold uppercase tracking-wider text-blue-200 sm:text-xs md:text-sm"
				>
					Sona College of Technology
				</h2>

				<h1
					class="break-words text-sm font-bold text-white sm:text-lg md:text-xl lg:text-2xl"
				>
					Lab Equipment Booking System
				</h1>

			</div>

		</div>

		<!-- Desktop Right Side -->

<!-- Desktop Right Side -->

<div class="hidden md:block">

	{#if showLogout}

		<button
			type="button"
			class="rounded-xl bg-red-600 px-5 py-2 font-semibold text-white transition hover:bg-red-700"
			onclick={handleLogout}
		>
			Logout
		</button>

	{:else if showUserMenu}

		<div
			class="relative"
			bind:this={menuRef}
		>

			<button
				type="button"
				onclick={(event) => {
					event.stopPropagation();
					toggleMenu();
				}}
				class="group relative overflow-hidden rounded-full border border-cyan-400/40 bg-cyan-500/20 px-6 py-2 font-medium text-cyan-200 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.45)]"
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
						onclick={handleLogout}
						class="block w-full px-5 py-3 text-left text-slate-700 transition hover:bg-red-500 hover:text-white"
					>
						Logout
					</button>

				</div>

			{/if}

		</div>

	{:else}

		<div
			class="rounded-full border border-green-400/40 bg-green-500/20 px-4 py-2 text-sm font-medium text-green-300 backdrop-blur-sm"
		>
			● Academic Portal
		</div>

	{/if}

</div>
</header>