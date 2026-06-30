<script>
	import Header from '$lib/components/Header.svelte';
	import StudentNavbar from '$lib/components/StudentNavbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import EquipmentCard from '$lib/components/EquipmentCard.svelte';
	import { onMount } from 'svelte';
	import { protectRoute } from '$lib/utils/authGuard';

	import { db } from '$lib/firebase/firebase';

import {
	collection,
	getDocs,
	orderBy,
	query
} from 'firebase/firestore';

let search = $state('');
let category = $state('All');

	const categories = [
		'All',
		'Computer Science',
		'Physics',
		'Chemistry',
		'Botany',
		'Zoology'
	];

/** @type {any[]} */
let equipments = $state([]);

let loading = $state(false);

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

const filteredEquipments = $derived.by(() => {

	return equipments.filter((equipment) => {

const searchMatch =

	equipment.name
		.toLowerCase()
		.includes(search.toLowerCase()) ||

	equipment.id
		.toLowerCase()
		.includes(search.toLowerCase());

		const categoryMatch =
			category === 'All' ||
			equipment.department === category;

		return searchMatch && categoryMatch;
	});

});

onMount(() => {

	protectRoute();

	loadEquipments();

});
</script>

<div class="min-h-screen bg-slate-100">

	<Header showUserMenu={true} />

	<StudentNavbar />

	<main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">

		<!-- Title -->

		<div class="mb-8 text-center">

			<h1
				class="text-2xl font-bold text-blue-900 sm:text-3xl lg:text-4xl"
			>
				Equipment Module
			</h1>

			<p
				class="mt-2 text-sm text-slate-600 sm:text-base"
			>
				Browse and Book Laboratory Equipment
			</p>

		</div>

		<!-- Search & Filter -->

		<div
			class="mb-8 rounded-3xl bg-white p-4 shadow-lg sm:p-6"
		>

			<div
				class="grid gap-4 md:grid-cols-2"
			>

				<input
					bind:value={search}
					type="text"
					placeholder="Search Equipment..."
					class="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-600 focus:outline-none sm:text-base"
				/>

				<select
					bind:value={category}
					class="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-600 focus:outline-none sm:text-base"
				>

					{#each categories as item (item)}

						<option value={item}>
							{item}
						</option>

					{/each}

				</select>

			</div>

		</div>

		<!-- Equipment Count -->

		<div
			class="mb-6 text-center font-semibold text-slate-600 sm:text-right"
		>
			Total Equipment : {filteredEquipments.length}
		</div>

<!-- Equipment Grid -->

{#if loading}

<div
	class="rounded-3xl bg-white p-10 text-center shadow-lg"
>

	<p class="text-lg font-semibold text-slate-600">

		Loading Equipments...

	</p>

</div>

{:else if filteredEquipments.length === 0}

	<div
		class="rounded-3xl bg-white px-6 py-16 text-center shadow-lg"
	>
		<div class="text-5xl">
			📦
		</div>

		<h2
			class="mt-4 text-xl font-bold text-slate-700"
		>
			No Equipment Found
		</h2>

		<p
			class="mt-2 text-sm text-slate-500 sm:text-base"
		>
			Try searching with a different keyword or choose another category.
		</p>
	</div>

{:else}

	<div
		class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
	>

		{#each filteredEquipments as equipment (equipment.id)}

			<EquipmentCard
				{equipment}
			/>

		{/each}

	</div>

{/if}

	</main>

	<Footer />

</div>