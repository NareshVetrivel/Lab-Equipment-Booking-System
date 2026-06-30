<script>
	import Header from '$lib/components/Header.svelte';
	import StudentNavbar from '$lib/components/StudentNavbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import BookingHistoryCard from '$lib/components/BookingHistoryCard.svelte';
	import { onMount } from 'svelte';
	import { protectRoute } from '$lib/utils/authGuard';
	import { onAuthStateChanged } from 'firebase/auth';
	import { auth, db } from '$lib/firebase/firebase';

import {
	collection,
	getDocs,
	query,
	where,
	orderBy
} from 'firebase/firestore';

	let search = $state('');
	let status = $state('All');

	const statusOptions = [
		'All',
		'Pending',
		'Approved',
		'Returned',
		'Rejected'
	];

/** @type {any[]} */
let bookings = $state([]);

let loading = $state(false);

/**
 * @param {import('firebase/auth').User} user
 */
async function loadBookings(user) {

	try {

		loading = true;

		const snapshot = await getDocs(

			query(

				collection(db, 'bookings'),

				where('studentId', '==', user.uid),

				orderBy('createdAt', 'desc')

			)

		);

		bookings = snapshot.docs.map((document) => {

			const data = document.data();

			const bookingDate = data.createdAt?.toDate();

			let returnDate = '';

			if (bookingDate) {

				const returnTimestamp =
					bookingDate.getTime() +
					(data.returnWithinDays ?? 0) *
					24 * 60 * 60 * 1000;

				returnDate = new Intl.DateTimeFormat(
					'en-IN'
				).format(returnTimestamp);

			}

			return {

				id: document.id,

				...data,

				bookingDate:
					bookingDate?.toLocaleDateString(),

				returnDate

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

	const filteredBookings = $derived.by(() => {
		return bookings.filter((booking) => {
			const searchMatch = booking.equipmentName
				.toLowerCase()
				.includes(search.toLowerCase());

			const statusMatch =
				status === 'All' || booking.status === status;

			return searchMatch && statusMatch;
		});
	});

onMount(() => {

	protectRoute();

	const unsubscribe = onAuthStateChanged(

		auth,

		async (user) => {

			console.log('Logged User UID:', user?.uid);

			if (!user) {

				bookings = [];

				return;

			}

			await loadBookings(user);

		}

	);

	return unsubscribe;

});
</script>

<div class="min-h-screen bg-slate-100">

	<Header showUserMenu={true} />

	<StudentNavbar />

	<main class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

		<!-- Page Title -->

		<div class="mb-8 text-center">

			<h1 class="text-3xl font-bold text-blue-900 sm:text-4xl">
				Booking History
			</h1>

			<p class="mt-2 text-slate-600">
				View all your equipment booking records.
			</p>

		</div>

		<!-- Search & Filter -->

		<div
			class="mb-8 rounded-3xl bg-white p-4 shadow-lg sm:p-6"
		>

			<div
				class="grid gap-4 md:grid-cols-2"
			>

				<input
					bind:value={search}
					type="text"
					placeholder="Search Equipment..."
					class="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-700 focus:outline-none"
				/>

				<select
					bind:value={status}
					class="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-700 focus:outline-none"
				>

					{#each statusOptions as item (item)}

						<option value={item}>
							{item}
						</option>

					{/each}

				</select>

			</div>

		</div>

		<!-- Count -->

		<div
			class="mb-6 text-center font-semibold text-slate-600 sm:text-right"
		>
			Total Bookings : {filteredBookings.length}
		</div>

		<!-- Cards -->

{#if loading}

<div class="rounded-3xl bg-white p-10 text-center shadow-lg">

	<p class="text-lg font-semibold text-slate-600">

		Loading bookings...

	</p>

</div>

{:else if filteredBookings.length === 0}

			<div
				class="rounded-3xl bg-white px-6 py-16 text-center shadow-lg"
			>

				<div class="text-5xl">
					📖
				</div>

				<h2
					class="mt-4 text-2xl font-bold text-slate-700"
				>
					No Booking History
				</h2>

				<p
					class="mt-2 text-slate-500"
				>
					No bookings match your search.
				</p>

			</div>

		{:else}

			<div
				class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
			>

				{#each filteredBookings as booking (booking.id)}

					<BookingHistoryCard
						{booking}
					/>

				{/each}

			</div>

		{/if}

	</main>

	<Footer />

</div>