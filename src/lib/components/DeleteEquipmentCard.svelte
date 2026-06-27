<script>
	let {
		equipment = {},
		onDelete = () => {}
	} = $props();
</script>

<div
	class="overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
>
	<!-- Equipment Image -->

	<div class="h-56 bg-slate-100">

		{#if equipment.image}

			<img
				src={equipment.image}
				alt={equipment.name}
				class="h-full w-full object-cover"
			/>

		{:else}

			<div
				class="flex h-full items-center justify-center text-7xl text-slate-400"
			>
				🧪
			</div>

		{/if}

	</div>

	<!-- Details -->

	<div class="space-y-4 p-6">

		<h2 class="text-2xl font-bold text-blue-900">
			{equipment.name}
		</h2>

		<div
			class="inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700"
		>
			{equipment.department}
		</div>

		<p class="min-h-20 text-slate-600">
			{equipment.description}
		</p>

		<div class="grid grid-cols-2 gap-4">

			<div
				class="rounded-xl bg-slate-100 p-3 text-center"
			>

				<p class="text-sm text-slate-500">
					Available
				</p>

				<p class="text-xl font-bold text-green-600">
					{equipment.available}
				</p>

			</div>

			<div
				class="rounded-xl bg-slate-100 p-3 text-center"
			>

				<p class="text-sm text-slate-500">
					Total
				</p>

				<p class="text-xl font-bold text-blue-700">
					{equipment.total}
				</p>

			</div>

		</div>

		<button
			type="button"
			class="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-red-600 px-6 py-4 text-lg font-bold text-white transition-all duration-300 hover:bg-red-700 hover:shadow-lg"
			onclick={() => onDelete(equipment)}
		>
			🗑️ Delete Equipment
		</button>

	</div>

</div>