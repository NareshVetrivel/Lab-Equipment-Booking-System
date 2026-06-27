<script>
	let {
		search = '',
		placeholder = 'Search by Student Name, Equipment or Department...',
		onSearch = () => {}
	} = $props();

	/**
	 * @param {Event} event
	 */
	function handleInput(event) {
		const input = /** @type {HTMLInputElement} */ (event.currentTarget);

		onSearch(input.value);
	}
</script>

<div
	class="flex flex-col gap-4 rounded-3xl bg-white p-5 shadow-lg md:flex-row md:items-center"
>
	<!-- Search Box -->

	<div class="relative w-full">

		<input
			type="text"
			value={search}
			placeholder={placeholder}
			class="w-full rounded-2xl border border-slate-300 bg-slate-50 py-3 pl-12 pr-4 text-slate-700 outline-none transition-all duration-300 focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-200"
			oninput={handleInput}
		/>

		<span
			class="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-slate-500"
		>
			🔍
		</span>

	</div>

</div>