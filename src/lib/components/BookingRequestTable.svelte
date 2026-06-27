<script>
	let {
		requests = [],
		onAccept = () => {},
		onReject = () => {}
	} = $props();

	/**
	 * @param {string} status
	 */
	function getStatusClass(status) {
		switch (status) {
			case 'Approved':
				return 'bg-green-100 text-green-700';

			case 'Rejected':
				return 'bg-red-100 text-red-700';

			default:
				return 'bg-yellow-100 text-yellow-700';
		}
	}
</script>

<div class="overflow-hidden rounded-3xl bg-white shadow-lg">

	<!-- Header -->

	<div class="border-b border-slate-200 p-6">

		<h2 class="text-2xl font-bold text-blue-900">
			Booking Requests
		</h2>

		<p class="mt-2 text-slate-600">
			Review student equipment booking requests.
		</p>

	</div>

	<!-- Table -->

	<div class="overflow-x-auto">

		<table class="w-full">

			<thead class="bg-slate-100">

				<tr>

					<th class="px-5 py-4 text-left font-semibold text-slate-700">
						Student
					</th>

					<th class="px-5 py-4 text-left font-semibold text-slate-700">
						Department
					</th>

					<th class="px-5 py-4 text-left font-semibold text-slate-700">
						Equipment
					</th>

					<th class="px-5 py-4 text-center font-semibold text-slate-700">
						Quantity
					</th>

					<th class="px-5 py-4 text-center font-semibold text-slate-700">
						Request Date
					</th>

					<th class="px-5 py-4 text-center font-semibold text-slate-700">
						Time
					</th>

					<th class="px-5 py-4 text-center font-semibold text-slate-700">
						Status
					</th>

					<th class="px-5 py-4 text-center font-semibold text-slate-700">
						Action
					</th>

				</tr>

			</thead>

			<tbody>

				{#if requests.length > 0}

					{#each requests as request (request.id)}

						<tr class="border-b border-slate-100 hover:bg-slate-50">

							<td class="px-5 py-4 font-semibold text-slate-800">
								{request.student}
							</td>

							<td class="px-5 py-4">
								{request.department}
							</td>

							<td class="px-5 py-4">
								{request.equipment}
							</td>

							<td class="px-5 py-4 text-center">
								{request.quantity}
							</td>

							<td class="px-5 py-4 text-center">
								{request.requestDate}
							</td>

							<td class="px-5 py-4 text-center">
								{request.requestTime}
							</td>

							<td class="px-5 py-4 text-center">

								<span
									class={`rounded-full px-3 py-1 text-sm font-semibold ${getStatusClass(request.status)}`}
								>
									{request.status}
								</span>

							</td>

							<td class="px-5 py-4">

								<div class="flex justify-center gap-2">

									<button
										type="button"
										class="rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
										onclick={() => onAccept(request)}
									>
										Accept
									</button>

									<button
										type="button"
										class="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
										onclick={() => onReject(request)}
									>
										Reject
									</button>

								</div>

							</td>

						</tr>

					{/each}

				{:else}

					<tr>

						<td
							colspan="8"
							class="px-6 py-16 text-center"
						>

							<div class="space-y-3">

								<div class="text-6xl">
									📋
								</div>

								<h3 class="text-2xl font-bold text-slate-700">
									No Booking Requests
								</h3>

								<p class="text-slate-500">
									There are no pending booking requests.
								</p>

							</div>

						</td>

					</tr>

				{/if}

			</tbody>

		</table>

	</div>

</div>