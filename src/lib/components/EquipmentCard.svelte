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
	class="overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
>
	<img
		src={equipment.image}
		alt={equipment.name}
		class="h-48 w-full object-cover"
	/>

	<div class="p-4">

		<h3
			class="text-center text-lg font-bold text-blue-900"
		>
			{equipment.name}
		</h3>

		<p
			class="mt-1 text-center text-slate-500"
		>
			{equipment.department}
		</p>

		<div class="mt-4 flex justify-center">

			<span
				class={`rounded-full border px-4 py-2 font-semibold ${getQuantityColor(equipment.quantity)}`}
			>
				Qty : {equipment.quantity}
			</span>

		</div>

		<a
			href={resolve(`/equipment-details/${equipment.id}`)}
			class="mt-5 block rounded-xl bg-blue-700 py-3 text-center font-semibold text-white transition hover:bg-blue-800"
		>
			View Details
		</a>

	</div>

</div>