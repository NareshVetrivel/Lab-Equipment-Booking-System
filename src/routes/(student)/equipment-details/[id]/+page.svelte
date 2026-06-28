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

	const equipments = [
		{
			id: 1,
			name: 'Arduino Uno',
			department: 'Computer Science',
			quantity: 10,
			status: 'Available',
			location: 'Computer Science Lab',
			description:
				'Arduino Uno is used for embedded systems and IoT projects.',
			image: 'https://picsum.photos/800/500?1'
		},
		{
			id: 2,
			name: 'Raspberry Pi',
			department: 'Computer Science',
			quantity: 7,
			status: 'Available',
			location: 'Computer Science Lab',
			description:
				'Raspberry Pi is a small computer used for programming and networking experiments.',
			image: 'https://picsum.photos/800/500?2'
		},
		{
			id: 3,
			name: 'Breadboard',
			department: 'Computer Science',
			quantity: 2,
			status: 'Limited Stock',
			location: 'Computer Science Lab',
			description:
				'Breadboard is used for circuit prototyping without soldering.',
			image: 'https://picsum.photos/800/500?3'
		},
		{
			id: 4,
			name: 'Microscope',
			department: 'Botany',
			quantity: 8,
			status: 'Available',
			location: 'Botany Lab',
			description:
				'Microscope is used to observe microscopic organisms and cells.',
			image: 'https://picsum.photos/800/500?4'
		},
		{
			id: 5,
			name: 'Spectrometer',
			department: 'Physics',
			quantity: 3,
			status: 'Limited Stock',
			location: 'Physics Lab',
			description:
				'Spectrometer is used for optical experiments and wavelength measurements.',
			image: 'https://picsum.photos/800/500?5'
		}
	];

	const equipmentId = Number(page.params.id);

	const equipment = equipments.find(
		(item) => item.id === equipmentId
	);

	/**
	 * @param {string} status
	 */
	function getStatusColor(status) {
		if (status === 'Available') {
			return 'bg-green-100 text-green-700';
		}

		if (status === 'Limited Stock') {
			return 'bg-yellow-100 text-yellow-700';
		}

		return 'bg-red-100 text-red-700';
	}

let showConfirmModal = $state(false);
let showSuccessPopup = $state(false);

function handleBooking() {
	showConfirmModal = false;
	showSuccessPopup = true;

	setTimeout(() => {
		showSuccessPopup = false;
	}, 3000);
}

onMount(() => {

	protectRoute();

});
</script>

<div class="min-h-screen bg-slate-100">
	<Header showUserMenu={true} />

	<StudentNavbar />

	<main class="mx-auto max-w-7xl px-4 py-8">

		{#if equipment}

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