<script>
	let { student } = $props();
</script>

<div
	class="rounded-3xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
>
	<!-- Header -->

	<div
		class="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 px-6 py-8 text-center"
	>
		<img
			src={student.photo}
			alt={student.name}
			class="mx-auto h-40 w-40 rounded-full border-4 border-white object-cover shadow-xl"
		/>

		<h2 class="mt-4 text-2xl font-bold text-white">
			{student.name}
		</h2>

<p class="mt-1 text-blue-200">
	{student.admissionNumber}
</p>
	</div>

	<!-- Body -->

	<div class="space-y-4 p-6">

		<div
			class="flex items-center justify-between rounded-xl bg-slate-50 p-4"
		>
			<span class="font-semibold text-slate-600">
				Department
			</span>

			<span class="font-bold text-blue-900">
				{student.department}
			</span>
		</div>

		<div
			class="flex items-center justify-between rounded-xl bg-slate-50 p-4"
		>
			<span class="font-semibold text-slate-600">
				Year
			</span>

			<span class="font-bold text-blue-900">
				{student.year}
			</span>
		</div>

		<div
			class="flex items-center justify-between rounded-xl bg-slate-50 p-4"
		>
			<span class="font-semibold text-slate-600">
				Status
			</span>

			<span
				class="rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700"
			>
				● ACTIVE
			</span>
		</div>

	</div>
</div>