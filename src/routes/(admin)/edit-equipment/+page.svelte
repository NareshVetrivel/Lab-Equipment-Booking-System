<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import AdminNavbar from '$lib/components/AdminNavbar.svelte';

	import EquipmentToolbar from '$lib/components/EquipmentToolbar.svelte';
	import DepartmentFilter from '$lib/components/DepartmentFilter.svelte';
	import EditEquipmentCard from '$lib/components/EditEquipmentCard.svelte';

	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

import { onMount } from 'svelte';
import { protectAdminRoute } from '$lib/utils/adminGuard';
import { db } from '$lib/firebase/firebase';

import {
	collection,
	getDocs,
	orderBy,
	query
} from 'firebase/firestore';

let search = $state('');
let selectedDepartment = $state('All');

/** @type {any[]} */
let equipments = $state([]);

let loading = $state(false);

	function filteredEquipments() {
		return equipments.filter((equipment) => {
			const matchesSearch =
				equipment.name.toLowerCase().includes(search.toLowerCase()) ||
				equipment.department.toLowerCase().includes(search.toLowerCase());

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

		equipments = [];

	}
	finally {

		loading = false;

	}

}

	/**
	 * @param {any} equipment
	 */
	function openEdit(equipment) {
		goto(resolve(`/edit-equipment/${equipment.id}`));
	}

	onMount(() => {
protectAdminRoute();
	loadEquipments();

});
</script>

<div class="min-h-screen bg-slate-100">

	<!-- Header -->

	<Header />

	<!-- Admin Navbar -->

	<AdminNavbar />

	<!-- Main -->

	<main class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

		<!-- Page Header -->

		<div class="mb-8">

			<h1 class="text-3xl font-bold text-blue-900">
				Edit Equipment
			</h1>

			<p class="mt-2 text-slate-600">
				Select an equipment to edit its information.
			</p>

		</div>

		<!-- Search -->

		<div class="mb-6">

			<EquipmentToolbar
				search={search}
				onSearch={handleSearch}
				showButton={false}
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

{#if loading}

<div class="rounded-3xl bg-white p-10 text-center shadow-lg">

	<p class="text-lg font-semibold text-slate-600">
		Loading equipments...
	</p>

</div>

{:else}

		{#if filteredEquipments().length > 0}

			<div class="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

				{#each filteredEquipments() as equipment (equipment.id)}

					<EditEquipmentCard
						equipment={equipment}
						onEdit={openEdit}
					/>

				{/each}

			</div>

		{:else}

			<div
				class="rounded-3xl bg-white px-8 py-20 text-center shadow-lg"
			>

				<div class="text-7xl">
					🧪
				</div>

				<h2 class="mt-6 text-3xl font-bold text-slate-700">
					No Equipment Found
				</h2>

				<p class="mt-3 text-slate-500">
					No equipment matches your search or selected department.
				</p>

			</div>

		{/if}
{/if}
	</main>

	<!-- Footer -->

	<Footer />

</div>