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
			class="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl"
		>

			<h2
				class="mb-4 text-center text-2xl font-bold text-blue-900"
			>
				Equipment Booking Confirmation
			</h2>

			<p
				class="mb-6 text-center text-slate-600"
			>
				Please confirm before booking this equipment.
			</p>

			<!-- Checkbox -->

			<label
				class="mb-6 flex cursor-pointer items-start gap-3 rounded-xl bg-slate-50 p-4"
			>

				<input
					bind:checked={agreed}
					type="checkbox"
					class="mt-1 h-5 w-5"
				/>

				<span class="text-slate-700">
					I agree to follow laboratory rules and return equipment on time.
				</span>

			</label>

			<div class="flex gap-4">

				<button
					on:click={onConfirm}
					disabled={!agreed}
					class="flex-1 rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-slate-300"
				>
					Confirm
				</button>

				<button
					on:click={() => {
						agreed = false;
						onCancel();
					}}
					class="flex-1 rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
				>
					Cancel
				</button>

			</div>

		</div>

	</div>

{/if}