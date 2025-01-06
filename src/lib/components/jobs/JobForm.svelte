<script lang="ts">
  import { enhance } from '$app/forms';
  import * as m from '$lib/paraglide/messages';
  import { jobRoles } from '$lib/data/jobRoles';

  let files = {
    cv: null as File | null,
    coverLetter: null as File | null
  };

  // honeypot field
  let website = '';
</script>

<form
  method="POST"
  enctype="multipart/form-data"
  class="space-y-8"
  use:enhance
>
  <!-- Honeypot field - hidden from real users -->
  <div class="hidden">
    <input
      type="text"
      name="website"
      bind:value={website}
      tabindex="-1"
      autocomplete="off"
    />
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
      required
      pattern="\d{12}"
      title="YYYYMMDDXXXX"
      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
    />
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
        class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-green-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-green-700 hover:file:bg-green-100"
      />
    </div>
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