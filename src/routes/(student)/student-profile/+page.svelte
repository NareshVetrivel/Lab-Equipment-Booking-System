<script>
	import Header from '$lib/components/Header.svelte';
	import StudentNavbar from '$lib/components/StudentNavbar.svelte';
	import Footer from '$lib/components/Footer.svelte';

	import StudentProfileCard from '$lib/components/StudentProfileCard.svelte';
	import ProfileInformationCard from '$lib/components/ProfileInformationCard.svelte';
	import AcademicInformationCard from '$lib/components/AcademicInformationCard.svelte';
	import AccountStatusCard from '$lib/components/AccountStatusCard.svelte';

	const student = {
		name: 'Naresh S',
		registerNumber: '23MCA101',

		course: 'Master of Computer Applications',
		department: 'MCA',

		academicYear: '2025 - 2026',
		semester: 'III',
		section: 'A',
		admissionYear: '2024',

		year: 'II Year',

		dob: '27-04-2005',
		gender: 'Male',

		email: '23mca101@sonatech.ac.in',
		phone: '+91 9876543210',

		address: 'Salem, Tamil Nadu',

		status: 'ACTIVE',

		photo: '/student-avatar.png'
	};
</script>

<div class="min-h-screen bg-slate-100">

	<Header />

	<StudentNavbar />

<main class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

	<!-- Page Header -->

	<div class="mb-10 text-center">

		<h1 class="text-3xl font-bold text-blue-900 sm:text-4xl">
			Student Profile
		</h1>

		<p class="mt-2 text-slate-600">
			View your personal, academic and laboratory account information.
		</p>

	</div>

	<!-- Desktop / Mobile Layout -->

	<div
		class="grid gap-8 xl:grid-cols-12"
	>

		<!-- Student Profile -->

		<div class="xl:col-span-3">

			<StudentProfileCard
				{student}
			/>

		</div>

		<!-- Right Content -->

		<div
			class="space-y-8 xl:col-span-9"
		>

			<!-- Personal Information -->

			<ProfileInformationCard
				{student}
			/>

			<!-- Bottom Cards -->

			<div
				class="grid gap-8 xl:grid-cols-2"
			>

				<AcademicInformationCard
					{student}
				/>

				<AccountStatusCard
					{student}
				/>

			</div>

		</div>

	</div>

</main>
	<Footer />
</div>