<script>
	import { fade, scale } from 'svelte/transition';

	let {
		open = false,
		title = '',
		message = '',
		confirmText = 'Confirm',
		cancelText = 'Cancel',
		showButtons = true,
		confirmColor = 'red',
		onConfirm = () => {},
		onCancel = () => {}
	} = $props();

	const buttonClass =
		confirmColor === 'blue'
			? 'bg-blue-700 hover:bg-blue-800'
			: confirmColor === 'green'
				? 'bg-green-600 hover:bg-green-700'
				: 'bg-red-600 hover:bg-red-700';
</script>

{#if open}
	<div
		class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
		transition:fade
		onclick={() => onCancel()}
	>
		<div
			class="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
			transition:scale={{ duration: 180 }}
			onclick={(event) => event.stopPropagation()}
		>
			<!-- Header -->

			<div class="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 px-6 py-5">
				<h2 class="text-center text-2xl font-bold text-white">
					{title}
				</h2>
			</div>

			<!-- Body -->

			<div class="px-6 py-8">
				<div class="mb-6 text-center">
					<div
						class="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-red-100"
					>
						<span class="text-4xl"> ⚠️ </span>
					</div>

					<p class="text-lg leading-7 text-slate-700">
						{message}
					</p>
				</div>

				{#if showButtons}
					<div class="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
						{#if cancelText}
							<button
								type="button"
								class="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
								onclick={() => onCancel()}
							>
								{cancelText}
							</button>
						{/if}

						<button
							type="button"
							class={`rounded-xl px-5 py-3 font-semibold text-white transition ${buttonClass}`}
							onclick={() => onConfirm()}
						>
							{confirmText}
						</button>
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}
