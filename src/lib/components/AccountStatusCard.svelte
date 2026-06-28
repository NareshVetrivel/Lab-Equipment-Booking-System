<script>
	let { student } = $props();

	function formatLastLogin() {

		if (!student.lastLogin) {
			return 'Today';
		}

		const loginDate = new Date(student.lastLogin);

		return loginDate.toLocaleString('en-IN', {
			dateStyle: 'medium',
			timeStyle: 'short'
		});
	}
</script>

<div
	class="rounded-3xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
>
	<!-- Header -->

	<div class="mb-6">
		<h2 class="text-2xl font-bold text-blue-900">
			Account Status
		</h2>

		<p class="mt-1 text-sm text-slate-500">
			Current laboratory account information.
		</p>
	</div>

	<!-- Status Information -->

	<div class="space-y-4">

		<div
			class="flex items-center justify-between rounded-xl bg-slate-50 p-4"
		>
			<span class="font-semibold text-slate-600">
				Role
			</span>

			<span class="font-semibold text-slate-900">
				Student
			</span>
		</div>

		<div
			class="flex items-center justify-between rounded-xl bg-slate-50 p-4"
		>
			<span class="font-semibold text-slate-600">
				Account Type
			</span>

			<span class="font-semibold text-slate-900">
				Laboratory Access
			</span>
		</div>

		<div
			class="flex items-center justify-between rounded-xl bg-slate-50 p-4"
		>
			<span class="font-semibold text-slate-600">
				Equipment Booking
			</span>

			<span class="font-semibold text-green-700">
				Enabled
			</span>
		</div>

		<div
			class="flex items-center justify-between rounded-xl bg-slate-50 p-4"
		>
			<span class="font-semibold text-slate-600">
				Account Created
			</span>

<span class="font-semibold text-slate-900">
	{student.accountCreated}
</span>
		</div>

		<div
			class="flex items-center justify-between rounded-xl bg-slate-50 p-4"
		>
			<span class="font-semibold text-slate-600">
				Last Login
			</span>

<span class="font-semibold text-slate-900">
	{formatLastLogin()}
</span>
		</div>

	</div>

	<!-- Information Box -->

	<div
		class="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-4"
	>
		<h3 class="mb-2 font-bold text-blue-800">
			Account Information
		</h3>

<p class="text-sm leading-6 text-slate-700">
	Your laboratory account is active and verified. You can book laboratory equipment, view your booking history and access all available laboratory services.
</p>
	</div>

</div>