<script>
	let {
		returns = [],
		onReturn = () => {}
	} = $props();
</script>

<div class="overflow-hidden rounded-3xl bg-white shadow-lg">

	<!-- Header -->

	<div class="border-b border-slate-200 p-6">

		<h2 class="text-2xl font-bold text-blue-900">
			Equipment Return
		</h2>

		<p class="mt-2 text-slate-600">
			Process equipment returns submitted by students.
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
						Equipment
					</th>

					<th class="px-5 py-4 text-left font-semibold text-slate-700">
						Department
					</th>

					<th class="px-5 py-4 text-center font-semibold text-slate-700">
						Quantity
					</th>

					<th class="px-5 py-4 text-center font-semibold text-slate-700">
						Issued Date
					</th>

					<th class="px-5 py-4 text-center font-semibold text-slate-700">
						Due Date
					</th>

					<th class="px-5 py-4 text-center font-semibold text-slate-700">
						Action
					</th>

				</tr>

			</thead>

			<tbody>

				{#if returns.length > 0}

					{#each returns as item (item.id)}

						<tr class="border-b border-slate-100 transition hover:bg-slate-50">

							<td class="px-5 py-4 font-semibold text-slate-800">
								{item.student}
							</td>

							<td class="px-5 py-4">
								{item.equipment}
							</td>

							<td class="px-5 py-4">
								{item.department}
							</td>

							<td class="px-5 py-4 text-center">
								{item.quantity}
							</td>

							<td class="px-5 py-4 text-center">
								{item.issuedDate}
							</td>

							<td class="px-5 py-4 text-center font-semibold text-red-600">
								{item.dueDate}
							</td>

							<td class="px-5 py-4">

								<div class="flex justify-center">

									<button
										type="button"
										class="rounded-xl bg-blue-700 px-5 py-2 font-semibold text-white transition hover:bg-blue-800"
										onclick={() => onReturn(item)}
									>
										Return
									</button>

								</div>

							</td>

						</tr>

					{/each}

				{:else}

					<tr>

						<td
							colspan="7"
							class="px-6 py-16 text-center"
						>

							<div class="space-y-3">

								<div class="text-6xl">
									📦
								</div>

								<h3 class="text-2xl font-bold text-slate-700">
									No Equipment Returns
								</h3>

								<p class="text-slate-500">
									There are no equipment return records available.
								</p>

							</div>

						</td>

					</tr>

				{/if}

			</tbody>

		</table>

	</div>

</div>