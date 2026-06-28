<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { auth } from '$lib/firebase/firebase';
	import { updateStudentProfile } from '$lib/services/authService';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';
	import { protectRoute } from '$lib/utils/authGuard';

/** @type {File | null} */
let photo = $state(null);
    console.log(photo);

	let loading = $state(false);
	let errorMessage = $state('');
	let successMessage = $state('');

	let studentName = $state('');
	let department = $state('');
	let admissionNumber = $state('');

	let year = $state('');

	let academicYear = $state('');

	let dob = $state('');

	let phoneNumber = $state('');

	let gender = $state('');
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

	const studentNameRegex = /^[A-Za-z ]+$/;

	const admissionNumberRegex = /^[A-Za-z0-9]{6,20}$/;

	const phoneNumberRegex = /^[6-9][0-9]{9}$/;

	const academicYearRegex = /^[0-9]{4}-[0-9]{4}$/;

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
 * @param {File} file
 * @returns {Promise<string>}
 */
function convertToBase64(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.readAsDataURL(file);

		reader.onload = () =>
			resolve(/** @type {string} */ (reader.result));

		reader.onerror = (error) => reject(error);
	});
}

/**
 * @param {Event} event
 */
async function handlePhotoUpload(event) {
	const target = /** @type {HTMLInputElement} */ (event.target);

	const file = target.files?.[0];

	if (!file) {
		return;
	}

	const allowedTypes = [
		'image/jpeg',
		'image/jpg',
		'image/png'
	];

	if (!allowedTypes.includes(file.type)) {
		errorMessage = 'Only JPG, JPEG and PNG images are allowed.';
		return;
	}

	if (file.size > 2 * 1024 * 1024) {
		errorMessage = 'Photo size must not exceed 2 MB.';
		return;
	}

	errorMessage = '';

	photo = file;

	// Base64 Conversion
	imagePreview = /** @type {string} */ (await convertToBase64(file));
}

async function saveProfile() {
	errorMessage = '';
	successMessage = '';

	studentName = studentName.trim();
	if (!photo) {
	errorMessage = 'Please upload your passport size photo.';
	return;
}
	admissionNumber = admissionNumber.trim().toUpperCase();
	phoneNumber = phoneNumber.trim();

	if (!studentName) {
		errorMessage = 'Student name is required.';
		return;
	}
	if (!studentNameRegex.test(studentName)) {
	errorMessage =
		'Student name can contain only letters and spaces.';
	return;
}

if (!admissionNumber) {
	errorMessage = 'Admission Number is required.';
	return;
}

if (!admissionNumberRegex.test(admissionNumber)) {
	errorMessage = 'Invalid Admission Number.';
	return;
}

	if (!department) {
		errorMessage = 'Select your department.';
		return;
	}

	if (!year) {
		errorMessage = 'Select your year.';
		return;
	}

	if (!academicYear) {
	errorMessage = 'Academic Year is required.';
	return;
}

if (!academicYearRegex.test(academicYear)) {
	errorMessage =
		'Academic Year must be in YYYY-YYYY format.';
	return;
}

const [startYear, endYear] = academicYear
	.split('-')
	.map(Number);

if (endYear !== startYear + 2) {
	errorMessage =
		'Academic Year must be like 2025-2027.';
	return;
}

if (!gender) {
	errorMessage = 'Select your gender.';
	return;
}

	if (!dob) {
		errorMessage = 'Date of birth is required.';
		return;
	}

	if (!phoneNumber) {
		errorMessage = 'Phone number is required.';
		return;
	}

	if (!phoneNumberRegex.test(phoneNumber)) {
		errorMessage = 'Enter a valid 10-digit phone number.';
		return;
	}

	loading = true;

const user = auth.currentUser;

if (!user) {
	loading = false;

	errorMessage = 'User session expired. Please login again.';
	return;
}

const result = await updateStudentProfile(user.uid, {
	studentName,
	admissionNumber,
	department,
	year,
	academicYear,
	dob,
	phoneNumber,
	gender,
	photoURL: imagePreview
});

loading = false;

if (result.success) {
	successMessage = 'Profile completed successfully.';

	setTimeout(() => {
		goto(resolve('/student-dashboard'));
	}, 1200);
} else {
	switch (result.message) {
		case 'Firebase: Error (permission-denied).':
			errorMessage = 'Permission denied.';
			break;

		case 'Firebase: Error (not-found).':
			errorMessage = 'Student profile not found.';
			break;

case 'Admission number already exists.':
	errorMessage =
		'This admission number is already registered.';
	break;
	}
}
}

