<script>
// @ts-nocheck

	const {
		disabled = false,
		loading = false,
		fullWidth = false,
		variant = 'primary'
	} = $props();

	const variantClasses = {
		primary:
			'bg-gradient-to-r from-blue-700 to-sky-500 text-white hover:from-blue-800 hover:to-sky-600',

		secondary:
			'bg-white border border-blue-700 text-blue-700 hover:bg-blue-50',

		danger:
			'bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-700 hover:to-red-600',

		success:
			'bg-gradient-to-r from-green-600 to-green-500 text-white hover:from-green-700 hover:to-green-600'
	};

	const currentClass =
		variantClasses[variant] ||
		variantClasses.primary;
</script>

<button
	type="button"
	disabled={disabled || loading}
	class={`${currentClass}
	${fullWidth ? 'w-full' : ''}
	rounded-xl
	px-5
	py-3
	font-semibold
	shadow-lg
	transition-all
	duration-300
	hover:-translate-y-1
	hover:scale-[1.02]
	hover:shadow-2xl
	focus:outline-none
	focus:ring-4
	focus:ring-blue-200
	disabled:cursor-not-allowed
	disabled:opacity-60`}
>
	{#if loading}
		<span class="flex items-center justify-center gap-2">
			<svg
				class="h-5 w-5 animate-spin"
				viewBox="0 0 24 24"
				fill="none"
			>
				<circle
					cx="12"
					cy="12"
					r="10"
					stroke="currentColor"
					stroke-width="4"
					opacity="0.25"
				/>

				<path
					d="M22 12a10 10 0 0 1-10 10"
					stroke="currentColor"
					stroke-width="4"
				/>
			</svg>

			Loading...
		</span>
	{:else}
		<slot />
	{/if}
</button>