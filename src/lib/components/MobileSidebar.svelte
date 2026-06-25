<script>
	import { resolve } from '$app/paths';

	let {
		isOpen = false,
		onClose = () => {},
		showLogout = false,
		onLogout = () => {}
	} = $props();

const navigationItems = /** @type {const} */ ([
	{
		label: '📊 Dashboard',
		href: '/student-dashboard'
	},
	{
		label: '🧪 Equipment',
		href: '/equipment-module'
	},
	{
		label: '📖 Booking History',
		href: '/booking-history'
	},
	{
		label: '👤 Student Profile',
		href: '/student-profile'
	}
]);
</script>

{#if isOpen}
	<button
		type="button"
		class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
		onclick={() => onClose()}
		aria-label="Close sidebar"
	></button>
{/if}

<aside
	class={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col bg-white shadow-2xl transition-transform duration-300 md:hidden ${
		isOpen ? 'translate-x-0' : '-translate-x-full'
	}`}
>
	<div
		class="flex items-center justify-between bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 px-5 py-4"
	>
		<h2 class="text-lg font-bold text-white">
			Menu
		</h2>

		<button
			type="button"
			class="text-2xl font-bold text-white"
			onclick={() => onClose()}
			aria-label="Close Menu"
		>
			✕
		</button>
	</div>

<nav class="flex-1 space-y-2 p-4">
	{#each navigationItems as item (item.href)}
		<a
			href={resolve(item.href)}
			class="block w-full rounded-xl px-4 py-3 text-left font-medium text-slate-700 transition hover:bg-blue-100 hover:text-blue-900"
			onclick={() => onClose()}
		>
			{item.label}
		</a>
	{/each}
</nav>

	<div class="border-t p-4">
		{#if showLogout}
<button
	type="button"
	class="w-full rounded-xl bg-gradient-to-r from-red-600 to-red-700 px-4 py-3 font-semibold text-white shadow-md transition duration-300 hover:from-red-700 hover:to-red-800 hover:shadow-lg"
	onclick={() => onLogout()}
>
	🚪 Logout
</button>
		{:else}
			<div
				class="rounded-xl bg-green-100 px-4 py-3 text-center text-sm font-medium text-green-700"
			>
				Academic Portal
			</div>
		{/if}
	</div>
</aside>