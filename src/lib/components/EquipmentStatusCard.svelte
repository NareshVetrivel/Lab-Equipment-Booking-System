<script>
	import { onMount } from 'svelte';

	import { db } from '$lib/firebase/firebase';

	import { collection, getDocs } from 'firebase/firestore';

	/** @type {any[]} */
	let equipmentStatus = $state([]);

	let summary = $state({
		total: 0,
		available: 0,
		inUse: 0,
		maintenance: 0,
		damaged: 0
	});

	onMount(async () => {
		const snapshot = await getDocs(collection(db, 'equipments'));

		const equipments = snapshot.docs.map(
			/** @param {any} doc */
			(doc) => doc.data()
		);

		summary.total = equipments.length;

		summary.available = equipments.reduce(
			(total, equipment) => total + Number(equipment.available ?? 0),
			0
		);

		summary.inUse = equipments.reduce(
			(total, equipment) =>
				total + (Number(equipment.total ?? 0) - Number(equipment.available ?? 0)),
			0
		);

		summary.maintenance = equipments.filter(
			/** @param {any} equipment */
			(equipment) => equipment.status === 'Maintenance'
		).length;

		summary.damaged = equipments.filter(
			/** @param {any} equipment */
			(equipment) => equipment.status === 'Damaged'
		).length;

		const totalItems = summary.available + summary.inUse;

		if (totalItems === 0) {
			equipmentStatus = [
				{
					id: 1,
					name: 'Available',
					count: summary.available,
					percentage: Math.round((summary.available * 100) / totalItems),
					color: 'bg-green-500'
				},

				{
					id: 2,
					name: 'In Use',
					count: summary.inUse,
					percentage: Math.round((summary.inUse * 100) / totalItems),
					color: 'bg-blue-600'
				},

				{
					id: 3,
					name: 'Maintenance',
					count: summary.maintenance,
					percentage: 0,
					color: 'bg-yellow-500'
				},

				{
					id: 4,
					name: 'Damaged',
					count: summary.damaged,
					percentage: 0,
					color: 'bg-red-500'
				}
			];

			return;
		}

		equipmentStatus = [
			{
				id: 1,
				name: 'Available',
				count: summary.available,
				percentage: totalItems === 0 ? 0 : Math.round((summary.available * 100) / totalItems),
				color: 'bg-green-500'
			},

			{
				id: 2,
				name: 'In Use',
				count: summary.inUse,
				percentage: totalItems === 0 ? 0 : Math.round((summary.inUse * 100) / totalItems),
				color: 'bg-blue-600'
			},

			{
				id: 3,
				name: 'Maintenance',
				count: summary.maintenance,
				percentage: totalItems === 0 ? 0 : Math.round((summary.maintenance * 100) / totalItems),
				color: 'bg-yellow-500'
			},

			{
				id: 4,
				name: 'Damaged',
				count: summary.damaged,
				percentage: totalItems === 0 ? 0 : Math.round((summary.damaged * 100) / totalItems),
				color: 'bg-red-500'
			}
		];
	});
</script>

<div class="rounded-3xl bg-white p-6 shadow-lg">
	<!-- Header -->

	<div class="mb-6">
		<h2 class="text-2xl font-bold text-blue-900">Equipment Status</h2>

		<p class="mt-1 text-slate-500">Current laboratory equipment availability.</p>
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

				<div class="h-3 overflow-hidden rounded-full bg-slate-200">
					<div
						class={`h-full rounded-full ${item.color}`}
						style={`width:${item.percentage}%`}
					></div>
				</div>
			</div>
		{/each}
	</div>

	<!-- Footer -->

	<div class="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-4">
		<h3 class="font-bold text-blue-900">Laboratory Summary</h3>

		<div class="mt-3 space-y-2 text-sm">
			<div class="flex justify-between">
				<span>Total Equipments</span>

				<span class="font-bold">
					{summary.total}
				</span>
			</div>

			<div class="flex justify-between">
				<span>Available Units</span>

				<span class="font-bold text-green-600">
					{summary.available}
				</span>
			</div>

			<div class="flex justify-between">
				<span>Issued Units</span>

				<span class="font-bold text-blue-600">
					{summary.inUse}
				</span>
			</div>
		</div>
	</div>
</div>
