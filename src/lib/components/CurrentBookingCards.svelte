<script>
	let { bookings = [] } = $props();

	/**
	 * @param {string} status
	 */
	function getStatusClass(status) {
		if (status === 'Approved') {
			return 'bg-green-100 text-green-700';
		}

		return 'bg-yellow-100 text-yellow-700';
	}

	/**
	 * @param {any} booking
	 */
	function getReturnDate(booking) {
		if (!booking.approvedAt) {
			return '-';
		}

		try {
			const approvedDate = booking.approvedAt.toDate();

			const dueDate = new Date(
				approvedDate.getTime() + (booking.returnWithinDays ?? 0) * 24 * 60 * 60 * 1000
			);

			return dueDate.toLocaleDateString('en-IN');
		} catch {
			return '-';
		}
	}
</script>

<div class="rounded-3xl bg-white p-6 shadow-lg">
	<div class="mb-4">
		<h2 class="text-2xl font-bold text-blue-700">📚 Current Bookings</h2>

		<p class="mt-2 text-slate-500">View your active laboratory equipment bookings.</p>
	</div>

	{#if bookings.length}
		<div class="h-[360px] sm:h-[380px] lg:h-[390px] overflow-y-auto pr-2">
			<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
				{#each bookings as booking (booking.id)}
					<div
						class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
					>
						<img
							src={booking.image}
							alt={booking.equipmentName}
							class="h-36 w-full bg-slate-50 object-contain p-5"
						/>

						<div class="space-y-3 p-4">
							<div>
								<h3 class="text-xl font-bold text-blue-900">
									{booking.equipmentName}
								</h3>

								<p class="mt-1 text-sm text-slate-500">
									{booking.department}
								</p>
							</div>

							<div class="space-y-2 text-sm">
								<div class="flex justify-between">
									<span class="font-semibold text-slate-500"> Booking Date </span>

									<span class="font-medium">
										{booking.createdAt?.toDate().toLocaleDateString('en-IN') ?? '-'}
									</span>
								</div>

								<div class="flex justify-between">
									<span class="font-semibold text-slate-500"> Return Date </span>

									<span class="font-medium text-red-600">
										{getReturnDate(booking)}
									</span>
								</div>
							</div>

							<div class="pt-2">
								<span
									class={`inline-block rounded-full px-4 py-2 text-sm font-semibold ${getStatusClass(booking.status)}`}
								>
									{booking.status}
								</span>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{:else}
		<div
			class="flex h-72 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300"
		>
			<div class="text-6xl">📦</div>

			<h3 class="mt-5 text-2xl font-bold text-slate-700">No Current Bookings</h3>

			<p class="mt-2 text-slate-500">You don't have any active equipment bookings.</p>
		</div>
	{/if}
</div>
