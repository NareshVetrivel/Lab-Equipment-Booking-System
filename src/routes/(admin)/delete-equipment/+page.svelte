<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import AdminNavbar from '$lib/components/AdminNavbar.svelte';

	import EquipmentToolbar from '$lib/components/EquipmentToolbar.svelte';
	import DepartmentFilter from '$lib/components/DepartmentFilter.svelte';
	import DeleteEquipmentCard from '$lib/components/DeleteEquipmentCard.svelte';
	import DeleteConfirmationModal from '$lib/components/DeleteConfirmationModal.svelte';

import { onMount } from 'svelte';
import { protectAdminRoute } from '$lib/utils/adminGuard';
import { db } from '$lib/firebase/firebase';

import {
	collection,
	getDocs,
	query,
	orderBy,
	doc,
	deleteDoc
} from 'firebase/firestore';

	let search = $state('');
	let selectedDepartment = $state('All');

	let showDeleteModal = $state(false);

	/** @type {any} */
	let selectedEquipment = $state({});

/** @type {any[]} */
let equipments = $state([]);

let loading = $state(false);

let successMessage = $state('');

let errorMessage = $state('');

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

	async function loadEquipments() {

	try {

		loading = true;

		const snapshot = await getDocs(

			query(
				collection(db, 'equipments'),
				orderBy('createdAt', 'desc')
			)

		);

		equipments = snapshot.docs.map((doc) => ({

			id: doc.id,

			...doc.data()

		}));

	}
	catch (error) {

		console.error(error);

		errorMessage = 'Failed to load equipments.';

	}
	finally {

		loading = false;

	}

}

onMount(() => {
protectAdminRoute();
	loadEquipments();

});

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
async function deleteEquipment(equipment) {

	try {

		await deleteDoc(

			doc(db, 'equipments', equipment.id)

		);

		equipments = equipments.filter(

			(item) => item.id !== equipment.id

		);

		successMessage =
			'Equipment deleted successfully.';

		showDeleteModal = false;

	}
	catch (error) {

		console.error(error);

		errorMessage =
			'Failed to delete equipment.';

		showDeleteModal = false;

	}

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

{#if errorMessage}

<div
	class="mb-6 rounded-xl bg-red-100 p-3 text-center font-medium text-red-700"
>
	{errorMessage}
</div>

{/if}

{#if successMessage}

<div
	class="mb-6 rounded-xl bg-green-100 p-3 text-center font-medium text-green-700"
>
	{successMessage}
</div>

{/if}

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

{#if loading}

<div class="rounded-3xl bg-white p-10 text-center shadow-lg">

	<p class="text-lg font-semibold text-slate-600">

		Loading equipments...

	</p>

</div>

{:else}

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