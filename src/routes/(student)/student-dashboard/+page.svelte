<script>
	import Header from '$lib/components/Header.svelte';
	import StudentNavbar from '$lib/components/StudentNavbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { onMount } from 'svelte';
	import { auth, db } from '$lib/firebase/firebase';
	import { doc, getDoc } from 'firebase/firestore';
	import { onAuthStateChanged } from 'firebase/auth';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { protectRoute } from '$lib/utils/authGuard';

	const today = new Date();

	const currentDate = today.toLocaleDateString('en-IN', {
		day: '2-digit',
		month: 'long',
		year: 'numeric'
	});

	const currentDay = today.toLocaleDateString('en-IN', {
		weekday: 'long'
	});

let student = $state({
	name: '',
	admissionNumber: '',
	department: '',
	year: '',
	dob: '',
	status: 'ACTIVE',
	photo: '',
	email: ''
});

	const rules = [
		'Student ID card is mandatory while using the laboratory.',
		'Equipment should be handled carefully.',
		'Equipment must be returned on time.',
		'Damaged equipment must be reported immediately.',
		'Unauthorized usage of equipment is prohibited.',
		'Laboratory safety guidelines must be followed.',
		'Booking confirmation is required before usage.',
		'Students are responsible for booked equipment.',
		'Keep the laboratory clean and maintain discipline.',
		'Follow all instructions given by lab in-charge.'
	];

onMount(() => {
	protectRoute();
	const unsubscribe = onAuthStateChanged(auth, async (user) => {
		console.log(user);

		if (!user) {
			goto(resolve('/student-login'));
			return;
		}

		const snapshot = await getDoc(doc(db, 'students', user.uid));

		if (!snapshot.exists()) return;

		const data = snapshot.data();

student = {
	name: data.studentName,
	admissionNumber: data.admissionNumber,
	department: data.department,
	year: data.year,
	dob: data.dob,
	status: 'ACTIVE',
	photo: data.photoURL || '/student-avatar.png',
	email: data.email
};
	});

	return unsubscribe;
});

	const fines = [
		{
			sno: 1,
			type: 'Late Return (Per Day)',
			amount: '₹ 50 / day'
		},
		{
			sno: 2,
			type: 'Minor Damage',
			amount: '₹ 200'
		},
		{
			sno: 3,
			type: 'Major Damage',
			amount: '₹ 1000'
		},
		{
			sno: 4,
			type: 'Lost Equipment',
			amount: 'Full Cost Recovery'
		},
		{
			sno: 5,
			type: 'Unauthorized Usage',
			amount: '₹ 500'
		}
	];
</script>

<div class="min-h-screen bg-slate-100">
	<Header showUserMenu={true} />

	<StudentNavbar />

	<main class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

		<!-- Welcome Card -->

		<div class="mb-6 rounded-3xl bg-white p-6 shadow-lg">
			<div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

				<div>
					<h2 class="text-2xl font-bold text-blue-900 sm:text-3xl">
						👋 Welcome, Student!
					</h2>

					<p class="mt-2 text-slate-600">
						Here's your lab dashboard. Please follow the rules and keep the lab safe.
					</p>
				</div>

				<div
					class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-center shadow-sm sm:px-6 sm:py-4"
				>
<p class="text-xl font-bold text-slate-800">
	{currentDate}
</p>

<p class="text-slate-500">
	{currentDay}
</p>
				</div>

			</div>
		</div>

		<!-- E-Lab Card + Rules -->

		<div class="mb-8 grid gap-6 lg:grid-cols-2">

<!-- Student Card -->

<div class="rounded-3xl bg-white p-5 shadow-lg sm:p-6 lg:min-h-[500px]">

	<h2 class="mb-6 text-2xl font-bold text-blue-700">
		🪪 E-LAB STUDENT CARD
	</h2>

	<div class="flex flex-col gap-6 md:flex-row">

		<!-- Photo -->

		<div
			class="mx-auto h-40 w-32 overflow-hidden rounded-xl border-4 border-blue-100 shadow-md sm:mx-0 sm:h-48 sm:w-36"
		>
			<img
				src={student.photo}
				alt="Student"
				class="h-full w-full object-cover"
			/>
		</div>

		<!-- Details -->

		<div class="flex-1">

			<div class="space-y-4 text-base sm:text-lg">

				<p>
					<span class="font-bold text-blue-900">
						Student Name :
					</span>

					{student.name}
				</p>

<p>
	<span class="font-bold text-blue-900">
		Admission Number :
	</span>

	{student.admissionNumber}
</p>

				<p>
					<span class="font-bold text-blue-900">
						Department :
					</span>

					{student.department}
				</p>

				<p>
					<span class="font-bold text-blue-900">
						Year :
					</span>

					{student.year}
				</p>

				<p>
					<span class="font-bold text-blue-900">
						Date of Birth :
					</span>

					{student.dob}
				</p>

			</div>

		</div>

	</div>

	<!-- STATUS BAR -->

	<div class="mt-12 flex justify-center">

		<div
			class="w-full max-w-md rounded-xl bg-green-600 py-3 text-center text-base font-bold text-white shadow-md sm:text-lg"
		>
			● STATUS : {student.status}
		</div>

	</div>

</div>

			<!-- Rules -->

			<div class="rounded-3xl bg-white p-5 shadow-lg sm:p-6 lg:min-h-[500px]">

				<h2 class="mb-6 text-2xl font-bold text-blue-700">
					🛡️ LAB RULES & REGULATIONS
				</h2>

<div
	class="h-72 overflow-y-auto pr-2 sm:h-80 lg:h-[380px]"
	style="scrollbar-width: thin;"
>
	<div class="space-y-3">

		{#each rules as rule (rule)}

			<div
				class="flex items-start gap-3 rounded-xl bg-blue-50 p-3"
			>
				<span class="font-bold text-green-600">
					✔
				</span>

				<span>
					{rule}
				</span>
			</div>

		{/each}

	</div>
</div>

		</div>

		<!-- Fine Policy -->

		<div class="rounded-3xl bg-white p-5 shadow-lg sm:p-8">

			<h2 class="mb-6 text-2xl font-bold text-red-700">
				⚠️ Fine & Damage Policy
			</h2>

			<div class="overflow-x-auto">

				<table class="w-full border-collapse">

					<thead>

						<tr
							class="bg-gradient-to-r from-blue-900 to-blue-700 text-white"
						>
							<th class="p-4 text-left">
								S.No
							</th>

							<th class="p-4 text-left">
								Violation Type
							</th>

							<th class="p-4 text-left">
								Fine Amount
							</th>
						</tr>

					</thead>

					<tbody>

						{#each fines as fine (fine.sno)}

							<tr
								class="border-b hover:bg-slate-50"
							>
								<td class="p-4">
									{fine.sno}
								</td>

								<td class="p-4">
									{fine.type}
								</td>

								<td class="p-4 font-semibold text-red-600">
									{fine.amount}
								</td>
							</tr>

						{/each}

					</tbody>

				</table>

			</div>

		</div>

		<!-- Important Note -->

		<div
			class="rounded-3xl border border-blue-100 bg-blue-50 p-5 shadow-lg sm:p-6"
		>

			<h2
				class="mb-4 text-2xl font-bold text-blue-700"
			>
				ℹ️ Important Note
			</h2>

			<p class="text-slate-700">
				Please read all laboratory rules carefully before using any equipment.
				Students are responsible for any damage caused due to improper handling.
			</p>

			<p class="mt-3 font-semibold text-blue-900">
				Let's work together to maintain a safe and clean laboratory environment.
			</p>

		</div>

	</main>

	<Footer />
</div>