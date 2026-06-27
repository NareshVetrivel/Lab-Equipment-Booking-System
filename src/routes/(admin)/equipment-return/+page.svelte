<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import AdminNavbar from '$lib/components/AdminNavbar.svelte';

	import EquipmentReturnTable from '$lib/components/EquipmentReturnTable.svelte';
	import ReturnConfirmationModal from '$lib/components/ReturnConfirmationModal.svelte';
	import FineRulesCard from '$lib/components/FineRulesCard.svelte';

	let showModal = $state(false);

	/** @type {any} */
	let selectedReturn = $state({});

	/** @type {any[]} */
	let returns = $state([
		{
			id: 'RT001',
			student: 'Naresh',
			equipment: 'Arduino Uno',
			department: 'Computer',
			quantity: 2,
			issuedDate: '15-07-2026',
			dueDate: '18-07-2026',
			equipmentCost: 1500
		},
		{
			id: 'RT002',
			student: 'Arun',
			equipment: 'Oscilloscope',
			department: 'Physics',
			quantity: 1,
			issuedDate: '12-07-2026',
			dueDate: '15-07-2026',
			equipmentCost: 5000
		},
		{
			id: 'RT003',
			student: 'Priya',
			equipment: 'Beaker Set',
			department: 'Chemistry',
			quantity: 5,
			issuedDate: '14-07-2026',
			dueDate: '17-07-2026',
			equipmentCost: 700
		},
		{
			id: 'RT004',
			student: 'Karthik',
			equipment: 'Microscope',
			department: 'Zoology',
			quantity: 1,
			issuedDate: '10-07-2026',
			dueDate: '14-07-2026',
			equipmentCost: 8000
		},
		{
			id: 'RT005',
			student: 'Vijay',
			equipment: 'Plant Slides',
			department: 'Botany',
			quantity: 3,
			issuedDate: '18-07-2026',
			dueDate: '21-07-2026',
			equipmentCost: 600
		}
	]);

	/**
	 * @param {any} item
	 */
	function openReturnModal(item) {
		selectedReturn = item;
		showModal = true;
	}

	function closeModal() {
		showModal = false;
	}

	/**
	 * @param {any} returnedItem
	 */
	function confirmReturn(returnedItem) {
		alert(
			`Equipment Returned Successfully\n\nTotal Fine : ₹${returnedItem.totalFine}`
		);

		returns = returns.filter(
			(item) => item.id !== returnedItem.id
		);

		showModal = false;
	}
</script>

<div class="min-h-screen bg-slate-100">

	<!-- Header -->

	<Header />

	<!-- Admin Navbar -->

	<AdminNavbar />

	<!-- Main Content -->

	<main class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

		<!-- Page Title -->

		<div class="mb-8">

			<h1 class="text-3xl font-bold text-blue-900">
				Equipment Return
			</h1>

			<p class="mt-2 text-slate-600">
				Process returned laboratory equipment and calculate fines automatically.
			</p>

		</div>

		<!-- Equipment Return Table -->

		<EquipmentReturnTable
			returns={returns}
			onReturn={openReturnModal}
		/>

		<!-- Fine Rules -->

		<FineRulesCard />

	</main>

	<!-- Return Confirmation Modal -->

	<ReturnConfirmationModal
		isOpen={showModal}
		selectedReturn={selectedReturn}
		onClose={closeModal}
		onConfirm={confirmReturn}
	/>

	<!-- Footer -->

	<Footer />

</div>