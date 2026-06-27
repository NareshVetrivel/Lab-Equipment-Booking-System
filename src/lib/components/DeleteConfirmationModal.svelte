<script>
	let {
		isOpen = false,
		equipment = {},
		onClose = () => {},
		onConfirm = () => {}
	} = $props();
</script>

{#if isOpen}

<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

	<div class="w-full max-w-md rounded-3xl bg-white shadow-2xl">

		<!-- Header -->

		<div class="border-b border-slate-200 p-6 text-center">

			<div class="mb-4 text-6xl">
				⚠️
			</div>

			<h2 class="text-2xl font-bold text-red-600">
				Delete Equipment
			</h2>

			<p class="mt-3 text-slate-600">
				Are you sure you want to permanently delete this equipment?
			</p>

		</div>

		<!-- Equipment Details -->

		<div class="space-y-3 p-6">

			<div class="rounded-2xl bg-slate-100 p-4">

				<p class="text-sm text-slate-500">
					Equipment Name
				</p>

				<p class="text-lg font-bold text-slate-800">
					{equipment.name}
				</p>

			</div>

			<div class="rounded-2xl bg-slate-100 p-4">

				<p class="text-sm text-slate-500">
					Department
				</p>

				<p class="text-lg font-semibold text-blue-700">
					{equipment.department}
				</p>

			</div>

			<p class="rounded-xl bg-red-50 p-4 text-center text-sm font-medium text-red-600">
				This action cannot be undone.
			</p>

		</div>

		<!-- Footer -->

		<div class="flex justify-end gap-4 border-t border-slate-200 p-6">

			<button
				type="button"
				class="rounded-xl bg-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-400"
				onclick={() => onClose()}
			>
				Cancel
			</button>

			<button
				type="button"
				class="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
				onclick={() => onConfirm(equipment)}
			>
				Delete Permanently
			</button>

		</div>

	</div>

</div>

{/if}