<script lang="ts">
	import { enhance } from '$app/forms';
	import * as m from '$lib/paraglide/messages';
	import { jobRoles } from '$lib/data/jobRoles';
	import type { ActionResult } from '@sveltejs/kit';
	import { tick } from 'svelte';

	let files = {
		cv: null as File | null,
		coverLetter: null as File | null
	};

	// honeypot field
	let website = '';
	let isSubmitting = false;
	let formStatus = {
		success: false,
		message: '',
		showForm: true
	};

	let personalNumber = '';
	let personalNumberError = '';

	// maximal filstorlek i megabytes
	const MAX_FILE_SIZE = 25; // 25MB, hälften av server-gränsen för säkerhetsmarginal
	let fileError = '';

	// lägg till en funktion för att scrolla till toppen av formuläret
	function scrollToTop() {
		const formElement = document.querySelector('#jobApplicationForm');
		if (formElement) {
			formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}

	// funktion för att centrera bekräftelsemeddelandet
	function scrollToMessage() {
		const messageElement = document.querySelector('#confirmationMessage');
		if (messageElement) {
			const elementRect = messageElement.getBoundingClientRect();
			const absoluteElementTop = elementRect.top + window.pageYOffset;
			const middle = absoluteElementTop - window.innerHeight / 2;
			window.scrollTo({
				top: middle,
				behavior: 'smooth'
			});
		}
	}

	function handleSubmit() {
		return async ({ result }: { result: ActionResult }) => {
			// sätt isSubmitting direkt när formuläret skickas
			isSubmitting = true;

			try {
				if (result.type === 'success') {
					formStatus = {
						success: true,
						message: 'Din ansökan har skickats! Vi återkommer så snart som möjligt.',
						showForm: false
					};
					await tick();
					scrollToMessage();
				} else {
					formStatus = {
						success: false,
						message: 'Ett fel uppstod. Försök igen senare.',
						showForm: true
					};
				}
			} catch (error) {
				formStatus = {
					success: false,
					message: 'Ett fel uppstod. Försök igen senare.',
					showForm: true
				};
			} finally {
				// sätt alltid isSubmitting till false när processen är klar
				isSubmitting = false;
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

<!-- lägg till id på huvudelementet för scrollning -->
<div id="jobApplicationForm" class="relative">
	{#if formStatus.message}
		<div
			id="confirmationMessage"
			class={`mb-6 rounded-md p-6 ${
				formStatus.success
					? 'border border-green-200 bg-green-50'
					: 'border border-red-200 bg-red-50'
			}`}
		>
			<div class="flex items-center">
				{#if formStatus.success}
					<!-- success icon och meddelande -->
					<svg
						class="mr-2 h-5 w-5 text-green-600"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M5 13l4 4L19 7"
						/>
					</svg>
					<div>
						<p class="font-medium text-green-700">{formStatus.message}</p>
					</div>
				{:else}
					<!-- error icon och meddelande -->
					<svg
						class="mr-2 h-5 w-5 text-red-600"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
					<p class="text-red-700">{formStatus.message}</p>
				{/if}
			</div>
		</div>
	{/if}

	{#if isSubmitting}
		<div class="absolute inset-0 z-50 flex items-center justify-center bg-white/80">
			<div class="rounded-lg bg-white p-8 text-center shadow-xl">
				<svg
					class="mx-auto mb-4 h-12 w-12 animate-spin text-green-600"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
					></circle>
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					></path>
				</svg>
				<p class="text-lg font-semibold text-gray-900">Skickar din ansökan...</p>
				<p class="mt-2 text-sm text-gray-600">Vänligen vänta medan vi behandlar din ansökan.</p>
			</div>
		</div>
	{/if}

	{#if formStatus.showForm}
		<form
			method="POST"
			enctype="multipart/form-data"
			class="space-y-8"
			on:submit={() => {
				isSubmitting = true;
			}}
			use:enhance={handleSubmit}
		>
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
						on:change={(e) => handleFileChange(e, 'coverLetter')}
						class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-green-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-green-700 hover:file:bg-green-100"
					/>
				</div>
				{#if fileError}
					<p class="text-sm text-red-600">{fileError}</p>
				{/if}
			</div>

			<!-- Additional Comments -->
			<div>
				<label for="comments" class="block text-sm font-medium text-gray-700">
					Övriga kommentarer
				</label>
				<textarea
					name="comments"
					id="comments"
					rows="4"
					class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
				></textarea>
			</div>

			<!-- Submit Button -->
			<div>
				<button
					type="submit"
					disabled={isSubmitting}
					class="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
				>
					{#if isSubmitting}
						<svg class="-ml-1 mr-2 h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
							<circle
								class="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								stroke-width="4"
							/>
							<path
								class="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							/>
						</svg>
						Skickar...
					{:else}
						{m.form_submit()}
					{/if}
				</button>
			</div>

			<!-- Application Info -->
			<div class="mt-4 text-sm text-gray-600">
				<p>{m.form_application_info()}</p>
				<p class="mt-2">{m.form_contact_info()}</p>
			</div>
		</form>
	{/if}
</div>
