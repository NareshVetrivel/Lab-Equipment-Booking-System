<script>
	import { resolve } from '$app/paths';

	let { equipment } = $props();
/**
 * @param {number} quantity
 */
	function getQuantityColor(quantity) {
		if (quantity >= 8) {
			return 'bg-green-100 text-green-700 border-green-200';
		}

		if (quantity >= 4) {
			return 'bg-yellow-100 text-yellow-700 border-yellow-200';
		}

		return 'bg-red-100 text-red-700 border-red-200';
	}
</script>

<div
	class="flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
>
	<img
		src={equipment.image}
		alt={equipment.name}
		class="h-44 w-full object-cover sm:h-48 md:h-52"
	/>

	<div class="flex flex-1 flex-col p-4 sm:p-5">

		<h3
			class="text-center text-base font-bold text-blue-900 sm:text-lg"
		>
			{equipment.name}
		</h3>

		<p
			class="mt-1 text-center text-sm text-slate-500"
		>
			{equipment.department}
		</p>

<div class="mt-4 mb-6 flex justify-center">

	<span
		class={`rounded-full border px-3 py-1.5 text-sm font-semibold sm:px-4 sm:py-2 ${getQuantityColor(equipment.quantity)}`}
	>
		Qty : {equipment.quantity}
	</span>

</div>

<a
	href={resolve(`/equipment-details/${equipment.id}`)}
	class="block rounded-xl bg-blue-700 px-4 py-3 text-center text-sm font-semibold text-white transition duration-200 hover:bg-blue-800 sm:text-base"
>
	View Details
</a>

	</div>

</div>