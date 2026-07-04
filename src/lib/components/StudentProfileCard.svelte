<script>
	let { student, uploadingPhoto = false, onPhotoChange = () => {} } = $props();
</script>

<div
	class="rounded-3xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
>
	<!-- Header -->

	<div class="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 px-6 py-8 text-center">
		<div class="relative mx-auto w-fit">
			<img
				src={student.photo}
				alt={student.name}
				class="h-40 w-40 rounded-full border-4 border-white object-cover shadow-xl"
			/>

			<input
				id="profile-photo"
				type="file"
				accept="image/png,image/jpeg,image/jpg"
				class="hidden"
				onchange={(event) => onPhotoChange(event)}
			/>

			<label
				for="profile-photo"
				class="absolute bottom-1 right-1 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-blue-600 text-white shadow-xl transition-all duration-300 hover:scale-110 hover:bg-blue-700"
			>
				{#if uploadingPhoto}
					<svg class="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
						<circle
							class="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							stroke-width="4"
						/>

						<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
					</svg>
				{:else}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="2"
						stroke="currentColor"
						class="h-5 w-5"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M6.75 7.5l1.5-2.25h7.5l1.5 2.25H21a.75.75 0 01.75.75v9a2.25 2.25 0 01-2.25 2.25H4.5A2.25 2.25 0 012.25 17.25v-9A.75.75 0 013 7.5h3.75z"
						/>

						<circle cx="12" cy="13" r="3" />
					</svg>
				{/if}
			</label>
		</div>

		<h2 class="mt-5 text-2xl font-bold text-white">
			{student.name}
		</h2>

		<p class="mt-1 text-blue-200">
			{student.admissionNumber}
		</p>
	</div>

	<!-- Body -->

	<div class="space-y-4 p-6">
		<div class="flex items-center justify-between rounded-xl bg-slate-50 p-4">
			<span class="font-semibold text-slate-600"> Department </span>

			<span class="font-bold text-blue-900">
				{student.department}
			</span>
		</div>

		<div class="flex items-center justify-between rounded-xl bg-slate-50 p-4">
			<span class="font-semibold text-slate-600"> Year </span>

			<span class="font-bold text-blue-900">
				{student.year}
			</span>
		</div>

		<div class="flex items-center justify-between rounded-xl bg-slate-50 p-4">
			<span class="font-semibold text-slate-600"> Status </span>

			<span class="rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700">
				● ACTIVE
			</span>
		</div>
	</div>
</div>
