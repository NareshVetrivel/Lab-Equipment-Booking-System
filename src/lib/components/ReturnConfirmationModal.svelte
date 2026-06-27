<script>
let {
	isOpen = false,
	selectedReturn = {},
	onClose = /** @type {() => void} */ (() => {}),
	onConfirm = /** @type {(data:any) => void} */ (() => {})
} = $props();

	let damageType = $state('None');
	let confirmed = $state(false);

	const today = new Date();

	function calculateLateDays() {
		if (!selectedReturn?.dueDate) return 0;

		const due = new Date(selectedReturn.dueDate);

		const diff =
			Math.floor((today.getTime() - due.getTime()) / (1000 * 60 * 60 * 24));

		return diff > 0 ? diff : 0;
	}

	function getDamageFine() {
		switch (damageType) {
			case 'Minor':
				return 100;

			case 'Major':
				return 500;

			case 'Lost':
				return 2000;

			default:
				return 0;
		}
	}

let lateDays = $state(calculateLateDays());

const lateFine = $derived(Number(lateDays) * 20);

const damageFine = $derived(getDamageFine());

const totalFine = $derived(lateFine + damageFine);

	function confirmReturn() {
		onConfirm({
			...selectedReturn,
			lateDays,
			lateFine,
			damageType,
			damageFine,
			totalFine
		});

		damageType = 'None';
		confirmed = false;
	}
</script>

{#if isOpen}

<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-8">

<div
	class="mx-auto max-h-[75vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
>

		<!-- Header -->

		<div class="border-b px-5 py-3">

			<h2 class="text-2xl font-bold text-blue-900">
				Equipment Return Confirmation
			</h2>

		</div>

		<!-- Body -->

		<div class="space-y-3 px-5 py-4">

			<div class="grid gap-3 md:grid-cols-2">

				<div>

					<p class="text-sm text-slate-500">
						Student
					</p>

					<p class="font-semibold">
						{selectedReturn.student}
					</p>

				</div>

				<div>

					<p class="text-sm text-slate-500">
						Equipment
					</p>

					<p class="font-semibold">
						{selectedReturn.equipment}
					</p>

				</div>

				<div>

					<p class="text-sm text-slate-500">
						Department
					</p>

					<p class="font-semibold">
						{selectedReturn.department}
					</p>

				</div>

				<div>

					<p class="text-sm text-slate-500">
						Quantity
					</p>

					<p class="font-semibold">
						{selectedReturn.quantity}
					</p>

				</div>

			</div>

			<hr>

			<div class="grid gap-3 md:grid-cols-2">

				<div>

					<label class="font-semibold">
						Late Days
					</label>

<input
	type="number"
	min="0"
	bind:value={lateDays}
	class="mt-2 w-full rounded-xl border p-3 outline-none focus:border-blue-600"
/>

				</div>

				<div>

					<label class="font-semibold">
						Late Fine
					</label>

					<input
						readonly
						value={`₹${lateFine}`}
						class="mt-2 w-full rounded-xl border bg-slate-100 p-3"
					/>

				</div>

			</div>

			<div>

				<label class="font-semibold">
					Damage Status
				</label>

				<select
					bind:value={damageType}
					class="mt-2 w-full rounded-xl border p-3"
				>

					<option>None</option>
					<option>Minor</option>
					<option>Major</option>
					<option>Lost</option>

				</select>

			</div>

			<div class="grid gap-3 md:grid-cols-2">

				<div>

					<label class="font-semibold">
						Damage Fine
					</label>

					<input
						readonly
						value={`₹${damageFine}`}
						class="mt-2 w-full rounded-xl border bg-slate-100 p-3"
					/>

				</div>

				<div>

					<label class="font-semibold text-red-600">
						Total Fine
					</label>

					<input
						readonly
						value={`₹${totalFine}`}
						class="mt-2 w-full rounded-xl border bg-red-50 p-3 font-bold text-red-600"
					/>

				</div>

			</div>

			<label class="flex items-center gap-3">

				<input
					type="checkbox"
					bind:checked={confirmed}
				/>

				<span class="font-medium">
					I confirm that the equipment has been received.
				</span>

			</label>

		</div>

		<!-- Footer -->

		<div class="flex justify-end gap-3 border-t bg-slate-50 px-5 py-3">

			<button
				type="button"
				class="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
				onclick={() => onClose()}
			>
				Cancel
			</button>

			<button
				type="button"
				disabled={!confirmed}
				class="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white enabled:hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-green-300"
				onclick={() => confirmReturn()}
			>
				Return Equipment
			</button>

		</div>

	</div>

</div>

{/if}