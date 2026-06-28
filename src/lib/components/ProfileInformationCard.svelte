<script>
	let {
		student,
		editingPhone = '',
		loading = false,
		onSave = () => {}
	} = $props();

	let isEditingPhone = $state(false);
	let originalPhone = $state('');
	let phoneError = $state('');

	const phoneNumberRegex = /^[6-9][0-9]{9}$/;
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

		<!-- Full Name -->

		<div class="flex items-center justify-between rounded-xl bg-slate-50 p-4">
			<span class="font-semibold text-slate-600">
				Full Name
			</span>

			<span class="font-semibold text-slate-900">
				{student.name}
			</span>
		</div>

<!-- Admission Number -->

<div class="flex items-center justify-between rounded-xl bg-slate-50 p-4">
	<span class="font-semibold text-slate-600">
		Admission Number
	</span>

	<span class="font-semibold text-slate-900">
		{student.admissionNumber}
	</span>
</div>

		<!-- DOB -->

		<div class="flex items-center justify-between rounded-xl bg-slate-50 p-4">
			<span class="font-semibold text-slate-600">
				Date of Birth
			</span>

			<span class="font-semibold text-slate-900">
				{student.dob}
			</span>
		</div>

		<!-- Gender -->

		<div class="flex items-center justify-between rounded-xl bg-slate-50 p-4">
			<span class="font-semibold text-slate-600">
				Gender
			</span>

			<span class="font-semibold text-slate-900">
				{student.gender}
			</span>
		</div>

		<!-- Email -->

		<div class="flex items-center justify-between rounded-xl bg-slate-50 p-4">
			<span class="font-semibold text-slate-600">
				Email
			</span>

			<span class="break-all text-right font-semibold text-slate-900">
				{student.email}
			</span>
		</div>

		<!-- Editable Phone Number -->

<!-- Phone Number -->

<div
	class="flex items-center justify-between rounded-xl bg-slate-50 p-4"
>

	<span class="font-semibold text-slate-600">
		Phone Number
	</span>

	{#if isEditingPhone}

		<input
			type="tel"
			bind:value={editingPhone}
			maxlength="10"
			oninput={(event) => {
				const target = /** @type {HTMLInputElement} */ (event.target);

				target.value = target.value.replace(/\D/g, '');

				editingPhone = target.value;
			}}
			class="w-48 rounded-lg border border-slate-300 px-3 py-2 text-right outline-none focus:border-blue-500"
		/>
{#if phoneError}

	<p class="mt-2 text-right text-sm font-medium text-red-600">
		{phoneError}
	</p>

{/if}
	{:else}

		<div class="flex items-center gap-3">

			<button
				type="button"
onclick={() => {
	editingPhone = student.phone;
	originalPhone = student.phone;
	phoneError = '';
	isEditingPhone = true;
}}
				class="rounded-md p-2 transition hover:bg-blue-100"
				title="Edit Phone Number"
			>
				✏️
			</button>

			<span class="font-semibold text-slate-900">
				{student.phone}
			</span>

		</div>

	{/if}

</div>

	<!-- Save Button -->

{#if isEditingPhone && editingPhone !== originalPhone}

<div class="mt-6">

	<button
		type="button"
		disabled={loading}
		onclick={async () => {

	editingPhone = editingPhone.trim();

	if (!editingPhone) {
		phoneError = 'Phone number is required.';
		return;
	}

	if (!phoneNumberRegex.test(editingPhone)) {
		phoneError =
			'Enter a valid 10-digit phone number.';
		return;
	}

	phoneError = '';

	await onSave(editingPhone);

	student.phone = editingPhone;
	originalPhone = editingPhone;
	isEditingPhone = false;
}}
		class="w-full rounded-xl bg-gradient-to-r from-blue-700 to-sky-500 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-1 disabled:opacity-50"
	>
		{loading ? 'Updating...' : 'Save Changes'}
	</button>

</div>

{/if}

</div>
</div>