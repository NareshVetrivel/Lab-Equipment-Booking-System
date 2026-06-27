<script>
	const lowStockItems = [
		{
			id: 1,
			name: 'Arduino Uno',
			department: 'Computer Science',
			quantity: 2
		},
		{
			id: 2,
			name: 'Breadboard',
			department: 'Computer Science',
			quantity: 1
		},
		{
			id: 3,
			name: 'Microscope',
			department: 'Botany',
			quantity: 2
		},
		{
			id: 4,
			name: 'Spectrometer',
			department: 'Physics',
			quantity: 3
		},
		{
			id: 5,
			name: 'Oscilloscope',
			department: 'ECE',
			quantity: 1
		},
		{
			id: 6,
			name: 'Power Supply',
			department: 'EEE',
			quantity: 2
		},
		{
			id: 7,
			name: 'Raspberry Pi',
			department: 'Computer Science',
			quantity: 1
		}
	];
</script>

<div class="rounded-3xl bg-white p-6 shadow-lg">

	<!-- Header -->

	<div class="mb-6 flex items-center justify-between">

		<div>

			<h2 class="text-2xl font-bold text-blue-900">
				Low Stock Alerts
			</h2>

			<p class="mt-1 text-slate-500">
				Equipment that needs immediate attention.
			</p>

		</div>

		<div
			class="rounded-full bg-red-100 px-4 py-2 text-sm font-bold text-red-600"
		>
			{lowStockItems.length} Alerts
		</div>

	</div>

	<!-- Scroll Area -->

	<div
		class="h-[370px] space-y-4 overflow-y-auto pr-2"
		style="scrollbar-width: thin;"
	>

		{#each lowStockItems as item (item.id)}

			<div
				class="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-red-200 hover:bg-red-50"
			>

				<div class="flex items-center justify-between">

					<div>

						<h3 class="font-bold text-slate-800">
							{item.name}
						</h3>

						<p class="mt-1 text-sm text-slate-500">
							{item.department}
						</p>

					</div>

					<span
						class="rounded-full bg-red-100 px-3 py-1 text-sm font-bold text-red-600"
					>
						Only {item.quantity}
					</span>

				</div>

			</div>

		{/each}

	</div>

	<!-- Footer -->

	<div
		class="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4"
	>

		<h3 class="font-bold text-red-700">
			Recommendation
		</h3>

		<p class="mt-2 text-sm leading-6 text-slate-600">
			Please restock the above equipment before the next laboratory
			session to avoid booking interruptions.
		</p>

	</div>

</div>