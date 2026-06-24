<script>
	import Header from '$lib/components/Header.svelte';
	import StudentNavbar from '$lib/components/StudentNavbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import EquipmentCard from '$lib/components/EquipmentCard.svelte';

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

	const equipments = [

		{
			id: 1,
			name: 'Arduino Uno',
			department: 'Computer Science',
			quantity: 10,
			image: 'https://picsum.photos/300/200?1'
		},

		{
			id: 2,
			name: 'Raspberry Pi',
			department: 'Computer Science',
			quantity: 7,
			image: 'https://picsum.photos/300/200?2'
		},

		{
			id: 3,
			name: 'Breadboard',
			department: 'Computer Science',
			quantity: 2,
			image: 'https://picsum.photos/300/200?3'
		},

		{
			id: 4,
			name: 'NodeMCU',
			department: 'Computer Science',
			quantity: 9,
			image: 'https://picsum.photos/300/200?4'
		},

		{
			id: 5,
			name: 'Digital Multimeter',
			department: 'Physics',
			quantity: 8,
			image: 'https://picsum.photos/300/200?5'
		},

		{
			id: 6,
			name: 'Voltmeter',
			department: 'Physics',
			quantity: 5,
			image: 'https://picsum.photos/300/200?6'
		},

		{
			id: 7,
			name: 'Ammeter',
			department: 'Physics',
			quantity: 2,
			image: 'https://picsum.photos/300/200?7'
		},

		{
			id: 8,
			name: 'Spectrometer',
			department: 'Physics',
			quantity: 9,
			image: 'https://picsum.photos/300/200?8'
		},

		{
			id: 9,
			name: 'Beaker Set',
			department: 'Chemistry',
			quantity: 10,
			image: 'https://picsum.photos/300/200?9'
		},

		{
			id: 10,
			name: 'Conical Flask',
			department: 'Chemistry',
			quantity: 6,
			image: 'https://picsum.photos/300/200?10'
		},

		{
			id: 11,
			name: 'Microscope',
			department: 'Botany',
			quantity: 8,
			image: 'https://picsum.photos/300/200?11'
		},

		{
			id: 12,
			name: 'Plant Cell Model',
			department: 'Botany',
			quantity: 3,
			image: 'https://picsum.photos/300/200?12'
		},

		{
			id: 13,
			name: 'Dissection Tray',
			department: 'Zoology',
			quantity: 7,
			image: 'https://picsum.photos/300/200?13'
		},

		{
			id: 14,
			name: 'DNA Model',
			department: 'Zoology',
			quantity: 2,
			image: 'https://picsum.photos/300/200?14'
		}

	];

const filteredEquipments = $derived.by(() => {

	return equipments.filter((equipment) => {

		const searchMatch = equipment.name
			.toLowerCase()
			.includes(search.toLowerCase());

		const categoryMatch =
			category === 'All' ||
			equipment.department === category;

		return searchMatch && categoryMatch;
	});

});
</script>

<div class="min-h-screen bg-slate-100">

	<Header />

	<StudentNavbar />

	<main class="mx-auto max-w-7xl px-4 py-8">

		<!-- Title -->

		<div class="mb-8 text-center">

			<h1
				class="text-4xl font-bold text-blue-900"
			>
				Equipment Module
			</h1>

			<p
				class="mt-2 text-slate-600"
			>
				Browse and Book Laboratory Equipment
			</p>

		</div>

		<!-- Search & Filter -->

		<div
			class="mb-8 rounded-3xl bg-white p-6 shadow-lg"
		>

			<div
				class="grid gap-4 md:grid-cols-2"
			>

				<input
					bind:value={search}
					type="text"
					placeholder="Search Equipment..."
					class="rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-600 focus:outline-none"
				/>

				<select
					bind:value={category}
					class="rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-600 focus:outline-none"
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
			class="mb-6 text-right font-semibold text-slate-600"
		>
			Total Equipment : {filteredEquipments.length}
		</div>

		<!-- Equipment Grid -->

		<div
			class="grid grid-cols-2 gap-6 lg:grid-cols-4"
		>

			{#each filteredEquipments as equipment (equipment.id)}

				<EquipmentCard
					{equipment}
				/>

			{/each}

		</div>

	</main>

	<Footer />

</div>