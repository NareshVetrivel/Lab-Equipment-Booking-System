<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import AdminNavbar from '$lib/components/AdminNavbar.svelte';

	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	import { onMount } from 'svelte';
import { protectAdminRoute } from '$lib/utils/adminGuard';
	import { page } from '$app/state';

	import { db } from '$lib/firebase/firebase';

	import {
		doc,
		getDoc,
		updateDoc,
		serverTimestamp
	} from 'firebase/firestore';

	let imagePreview = $state('');

let loading = $state(false);

let errorMessage = $state('');

let successMessage = $state('');


		const returnDaysRegex =
	/^[1-9][0-9]?$/;

const departments = [

	'Computer Science',

	'Physics',

	'Chemistry',

	'Botany',

	'Zoology'

];

let equipment = $state({

	name: '',

	department: '',

	total: 0,

	available: 0,

	returnWithinDays: 0,

	description: '',

	image: ''

});

/**
 * @param {Event} event
 */
function handleImage(event) {

	const input =
		/** @type {HTMLInputElement} */
		(event.currentTarget);

	const file = input.files?.[0];

	if (!file) {
		return;
	}

	imagePreview =
		URL.createObjectURL(file);

}

async function loadEquipment() {

	const id = page.params.id ?? '';

	const document = await getDoc(
		doc(db, 'equipments', id)
	);

if (!document.exists()) {

	errorMessage = 'Equipment not found.';

	setTimeout(() => {

		goto(resolve('/edit-equipment'));

	}, 1200);

	return;

}

	const data = document.data();

equipment = {

	name: data.name,

	department: data.department,

	total: data.total,

	available: data.available,

	returnWithinDays:
		data.returnWithinDays ?? 0,

	description: data.description,

	image: data.image

};

	imagePreview = data.image;

}

async function updateEquipment() {

	try {

		loading = true;

		errorMessage = '';

		successMessage = '';

		if (!equipment.returnWithinDays) {

	loading = false;

	errorMessage =
		'Return within days is required.';

	return;

}

if (
	Number(equipment.available) >
	Number(equipment.total)
) {

	loading = false;

	errorMessage =
		'Available quantity cannot be greater than total quantity.';

	return;

}

if (
	!returnDaysRegex.test(
		String(equipment.returnWithinDays)
	)
) {

	loading = false;

	errorMessage =
		'Return days must be between 1 and 99.';

	return;

}

		const id = page.params.id ?? '';

		await updateDoc(
			doc(db, 'equipments', id),
			{
				name: equipment.name.trim(),
				department: equipment.department,
				total: Number(equipment.total),
available: Number(equipment.available),

returnWithinDays: Number(
	equipment.returnWithinDays
),

description: equipment.description.trim(),
				image: imagePreview,
				status:
					Number(equipment.available) > 0
						? 'Available'
						: 'Out of Stock',
				updatedAt: serverTimestamp()
			}
		);

		loading = false;

		successMessage = 'Equipment updated successfully.';

		setTimeout(() => {

			goto(resolve('/manage-equipment'));

		}, 1200);

	}
	catch (error) {

		loading = false;

		errorMessage =
			error instanceof Error
				? error.message
				: 'Something went wrong.';

	}

}

	function cancel() {
		goto(resolve('/manage-equipment'));
	}

	onMount(() => {
protectAdminRoute();
	loadEquipment();

});
</script>

<div class="min-h-screen bg-slate-100">

	<!-- Header -->

	<Header />

	<!-- Admin Navbar -->

	<AdminNavbar />

	<!-- Main -->

	<main class="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">

		<!-- Page Title -->

		<div class="mb-8">

			<h1 class="text-3xl font-bold text-blue-900">
				Edit Equipment
			</h1>

			<p class="mt-2 text-slate-600">
				Update laboratory equipment details.
			</p>

		</div>

{#if errorMessage}
<div class="mb-6 rounded-xl bg-red-100 p-3 text-center font-medium text-red-700">
	{errorMessage}
</div>
{/if}

{#if successMessage}
<div class="mb-6 rounded-xl bg-green-100 p-3 text-center font-medium text-green-700">
	{successMessage}
</div>
{/if}

		<!-- Form Card -->

		<div class="rounded-3xl bg-white p-8 shadow-lg">

			<div class="grid gap-6 md:grid-cols-2">

				<!-- Equipment Image -->

				<div class="md:col-span-2">

					<label class="mb-2 block font-semibold text-slate-700">
						Equipment Image
					</label>

					<input
						type="file"
						accept="image/*"
						class="w-full rounded-xl border border-slate-300 p-3"
						onchange={handleImage}
					/>

					{#if imagePreview}

						<div class="mt-4">

							<img
								src={imagePreview}
								alt="Equipment Preview"
								class="h-48 w-48 rounded-2xl border object-cover shadow-md"
							/>

						</div>

					{:else}

						<div
							class="mt-4 flex h-48 w-48 items-center justify-center rounded-2xl border bg-slate-100 text-7xl"
						>
							🧪
						</div>

					{/if}

				</div>

				<!-- Equipment Name -->

				<div>

					<label class="mb-2 block font-semibold text-slate-700">
						Equipment Name
					</label>

					<input
						type="text"
						bind:value={equipment.name}
						class="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-600"
					/>

				</div>

				<!-- Department -->

				<div>

					<label class="mb-2 block font-semibold text-slate-700">
						Department
					</label>

					<select
						bind:value={equipment.department}
						class="w-full rounded-xl border border-slate-300 p-3"
					>
<option value="">
	Select Department
</option>

{#each departments as department (department)}

	<option value={department}>
		{department}
	</option>

{/each}
					</select>

				</div>

				<!-- Total Quantity -->

				<div>

					<label class="mb-2 block font-semibold text-slate-700">
						Total Quantity
					</label>

					<input
						type="number"
						bind:value={equipment.total}
						class="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-600"
					/>

				</div>

				<!-- Available Quantity -->

				<div>

					<label class="mb-2 block font-semibold text-slate-700">
						Available Quantity
					</label>

					<input
						type="number"
						bind:value={equipment.available}
						class="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-600"
					/>

				</div>

<div>

	<label class="mb-2 block font-semibold text-slate-700">
		Return Within (Days)
	</label>

<input
	type="number"
	bind:value={equipment.returnWithinDays}
	min="1"
	max="99"
	oninput={(event) => {

		const target =
			/** @type {HTMLInputElement} */ (
				event.currentTarget
			);

		if (Number(target.value) > 99) {
			target.value = '99';
		}

		equipment.returnWithinDays =
			Number(target.value);

	}}
	class="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-600"
/>
</div>

				<!-- Description -->

				<div class="md:col-span-2">

					<label class="mb-2 block font-semibold text-slate-700">
						Description
					</label>

					<textarea
						rows="5"
						bind:value={equipment.description}
						class="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-600"
					></textarea>

				</div>

			</div>

			<!-- Action Buttons -->

			<div class="mt-8 flex justify-end gap-4">

				<button
					type="button"
					class="rounded-xl bg-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-400"
					onclick={cancel}
				>
					Cancel
				</button>

				<button
					type="button"
					class="rounded-xl bg-gradient-to-r from-blue-700 to-sky-500 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
					disabled={loading}
					onclick={updateEquipment}
				>
					{loading ? 'Updating...' : 'Update Equipment'}
				</button>

			</div>

		</div>

	</main>

	<!-- Footer -->

	<Footer />

</div>