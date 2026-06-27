<script>
let {
	bookings = []
} = $props();

	/**
	 * @param {string} status
	 */
	function getStatusClass(status) {
		switch (status) {
			case 'Using':
				return 'bg-yellow-100 text-yellow-700';

			case 'Returned':
				return 'bg-green-100 text-green-700';

			default:
				return 'bg-slate-100 text-slate-700';
		}
	}
</script>

<div class="overflow-hidden rounded-3xl bg-white shadow-lg">

	<!-- Header -->

	<div class="border-b border-slate-200 p-6">

		<h2 class="text-2xl font-bold text-blue-900">
			Booking Details
		</h2>

		<p class="mt-2 text-slate-600">
			View all laboratory equipment bookings.
		</p>

	</div>

	<!-- Table -->

	<div class="max-h-[500px] overflow-y-auto overflow-x-hidden">

		<table class="w-full table-fixed">

			<thead class="sticky top-0 bg-slate-100">

				<tr>

					<th class="w-[16%] px-6 py-4 text-left font-semibold text-slate-700">
						Student
					</th>

					<th class="w-[18%] px-6 py-4 text-left font-semibold text-slate-700">
						Equipment
					</th>

					<th class="w-[16%] px-6 py-4 text-left font-semibold text-slate-700">
						Department
					</th>

					<th class="w-[16%] x-6 py-4 text-center font-semibold text-slate-700">
						Accept Date
					</th>

					<th class="w-[12%] px-6 py-4 text-center font-semibold text-slate-700">
						Status
					</th>

					<th class="w-[20%] px-6 py-4 text-center font-semibold text-slate-700">
						Return Date
					</th>
				</tr>

			</thead>

			<tbody>

				{#if bookings.length > 0}

					{#each bookings as booking (booking.id)}

						<tr class="border-b border-slate-100 hover:bg-slate-50">

							<td class="px-6 py-4 font-semibold text-slate-800">
								{booking.student}
							</td>

							<td class="px-6 py-4">
								{booking.equipment}
							</td>

							<td class="px-6 py-4">
								{booking.department}
							</td>

							<td class="px-6 py-4 text-center">
								{booking.acceptDate}
							</td>

							<td class="px-6 py-4 text-center">

								<span
									class={`rounded-full px-3 py-1 text-sm font-semibold ${getStatusClass(booking.status)}`}
								>
									{booking.status}
								</span>

							</td>

							<td class="px-6 py-4 text-center">

								{booking.returnDate || '-'}

							</td>
						</tr>

					{/each}

				{:else}

					<tr>

						<td
							colspan="6"
							class="px-6 py-16 text-center"
						>

							<div class="space-y-3">

								<div class="text-6xl">
									📋
								</div>

								<h3
									class="text-2xl font-bold text-slate-700"
								>
									No Booking Records
								</h3>

								<p class="text-slate-500">
									No laboratory bookings are available.
								</p>

							</div>

						</td>

					</tr>

				{/if}

			</tbody>

		</table>

	</div>

</div>