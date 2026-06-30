<script>
let {
	equipment,
	onBook = () => {},
	loading = false
} = $props();
</script>

<div
	class="mt-8 rounded-3xl bg-white p-5 shadow-lg sm:p-8"
>
	<h2
		class="mb-6 text-xl font-bold text-blue-900 sm:text-2xl"
	>
		Booking Information
	</h2>

	<div
		class="grid grid-cols-1 gap-6 md:grid-cols-3"
	>
		<div
			class="rounded-2xl bg-blue-50 p-5 text-center"
		>
			<h3
				class="font-bold text-blue-800"
			>
				Maximum Duration
			</h3>

<p class="mt-2 text-lg">
	{equipment.returnWithinDays} Days
</p>
		</div>

<div
	class="rounded-2xl bg-indigo-50 p-5 text-center"
>

	<h3
		class="font-bold text-indigo-700"
	>

		Available

	</h3>

	<p class="mt-2 text-lg">

		{equipment.available}

	</p>

</div>

		<div
			class="rounded-2xl bg-green-50 p-5 text-center"
		>
			<h3
				class="font-bold text-green-700"
			>
				Approval
			</h3>

			<p
				class="mt-2 text-lg"
			>
				Lab In-Charge Required
			</p>
		</div>

		<div
			class="rounded-2xl bg-yellow-50 p-5 text-center"
		>
			<h3
				class="font-bold text-yellow-700"
			>
				Responsibility
			</h3>

			<p
				class="mt-2 text-lg"
			>
				Student Responsible
			</p>
		</div>
	</div>

	<div
		class="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5"
	>
		<h3
			class="mb-2 font-bold text-red-700"
		>
			Important Notice
		</h3>

		<p
			class="text-slate-700"
		>
			Students must return the equipment on time.
			Damage or loss will result in penalties.
		</p>
	</div>

	<div
		class="mt-8 text-center"
	>
<button
	type="button"
	disabled={loading || equipment.available <= 0}
	onclick={() => onBook()}
	class="w-full rounded-2xl bg-gradient-to-r from-blue-700 to-sky-500 px-6 py-4 text-base font-bold text-white shadow-lg transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:px-10 sm:text-lg"
>

	{#if equipment.available <= 0}

		Out of Stock

	{:else if loading}

		Booking...

	{:else}

		Book Equipment

	{/if}

</button>
	</div>
</div>