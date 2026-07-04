<script>
	import { onMount } from 'svelte';

	import Header from '$lib/components/Header.svelte';
	import StudentNavbar from '$lib/components/StudentNavbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { protectRoute } from '$lib/utils/authGuard';

	import StudentProfileCard from '$lib/components/StudentProfileCard.svelte';
	import ProfileInformationCard from '$lib/components/ProfileInformationCard.svelte';
	import AcademicInformationCard from '$lib/components/AcademicInformationCard.svelte';
	import AccountStatusCard from '$lib/components/AccountStatusCard.svelte';

	import { auth, db } from '$lib/firebase/firebase';

	import { doc, getDoc, updateDoc } from 'firebase/firestore';

	import { uploadStudentPhoto } from '$lib/services/storageService';

	import { updateStudentProfile } from '$lib/services/authService';

	import ConfirmDialog from '$lib/components/ConfirmDialog.svelte';

	import SuccessPopup from '$lib/components/SuccessPopup.svelte';

	let showPhoneDialog = $state(false);

	let phoneDialogMessage = $state('');

	/** @type {any} */
	let student = $state(null);

	let editingPhone = $state('');

	let loading = $state(false);

	let uploadingPhoto = $state(false);

	let showSuccessPopup = $state(false);

	let successPopupMessage = $state('');

	onMount(async () => {
		protectRoute();
		const user = auth.currentUser;

		if (!user) {
			return;
		}

		const document = await getDoc(doc(db, 'students', user.uid));

		if (!document.exists()) {
			return;
		}

		const data = document.data();

		student = {
			name: data.studentName,

			admissionNumber: data.admissionNumber,

			department: data.department,

			course: data.department,

			year: data.year,

			academicYear: data.academicYear,

			dob: data.dob,

			gender: data.gender,

			email: data.email,

			phone: data.phoneNumber,

			photo: data.photoURL,

			status: 'ACTIVE',

			accountCreated: data.createdAt?.toDate().getFullYear().toString() ?? '',

			lastLogin: auth.currentUser?.metadata.lastSignInTime ?? ''
		};
	});

	/**
	 * @param {string} phone
	 */
	async function updatePhone(phone) {
		const user = auth.currentUser;

		if (!user || !student) {
			return;
		}

		loading = true;

		const result = await updateStudentProfile(user.uid, {
			studentName: student.name,

			admissionNumber: student.admissionNumber,

			department: student.department,

			year: student.year,

			academicYear: student.academicYear,

			dob: student.dob,

			gender: student.gender,

			phoneNumber: phone,

			photoURL: student.photo
		});

		loading = false;

		if (result.success) {
			student.phone = phone;

			successPopupMessage = 'Phone number updated successfully.';

			showSuccessPopup = true;

			setTimeout(() => {
				showSuccessPopup = false;
			}, 2500);

			return {
				success: true
			};
		}

		switch (result.message) {
			case 'Phone number already exists.':
				phoneDialogMessage = 'This phone number is already registered.';

				showPhoneDialog = true;

				break;

			default:
				phoneDialogMessage = result.message ?? 'Unable to update phone number.';

				showPhoneDialog = true;
		}
		return {
			success: false
		};
	}

	/**
	 * @param {Event} event
	 */
	async function updateProfilePhoto(event) {
		const input = /** @type {HTMLInputElement} */ (event.currentTarget);

		const file = input.files?.[0];

		if (!file) {
			return;
		}

		const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];

		if (!allowedTypes.includes(file.type)) {
			alert('Only JPG, JPEG and PNG images are allowed.');

			return;
		}

		if (file.size > 2 * 1024 * 1024) {
			alert('Image size should not exceed 2 MB.');

			return;
		}

		const reader = new FileReader();

		reader.onload = async () => {
			const user = auth.currentUser;

			if (!user) {
				return;
			}

			uploadingPhoto = true;

			const result = await uploadStudentPhoto(/** @type {string} */ (reader.result));

			if (!result.success) {
				uploadingPhoto = false;

				alert(result.message);

				return;
			}

			await updateDoc(doc(db, 'students', user.uid), {
				photoURL: result.imageURL
			});

			if (student) {
				student.photo = result.imageURL;
			}

			uploadingPhoto = false;
		};

		reader.readAsDataURL(file);
	}
</script>

<div class="min-h-screen bg-slate-100">
	<Header userType="student" />

	<StudentNavbar />

	<main class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
		{#if student}
			<!-- Page Header -->

			<div class="mb-10 text-center">
				<h1 class="text-3xl font-bold text-blue-900 sm:text-4xl">Student Profile</h1>

				<p class="mt-2 text-slate-600">
					View your personal, academic and laboratory account information.
				</p>
			</div>

			<!-- Dashboard Layout -->

			<div class="grid grid-cols-1 gap-6 xl:grid-cols-12">
				<!-- Left Column -->

				<div class="flex flex-col gap-6 xl:col-span-4">
					<StudentProfileCard {student} {uploadingPhoto} onPhotoChange={updateProfilePhoto} />

					<AcademicInformationCard {student} />
				</div>

				<!-- Right Column -->

				<div class="flex flex-col gap-6 xl:col-span-8">
					<ProfileInformationCard {student} {editingPhone} {loading} onSave={updatePhone} />

					<AccountStatusCard {student} />
				</div>
			</div>
		{:else}
			<div class="flex items-center justify-center py-24">
				<div class="text-center">
					<div
						class="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-700"
					></div>

					<h2 class="text-xl font-semibold text-slate-600">Loading Profile...</h2>
				</div>
			</div>
		{/if}
		<ConfirmDialog
			open={showPhoneDialog}
			title="Phone Number"
			message={phoneDialogMessage}
			confirmText="OK"
			cancelText=""
			confirmColor="blue"
			onConfirm={() => {
				showPhoneDialog = false;
			}}
			onCancel={() => {
				showPhoneDialog = false;
			}}
		/>
	</main>
	<SuccessPopup open={showSuccessPopup} title="Profile Updated" message={successPopupMessage} />
	<Footer />
</div>
