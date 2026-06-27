<script>
/**
 * @typedef {{
 *	id: string;
 *	name: string;
 *	department: string;
 *	available: number;
 *	total: number;
 * }} Equipment
 */
let {
	equipments = []
} = $props();
	/**
	 * @param {number} available
	 * @param {number} total
	 */
	function getStatusColor(available, total) {
		if (available === 0) {
			return 'text-red-600 font-bold';
		}

		if (available <= total * 0.3) {
			return 'text-yellow-600 font-bold';
		}

		return 'text-green-600 font-bold';
	}
</script>

<div class="overflow-hidden rounded-3xl bg-white shadow-lg">

	<!-- Header -->

	<div class="border-b border-slate-200 p-5">

		<h2 class="text-xl font-bold text-blue-900">
			Equipment List
		</h2>

		<p class="mt-1 text-sm text-slate-500">
			View and manage laboratory equipment.
		</p>

	</div>

	<!-- Table -->

	<div class="max-h-[450px] overflow-y-auto">

		<table class="w-full">

			<thead class="sticky top-0 bg-slate-100">

				<tr>

					<th class="px-6 py-4 text-left font-semibold text-slate-700">
						Equipment
					</th>

					<th class="px-6 py-4 text-left font-semibold text-slate-700">
						Department
					</th>

					<th class="px-6 py-4 text-center font-semibold text-slate-700">
						Available
					</th>

					<th class="px-6 py-4 text-center font-semibold text-slate-700">
						Total Quantity
					</th>
				</tr>

			</thead>

			<tbody>

				{#if equipments.length > 0}

					{#each /** @type {any[]} */ (equipments) as equipment (equipment.id)}

						<tr class="border-b border-slate-100 hover:bg-slate-50">

							<td class="px-6 py-4">

								<div>

									<p class="font-semibold text-slate-800">
										{equipment.name}
									</p>

									<p class="text-sm text-slate-500">
										{equipment.id}
									</p>

								</div>

							</td>

							<td class="px-6 py-4">

								{equipment.department}

							</td>

							<td
								class={`px-6 py-4 text-center ${getStatusColor(
									equipment.available,
									equipment.total
								)}`}
							>

								{equipment.available}

							</td>

							<td class="px-6 py-4 text-center">

								{equipment.total}

							</td>
						</tr>

					{/each}

				{:else}

					<tr>

						<td
							colspan="4"
							class="py-16 text-center"
						>

							<div class="space-y-3">

								<div class="text-6xl">
									📦
								</div>

								<h3
									class="text-xl font-bold text-slate-700"
								>
									No Equipment Found
								</h3>

								<p
									class="text-slate-500"
								>
									No equipment matches the selected search or department.
								</p>

							</div>

						</td>

					</tr>

				{/if}

			</tbody>

		</table>

	</div>

</div>