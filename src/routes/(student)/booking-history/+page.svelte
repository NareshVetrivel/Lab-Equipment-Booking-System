<script>
	import Header from '$lib/components/Header.svelte';
	import StudentNavbar from '$lib/components/StudentNavbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import BookingHistoryCard from '$lib/components/BookingHistoryCard.svelte';
	import { onMount } from 'svelte';
	import { protectRoute } from '$lib/utils/authGuard';

	let search = $state('');
	let status = $state('All');

	const statusOptions = [
		'All',
		'Pending',
		'Approved',
		'Returned',
		'Rejected'
	];

	const bookings = [
		{
			id: 1,
			equipmentName: 'Arduino Uno',
			department: 'Computer Science',
			bookingDate: '25 June 2026',
			returnDate: '28 June 2026',
			status: 'Approved',
			image: 'https://picsum.photos/400/250?1'
		},
		{
			id: 2,
			equipmentName: 'Raspberry Pi',
			department: 'Computer Science',
			bookingDate: '20 June 2026',
			returnDate: '23 June 2026',
			status: 'Pending',
			image: 'https://picsum.photos/400/250?2'
		},
		{
			id: 3,
			equipmentName: 'Microscope',
			department: 'Botany',
			bookingDate: '18 June 2026',
			returnDate: '21 June 2026',
			status: 'Returned',
			image: 'https://picsum.photos/400/250?3'
		},
		{
			id: 4,
			equipmentName: 'Spectrometer',
			department: 'Physics',
			bookingDate: '15 June 2026',
			returnDate: '18 June 2026',
			status: 'Rejected',
			image: 'https://picsum.photos/400/250?4'
		}
	];

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

		{#if filteredBookings.length === 0}

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