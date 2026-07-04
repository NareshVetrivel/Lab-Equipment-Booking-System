<script>
	let { open = false, title = 'Success', message = 'Operation completed successfully.' } = $props();
</script>

{#if open}
	<div
		class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
	>
		<div class="w-full max-w-sm rounded-3xl bg-white p-8 text-center shadow-2xl">
			<!-- Success Icon -->

			<div
				class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-600 shadow-lg"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="3"
					class="h-10 w-10 text-white"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
				</svg>
			</div>

			<!-- Title -->

			<h2 class="mt-6 text-2xl font-bold text-slate-800">
				{title}
			</h2>

			<!-- Message -->

			<p class="mt-3 whitespace-pre-line text-lg leading-8 text-slate-600">
				{message}
			</p>
		</div>
	</div>
{/if}
