<script>
	import Button from '$lib/components/Button.svelte';

	let { showLogout = false } = $props();

	function handleLogout() {
		console.log('Logout');
	}
</script>

<header
	class="sticky top-0 z-50 border-b border-blue-700 bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 shadow-2xl"
>
	<div class="absolute inset-0 bg-blue-400/10 blur-3xl"></div>

	<div
		class="relative mx-auto flex h-24 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
	>
		<!-- Logo + Title -->

		<div class="flex items-center gap-4">
<div
	class="transition-all duration-300 hover:scale-110"
>
	<img
		src="/logo.png"
		alt="Sona College Logo"
		class="h-20 w-20 object-contain drop-shadow-[0_0_18px_rgba(255,215,0,0.5)]"
	/>
</div>

			<div>
				<h2
					class="text-sm font-semibold tracking-wider text-blue-200 uppercase"
				>
					Sona College of Technology
				</h2>

				<h1
					class="text-lg font-bold text-white sm:text-xl md:text-2xl"
				>
					Lab Equipment Booking System
				</h1>
			</div>
		</div>

		<!-- Right Side -->

		<div class="hidden md:block">
{#if showLogout}
	<button
		type="button"
		class="rounded-xl bg-red-600 px-5 py-2 font-semibold text-white transition hover:bg-red-700"
		onclick={handleLogout}
	>
		Logout
	</button>
{:else}
	<div
		class="rounded-full border border-green-400/40 bg-green-500/20 px-4 py-2 text-sm font-medium text-green-300 backdrop-blur-sm"
	>
		● Academic Portal
	</div>
{/if}
		</div>
	</div>
</header>