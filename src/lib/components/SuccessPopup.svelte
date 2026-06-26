<script>
	let { open = false } = $props();
</script>

{#if open}

	<div
		class="fixed inset-0 z-[60] flex items-center justify-center px-4"
	>

		<div
			class="w-full max-w-xs rounded-3xl bg-green-600 px-6 py-5 text-center text-white shadow-2xl sm:max-w-sm sm:px-8 sm:py-6"
		>

			<div class="mb-3 text-5xl">
				✅
			</div>

			<h2
				class="text-xl font-bold sm:text-2xl"
			>
				Booking Confirmed
			</h2>

			<p
				class="mt-2 text-sm sm:text-base"
			>
				Your booking has been submitted successfully.
			</p>

		</div>

	</div>

{/if}