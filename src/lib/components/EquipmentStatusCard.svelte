<script>
	const equipmentStatus = [
		{
			id: 1,
			name: 'Available',
			count: 118,
			percentage: 85,
			color: 'bg-green-500'
		},
		{
			id: 2,
			name: 'In Use',
			count: 15,
			percentage: 10,
			color: 'bg-blue-600'
		},
		{
			id: 3,
			name: 'Maintenance',
			count: 4,
			percentage: 3,
			color: 'bg-yellow-500'
		},
		{
			id: 4,
			name: 'Damaged',
			count: 2,
			percentage: 2,
			color: 'bg-red-500'
		}
	];
</script>

<div class="rounded-3xl bg-white p-6 shadow-lg">

	<!-- Header -->

	<div class="mb-6">

		<h2 class="text-2xl font-bold text-blue-900">
			Equipment Status
		</h2>

		<p class="mt-1 text-slate-500">
			Current laboratory equipment availability.
		</p>

	</div>

	<!-- Status -->

	<div class="space-y-6">

		{#each equipmentStatus as item (item.id)}

			<div>

				<div class="mb-2 flex items-center justify-between">

					<div>

						<h3 class="font-semibold text-slate-800">
							{item.name}
						</h3>

						<p class="text-sm text-slate-500">
							{item.count} Equipments
						</p>

					</div>

					<span class="font-bold text-blue-900">
						{item.percentage}%
					</span>

				</div>

				<div
					class="h-3 overflow-hidden rounded-full bg-slate-200"
				>

					<div
						class={`h-full rounded-full ${item.color}`}
						style={`width:${item.percentage}%`}
					></div>

				</div>

			</div>

		{/each}

	</div>

	<!-- Footer -->

	<div
		class="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-4"
	>

		<h3 class="font-bold text-blue-900">
			Laboratory Summary
		</h3>

		<p class="mt-2 text-sm leading-6 text-slate-600">
			Most laboratory equipment is currently available.
			Regular maintenance helps ensure uninterrupted
			laboratory activities.
		</p>

	</div>

</div>