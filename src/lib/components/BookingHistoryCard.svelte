<script>
	import { resolve } from '$app/paths';

	let { booking } = $props();

	/**
	 * @param {string} status
	 */
	function getStatusColor(status) {
		if (status === 'Approved') {
			return 'bg-green-100 text-green-700 border-green-200';
		}

		if (status === 'Pending') {
			return 'bg-yellow-100 text-yellow-700 border-yellow-200';
		}

		if (status === 'Returned') {
			return 'bg-blue-100 text-blue-700 border-blue-200';
		}

		return 'bg-red-100 text-red-700 border-red-200';
	}
</script>

<div
	class="overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
>
	<!-- Equipment Image -->

{#if booking.image}

	<img
		src={booking.image}
		alt={booking.equipmentName}
		class="h-48 w-full object-cover"
	/>

{:else}

	<div
		class="flex h-48 items-center justify-center bg-slate-100 text-7xl"
	>
		🧪
	</div>

{/if}

	<!-- Card Body -->

	<div class="space-y-4 p-5">

		<div>

			<h2
				class="text-xl font-bold text-blue-900"
			>
				{booking.equipmentName}
			</h2>

			<p
				class="mt-1 text-slate-500"
			>
				{booking.department}
			</p>

		</div>

		<div class="space-y-2 text-sm text-slate-700">

			<p>
				<span class="font-semibold text-blue-900">
					Booking Date :
				</span>

				{booking.bookingDate}
			</p>

<p>

	<span class="font-semibold text-blue-900">

		Return Within :

	</span>

	{booking.returnWithinDays} Days

</p>

			<p>
				<span class="font-semibold text-blue-900">
					Return Date :
				</span>

				{booking.returnDate}
			</p>

		</div>

		<div class="flex justify-center">

			<span
				class={`rounded-full border px-4 py-2 text-sm font-semibold ${getStatusColor(booking.status)}`}
			>
				{booking.status}
			</span>

		</div>

		<a
			href={resolve(`/equipment-details/${booking.equipmentId}`)}
			class="block rounded-xl bg-blue-700 py-3 text-center font-semibold text-white transition hover:bg-blue-800"
		>
			View Equipment
		</a>

	</div>

</div>