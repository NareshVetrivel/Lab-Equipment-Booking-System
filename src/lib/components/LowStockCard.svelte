<script>
	import { onMount } from 'svelte';

	import { db } from '$lib/firebase/firebase';

	import { collection, getDocs } from 'firebase/firestore';

	/** @type {any[]} */
	let lowStockItems = $state([]);

	onMount(async () => {
		const snapshot = await getDocs(collection(db, 'equipments'));

		lowStockItems = snapshot.docs
			.map(
				/** @param {any} doc */
				(doc) => ({
					id: doc.id,
					...doc.data()
				})
			)
			.filter(
				/** @param {any} equipment */
				(equipment) => Number(equipment.available ?? 0) <= 5
			)
			.sort((a, b) => Number(a.available ?? 0) - Number(b.available ?? 0));
	});
</script>

<div class="rounded-3xl bg-white p-6 shadow-lg">
	<!-- Header -->

	<div class="mb-6 flex items-center justify-between">
		<div>
			<h2 class="text-2xl font-bold text-blue-900">Low Stock Alerts</h2>

			<p class="mt-1 text-slate-500">Equipment that needs immediate attention.</p>
		</div>

		<div class="rounded-full bg-red-100 px-4 py-2 text-sm font-bold text-red-600">
			{lowStockItems.length} Alerts
		</div>
	</div>

	<!-- Scroll Area -->

	<!-- Scroll Area -->

	<div class="h-[370px] space-y-4 overflow-y-auto pr-2" style="scrollbar-width: thin;">
		{#if lowStockItems.length}
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

						<span class="rounded-full bg-red-100 px-3 py-1 text-sm font-bold text-red-600">
							Only
							{item.available}
							Left
						</span>
					</div>
				</div>
			{/each}
		{:else}
			<div class="flex h-full flex-col items-center justify-center text-slate-400">
				<div class="text-6xl">✅</div>

				<p class="mt-4 font-semibold">No Low Stock Equipments</p>
			</div>
		{/if}
	</div>

	<!-- Footer -->

	<div class="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4">
		<h3 class="font-bold text-red-700">Recommendation</h3>

		<p class="mt-2 text-sm leading-6 text-slate-600">
			{#if lowStockItems.length}
				Please restock the listed equipment before approving new booking requests.
			{:else}
				All laboratory equipment currently has sufficient stock.
			{/if}
		</p>
	</div>
</div>
