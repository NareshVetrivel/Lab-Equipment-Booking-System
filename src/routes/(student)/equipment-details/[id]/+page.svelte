<script>
import Header from '$lib/components/Header.svelte';
import StudentNavbar from '$lib/components/StudentNavbar.svelte';
import EquipmentInfoCard from '$lib/components/EquipmentInfoCard.svelte';
import BookingInfoCard from '$lib/components/BookingInfoCard.svelte';
import Footer from '$lib/components/Footer.svelte';
import { onMount } from 'svelte';
import { protectRoute } from '$lib/utils/authGuard';

import BookingConfirmationModal
	from '$lib/components/BookingConfirmationModal.svelte';

import SuccessPopup
	from '$lib/components/SuccessPopup.svelte';

import { page } from '$app/state';

import { db } from '$lib/firebase/firebase';

import { doc, getDoc } from 'firebase/firestore';

import { createBooking } from '$lib/services/bookingService';

import { auth } from '$lib/firebase/firebase';

/** @type {any} */
let equipment = $state(null);

let loading = $state(true);

	/**
	 * @param {string} status
	 */
function getStatusColor(status) {

	if (status === 'Available') {
		return 'bg-green-100 text-green-700';
	}

	if (status === 'Out of Stock') {
		return 'bg-red-100 text-red-700';
	}

	return 'bg-yellow-100 text-yellow-700';

}

	async function loadEquipment() {

	try {

		const id = page.params.id ?? '';

		const snapshot = await getDoc(
			doc(db, 'equipments', id)
		);

		if (!snapshot.exists()) {

			equipment = null;

			return;

		}

		equipment = {

			id: snapshot.id,

			...snapshot.data()

		};

	}
	catch (error) {

		console.error(error);

		equipment = null;

	}
	finally {

		loading = false;

	}

}

let showConfirmModal = $state(false);
let showSuccessPopup = $state(false);

async function handleBooking() {

	showConfirmModal = false;

	const user = auth.currentUser;

	if (!user) {

		alert('Please login.');

		return;

	}

const result = await createBooking({

	studentId: user.uid,

	studentName: user.displayName ?? '',

	studentEmail: user.email ?? '',

	equipmentId: equipment.id,

	equipmentName: equipment.name,

	department: equipment.department,

	image: equipment.image,

	returnWithinDays: equipment.returnWithinDays

});

if (!result.success) {

	showConfirmModal = false;

	alert(result.message);

	return;

}

	showSuccessPopup = true;

	setTimeout(() => {

		showSuccessPopup = false;

	}, 3000);

}

onMount(() => {

	protectRoute();

	loadEquipment();

});
</script>


<div class="min-h-screen bg-slate-100">
	<Header showUserMenu={true} />

	<StudentNavbar />

	<main class="mx-auto max-w-7xl px-4 py-8">
{#if loading}

<div class="rounded-3xl bg-white p-12 text-center shadow-lg">

	Loading Equipment...

</div>

{:else if equipment}

			<!-- Page Title -->

			<div class="mb-8 text-center">

				<h1 class="text-4xl font-bold text-blue-900">
					Equipment Details
				</h1>

				<p class="mt-2 text-slate-600">
					Complete Equipment Information
				</p>

			</div>

			<!-- Main Section -->

			<div class="grid gap-8 lg:grid-cols-2">

				<!-- Image -->

				<div
					class="overflow-hidden rounded-3xl bg-white shadow-lg"
				>

					<img
						src={equipment.image}
						alt={equipment.name}
						class="h-full w-full object-cover"
					/>

				</div>

<!-- Details -->

<EquipmentInfoCard
	{equipment}
	{getStatusColor}
/>

			</div>

<BookingInfoCard
	{equipment}
	loading={loading}
	onBook={() => (showConfirmModal = true)}
/>

		{:else}

			<div
				class="rounded-3xl bg-white p-10 text-center shadow-lg"
			>

				<h2
					class="text-3xl font-bold text-red-600"
				>
					Equipment Not Found
				</h2>

				<p class="mt-3 text-slate-600">
					The requested equipment does not exist.
				</p>

			</div>

		{/if}

	</main>
<BookingConfirmationModal
	open={showConfirmModal}
	onConfirm={handleBooking}
	onCancel={() => (showConfirmModal = false)}
/>

<SuccessPopup
	open={showSuccessPopup}
/>

<Footer />
</div>