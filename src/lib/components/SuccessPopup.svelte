<script>
	let { open = false } = $props();
</script>

{#if open}

	<div
		class="fixed inset-0 z-[60] flex items-center justify-center"
	>

		<div
			class="rounded-3xl bg-green-600 px-10 py-8 text-center text-white shadow-2xl"
		>

			<div class="mb-3 text-6xl">
				✅
			</div>

			<h2 class="text-2xl font-bold">
				Booking Confirmed
			</h2>

			<p class="mt-2">
				Your booking has been submitted successfully.
			</p>

		</div>

	</div>

{/if}