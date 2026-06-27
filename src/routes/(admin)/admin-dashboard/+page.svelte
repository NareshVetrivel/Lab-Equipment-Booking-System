<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import AdminNavbar from '$lib/components/AdminNavbar.svelte';

	import StatCard from '$lib/components/StatCard.svelte';
	import EquipmentStatusCard from '$lib/components/EquipmentStatusCard.svelte';
	import LowStockCard from '$lib/components/LowStockCard.svelte';

	const today = new Date();

	const currentDate = today.toLocaleDateString('en-IN', {
		day: '2-digit',
		month: 'long',
		year: 'numeric'
	});

	const currentDay = today.toLocaleDateString('en-IN', {
		weekday: 'long'
	});

	const stats = [
		{
			title: 'Total Equipments',
			value: 128,
			icon: '🧪',
			color: 'blue'
		},
		{
			title: 'Balance Equipments',
			value: 110,
			icon: '📦',
			color: 'green'
		},
		{
			title: 'Students',
			value: 540,
			icon: '🎓',
			color: 'blue'
		},
		{
			title: 'Pending Requests',
			value: 18,
			icon: '📋',
			color: 'orange'
		}
	];
</script>

<div class="min-h-screen bg-slate-100">

	<Header />

	<AdminNavbar />

	<main class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

		<!-- Welcome Card -->

		<div class="mb-8 rounded-3xl bg-white p-6 shadow-lg">

			<div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

				<div>

					<h2 class="text-3xl font-bold text-blue-900">
						Welcome, Administrator
					</h2>

					<p class="mt-2 text-slate-600">
						Manage laboratory equipment, monitor bookings and maintain the laboratory efficiently.
					</p>

				</div>

				<div
					class="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-4 text-center shadow-sm"
				>

					<p class="text-xl font-bold text-slate-800">
						{currentDate}
					</p>

					<p class="text-slate-500">
						{currentDay}
					</p>

				</div>

			</div>

		</div>

		<!-- Statistics -->

		<div class="mb-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

			{#each stats as stat (stat.title)}

				<StatCard
					title={stat.title}
					value={stat.value}
					icon={stat.icon}
					color={stat.color}
				/>

			{/each}

		</div>

		<!-- Equipment Status + Low Stock -->

		<div class="grid gap-6 lg:grid-cols-2">

			<EquipmentStatusCard />

			<LowStockCard />

		</div>
<!-- Rules of Laboratory -->

<div class="mt-8 rounded-3xl bg-white p-6 shadow-lg">

	<div class="mb-6">

		<h2 class="text-2xl font-bold text-blue-900">
			Rules of Laboratory (For Admin)
		</h2>

		<p class="mt-1 text-slate-500">
			Follow these guidelines to ensure proper laboratory equipment management.
		</p>

	</div>

	<div class="space-y-4">

		<div class="rounded-2xl border-l-4 border-blue-600 bg-blue-50 p-4">
			<p class="font-medium text-slate-700">
				1. Verify every booking request before approving equipment.
			</p>
		</div>

		<div class="rounded-2xl border-l-4 border-green-600 bg-green-50 p-4">
			<p class="font-medium text-slate-700">
				2. Ensure equipment availability before assigning it to students.
			</p>
		</div>

		<div class="rounded-2xl border-l-4 border-yellow-500 bg-yellow-50 p-4">
			<p class="font-medium text-slate-700">
				3. Update equipment quantity immediately after issue or return.
			</p>
		</div>

		<div class="rounded-2xl border-l-4 border-red-600 bg-red-50 p-4">
			<p class="font-medium text-slate-700">
				4. Record damaged or missing equipment without delay.
			</p>
		</div>

		<div class="rounded-2xl border-l-4 border-purple-600 bg-purple-50 p-4">
			<p class="font-medium text-slate-700">
				5. Inspect returned equipment before marking the booking as completed.
			</p>
		</div>

		<div class="rounded-2xl border-l-4 border-cyan-600 bg-cyan-50 p-4">
			<p class="font-medium text-slate-700">
				6. Maintain accurate inventory records and review low-stock alerts regularly.
			</p>
		</div>

	</div>

</div>

	</main>

	<Footer />

</div>