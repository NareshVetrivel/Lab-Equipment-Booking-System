<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import AdminNavbar from '$lib/components/AdminNavbar.svelte';

	import BookingRequestTable from '$lib/components/BookingRequestTable.svelte';

import { onMount } from 'svelte';
import { protectAdminRoute } from '$lib/utils/adminGuard';
import { db, auth } from '$lib/firebase/firebase';

import {
	collection,
	getDocs,
	query,
	where,
	orderBy,
	doc,
	getDoc,
	updateDoc,
	serverTimestamp
} from 'firebase/firestore';

/** @type {any[]} */
let requests = $state([]);

let loading = $state(false);

	/**
	 * @param {any} request
	 */
async function handleAccept(request) {

	const equipmentRef = doc(
		db,
		'equipments',
		request.equipmentId
	);

	const equipmentDoc =
		await getDoc(equipmentRef);

	if (!equipmentDoc.exists()) {

		return;

	}

	const equipment =
		equipmentDoc.data();

	if (equipment.available <= 0) {

		alert('Equipment out of stock.');

		return;

	}

	await updateDoc(

		doc(db, 'bookings', request.id),

		{

			status: 'Approved',

			approvedAt:
				serverTimestamp(),

			approvedBy:
				auth.currentUser?.uid ?? ''

		}

	);

	await updateDoc(

		equipmentRef,

		{

			available:
				equipment.available - 1

		}

	);

	loadRequests();

}

	/**
	 * @param {any} request
	 */
async function handleReject(request) {

	await updateDoc(

		doc(db, 'bookings', request.id),

		{

			status: 'Rejected',

			updatedAt:
				serverTimestamp()

		}

	);

	loadRequests();

}

	async function loadRequests() {

	loading = true;

	try {

		const snapshot = await getDocs(

			query(

				collection(db, 'bookings'),

				where('status', '==', 'Pending'),

				orderBy('createdAt', 'desc')

			)

		);

		requests = snapshot.docs.map((document) => {

			const data = document.data();

			const bookedDate =
				data.createdAt?.toDate();

			return {

				id: document.id,

				...data,

				requestDate:
					bookedDate?.toLocaleDateString(),

				requestTime:
					bookedDate?.toLocaleTimeString()

			};

		});

	}
	catch (error) {

		console.error(error);

		requests = [];

	}

	loading = false;

}

onMount(() => {
protectAdminRoute();
	loadRequests();

});
</script>

<div class="min-h-screen bg-slate-100">

	<!-- Header -->

	<Header />

	<!-- Admin Navbar -->

	<AdminNavbar />

	<!-- Main Content -->

	<main class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

		<!-- Page Header -->

		<div class="mb-8">

			<h1 class="text-3xl font-bold text-blue-900">
				Booking Requests
			</h1>

			<p class="mt-2 text-slate-600">
				Review and approve or reject equipment booking requests submitted by students.
			</p>

		</div>

{#if loading}

<div class="rounded-3xl bg-white p-10 text-center shadow-lg">

	<p class="text-lg font-semibold text-slate-600">
		Loading booking requests...
	</p>

</div>

{:else}

<BookingRequestTable
	{requests}
	onAccept={handleAccept}
	onReject={handleReject}
/>

{/if}

	<!-- Footer -->

	<Footer />

</div>