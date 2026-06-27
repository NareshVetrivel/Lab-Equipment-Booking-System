<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import AdminNavbar from '$lib/components/AdminNavbar.svelte';

	import EquipmentToolbar from '$lib/components/EquipmentToolbar.svelte';
	import DepartmentFilter from '$lib/components/DepartmentFilter.svelte';
	import DeleteEquipmentCard from '$lib/components/DeleteEquipmentCard.svelte';
	import DeleteConfirmationModal from '$lib/components/DeleteConfirmationModal.svelte';

	let search = $state('');
	let selectedDepartment = $state('All');

	let showDeleteModal = $state(false);

	/** @type {any} */
	let selectedEquipment = $state({});

	let equipments = $state([
		{
			id: 'EQ001',
			name: 'Arduino Uno',
			department: 'Computer',
			total: 20,
			available: 18,
			description: 'Microcontroller development board.',
			image: ''
		},
		{
			id: 'EQ002',
			name: 'Oscilloscope',
			department: 'Physics',
			total: 8,
			available: 5,
			description: 'Electronic signal measuring instrument.',
			image: ''
		},
		{
			id: 'EQ003',
			name: 'Beaker Set',
			department: 'Chemistry',
			total: 50,
			available: 40,
			description: 'Glass beaker set for chemistry experiments.',
			image: ''
		},
		{
			id: 'EQ004',
			name: 'Microscope',
			department: 'Zoology',
			total: 10,
			available: 6,
			description: 'Biological microscope for laboratory.',
			image: ''
		},
		{
			id: 'EQ005',
			name: 'Plant Slides',
			department: 'Botany',
			total: 20,
			available: 14,
			description: 'Prepared plant specimen slides.',
			image: ''
		}
	]);

	function filteredEquipments() {
		return equipments.filter((equipment) => {

			const matchesSearch =
				equipment.name.toLowerCase().includes(search.toLowerCase());

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

	/**
	 * @param {any} equipment
	 */
	function openDeleteModal(equipment) {
		selectedEquipment = equipment;
		showDeleteModal = true;
	}

	function closeDeleteModal() {
		showDeleteModal = false;
	}

	/**
	 * @param {any} equipment
	 */
	function deleteEquipment(equipment) {

		equipments = equipments.filter(
			(item) => item.id !== equipment.id
		);

		showDeleteModal = false;
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
				Delete Equipment
			</h1>

			<p class="mt-2 text-slate-600">
				Permanently remove laboratory equipment from the inventory.
			</p>

		</div>

		<!-- Search -->

		<div class="mb-6">

			<EquipmentToolbar
				search={search}
				onSearch={handleSearch}
				buttonText=""
				onAdd={() => {}}
			/>

		</div>

		<!-- Department Filter -->

		<div class="mb-8">

			<DepartmentFilter
				selectedDepartment={selectedDepartment}
				onSelect={handleDepartment}
			/>

		</div>

		<!-- Equipment Cards -->

		{#if filteredEquipments().length > 0}

			<div class="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">

				{#each filteredEquipments() as equipment (equipment.id)}

					<DeleteEquipmentCard
						{equipment}
						onDelete={openDeleteModal}
					/>

				{/each}

			</div>

		{:else}

			<div class="rounded-3xl bg-white p-16 text-center shadow-lg">

				<div class="text-7xl">
					📦
				</div>

				<h2 class="mt-6 text-3xl font-bold text-slate-700">
					No Equipment Found
				</h2>

				<p class="mt-3 text-slate-500">
					No equipment matches the selected search or department.
				</p>

			</div>

		{/if}

	</main>

	<!-- Delete Confirmation Modal -->

	<DeleteConfirmationModal
		isOpen={showDeleteModal}
		equipment={selectedEquipment}
		onClose={closeDeleteModal}
		onConfirm={deleteEquipment}
	/>

	<!-- Footer -->

	<Footer />

</div>