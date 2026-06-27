<script>
	let {
		isOpen = false,
		mode = 'add',
		equipment = {},
		onClose = () => {},
		onSave = () => {}
	} = $props();

/** @type {{
	id: string;
	name: string;
	department: string;
	total: string | number;
	available: string | number;
	image: File | null;
}} */
let form = {
	id: '',
	name: '',
	department: 'Computer',
	total: '',
	available: '',
	image: null
};

	$effect(() => {
		if (mode === 'edit' && equipment) {
			form = {
				id: equipment.id ?? '',
				name: equipment.name ?? '',
				department: equipment.department ?? 'Computer',
				total: equipment.total ?? '',
				available: equipment.available ?? '',
				image: equipment.image ?? null
			};
		}

		if (mode === 'add') {
			form = {
				id: '',
				name: '',
				department: 'Computer',
				total: '',
				available: '',
				image: null
			};
		}
	});

	/**
	 * @param {Event} event
	 */
	function handleImage(event) {
		const input = /** @type {HTMLInputElement} */ (event.currentTarget);

		if (input.files && input.files.length > 0) {
			form.image = input.files[0];
		}
	}

	function submit() {
		onSave(form);
	}
</script>

{#if isOpen}

<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

	<div class="w-full max-w-2xl rounded-3xl bg-white shadow-2xl">

		<!-- Header -->

		<div class="flex items-center justify-between border-b p-6">

			<h2 class="text-2xl font-bold text-blue-900">
				{mode === 'add' ? 'Add Equipment' : 'Edit Equipment'}
			</h2>

			<button
				type="button"
				class="text-3xl text-slate-500 hover:text-red-600"
				onclick={() => onClose()}
			>
				×
			</button>

		</div>

		<!-- Form -->

		<div class="grid gap-5 p-6 md:grid-cols-2">

			<div>

				<label class="mb-2 block font-semibold">
					Equipment ID
				</label>

				<input
					bind:value={form.id}
					type="text"
					class="w-full rounded-xl border border-slate-300 p-3"
				/>

			</div>

			<div>

				<label class="mb-2 block font-semibold">
					Equipment Name
				</label>

				<input
					bind:value={form.name}
					type="text"
					class="w-full rounded-xl border border-slate-300 p-3"
				/>

			</div>

			<div>

				<label class="mb-2 block font-semibold">
					Department
				</label>

				<select
					bind:value={form.department}
					class="w-full rounded-xl border border-slate-300 p-3"
				>
					<option>Physics</option>
					<option>Chemistry</option>
					<option>Botany</option>
					<option>Zoology</option>
					<option>Computer</option>
				</select>

			</div>

			<div>

				<label class="mb-2 block font-semibold">
					Total Quantity
				</label>

				<input
					bind:value={form.total}
					type="number"
					class="w-full rounded-xl border border-slate-300 p-3"
				/>

			</div>

			<div>

				<label class="mb-2 block font-semibold">
					Available Quantity
				</label>

				<input
					bind:value={form.available}
					type="number"
					class="w-full rounded-xl border border-slate-300 p-3"
				/>

			</div>

			<div>

				<label class="mb-2 block font-semibold">
					Equipment Image
				</label>

				<input
					type="file"
					accept="image/*"
					class="w-full rounded-xl border border-slate-300 p-3"
					onchange={handleImage}
				/>

				{#if form.image}

					<p class="mt-2 text-sm text-green-600">
						{form.image.name}
					</p>

				{/if}

			</div>

		</div>

		<!-- Footer -->

		<div class="flex justify-end gap-4 border-t bg-slate-50 p-6">

			<button
				type="button"
				class="rounded-xl bg-slate-200 px-6 py-3 font-semibold hover:bg-slate-300"
				onclick={() => onClose()}
			>
				Cancel
			</button>

			<button
				type="button"
				class="rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800"
				onclick={submit}
			>
				{mode === 'add' ? 'Save Equipment' : 'Update Equipment'}
			</button>

		</div>

	</div>

</div>

{/if}