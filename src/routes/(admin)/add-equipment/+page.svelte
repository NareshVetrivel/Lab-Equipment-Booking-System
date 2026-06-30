<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import AdminNavbar from '$lib/components/AdminNavbar.svelte';
	import { resolve } from '$app/paths';
    import { goto } from '$app/navigation';
	import { addEquipment } from '$lib/services/equipmentService';
import { onMount } from 'svelte';
import { protectAdminRoute } from '$lib/utils/adminGuard';


let imagePreview = $state('');

let loading = $state(false);

let errorMessage = $state('');

let successMessage = $state('');

let equipment = $state({
	name: '',
	department: '',
	total: '',
	returnWithinDays: '',
	description: ''
});

const departments = [
	'Computer Science',
	'Physics',
	'Chemistry',
	'Botany',
	'Zoology'
];

const equipmentNameRegex =
	/^[A-Za-z0-9\s()-]+$/;

const quantityRegex =
	/^[1-9][0-9]*$/;

const returnDaysRegex =
	/^[1-9][0-9]?$/;

/**
 * @param {File} file
 * @returns {Promise<string>}
 */
function compressImage(file) {
	return new Promise((resolve, reject) => {

		const reader = new FileReader();

		reader.onload = () => {

			const image = new Image();

			image.onload = () => {

				const canvas =
					document.createElement('canvas');

				const MAX_WIDTH = 400;
				const MAX_HEIGHT = 400;

				let width = image.width;
				let height = image.height;

				if (width > height) {

					if (width > MAX_WIDTH) {

						height *= MAX_WIDTH / width;

						width = MAX_WIDTH;

					}

				}
				else {

					if (height > MAX_HEIGHT) {

						width *= MAX_HEIGHT / height;

						height = MAX_HEIGHT;

					}

				}

				canvas.width = width;
				canvas.height = height;

				const context =
					canvas.getContext('2d');

				if (!context) {

					reject(
						new Error(
							'Canvas not supported.'
						)
					);

					return;

				}

				context.drawImage(
					image,
					0,
					0,
					width,
					height
				);

				resolve(
					canvas.toDataURL(
						'image/jpeg',
						0.6
					)
				);

			};

			image.onerror = reject;

			image.src =
				/** @type {string} */ (
					reader.result
				);

		};

		reader.onerror = reject;

		reader.readAsDataURL(file);

	});
}

/**
 * @param {Event} event
 */
async function handleImage(event) {

	const input =
		/** @type {HTMLInputElement} */
		(event.currentTarget);

	const file = input.files?.[0];

	if (!file) {
		return;
	}

	errorMessage = '';

	successMessage = '';

	const allowedTypes = [
		'image/jpeg',
		'image/jpg',
		'image/png'
	];

	if (!allowedTypes.includes(file.type)) {

		errorMessage =
			'Only JPG, JPEG and PNG images are allowed.';

		return;

	}

	if (file.size > 2 * 1024 * 1024) {

		errorMessage =
			'Image size should not exceed 2 MB.';

		return;

	}

	imagePreview =
		await compressImage(file);

}

async function saveEquipment() {

	errorMessage = '';

	successMessage = '';

	if (!imagePreview) {
		errorMessage = 'Please upload equipment image.';
		return;
	}

	equipment.name = equipment.name.trim();

	if (!equipment.name) {
		errorMessage = 'Equipment name is required.';
		return;
	}

	if (!equipmentNameRegex.test(equipment.name)) {
		errorMessage = 'Invalid equipment name.';
		return;
	}

	if (!equipment.department) {
		errorMessage = 'Select department.';
		return;
	}

	if (!equipment.total) {
		errorMessage = 'Quantity is required.';
		return;
	}

	if (!quantityRegex.test(String(equipment.total))) {
		errorMessage = 'Invalid quantity.';
		return;
	}


	if (!equipment.returnWithinDays) {
	errorMessage = 'Return within days is required.';
	return;
}

if (
	!returnDaysRegex.test(
		String(equipment.returnWithinDays)
	)
) {
	errorMessage =
		'Return days must be between 1 and 99.';
	return;
}

	if (!equipment.description.trim()) {
		errorMessage = 'Description is required.';
		return;
	}

	loading = true;

const result = await addEquipment({

	name: equipment.name,

	department: equipment.department,

	total: equipment.total,

	returnWithinDays: equipment.returnWithinDays,

	description: equipment.description,

	image: imagePreview

});

	loading = false;

	if (result.success) {

		successMessage =
			'Equipment added successfully.';

		setTimeout(() => {

			goto(resolve('/manage-equipment'));

		}, 1200);

		return;
	}

	switch (result.message) {

		case 'Equipment already exists.':
			errorMessage =
				'Equipment already exists.';
			break;

		default:
	errorMessage =
		result.message ?? 'Something went wrong.';

	}

}

function cancel() {
	goto(resolve('/manage-equipment'));
}

onMount(() => {
	protectAdminRoute();
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
				Add Equipment
			</h1>

			<p class="mt-2 text-slate-600">
				Add a new laboratory equipment to the inventory.
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
						disabled={loading}
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
						placeholder="Enter Equipment Name"
						disabled={loading}
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
	disabled={loading}
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
						placeholder="Enter Total Quantity"
						disabled={loading}
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
	placeholder="Enter Return Days"
	min="1"
	max="99"
	disabled={loading}
	oninput={(e) => {

		const target =
			/** @type {HTMLInputElement} */ (e.target);

		if (Number(target.value) > 99) {
			target.value = '99';
		}

		equipment.returnWithinDays = target.value;

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
						placeholder="Enter Equipment Description"
						disabled={loading}
						class="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-600"
					></textarea>

				</div>

			</div>

			<!-- Buttons -->

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
					onclick={saveEquipment}
				>
					{loading ? 'Saving...' : 'Save Equipment'}
				</button>

			</div>

		</div>

	</main>

	<!-- Footer -->

	<Footer />

</div>