onMount(() => {

	protectRoute();

});
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
								{#if errorMessage}
	<div class="mt-5 rounded-xl bg-red-100 p-3 text-center text-sm font-medium text-red-700">
		{errorMessage}
	</div>
{/if}

{#if successMessage}
	<div class="mt-5 rounded-xl bg-green-100 p-3 text-center text-sm font-medium text-green-700">
		{successMessage}
	</div>
{/if}
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
	disabled={loading}
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
	disabled={loading}
	oninput={(e) => {
	const target = /** @type {HTMLInputElement} */ (e.target);

	target.value = target.value.replace(/[^A-Za-z ]/g, '');

	studentName = target.value;
}}
	class="w-full rounded-xl border border-slate-300 px-4 py-3"
/>
				</div>

<!-- Admission Number -->

<div>
	<label class="mb-2 block font-semibold">
		Admission Number
	</label>

<input
	bind:value={admissionNumber}
	type="text"
	placeholder="Enter Admission Number"
	disabled={loading}
	oninput={(e) => {
		const target = /** @type {HTMLInputElement} */ (e.target);

		target.value = target.value
			.toUpperCase()
			.replace(/[^A-Z0-9]/g, '');

		admissionNumber = target.value;
	}}
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
	disabled={loading}
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
						Year of Studying
					</label>

<select
	bind:value={year}
	disabled={!department || loading}
	class="w-full rounded-xl border border-slate-300 px-4 py-3"
>
						<option value="">Select Year</option>

						{#each getAvailableYears() as yr(yr)}
							<option value={yr}>
								{yr}
							</option>
						{/each}
					</select>
				</div>

<div>
	<label class="mb-2 block font-semibold">
		Academic Year
	</label>

	<input
		bind:value={academicYear}
		type="text"
		maxlength="9"
		placeholder="Starting Year -  Ending Year"
		disabled={loading}
		oninput={(e) => {
			const target = /** @type {HTMLInputElement} */ (e.target);

			target.value = target.value
				.replace(/[^0-9-]/g, '')
				.slice(0, 9);

			academicYear = target.value;
		}}
		class="w-full rounded-xl border border-slate-300 px-4 py-3"
	/>
</div>

				<!-- DOB -->

				<div>
					<label class="mb-2 block font-semibold">
						Date of Birth
					</label>

<input
	bind:value={dob}
	type="date"
	disabled={loading}
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
	inputmode="numeric"
	maxlength="10"
	placeholder="9876543210"
	disabled={loading}
	oninput={(e) => {
		const target = /** @type {HTMLInputElement} */ (e.target);
		target.value = target.value.replace(/\D/g, '');
		phoneNumber = target.value;
	}}
	class="w-full rounded-xl border border-slate-300 px-4 py-3"
/>
				</div>

<div>
	<label class="mb-2 block font-semibold">
		Gender
	</label>

	<select
		bind:value={gender}
		disabled={loading}
		class="w-full rounded-xl border border-slate-300 px-4 py-3"
	>
		<option value="">Select Gender</option>
		<option value="Male">Male</option>
		<option value="Female">Female</option>
		<option value="Other">Other</option>
	</select>
</div>

				<!-- Button -->

				<div>
<button
	type="submit"
	disabled={loading}
	class="w-full rounded-xl bg-gradient-to-r from-blue-700 to-sky-500 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-50"
>
	{loading ? 'Saving Profile...' : 'Save & Continue'}
</button>
				</div>
			</form>
		</div>
	</main>

	<Footer />
</div>