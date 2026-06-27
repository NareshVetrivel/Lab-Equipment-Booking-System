<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import AdminNavbar from '$lib/components/AdminNavbar.svelte';

	import EquipmentToolbar from '$lib/components/EquipmentToolbar.svelte';
	import DepartmentFilter from '$lib/components/DepartmentFilter.svelte';
	import EquipmentTable from '$lib/components/EquipmentTable.svelte';

	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	let search = '';
	let selectedDepartment = 'All';

	/** @type {any[]} */
	let equipments = [
		{
			id: 'EQ001',
			name: 'Arduino Uno',
			department: 'Computer',
			available: 18,
			total: 20
		},
		{
			id: 'EQ002',
			name: 'Oscilloscope',
			department: 'Physics',
			available: 5,
			total: 8
		},
		{
			id: 'EQ003',
			name: 'Beaker Set',
			department: 'Chemistry',
			available: 40,
			total: 50
		},
		{
			id: 'EQ004',
			name: 'Microscope',
			department: 'Zoology',
			available: 6,
			total: 10
		},
		{
			id: 'EQ005',
			name: 'Plant Slides',
			department: 'Botany',
			available: 14,
			total: 20
		}
	];

	function filteredEquipments() {
		return equipments.filter((equipment) => {

			const matchesSearch =
				equipment.name.toLowerCase().includes(search.toLowerCase()) ||
				equipment.id.toLowerCase().includes(search.toLowerCase());

			const matchesDepartment =
				selectedDepartment === 'All'
					? true
					: equipment.department === selectedDepartment;

			return matchesSearch && matchesDepartment;
		});
	}

	/**
	 * @param {string} value
	 */
	function handleSearch(value) {
		search = value;
	}

	/**
	 * @param {string} department
	 */
	function handleDepartment(department) {
		selectedDepartment = department;
	}

function openAddPage() {
	goto(resolve('/add-equipment'));
}
</script>

<div class="min-h-screen bg-slate-100">

	<!-- Header -->

	<Header />

	<!-- Admin Navbar -->

	<AdminNavbar />

	<!-- Main -->

	<main class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

		<!-- Page Title -->

		<div class="mb-8">

			<h1 class="text-3xl font-bold text-blue-900">
				Manage Equipment
			</h1>

			<p class="mt-2 text-slate-600">
				Search, add, edit and delete laboratory equipment.
			</p>

		</div>

		<!-- Search + Add Button -->

		<div class="mb-6">

<EquipmentToolbar
	search={search}
	onSearch={handleSearch}
	showButton={false}
/>

		</div>

		<!-- Department Filter -->

		<div class="mb-6">

			<DepartmentFilter
				selectedDepartment={selectedDepartment}
				onSelect={handleDepartment}
			/>

		</div>

		<!-- Equipment Table -->

<EquipmentTable
	equipments={filteredEquipments()}
/>
<!-- Quick Actions -->

<div class="mt-8 rounded-3xl bg-white p-6 shadow-lg">

	<h2 class="mb-6 text-2xl font-bold text-blue-900">
		Quick Actions
	</h2>

	<div class="grid gap-6 md:grid-cols-3">

		<button
			type="button"
			class="rounded-2xl border border-green-200 bg-green-50 p-6 transition hover:bg-green-600 hover:text-white"
			onclick={openAddPage}
		>
			<div class="text-5xl">➕</div>

			<h3 class="mt-4 text-xl font-bold">
				Add Equipment
			</h3>

			<p class="mt-2 text-sm">
				Add a new equipment.
			</p>

		</button>

		<button
			type="button"
			class="rounded-2xl border border-blue-200 bg-blue-50 p-6 transition hover:bg-blue-700 hover:text-white"
			onclick={() => goto(resolve('/edit-equipment/EQ001'))}
		>
			<div class="text-5xl">✏️</div>

			<h3 class="mt-4 text-xl font-bold">
				Edit Equipment
			</h3>

			<p class="mt-2 text-sm">
				Open edit equipment page.
			</p>

		</button>

		<button
			type="button"
			class="rounded-2xl border border-red-200 bg-red-50 p-6 transition hover:bg-red-600 hover:text-white"
			onclick={() => goto(resolve('/delete-equipment'))}
		>
			<div class="text-5xl">🗑️</div>

			<h3 class="mt-4 text-xl font-bold">
				Delete Equipment
			</h3>

			<p class="mt-2 text-sm">
				Delete equipment permanently.
			</p>

		</button>

	</div>

</div>
	</main>

	<!-- Footer -->

	<Footer />

</div>