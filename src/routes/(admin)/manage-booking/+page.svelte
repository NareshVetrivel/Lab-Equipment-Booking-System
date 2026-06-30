<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import AdminNavbar from '$lib/components/AdminNavbar.svelte';

	import BookingToolbar from '$lib/components/BookingToolbar.svelte';
	import DepartmentBookingFilter from '$lib/components/DepartmentBookingFilter.svelte';
	import ManageBookingTable from '$lib/components/ManageBookingTable.svelte';

let search = $state('');

let selectedDepartment = $state('All');

import { onMount } from 'svelte';
import { protectAdminRoute } from '$lib/utils/adminGuard';
import { db } from '$lib/firebase/firebase';

import {
	collection,
	getDocs,
	query,
	where,
	orderBy
} from 'firebase/firestore';

/** @type {any[]} */
let bookings = $state([]);

let loading = $state(false);

const filteredBookings = $derived.by(() => {

	return bookings.filter((booking) => {

const keyword = search.toLowerCase();

const matchesSearch =

	booking.student
		.toLowerCase()
		.includes(keyword) ||

	booking.studentDepartment
		.toLowerCase()
		.includes(keyword) ||

	booking.studentPhone
		.toLowerCase()
		.includes(keyword) ||

	booking.equipment
		.toLowerCase()
		.includes(keyword) ||

	booking.department
		.toLowerCase()
		.includes(keyword);

		const matchesDepartment =

			selectedDepartment === 'All' ||

			booking.department === selectedDepartment;

		return matchesSearch && matchesDepartment;

	});

});

	/**
	 * @param {string} value
	 */
	function handleSearch(value) {
		search = value;
	}

	/**
	 * @param {string} department
	 */
	function handleDepartment(department) {
		selectedDepartment = department;
	}

	async function loadBookings() {

	loading = true;

	try {

		const snapshot = await getDocs(

			query(

				collection(db, 'bookings'),

				where('status', '==', 'Approved'),

				orderBy('approvedAt', 'desc')

			)

		);

		bookings = snapshot.docs.map((document) => {

			const data = document.data();

return {

	id: document.id,

	student: data.studentName ?? '-',

	studentDepartment:
		data.studentDepartment ?? '-',

	studentPhone:
		data.studentPhone ?? '-',

	equipment:
		data.equipmentName ?? '-',

	department:
		data.department ?? '-',

	acceptDate:
		data.approvedAt
			? data.approvedAt
				.toDate()
				.toLocaleDateString()
			: '-',

	status:
		data.returnedAt
			? 'Returned'
			: 'Using',

	returnDate:
		data.returnedAt
			? data.returnedAt
				.toDate()
				.toLocaleDateString()
			: '-'

};

		});

	}
	catch (error) {

		console.error(error);

		bookings = [];

	}
	finally {

		loading = false;

	}

}

onMount(() => {
protectAdminRoute();
	loadBookings();

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
				Manage Booking
			</h1>

			<p class="mt-2 text-slate-600">
				View all laboratory equipment bookings and their current status.
			</p>

		</div>

		<!-- Search Toolbar -->

		<div class="mb-6">

			<BookingToolbar
				search={search}
				onSearch={handleSearch}
			/>

		</div>

		<!-- Department Filter -->

		<div class="mb-6">

			<DepartmentBookingFilter
				selectedDepartment={selectedDepartment}
				onSelect={handleDepartment}
			/>

		</div>

		<!-- Booking Table -->

{#if loading}

<div class="rounded-3xl bg-white p-10 text-center shadow-lg">

	Loading bookings...

</div>

{:else}

<ManageBookingTable
	bookings={filteredBookings}
/>

{/if}

	</main>

	<!-- Footer -->

	<Footer />

</div>