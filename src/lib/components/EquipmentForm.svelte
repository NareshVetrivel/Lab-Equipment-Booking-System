<script>
	let {
		formData,
		imageName = '',
		onImageChange = () => {}
	} = $props();
</script>

<div class="grid gap-5 md:grid-cols-2">

	<!-- Equipment Image -->

	<div class="md:col-span-2">

		<label class="mb-2 block font-semibold text-slate-700">
			Equipment Image
		</label>

		<input
			type="file"
			accept="image/*"
			class="w-full rounded-xl border border-slate-300 p-3"
			onchange={(event) => onImageChange(event)}
		/>

		{#if imageName}

			<p class="mt-2 text-sm text-green-600">
				Selected: {imageName}
			</p>

		{/if}

	</div>

	<!-- Equipment Name -->

	<div>

		<label class="mb-2 block font-semibold">
			Equipment Name
		</label>

		<input
			type="text"
			bind:value={formData.name}
			class="w-full rounded-xl border border-slate-300 p-3"
		/>

	</div>

	<!-- Equipment ID -->

	<div>

		<label class="mb-2 block font-semibold">
			Equipment ID
		</label>

		<input
			type="text"
			bind:value={formData.id}
			class="w-full rounded-xl border border-slate-300 p-3"
		/>

	</div>

	<!-- Category -->

	<div>

		<label class="mb-2 block font-semibold">
			Category
		</label>

		<input
			type="text"
			bind:value={formData.category}
			class="w-full rounded-xl border border-slate-300 p-3"
		/>

	</div>

	<!-- Laboratory -->

	<div>

		<label class="mb-2 block font-semibold">
			Laboratory
		</label>

		<input
			type="text"
			bind:value={formData.laboratory}
			class="w-full rounded-xl border border-slate-300 p-3"
		/>

	</div>

	<!-- Total Quantity -->

	<div>

		<label class="mb-2 block font-semibold">
			Total Quantity
		</label>

		<input
			type="number"
			bind:value={formData.totalQuantity}
			class="w-full rounded-xl border border-slate-300 p-3"
		/>

	</div>

	<!-- Available Quantity -->

	<div>

		<label class="mb-2 block font-semibold">
			Available Quantity
		</label>

		<input
			type="number"
			bind:value={formData.availableQuantity}
			class="w-full rounded-xl border border-slate-300 p-3"
		/>

	</div>

	<!-- Condition -->

	<div>

		<label class="mb-2 block font-semibold">
			Condition
		</label>

		<select
			bind:value={formData.condition}
			class="w-full rounded-xl border border-slate-300 p-3"
		>

			<option>Available</option>
			<option>Maintenance</option>
			<option>Damaged</option>

		</select>

	</div>

	<!-- Description -->

	<div class="md:col-span-2">

		<label class="mb-2 block font-semibold">
			Description
		</label>

		<textarea
			rows="4"
			bind:value={formData.description}
			class="w-full rounded-xl border border-slate-300 p-3"
		></textarea>

	</div>

</div>