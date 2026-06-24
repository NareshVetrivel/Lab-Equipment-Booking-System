<script>
	// @ts-nocheck

	const {
		label = '',
		type = 'text',
		placeholder = '',
		value = '',
		error = '',
		required = false
	} = $props();
</script>

<div class="space-y-2">
	{#if label}
		<label
			class="block text-sm font-semibold text-slate-700"
		>
			{label}
			{#if required}
				<span class="text-red-500">*</span>
			{/if}
		</label>
	{/if}

	<input
		type={type}
		value={value}
		placeholder={placeholder}
		class="
			w-full
			rounded-xl
			border
			border-slate-300
			bg-white
			px-4
			py-3
			text-slate-700
			outline-none
			transition-all
			duration-300

			focus:border-blue-500
			focus:ring-4
			focus:ring-blue-100

			hover:border-blue-300
		"
	/>

	{#if error}
		<p class="text-sm text-red-500">
			{error}
		</p>
	{/if}
</div>