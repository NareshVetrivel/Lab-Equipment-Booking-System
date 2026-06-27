<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import AdminNavbar from '$lib/components/AdminNavbar.svelte';

	import BookingRequestTable from '$lib/components/BookingRequestTable.svelte';

	/** @type {any[]} */
	let requests = [
		{
			id: 'REQ001',
			student: 'Naresh',
			department: 'Computer',
			equipment: 'Arduino Uno',
			quantity: 2,
			requestDate: '15-07-2026',
			requestTime: '10:30 AM',
			status: 'Pending'
		},
		{
			id: 'REQ002',
			student: 'Arun',
			department: 'Physics',
			equipment: 'Oscilloscope',
			quantity: 1,
			requestDate: '15-07-2026',
			requestTime: '11:15 AM',
			status: 'Pending'
		},
		{
			id: 'REQ003',
			student: 'Priya',
			department: 'Chemistry',
			equipment: 'Beaker Set',
			quantity: 5,
			requestDate: '16-07-2026',
			requestTime: '09:20 AM',
			status: 'Pending'
		},
		{
			id: 'REQ004',
			student: 'Karthik',
			department: 'Botany',
			equipment: 'Plant Slides',
			quantity: 3,
			requestDate: '16-07-2026',
			requestTime: '01:45 PM',
			status: 'Pending'
		},
		{
			id: 'REQ005',
			student: 'Vijay',
			department: 'Zoology',
			equipment: 'Microscope',
			quantity: 1,
			requestDate: '17-07-2026',
			requestTime: '10:10 AM',
			status: 'Pending'
		}
	];

	/**
	 * @param {any} request
	 */
	function handleAccept(request) {
		requests = requests.map((item) =>
			item.id === request.id
				? { ...item, status: 'Approved' }
				: item
		);
	}

	/**
	 * @param {any} request
	 */
	function handleReject(request) {
		requests = requests.map((item) =>
			item.id === request.id
				? { ...item, status: 'Rejected' }
				: item
		);
	}
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

		<!-- Booking Request Table -->

		<BookingRequestTable
			{requests}
			onAccept={handleAccept}
			onReject={handleReject}
		/>

	</main>

	<!-- Footer -->

	<Footer />

</div>