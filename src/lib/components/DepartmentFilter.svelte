<script>
	let {
		selectedDepartment = 'All',
		onSelect = () => {}
	} = $props();

	const departments = [
		'All',
		'Physics',
		'Chemistry',
		'Botany',
		'Zoology',
		'Computer'
	];

	/**
	 * @param {string} department
	 */
	function handleSelect(department) {
		onSelect(department);
	}
</script>

<div class="rounded-3xl bg-white p-5 shadow-lg">

	<h2 class="mb-4 text-lg font-bold text-blue-900">
		Departments
	</h2>

	<div class="flex flex-wrap gap-3">

		{#each departments as department (department)}

			<button
				type="button"
				class={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 ${
					selectedDepartment === department
						? 'bg-blue-700 text-white shadow-md'
						: 'border border-slate-300 bg-slate-100 text-slate-700 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-700'
				}`}
				onclick={() => handleSelect(department)}
			>
				{department}
			</button>

		{/each}

	</div>

</div>