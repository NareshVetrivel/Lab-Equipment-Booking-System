<script>
	import { resolve } from '$app/paths';

	let { booking } = $props();

	/**
	 * @param {string} status
	 */
	function getStatusColor(status) {
		if (status === 'Approved') {
			return 'bg-gradient-to-r from-green-300 to-green-300 text-green-800 shadow-md';
		}

		if (status === 'Pending') {
			return 'bg-gradient-to-r from-yellow-300 to-yellow-300 text-yellow-800 shadow-md animate-pulse';
		}

		if (status === 'Returned') {
			return 'bg-gradient-to-r from-blue-300 to-blue-300 text-blue-800 shadow-md';
		}

		return 'bg-gradient-to-r from-red-300 to-red-300 text-red-800 shadow-md';
	}
</script>

<div
	class="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-xl transition-all duration-500 hover:-translate-y-4 hover:shadow-blue-200/50"
>
	<!-- Equipment Image -->

	{#if booking.image}
		<img
			src={booking.image}
			alt={booking.equipmentName}
			class="h-64 w-full bg-gradient-to-b from-slate-50 to-white object-contain p-4 transition duration-500 group-hover:scale-110"
		/>
	{:else}
		<div
			class="flex h-64 items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 text-7xl"
		>
			📦
		</div>
	{/if}

	<!-- Card Body -->

	<div class="flex flex-1 flex-col p-7">
		<div>
			<h2 class="text-2xl font-extrabold tracking-tight text-blue-900">
				{booking.equipmentName}
			</h2>

			<p class="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
				{booking.department}
			</p>
		</div>

		<div class="mt-5 rounded-2xl bg-gradient-to-r from-slate-50 to-blue-50 p-4 text-sm">
			<p>
				<span class="font-semibold text-slate-700"> 📅 Booking </span>

				<span class="ml-2 font-semibold text-slate-700">
					{booking.bookingDate}
				</span>
			</p>

			<p>
				<span class="font-semibold text-slate-700"> ⏳ Return Within </span>

				<span class="ml-2 font-semibold text-slate-700">
					{booking.returnWithinDays} Days
				</span>
			</p>

			<p>
				<span class="font-semibold text-slate-700"> 📦 Return Date </span>

				<span class="ml-2 font-semibold text-slate-700">
					{booking.returnDate}
				</span>
			</p>
		</div>

		<div class="mt-6 mb-6 flex">
			<span
				class={`rounded-xl px-4 py-2 text-sm font-bold shadow-md ${getStatusColor(booking.status)}`}
			>
				{booking.status}
			</span>
		</div>

		<a
			href={resolve(`/equipment-details/${booking.equipmentId}`)}
			class="mt-auto inline-flex w-fit items-center rounded-xl bg-gradient-to-r from-blue-700 to-sky-500 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:translate-x-2 hover:shadow-2xl"
		>
			View Equipment

			<span class="ml-2 transition-transform duration-300 group-hover:translate-x-1"> → </span>
		</a>
	</div>
</div>
