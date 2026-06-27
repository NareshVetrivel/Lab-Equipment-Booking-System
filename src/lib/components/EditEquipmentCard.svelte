<script>
	let {
		equipment,
		onEdit = () => {}
	} = $props();
</script>

<div
	class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
>
	<!-- Equipment Image -->

	<div class="h-56 overflow-hidden bg-slate-100">

		{#if equipment.image}

			<img
				src={equipment.image}
				alt={equipment.name}
				class="h-full w-full object-cover"
			/>

		{:else}

			<div
				class="flex h-full items-center justify-center text-7xl"
			>
				🧪
			</div>

		{/if}

	</div>

	<!-- Details -->

	<div class="space-y-4 p-6">

		<div>

			<h2 class="text-2xl font-bold text-blue-900">
				{equipment.name}
			</h2>

			<p class="mt-1 text-sm text-slate-500">
				Equipment ID : {equipment.id}
			</p>

		</div>

		<div>

			<p class="text-sm font-semibold text-slate-500">
				Department
			</p>

			<p class="text-lg font-medium text-slate-800">
				{equipment.department}
			</p>

		</div>

		<div>

			<p class="text-sm font-semibold text-slate-500">
				Available Quantity
			</p>

			<p class="text-lg font-medium text-green-600">
				{equipment.available} / {equipment.total}
			</p>

		</div>

		<div>

			<p class="text-sm font-semibold text-slate-500">
				Description
			</p>

			<p class="text-slate-700">
				{equipment.description}
			</p>

		</div>

		<!-- Edit Button -->

		<button
			type="button"
			class="mt-4 w-full rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white transition hover:bg-blue-800"
			onclick={() => onEdit(equipment)}
		>
			✏️ Edit Equipment
		</button>

	</div>

</div>