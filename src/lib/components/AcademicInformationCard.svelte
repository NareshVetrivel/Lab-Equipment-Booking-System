<script>
	let { student } = $props();
</script>

<div
	class="rounded-3xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
>
	<!-- Card Header -->

	<div class="mb-6">
		<h2 class="text-2xl font-bold text-blue-900">
			Academic Information
		</h2>

		<p class="mt-1 text-sm text-slate-500">
			View your academic details.
		</p>
	</div>

	<!-- Information -->

	<div class="space-y-4">

		<div
			class="flex items-center justify-between rounded-xl bg-slate-50 p-4"
		>
			<span class="font-semibold text-slate-600">
				Course
			</span>

			<span class="font-semibold text-slate-900">
				{student.course}
			</span>
		</div>

		<div
			class="flex items-center justify-between rounded-xl bg-slate-50 p-4"
		>
			<span class="font-semibold text-slate-600">
				Department
			</span>

			<span class="font-semibold text-slate-900">
				{student.department}
			</span>
		</div>

		<div
			class="flex items-center justify-between rounded-xl bg-slate-50 p-4"
		>
			<span class="font-semibold text-slate-600">
				Academic Year
			</span>

			<span class="font-semibold text-slate-900">
				{student.academicYear}
			</span>
		</div>

		<div
			class="flex items-center justify-between rounded-xl bg-slate-50 p-4"
		>
			<span class="font-semibold text-slate-600">
				Semester
			</span>

			<span class="font-semibold text-slate-900">
				Semester {student.semester}
			</span>
		</div>

		<div
			class="flex items-center justify-between rounded-xl bg-slate-50 p-4"
		>
			<span class="font-semibold text-slate-600">
				Section
			</span>

			<span class="font-semibold text-slate-900">
				{student.section}
			</span>
		</div>

		<div
			class="flex items-center justify-between rounded-xl bg-slate-50 p-4"
		>
			<span class="font-semibold text-slate-600">
				Admission Year
			</span>

			<span class="font-semibold text-slate-900">
				{student.admissionYear}
			</span>
		</div>

		<div
			class="flex items-center justify-between rounded-xl bg-slate-50 p-4"
		>
			<span class="font-semibold text-slate-600">
				College
			</span>

			<span class="text-right font-semibold text-slate-900">
				Sona College of Technology
			</span>
		</div>

	</div>

</div>