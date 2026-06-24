<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { resolve } from '$app/paths';
</script>

<div
	class="relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-br from-blue-50 via-white to-sky-100"
>
	<!-- Floating Background Effects -->
	<div class="pointer-events-none absolute inset-0 overflow-hidden">
		<div
			class="absolute -left-20 top-20 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl animate-pulse"
		></div>

		<div
			class="absolute right-0 top-40 h-96 w-96 rounded-full bg-sky-400/20 blur-3xl animate-pulse"
		></div>

		<div
			class="absolute bottom-10 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-300/10 blur-3xl"
		></div>
	</div>

	<Header />

	<main class="relative z-10 flex-1">
		<section
			class="mx-auto grid min-h-[calc(100vh-180px)] max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:px-8"
		>
			<!-- Left Hero Section -->
			<div
				class="rounded-3xl border border-white/40 bg-white/60 p-8 shadow-xl backdrop-blur-md"
			>
				<div class="space-y-6">
					<div
						class="inline-flex items-center rounded-full border border-sky-200 bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-700 shadow-sm"
					>
						🔬 College Laboratory Management System
					</div>

					<h1
						class="text-4xl font-extrabold leading-tight text-blue-950 sm:text-5xl lg:text-6xl"
					>
						Lab Equipment
						<span class="text-sky-600">Booking System</span>
					</h1>

					<p
						class="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg"
					>
						A professional academic platform for managing laboratory
						equipment bookings, approvals, returns, inventory tracking,
						damage reports, and student requests efficiently.
					</p>

					<div class="flex flex-wrap gap-4">
						<a 
							href={resolve('/(student)/student-login')}
							class="rounded-xl bg-gradient-to-r from-blue-700 to-sky-500 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl"
						>
							🎓 Student Portal
						</a>

						<a 
							href={resolve('/(admin)/admin-login')}
							class="rounded-xl bg-gradient-to-r from-slate-700 to-slate-900 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl"
						>
							👨‍💼 Admin Portal
						</a>
					</div>
				</div>
			</div>

			<!-- Right Cards -->
			<div class="grid gap-5 sm:grid-cols-2">
				<div
					class="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:border-blue-300 hover:shadow-2xl"
				>
					<p class="text-sm font-semibold text-slate-500">
						Student Workflow
					</p>

					<h3 class="mt-3 text-2xl font-bold text-blue-950">
						📚 Book & Track
					</h3>

					<p class="mt-2 text-sm text-slate-600">
						Request equipment, monitor approvals, and track booking history.
					</p>
				</div>

				<div
					class="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:border-blue-300 hover:shadow-2xl"
				>
					<p class="text-sm font-semibold text-slate-500">
						Admin Workflow
					</p>

					<h3 class="mt-3 text-2xl font-bold text-blue-950">
						🛠️ Manage & Approve
					</h3>

					<p class="mt-2 text-sm text-slate-600">
						Manage equipment inventory, approvals, fines, and reports.
					</p>
				</div>

				<div
					class="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:border-green-300 hover:shadow-2xl"
				>
					<p class="text-4xl font-bold text-green-600">50+</p>

					<p class="mt-2 text-slate-600">
						Laboratory Equipment Available
					</p>
				</div>

				<div
					class="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:border-orange-300 hover:shadow-2xl"
				>
					<p class="text-4xl font-bold text-orange-500">5</p>

					<p class="mt-2 text-slate-600">
						Laboratory Categories Supported
					</p>
				</div>

				<div
					class="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:border-purple-300 hover:shadow-2xl"
				>
					<p class="text-4xl font-bold text-purple-600">100+</p>

					<p class="mt-2 text-slate-600">
						Bookings Processed
					</p>
				</div>

				<div
					class="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:border-cyan-300 hover:shadow-2xl"
				>
					<p class="text-4xl font-bold text-cyan-600">24/7</p>

					<p class="mt-2 text-slate-600">
						System Accessibility
					</p>
				</div>
			</div>
		</section>
	</main>

	<Footer />
</div>