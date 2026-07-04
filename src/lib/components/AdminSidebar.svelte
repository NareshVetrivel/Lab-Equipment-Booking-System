<script>
	import { resolve } from '$app/paths';

	let { isOpen = false, onClose = () => {}, showLogout = true, onLogout = () => {} } = $props();

	const navigationItems = [
		{
			label: '📊 Dashboard',
			href: '/admin-dashboard'
		},
		{
			label: '🧪 Manage Equipment',
			href: '/manage-equipment'
		},
		{
			label: '📚 Manage Booking',
			href: '/manage-booking'
		},
		{
			label: '📝 Booking Requests',
			href: '/booking-requests'
		},
		{
			label: '↩️ Equipment Return',
			href: '/equipment-return'
		}
	];
</script>

{#if isOpen}
	<button
		type="button"
		class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
		onclick={() => onClose()}
		aria-label="Close Sidebar"
	></button>
{/if}

<aside
	class={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col bg-white shadow-2xl transition-transform duration-300 lg:hidden ${
		isOpen ? 'translate-x-0' : '-translate-x-full'
	}`}
>
	<!-- Header -->

	<div
		class="flex items-center justify-between bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 px-5 py-4"
	>
		<h2 class="text-xl font-bold text-white">Admin Menu</h2>

		<button
			type="button"
			class="text-3xl font-bold text-white transition hover:text-red-300"
			onclick={() => onClose()}
			aria-label="Close Menu"
		>
			✕
		</button>
	</div>

	<!-- Navigation -->

	<nav class="flex-1 overflow-y-auto p-4">
		<div class="space-y-2">
			{#each navigationItems as item (item.href)}
				<a
					href={resolve(/** @type {any} */ (item.href))}
					class="block rounded-xl px-4 py-3 font-medium text-slate-700 transition-all duration-300 hover:bg-blue-100 hover:text-blue-900"
					onclick={() => onClose()}
				>
					{item.label}
				</a>
			{/each}

			{#if showLogout}
				<button
					type="button"
					class="mt-2 w-full rounded-xl bg-gradient-to-r from-red-600 to-red-700 px-4 py-3 font-semibold text-white transition hover:from-red-700 hover:to-red-800"
					onclick={() => {
						onClose();
						onLogout();
					}}
				>
					🚪 Logout
				</button>
			{/if}
		</div>
	</nav>

	<div class="border-t p-4">
		<div class="rounded-xl bg-green-100 px-4 py-3 text-center text-sm font-medium text-green-700">
			Administrator Panel
		</div>
	</div>
</aside>
