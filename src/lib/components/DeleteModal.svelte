<script>
	let {
		isOpen = false,
		equipment = {},
		onClose = () => {},
		onDelete = () => {}
	} = $props();

	function confirmDelete() {
		onDelete(equipment);
	}
</script>

{#if isOpen}

<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

	<div class="w-full max-w-md rounded-3xl bg-white shadow-2xl">

		<!-- Header -->

		<div class="border-b p-6">

			<h2 class="text-2xl font-bold text-red-600">
				Delete Equipment
			</h2>

		</div>

		<!-- Content -->

		<div class="p-6">

			<div class="mb-5 flex justify-center">

				<div
					class="flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-5xl"
				>
					🗑️
				</div>

			</div>

			<p class="text-center text-lg font-semibold text-slate-700">

				Are you sure you want to delete

				<span class="text-red-600">
					"{equipment.name}"
				</span>

				?

			</p>

			<p class="mt-3 text-center text-sm text-slate-500">
				This action cannot be undone.
			</p>

		</div>

		<!-- Footer -->

		<div class="flex justify-end gap-4 border-t bg-slate-50 p-6">

			<button
				type="button"
				class="rounded-xl bg-slate-200 px-6 py-3 font-semibold transition hover:bg-slate-300"
				onclick={() => onClose()}
			>
				Cancel
			</button>

			<button
				type="button"
				class="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
				onclick={confirmDelete}
			>
				Delete
			</button>

		</div>

	</div>

</div>

{/if}