<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import AdminNavbar from '$lib/components/AdminNavbar.svelte';
	import { resolve } from '$app/paths';
    import { goto } from '$app/navigation';

/** @type {File | null} */
let image = $state(null);

let imagePreview = $state('');

let equipment = $state({
	name: '',
	department: '',
	total: '',
	description: ''
});

	/**
	 * @param {Event} event
	 */
	function handleImage(event) {
		const input = /** @type {HTMLInputElement} */ (event.currentTarget);

		if (input.files && input.files.length > 0) {
			image = input.files[0];
			imagePreview = URL.createObjectURL(image);
		}
	}

function saveEquipment() {
	console.log({
		...equipment,
		image
	});

	alert('Equipment Added Successfully');

	goto(resolve('/manage-equipment'));
}

function cancel() {
	goto(resolve('/manage-equipment'));
}
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

						<option>Computer</option>
						<option>Physics</option>
						<option>Chemistry</option>
						<option>Botany</option>
						<option>Zoology</option>

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
					onclick={saveEquipment}
				>
					Save Equipment
				</button>

			</div>

		</div>

	</main>

	<!-- Footer -->

	<Footer />

</div>