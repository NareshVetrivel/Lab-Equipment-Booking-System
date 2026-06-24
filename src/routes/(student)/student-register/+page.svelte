<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let photo = $state(null);
    console.log(photo);

	let studentName = $state('');
	let registerNumber = $state('');
	let department = $state('');
	let year = $state('');
	let dob = $state('');
	let phoneNumber = $state('');

	let imagePreview = $state('');

	const masterDepartments = [
		'MCA',
		'M.Sc Computer Science',
		'M.Sc Physics',
		'M.Sc Chemistry',
		'M.Sc Botany',
		'M.Sc Zoology'
	];

	const bachelorDepartments = [
		'BCA',
		'B.Sc Computer Science',
		'B.Sc Physics',
		'B.Sc Chemistry',
		'B.Sc Botany',
		'B.Sc Zoology'
	];

	function getAvailableYears() {
		if (masterDepartments.includes(department)) {
			return ['I Year', 'II Year'];
		}

		if (bachelorDepartments.includes(department)) {
			return ['I Year', 'II Year', 'III Year'];
		}

		return [];
	}

	function handleDepartmentChange() {
		year = '';
	}

	/**
    * @param {Event} event
    */
    function handlePhotoUpload(event) {
	    const target = /** @type {HTMLInputElement} */ (event.target);

    	const file = target.files?.[0];

    	if (file) {
	    	imagePreview = URL.createObjectURL(file);
	    }
    }

	function saveProfile() {
		console.log('Profile Saved');
	}
</script>

<div class="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 via-white to-sky-100">
	<Header />

	<main class="flex flex-1 items-center justify-center px-4 py-10">
		<div
			class="w-full max-w-2xl rounded-3xl border border-white/40 bg-white/90 p-8 shadow-2xl backdrop-blur-md"
		>
			<div class="mb-8 text-center">
				<h1 class="text-4xl font-bold text-blue-950">
					Student Registration
				</h1>

				<p class="mt-2 text-slate-600">
					Complete your profile to continue
				</p>
			</div>

			<form
				class="flex flex-col gap-5"
				onsubmit={(e) => {
					e.preventDefault();
					saveProfile();
				}}
			>
				<!-- Photo Upload -->

<div class="flex flex-col items-center gap-4">

<div
	class="h-32 w-32 overflow-hidden rounded-full border-4 border-blue-300 bg-white shadow-lg"
>
	{#if imagePreview}
		<img
			src={imagePreview}
			alt="Preview"
			class="h-32 w-32 object-cover"
		/>
	{:else}
		<div class="flex h-full items-center justify-center">
			📷
		</div>
	{/if}
</div>

	<label
		for="photo-upload"
		class="cursor-pointer rounded-xl bg-gradient-to-r from-blue-700 to-sky-500 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
	>
		📷 {imagePreview ? 'Change Photo' : 'Upload Passport Photo'}
	</label>

	<input
		id="photo-upload"
		type="file"
		accept="image/*"
		class="hidden"
		onchange={handlePhotoUpload}
	/>

</div>

				<!-- Student Name -->

				<div>
					<label class="mb-2 block font-semibold">
						Student Name
					</label>

					<input
						bind:value={studentName}
						type="text"
						placeholder="Enter Student Name"
						class="w-full rounded-xl border border-slate-300 px-4 py-3"
					/>
				</div>

				<!-- Register Number -->

				<div>
					<label class="mb-2 block font-semibold">
						Register Number
					</label>

					<input
						bind:value={registerNumber}
						type="text"
						placeholder="23MCA101"
						class="w-full rounded-xl border border-slate-300 px-4 py-3"
					/>
				</div>

				<!-- Department -->

				<div>
					<label class="mb-2 block font-semibold">
						Department
					</label>

					<select
						bind:value={department}
						onchange={handleDepartmentChange}
						class="w-full rounded-xl border border-slate-300 px-4 py-3"
					>
						<option value="">Select Department</option>

						<optgroup label="Master Degree">
							{#each masterDepartments as dept(dept)}
								<option value={dept}>
									{dept}
								</option>
							{/each}
						</optgroup>

						<optgroup label="Bachelor Degree">
							{#each bachelorDepartments as dept(dept)}
								<option value={dept}>
									{dept}
								</option>
							{/each}
						</optgroup>
					</select>
				</div>

				<!-- Year -->

				<div>
					<label class="mb-2 block font-semibold">
						Year
					</label>

					<select
						bind:value={year}
						class="w-full rounded-xl border border-slate-300 px-4 py-3"
						disabled={!department}
					>
						<option value="">Select Year</option>

						{#each getAvailableYears() as yr(yr)}
							<option value={yr}>
								{yr}
							</option>
						{/each}
					</select>
				</div>

				<!-- DOB -->

				<div>
					<label class="mb-2 block font-semibold">
						Date of Birth
					</label>

					<input
						bind:value={dob}
						type="date"
						class="w-full rounded-xl border border-slate-300 px-4 py-3"
					/>
				</div>

				<!-- Phone -->

				<div>
					<label class="mb-2 block font-semibold">
						Phone Number
					</label>

					<input
						bind:value={phoneNumber}
						type="tel"
						placeholder="9876543210"
						class="w-full rounded-xl border border-slate-300 px-4 py-3"
					/>
				</div>

				<!-- Button -->

				<div>
					<button
						type="submit"
						class="w-full rounded-xl bg-gradient-to-r from-blue-700 to-sky-500 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
					>
						Save & Continue
					</button>
				</div>
			</form>
		</div>
	</main>

	<Footer />
</div>