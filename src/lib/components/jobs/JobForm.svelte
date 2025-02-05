<script lang="ts">
	import { enhance } from '$app/forms';
	import * as m from '$lib/paraglide/messages';
	import { jobRoles } from '$lib/data/jobRoles';
	import type { ActionResult } from '@sveltejs/kit';

	let files = {
		cv: null as File | null,
		coverLetter: null as File | null
	};

	// honeypot field
	let website = '';
	let formStatus = {
		success: false,
		message: ''
	};

	let personalNumber = '';
	let personalNumberError = '';

	// maximal filstorlek i megabytes
	const MAX_FILE_SIZE = 10;
	let fileError = '';

	function handleSubmit() {
		return async ({ result }: { result: ActionResult }) => {
			if (result.type === 'success') {
				formStatus = {
					success: true,
					message: 'Din ansökan har skickats!'
				};
			} else {
				formStatus = {
					success: false,
					message: 'Ett fel uppstod. Försök igen senare.'
				};
			}
		};
	}

	function validatePersonalNumber(value: string) {
		const cleaned = value.replace(/[-\s]/g, '');

		if (!/^\d{12}$/.test(cleaned)) {
			personalNumberError = 'Personnumret måste vara 12 siffror i formatet YYYYMMDDXXXX';
			return false;
		}

		personalNumberError = '';
		return true;
	}

	function validateFileSize(file: File | null) {
		if (!file) return true;

		// konvertera bytes till MB
		const fileSizeMB = file.size / (1024 * 1024);

		if (fileSizeMB > MAX_FILE_SIZE) {
			fileError = `Filen ${file.name} är för stor. Maximal filstorlek är ${MAX_FILE_SIZE}MB`;
			return false;
		}

		return true;
	}

	function handleFileChange(event: Event, fileType: 'cv' | 'coverLetter') {
		const input = event.target as HTMLInputElement;
		const file = input.files?.[0];

		if (file && !validateFileSize(file)) {
			input.value = ''; // återställ input
			return;
		}

		fileError = '';
	}
</script>

{#if formStatus.message}
	<div
		class={`mb-4 rounded-md p-4 ${formStatus.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}
	>
		{formStatus.message}
	</div>
{/if}

<form method="POST" enctype="multipart/form-data" class="space-y-8" use:enhance={handleSubmit}>
	<!-- Honeypot field - hidden from real users -->
	<div class="hidden">
		<input type="text" name="website" bind:value={website} tabindex="-1" autocomplete="off" />
	</div>

	<div class="grid gap-6 md:grid-cols-2">
		<!-- First Name -->
		<div>
			<label for="firstName" class="block text-sm font-medium text-gray-700">
				{m.form_first_name()}
			</label>
			<input
				type="text"
				name="firstName"
				id="firstName"
				required
				class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
			/>
		</div>

		<!-- Last Name -->
		<div>
			<label for="lastName" class="block text-sm font-medium text-gray-700">
				{m.form_last_name()}
			</label>
			<input
				type="text"
				name="lastName"
				id="lastName"
				required
				class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
			/>
		</div>
	</div>

	<!-- Email -->
	<div>
		<label for="email" class="block text-sm font-medium text-gray-700">
			{m.form_email()}
		</label>
		<input
			type="email"
			name="email"
			id="email"
			required
			class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
		/>
	</div>

	<!-- Phone -->
	<div>
		<label for="phone" class="block text-sm font-medium text-gray-700">
			{m.form_phone()}
		</label>
		<input
			type="tel"
			name="phone"
			id="phone"
			required
			class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
		/>
	</div>

	<!-- Personal Number -->
	<div>
		<label for="personalNumber" class="block text-sm font-medium text-gray-700">
			{m.form_personal_number()}
		</label>
		<input
			type="text"
			name="personalNumber"
			id="personalNumber"
			bind:value={personalNumber}
			on:input={() => validatePersonalNumber(personalNumber)}
			required
			placeholder="YYYYMMDDXXXX"
			class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
		/>
		{#if personalNumberError}
			<p class="mt-1 text-sm text-red-600">{personalNumberError}</p>
		{/if}
	</div>

	<!-- Drivers License -->
	<div>
		<fieldset>
			<legend class="block text-sm font-medium text-gray-700">
				{m.form_drivers_license()}
			</legend>
			<div class="mt-2 space-y-2">
				<div class="flex items-center">
					<input
						type="radio"
						name="driversLicense"
						id="driversLicenseYes"
						value="yes"
						class="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-500"
					/>
					<label for="driversLicenseYes" class="ml-2 text-sm text-gray-700">
						{m.form_yes()}
					</label>
				</div>
				<div class="flex items-center">
					<input
						type="radio"
						name="driversLicense"
						id="driversLicenseNo"
						value="no"
						class="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-500"
					/>
					<label for="driversLicenseNo" class="ml-2 text-sm text-gray-700">
						{m.form_no()}
					</label>
				</div>
			</div>
		</fieldset>
	</div>

	<!-- Job Role Selection -->
	<div>
		<fieldset>
			<legend class="block text-sm font-medium text-gray-700">
				{m.form_preferred_role()}
			</legend>
			<div class="mt-2 space-y-2">
				{#each jobRoles as role}
					<div class="flex items-center">
						<input
							type="radio"
							name="preferredRole"
							id={role.id}
							value={role.id}
							required
							class="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-500"
						/>
						<label for={role.id} class="ml-2 text-sm text-gray-700">
							{role.title()}
						</label>
					</div>
				{/each}
			</div>
		</fieldset>
	</div>

	<!-- File Uploads -->
	<div class="space-y-4">
		<div>
			<label for="cv" class="block text-sm font-medium text-gray-700">
				{m.form_cv()}
			</label>
			<input
				type="file"
				name="cv"
				id="cv"
				accept=".pdf,.doc,.docx"
				required
				on:change={(e) => handleFileChange(e, 'cv')}
				class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-green-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-green-700 hover:file:bg-green-100"
			/>
		</div>
		<div>
			<label for="coverLetter" class="block text-sm font-medium text-gray-700">
				{m.form_cover_letter()}
			</label>
			<input
				type="file"
				name="coverLetter"
				id="coverLetter"
				accept=".pdf,.doc,.docx"
				required
				on:change={(e) => handleFileChange(e, 'coverLetter')}
				class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-green-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-green-700 hover:file:bg-green-100"
			/>
		</div>
		{#if fileError}
			<p class="text-sm text-red-600">{fileError}</p>
		{/if}
	</div>

	<!-- Submit Button -->
	<div>
		<button
			type="submit"
			class="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
		>
			{m.form_submit()}
		</button>
	</div>

	<!-- Application Info -->
	<div class="mt-4 text-sm text-gray-600">
		<p>{m.form_application_info()}</p>
		<p class="mt-2">{m.form_contact_info()}</p>
	</div>
</form>
