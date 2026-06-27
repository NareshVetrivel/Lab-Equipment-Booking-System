<script>
	/** @type {{
		title: string;
		value: number | string;
		icon: string;
		color?: string;
	}} */
	const {
		title,
		value,
		icon,
		color = 'blue'
	} = $props();

	/**
	 * @param {string} color
	 */
	function getTheme(color) {
		switch (color) {
			case 'green':
				return {
					bg: 'bg-green-50',
					icon: 'bg-green-100',
					text: 'text-green-700'
				};

			case 'orange':
				return {
					bg: 'bg-orange-50',
					icon: 'bg-orange-100',
					text: 'text-orange-700'
				};

			case 'red':
				return {
					bg: 'bg-red-50',
					icon: 'bg-red-100',
					text: 'text-red-700'
				};

			default:
				return {
					bg: 'bg-blue-50',
					icon: 'bg-blue-100',
					text: 'text-blue-700'
				};
		}
	}

	const theme = getTheme(color);
</script>

<div
	class="rounded-3xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
>

	<div class="flex items-center justify-between">

		<div>

			<p class="text-sm font-semibold uppercase tracking-wide text-slate-500">
				{title}
			</p>

			<h2 class={`mt-3 text-4xl font-bold ${theme.text}`}>
				{value}
			</h2>

		</div>

		<div
			class={`flex h-16 w-16 items-center justify-center rounded-2xl text-3xl ${theme.bg}`}
		>
			{icon}
		</div>

	</div>

</div>