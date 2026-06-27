<script>
	import { resolve } from '$app/paths';
</script>

<nav
	class="hidden border-b border-blue-100 bg-white/95 shadow-md backdrop-blur-md lg:block"
>
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