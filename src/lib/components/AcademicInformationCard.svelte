<script>
	let { student } = $props();

/**
 * @param {string} department
 */
function getCourse(department) {

	/** @type {Record<string, string>} */
	const courseMap = {
		MCA: 'Master of Computer Applications',

		'M.Sc Computer Science': 'Master of Science in Computer Science',
		'M.Sc Physics': 'Master of Science in Physics',
		'M.Sc Chemistry': 'Master of Science in Chemistry',
		'M.Sc Botany': 'Master of Science in Botany',
		'M.Sc Zoology': 'Master of Science in Zoology',

		BCA: 'Bachelor of Computer Applications',

		'B.Sc Computer Science':
			'Bachelor of Science in Computer Science',
		'B.Sc Physics':
			'Bachelor of Science in Physics',
		'B.Sc Chemistry':
			'Bachelor of Science in Chemistry',
		'B.Sc Botany':
			'Bachelor of Science in Botany',
		'B.Sc Zoology':
			'Bachelor of Science in Zoology'
	};

	return courseMap[department] ?? department;
}
</script>

<div
	class="rounded-3xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
>

	<div class="mb-6">

		<h2 class="text-2xl font-bold text-blue-900">
			Academic Information
		</h2>

		<p class="mt-1 text-sm text-slate-500">
			View your academic details.
		</p>

	</div>

	<div class="space-y-4">

		<div class="flex items-center justify-between rounded-xl bg-slate-50 p-4">

			<span class="font-semibold text-slate-600">
				Course
			</span>

			<span class="text-right font-semibold text-slate-900">
				{getCourse(student.department)}
			</span>

		</div>

		<div class="flex items-center justify-between rounded-xl bg-slate-50 p-4">

			<span class="font-semibold text-slate-600">
				Department
			</span>

			<span class="font-semibold text-slate-900">
				{student.department}
			</span>

		</div>

		<div class="flex items-center justify-between rounded-xl bg-slate-50 p-4">

			<span class="font-semibold text-slate-600">
				Academic Year
			</span>

<span class="font-semibold text-slate-900">
	{student.academicYear}
</span>

		</div>

		<div class="flex items-center justify-between rounded-xl bg-slate-50 p-4">

			<span class="font-semibold text-slate-600">
				Current Year
			</span>

			<span class="font-semibold text-slate-900">
				{student.year}
			</span>

		</div>

	</div>

</div>