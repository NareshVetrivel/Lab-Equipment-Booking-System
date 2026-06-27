<script>
	let {
		search = '',
		placeholder = 'Search Equipment...',
		showButton = true,
		buttonText = 'Add Equipment',
		onSearch = () => {},
		onAdd = () => {}
	} = $props();

	/**
	 * @param {Event} event
	 */
	function handleInput(event) {
		const target = /** @type {HTMLInputElement} */ (event.currentTarget);

		onSearch(target.value);
	}
</script>

<div
	class="flex flex-col gap-4 rounded-3xl bg-white p-5 shadow-lg md:flex-row md:items-center md:justify-between"
>
	<!-- Search Box -->

	<div class="relative flex-1">

		<svg
			class="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M21 21l-4.35-4.35M16 10.5a5.5 5.5 0 11-11 0a5.5 5.5 0 0111 0z"
			/>
		</svg>

		<input
			type="text"
			value={search}
			placeholder={placeholder}
			class="w-full rounded-2xl border border-slate-300 bg-slate-50 py-3 pl-12 pr-4 text-slate-700 outline-none transition-all duration-300 focus:border-blue-700 focus:bg-white focus:ring-2 focus:ring-blue-200"
			oninput={handleInput}
		/>

	</div>

	<!-- Add Equipment Button -->

	{#if showButton}

		<button
			type="button"
			class="rounded-2xl bg-blue-700 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-blue-800 hover:shadow-lg"
			onclick={() => onAdd()}
		>
			+ {buttonText}
		</button>

	{/if}

</div>