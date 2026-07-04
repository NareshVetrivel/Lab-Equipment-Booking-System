<script>
	import { resolve } from '$app/paths';
	import { goto } from '$app/navigation';

	import { logout } from '$lib/services/authService';

	import AdminSidebar from '$lib/components/AdminSidebar.svelte';
	import ConfirmDialog from '$lib/components/ConfirmDialog.svelte';

	let showSidebar = $state(false);
	let showLogoutDialog = $state(false);

	function openSidebar() {
		showSidebar = true;

		document.body.style.overflow = 'hidden';
	}

	function closeSidebar() {
		showSidebar = false;

		document.body.style.overflow = '';
	}

	function handleLogout() {
		showLogoutDialog = true;
	}

	async function confirmLogout() {
		showLogoutDialog = false;

		await logout();

		goto(resolve('/admin-login'));
	}

	function cancelLogout() {
		showLogoutDialog = false;
	}
</script>

<nav class="hidden border-b border-blue-100 bg-white/95 shadow-md backdrop-blur-md lg:block">
	<div class="mx-auto flex max-w-7xl items-center justify-center px-4 py-3">
		<div
			class="flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-blue-100 bg-blue-50/70 p-2 shadow-sm"
		>
			<!-- Dashboard -->

			<a
				href={resolve('/admin-dashboard')}
				class="rounded-xl px-5 py-2.5 font-semibold text-slate-700 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:text-white hover:shadow-lg"
			>
				📊 Dashboard
			</a>

			<!-- Manage Equipment -->

			<a
				href={resolve('/manage-equipment')}
				class="rounded-xl px-5 py-2.5 font-semibold text-slate-700 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:text-white hover:shadow-lg"
			>
				🧪 Manage Equipment
			</a>

			<!-- Manage Booking -->

			<a
				href={resolve('/manage-booking')}
				class="rounded-xl px-5 py-2.5 font-semibold text-slate-700 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:text-white hover:shadow-lg"
			>
				📚 Manage Booking
			</a>

			<!-- Booking Requests -->

			<a
				href={resolve('/booking-requests')}
				class="rounded-xl px-5 py-2.5 font-semibold text-slate-700 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:text-white hover:shadow-lg"
			>
				📝 Booking Requests
			</a>

			<!-- Equipment Return -->

			<a
				href={resolve('/equipment-return')}
				class="rounded-xl px-5 py-2.5 font-semibold text-slate-700 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:text-white hover:shadow-lg"
			>
				↩️ Equipment Return
			</a>
		</div>
	</div>
</nav>

<!-- Mobile Menu -->

<div class="border-b border-slate-200 bg-white px-4 py-4 shadow-sm lg:hidden">
	<button
		type="button"
		class="rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white transition hover:bg-blue-800"
		onclick={openSidebar}
	>
		☰ Menu
	</button>
</div>

<AdminSidebar
	isOpen={showSidebar}
	onClose={closeSidebar}
	showLogout={true}
	onLogout={handleLogout}
/>

<ConfirmDialog
	open={showLogoutDialog}
	title="Logout"
	message="Are you sure you want to logout from the Admin Panel?"
	confirmText="Logout"
	cancelText="Cancel"
	confirmColor="red"
	onConfirm={confirmLogout}
	onCancel={cancelLogout}
/>
