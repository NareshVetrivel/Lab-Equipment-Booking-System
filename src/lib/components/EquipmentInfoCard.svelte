<script>
	let { equipment, getStatusColor } = $props();
</script>

<div class="rounded-3xl bg-white p-5 shadow-lg sm:p-8">
	<h2
		class="mb-6 text-2xl font-bold text-blue-900 sm:text-3xl"
	>
		{equipment.name}
	</h2>

	<div class="space-y-5">

		<div class="flex flex-col gap-1 sm:flex-row sm:items-center">
			<span class="font-bold text-blue-800">
				Department :
			</span>

			<span class="text-slate-700">
				{equipment.department}
			</span>
		</div>

		<div class="flex flex-col gap-1 sm:flex-row sm:items-center">
			<span class="font-bold text-blue-800">
				Available Quantity :
			</span>

			<span class="text-slate-700">
				{equipment.quantity}
			</span>
		</div>

		<div class="flex flex-col gap-1 sm:flex-row sm:items-center">
			<span class="font-bold text-blue-800">
				Location :
			</span>

			<span class="text-slate-700">
				{equipment.location}
			</span>
		</div>

		<div class="flex flex-col gap-2 sm:flex-row sm:items-center">
			<span class="font-bold text-blue-800">
				Status :
			</span>

			<span
				class={`w-fit rounded-full px-4 py-2 text-sm font-semibold ${getStatusColor(equipment.status)}`}
			>
				{equipment.status}
			</span>
		</div>

	</div>

	<div class="mt-8">

		<h3
			class="mb-3 text-lg font-bold text-blue-900 sm:text-xl"
		>
			Description
		</h3>

		<p
			class="text-sm leading-relaxed text-slate-600 sm:text-base"
		>
			{equipment.description}
		</p>

	</div>
</div>