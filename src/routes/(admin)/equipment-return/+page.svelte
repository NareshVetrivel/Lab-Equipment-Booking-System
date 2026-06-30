<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import AdminNavbar from '$lib/components/AdminNavbar.svelte';

	import EquipmentReturnTable from '$lib/components/EquipmentReturnTable.svelte';
	import ReturnConfirmationModal from '$lib/components/ReturnConfirmationModal.svelte';
	import FineRulesCard from '$lib/components/FineRulesCard.svelte';

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
	updateDoc,
	getDoc,
	serverTimestamp
} from 'firebase/firestore';

	let showModal = $state(false);

	/** @type {any} */
	let selectedReturn = $state({});

/** @type {any[]} */
let returns = $state([]);

let loading = $state(false);

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

async function loadReturns() {

	loading = true;

	try {

		const snapshot = await getDocs(

			query(

				collection(db, 'bookings'),

				where('status', '==', 'Approved'),

				orderBy('approvedAt', 'desc')

			)

		);

		returns = snapshot.docs.map((document) => {

			const data = document.data();

			const issuedDate =
				data.approvedAt?.toDate();

			let dueDate = '';

			if (issuedDate) {

const dueTimestamp =
	issuedDate.getTime() +
	(data.returnWithinDays ?? 0) *
	24 *
	60 *
	60 *
	1000;

dueDate = new Intl.DateTimeFormat(
	'en-IN'
).format(dueTimestamp);

			}

			return {

				id: document.id,

				...data,

				student: data.studentName,

				studentDepartment:
					data.studentDepartment,

				studentPhone:
					data.studentPhone,

				equipment:
					data.equipmentName,

				issuedDate:
					issuedDate?.toLocaleDateString(),

				dueDate

			};

		});

	}
	catch (error) {

		console.error(error);

		returns = [];

	}

	loading = false;

}

	/**
	 * @param {any} returnedItem
	 */
async function confirmReturn(returnedItem) {

	try {

		await updateDoc(

			doc(db, 'bookings', returnedItem.id),

			{

				status: 'Returned',

				returnedAt:
					serverTimestamp(),

				returnedBy:
					auth.currentUser?.uid ?? '',

				lateDays:
					returnedItem.lateDays,

				lateFine:
					returnedItem.lateFine,

				damageType:
					returnedItem.damageType,

				damageFine:
					returnedItem.damageFine,

				totalFine:
					returnedItem.totalFine

			}

		);

		const equipmentRef = doc(

			db,

			'equipments',

			returnedItem.equipmentId

		);

		const equipmentDoc =
			await getDoc(equipmentRef);

		if (equipmentDoc.exists()) {

			const equipment =
				equipmentDoc.data();

			await updateDoc(

				equipmentRef,

				{

					available:

						Number(
							equipment.available
						) + 1

				}

			);

		}

		alert(

			`Equipment Returned Successfully\n\nTotal Fine : ₹${returnedItem.totalFine}`

		);

		showModal = false;

		await loadReturns();

	}
	catch (error) {

		console.error(error);

		alert('Unable to return equipment.');

	}

}

onMount(() => {
protectAdminRoute();
	loadReturns();

});
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

{#if loading}

<div class="rounded-3xl bg-white p-10 text-center shadow-lg">

	Loading equipment returns...

</div>

{:else}

<EquipmentReturnTable
	returns={returns}
	onReturn={openReturnModal}
/>

{/if}

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