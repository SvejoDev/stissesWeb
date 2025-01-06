<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import Icon from '@iconify/svelte';
	import * as m from '$lib/paraglide/messages';

	let isVisible = false;

	onMount(() => {
		isVisible = true;
	});

	const contactInfo = [
		{
			icon: 'mdi:email',
			title: m.contact_email_title(),
			text: 'info@stisses.se',
			href: 'mailto:info@stisses.se'
		},
		{
			icon: 'mdi:phone',
			title: m.contact_phone_title(),
			text: '(+46) 70-325 96 38',
			href: 'tel:+46703259638'
		},
		{
			icon: 'mdi:map-marker',
			title: m.contact_address_title(),
			text: 'Reningsverksvägen 2, Ängelholm',
			href: 'https://www.google.com/maps/place/Reningsverksv%C3%A4gen+2,+262+63+%C3%84ngelholm/@56.2552967,12.8546058,17z/data=!3m1!4b1!4m6!3m5!1s0x46518076f56a182f:0x81ad3fae63d22506!8m2!3d56.2552967!4d12.8571807!16s%2Fg%2F11c1jczmj_?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D'
		}
	];

	const socialLinks = [
		{
			name: 'Facebook',
			url: 'https://www.facebook.com/Stisses/',
			icon: 'mdi:facebook',
			color: 'hover:bg-blue-600'
		},
		{
			name: 'Instagram',
			url: 'https://www.instagram.com/stissesfritid/',
			icon: 'mdi:instagram',
			color: 'hover:bg-pink-600'
		},
		{
			name: 'TikTok',
			url: 'https://www.tiktok.com/@stisses',
			icon: 'ic:baseline-tiktok',
			color: 'hover:bg-black'
		}
	];
</script>

<div class="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24">
	{#if isVisible}
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<!-- header sektion -->
			<section in:fly={{ y: 50, duration: 800 }} class="mb-16 text-center">
				<h1 class="mb-6 text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl">
					{m.contact_title()}
				</h1>
				<p class="mx-auto max-w-2xl text-lg text-gray-600 md:text-xl">
					{m.contact_subtitle()}
				</p>
			</section>

			<!-- kontaktinformation -->
			<section class="mb-24">
				<div class="grid gap-8 md:grid-cols-3">
					{#each contactInfo as info, index}
						<div
							in:fly={{ y: 50, duration: 800, delay: index * 200 }}
							class="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl"
						>
							<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
								<Icon icon={info.icon} class="h-6 w-6 text-blue-600" />
							</div>
							<h3 class="mb-2 text-xl font-semibold text-gray-900">{info.title}</h3>
							<a
								href={info.href}
								target="_blank"
								rel="noopener noreferrer"
								class="text-lg text-gray-600 hover:text-blue-600"
							>
								{info.text}
							</a>
						</div>
					{/each}
				</div>
			</section>

			<!-- karta -->
			<section in:fly={{ y: 50, duration: 800 }} class="mb-24">
				<div class="overflow-hidden rounded-2xl shadow-lg">
					<iframe
						title="Stisses plats"
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2216.337452882312!2d12.854726576883817!3d56.254953953202374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46518076f5c19405%3A0xeaa0b8f3186ada4a!2sStisses%20Sport%20%26%20Fritid!5e0!3m2!1ssv!2sse!4v1736185286648!5m2!1ssv!2sse"
						width="100%"
						height="450"
						style="border:0;"
						loading="lazy"
						referrerpolicy="no-referrer-when-downgrade"
					></iframe>
				</div>
			</section>

			<!-- sociala medier -->
			<section in:fly={{ y: 50, duration: 800 }} class="mb-24 text-center">
				<h2 class="mb-8 text-2xl font-bold text-gray-900">{m.contact_social_title()}</h2>
				<div class="flex justify-center space-x-6">
					{#each socialLinks as social}
						<a
							href={social.url}
							target="_blank"
							rel="noopener noreferrer"
							class="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all duration-300 hover:text-white {social.color}"
						>
							<Icon icon={social.icon} class="h-6 w-6" />
						</a>
					{/each}
				</div>
			</section>
		</div>
	{/if}
</div>
