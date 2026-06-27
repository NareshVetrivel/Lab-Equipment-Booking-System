<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import AdminNavbar from '$lib/components/AdminNavbar.svelte';

	import BookingToolbar from '$lib/components/BookingToolbar.svelte';
	import DepartmentBookingFilter from '$lib/components/DepartmentBookingFilter.svelte';
	import ManageBookingTable from '$lib/components/ManageBookingTable.svelte';

	let search = '';
	let selectedDepartment = 'All';

	/** @type {any[]} */
	let bookings = [
		{
			id: 'BK001',
			student: 'Naresh',
			equipment: 'Arduino Uno',
			department: 'Computer',
			acceptDate: '27-03-2023',
			status: 'Using',
			returnDate: ''
		},
		{
			id: 'BK002',
			student: 'Arun',
			equipment: 'Oscilloscope',
			department: 'Physics',
			acceptDate: '25-05-2024',
			status: 'Returned',
			returnDate: '28-05-2024'
		},
		{
			id: 'BK003',
			student: 'Karthik',
			equipment: 'Microscope',
			department: 'Zoology',
			acceptDate: '15-06-2025',
			status: 'Using',
			returnDate: ''
		},
		{
			id: 'BK004',
			student: 'Priya',
			equipment: 'Beaker Set',
			department: 'Chemistry',
			acceptDate: '10-02-2025',
			status: 'Returned',
			returnDate: '13-02-2025'
		},
		{
			id: 'BK005',
			student: 'Vijay',
			equipment: 'Plant Slides',
			department: 'Botany',
			acceptDate: '01-07-2025',
			status: 'Using',
			returnDate: ''
		}
	];

	function filteredBookings() {
		return bookings.filter((booking) => {
			const matchesSearch =
				booking.student.toLowerCase().includes(search.toLowerCase()) ||
				booking.equipment.toLowerCase().includes(search.toLowerCase()) ||
				booking.department.toLowerCase().includes(search.toLowerCase());

			const matchesDepartment =
				selectedDepartment === 'All'
					? true
					: booking.department === selectedDepartment;

			return matchesSearch && matchesDepartment;
		});
	}

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

<ManageBookingTable
	bookings={filteredBookings()}
/>

	</main>

	<!-- Footer -->

	<Footer />

</div>