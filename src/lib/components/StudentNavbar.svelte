<script>
	import { resolve } from '$app/paths';
</script>

<nav
	class="sticky top-24 z-40 border-b border-blue-100 bg-white/95 shadow-md backdrop-blur-md"
>
	<div
		class="mx-auto flex max-w-7xl items-center justify-center px-6 py-4"
	>
		<div
			class="flex flex-wrap items-center justify-center gap-4 rounded-2xl border border-blue-100 bg-blue-50/70 px-4 py-2 shadow-sm"
		>
			<a
				href={resolve('/student-dashboard')}
				class="rounded-xl px-5 py-2 font-semibold text-slate-700 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:text-white hover:shadow-lg"
			>
				📊 Dashboard
			</a>

			<a
				href={resolve('/equipment-module')}
				class="rounded-xl px-5 py-2 font-semibold text-slate-700 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:text-white hover:shadow-lg"
			>
				🧪 Equipment
			</a>

			<a
				href={resolve('/booking-history')}
				class="rounded-xl px-5 py-2 font-semibold text-slate-700 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:text-white hover:shadow-lg"
			>
				📖 Booking History
			</a>
		</div>
	</div>
</nav>