<script>
	let {
		selectedDepartment = 'All',
		onSelect = () => {}
	} = $props();

	const departments = [
		'All',
		'Computer',
		'Physics',
		'Chemistry',
		'Botany',
		'Zoology'
	];
</script>

<div class="rounded-3xl bg-white p-5 shadow-lg">

	<div class="flex flex-wrap justify-center gap-3">

		{#each departments as department (department)}

			<button
				type="button"
				class={`rounded-full px-5 py-2 font-semibold transition-all duration-300 ${
					selectedDepartment === department
						? 'bg-blue-700 text-white shadow-md'
						: 'bg-slate-100 text-slate-700 hover:bg-blue-100 hover:text-blue-700'
				}`}
				onclick={() => onSelect(department)}
			>
				{department}
			</button>

		{/each}

	</div>

</div>