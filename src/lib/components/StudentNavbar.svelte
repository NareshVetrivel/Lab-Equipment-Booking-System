<script>
	import { resolve } from '$app/paths';
	import MobileSidebar from '$lib/components/MobileSidebar.svelte';

	let isSidebarOpen = $state(false);
</script>

<!-- Mobile Navigation -->

<div
	class="sticky top-20 z-40 border-b border-blue-100 bg-white shadow-md md:hidden"
>
<div class="mx-auto flex max-w-7xl justify-start px-4 py-3">

	<button
		type="button"
		class="inline-flex items-center gap-3 rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white shadow-md transition hover:bg-blue-800"
		onclick={() => (isSidebarOpen = true)}
	>
		<span class="text-2xl">
			☰
		</span>

		<span>
			Menu
		</span>
	</button>

</div>
</div>

<!-- Desktop Navigation -->

<nav
	class="sticky top-24 z-40 hidden border-b border-blue-100 bg-white/95 shadow-md backdrop-blur-md md:block"
>
	<div
		class="mx-auto flex max-w-7xl items-center justify-center px-4 py-3 sm:px-6 sm:py-4"
	>
		<div
			class="flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-blue-100 bg-blue-50/70 p-2 shadow-sm sm:gap-4 sm:px-4 sm:py-2"
		>

			<a
				href={resolve('/student-dashboard')}
				class="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:text-white hover:shadow-lg sm:px-5 sm:text-base"
			>
				📊 Dashboard
			</a>

			<a
				href={resolve('/equipment-module')}
				class="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:text-white hover:shadow-lg sm:px-5 sm:text-base"
			>
				🧪 Equipment
			</a>

			<a
				href={resolve('/booking-history')}
				class="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:text-white hover:shadow-lg sm:px-5 sm:text-base"
			>
				📖 Booking History
			</a>

		</div>
	</div>
</nav>

<MobileSidebar
	isOpen={isSidebarOpen}
	onClose={() => (isSidebarOpen = false)}
/>