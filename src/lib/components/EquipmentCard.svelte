<script>
	import { resolve } from '$app/paths';

	let { equipment } = $props();
	/**
	 * @param {number} available
	 */
	function getQuantityColor(available) {
		if (available >= 8) {
			return 'bg-gradient-to-r from-green-300 to-green-300 text-green-900 shadow-md animate-[pulse_0.9s_ease-in-out_infinite]';
		}

		if (available >= 4) {
			return 'bg-gradient-to-r from-yellow-300 to-yellow-300 text-yellow-900 shadow-md animate-[pulse_0.9s_ease-in-out_infinite]';
		}

		return 'bg-gradient-to-r from-red-300 to-red-300 text-red-900 shadow-md animate-[pulse_0.9s_ease-in-out_infinite]';
	}
</script>

<div
	class="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-xl transition-all duration-500 hover:-translate-y-4 hover:shadow-blue-200/50"
>
	<img
		src={equipment.image}
		alt={equipment.name}
		class="h-64 w-full bg-gradient-to-b from-slate-50 to-white object-contain p-4 transition duration-500 group-hover:scale-110"
	/>

	<div class="flex flex-1 flex-col p-7">
		<h3 class="text-2xl font-extrabold tracking-tight text-blue-900">
			{equipment.name}
		</h3>

		<p class="mt-2 text-m font-semibold uppercase tracking-[0.18em] text-slate-500">
			{equipment.department}
		</p>
		<p class="mt-5 line-clamp-2 text-[15px] leading-7 text-slate-500">
			{equipment.description}
		</p>
		<div class="mt-4 mb-6 flex">
			<span
				class={`rounded-xl px-4 py-2 text-sm font-bold px-3 py-1.5 text-sm font-semibold sm:px-4 sm:py-2 ${getQuantityColor(equipment.available)}`}
			>
				{equipment.available} Units Available
			</span>
		</div>

		<a
			href={resolve(`/equipment-details/${equipment.id}`)}
			class="inline-flex w-fit items-center rounded-xl bg-gradient-to-r from-blue-700 to-sky-500 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:translate-x-2 hover:shadow-2xl"
		>
			<span class="flex items-center gap-2">
				View Details
				<span class="transition group-hover:translate-x-1"> → </span>
			</span>
		</a>
	</div>
</div>
