<script>
	let { student } = $props();
</script>

<div
	class="rounded-3xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
>
	<!-- Card Header -->

	<div class="mb-6">
		<h2 class="text-2xl font-bold text-blue-900">
			Personal Information
		</h2>

		<p class="mt-1 text-sm text-slate-500">
			View your personal profile details.
		</p>
	</div>

	<!-- Information -->

	<div class="space-y-4">

		<div class="flex items-center justify-between rounded-xl bg-slate-50 p-4">
			<span class="font-semibold text-slate-600">
				Full Name
			</span>

			<span class="font-semibold text-slate-900">
				{student.name}
			</span>
		</div>

		<div class="flex items-center justify-between rounded-xl bg-slate-50 p-4">
			<span class="font-semibold text-slate-600">
				Register Number
			</span>

			<span class="font-semibold text-slate-900">
				{student.registerNumber}
			</span>
		</div>

		<div class="flex items-center justify-between rounded-xl bg-slate-50 p-4">
			<span class="font-semibold text-slate-600">
				Date of Birth
			</span>

			<span class="font-semibold text-slate-900">
				{student.dob}
			</span>
		</div>

		<div class="flex items-center justify-between rounded-xl bg-slate-50 p-4">
			<span class="font-semibold text-slate-600">
				Gender
			</span>

			<span class="font-semibold text-slate-900">
				{student.gender}
			</span>
		</div>

		<div class="flex items-center justify-between rounded-xl bg-slate-50 p-4">
			<span class="font-semibold text-slate-600">
				Email
			</span>

			<span class="break-all text-right font-semibold text-slate-900">
				{student.email}
			</span>
		</div>

		<div class="flex items-center justify-between rounded-xl bg-slate-50 p-4">
			<span class="font-semibold text-slate-600">
				Phone Number
			</span>

			<span class="font-semibold text-slate-900">
				{student.phone}
			</span>
		</div>

		<div class="flex items-start justify-between rounded-xl bg-slate-50 p-4">
			<span class="font-semibold text-slate-600">
				Address
			</span>

			<span class="max-w-xs text-right font-semibold text-slate-900 break-words">
				{student.address}
			</span>
		</div>

	</div>

</div>