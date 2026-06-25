<script>
	let {
		open = false,
		onConfirm,
		onCancel
	} = $props();

	let agreed = $state(false);
</script>

{#if open}

	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
	>

		<div
			class="mx-4 w-full max-w-sm rounded-3xl bg-white p-5 shadow-2xl sm:mx-0 sm:max-w-md sm:p-6"
		>

			<h2
				class="mb-3 text-center text-xl font-bold text-blue-900 sm:text-2xl"
			>
				Equipment Booking Confirmation
			</h2>

			<p
				class="mb-5 text-center text-sm text-slate-600 sm:text-base"
			>
				Please confirm before booking this equipment.
			</p>

			<!-- Checkbox -->

			<label
				class="mb-5 flex cursor-pointer items-start gap-3 rounded-xl bg-slate-50 p-3 sm:p-4"
			>

				<input
					bind:checked={agreed}
					type="checkbox"
					class="mt-1 h-5 w-5"
				/>

				<span class="text-sm text-slate-700 sm:text-base">
					I agree to follow laboratory rules and return equipment on time.
				</span>

			</label>

<div class="flex gap-3">

	<button
		on:click={onConfirm}
		disabled={!agreed}
		class="flex-1 rounded-xl bg-green-600 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-slate-300 sm:py-3 sm:text-base"
	>
		Confirm
	</button>

	<button
		on:click={() => {
			agreed = false;
			onCancel();
		}}
		class="flex-1 rounded-xl bg-red-600 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 sm:py-3 sm:text-base"
	>
		Cancel
	</button>

</div>
		</div>

	</div>

{/if}