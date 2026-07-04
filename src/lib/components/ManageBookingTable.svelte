<script>
	let { bookings = [] } = $props();

	/**
	 * @param {string} status
	 */
	function getStatusClass(status) {
		switch (status) {
			case 'Using':
				return 'bg-yellow-100 text-yellow-700';

			case 'Returned':
				return 'bg-green-100 text-green-700';

			case 'Overdue':
				return 'bg-red-100 text-red-700';

			default:
				return 'bg-slate-100 text-slate-700';
		}
	}
</script>

<div class="overflow-hidden rounded-3xl bg-white shadow-lg">
	<!-- Header -->

	<div class="border-b border-slate-200 p-6">
		<h2 class="text-2xl font-bold text-blue-900">Active Bookings</h2>

		<p class="mt-2 text-slate-600">View all approved equipment bookings.</p>
	</div>

	<!-- Desktop Table -->

	<div class="hidden lg:block">
		<div class="max-h-[500px] overflow-auto">
			<table class="min-w-full">
				<thead class="sticky top-0 bg-slate-100">
					<tr>
						<th class="px-5 py-4 text-left font-semibold"> Student Name </th>

						<th class="px-5 py-4 text-left font-semibold"> Student Dept </th>

						<th class="px-5 py-4 text-left font-semibold"> Equipment Name </th>

						<th class="px-5 py-4 text-left font-semibold"> Equipment Dept </th>

						<th class="px-5 py-4 text-center font-semibold"> Student Phone </th>

						<th class="px-5 py-4 text-center font-semibold"> Accept Date </th>

						<th class="px-5 py-4 text-center font-semibold"> Status </th>

						<th class="px-5 py-4 text-center font-semibold"> Return Date </th>
					</tr>
				</thead>

				<tbody>
					{#each bookings as booking (booking.id)}
						<tr class="border-b hover:bg-slate-50">
							<td class="px-5 py-4 font-semibold">
								{booking.student}
							</td>

							<td class="px-5 py-4">
								{booking.studentDepartment}
							</td>

							<td class="px-5 py-4">
								{booking.equipment}
							</td>

							<td class="px-5 py-4">
								{booking.department}
							</td>

							<td class="px-5 py-4 text-center">
								{booking.studentPhone}
							</td>

							<td class="px-5 py-4 text-center">
								{booking.acceptDate}
							</td>

							<td class="px-5 py-4 text-center">
								<span
									class={`rounded-full px-3 py-1 text-sm font-semibold ${getStatusClass(booking.status)}`}
								>
									{booking.status}
								</span>
							</td>

							<td class="px-5 py-4 text-center">
								{booking.returnDate}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>

	<!-- Mobile Cards -->

	<div class="space-y-4 p-4 lg:hidden">
		{#if bookings.length}
			{#each bookings as booking (booking.id)}
				<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow">
					<div class="mb-3 flex items-center justify-between">
						<h3 class="font-bold text-blue-900">
							{booking.student}
						</h3>

						<span
							class={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(booking.status)}`}
						>
							{booking.status}
						</span>
					</div>

					<div class="space-y-2 text-sm">
						<p>
							<b>Student Dept :</b>
							{booking.studentDepartment}
						</p>

						<p>
							<b>Equipment :</b>
							{booking.equipment}
						</p>

						<p>
							<b>Equipment Dept :</b>
							{booking.department}
						</p>

						<p>
							<b>Phone :</b>
							{booking.studentPhone}
						</p>

						<p>
							<b>Accepted :</b>
							{booking.acceptDate}
						</p>

						<p>
							<b>Returned :</b>
							{booking.returnDate}
						</p>
					</div>
				</div>
			{/each}
		{:else}
			<div class="py-10 text-center text-slate-500">
				<div class="text-5xl">📋</div>

				<p class="mt-4">No approved bookings found.</p>
			</div>
		{/if}
	</div>
</div>
