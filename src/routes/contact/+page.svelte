<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import Loading from '../../components/UI/Loading.svelte';
	import { TetiEvents } from '../../store/events';
	import type { PageData } from './$types';

	// export let data: PageData;

	function enhanceFormSubmission({ form }: any) {
		loading = true;
		form.disabled = true;
		return async ({ result, update }: any) => {
			switch (result.type) {
				case 'failure':
					TetiEvents.update(() => {
						return {
							type: 'alert',
							data: {
								text: result.data.message,
								type: 'error',
								closeButton: false
							}
						};
					});
					break;
				case 'success':
					TetiEvents.update(() => {
						return {
							type: 'alert',
							data: {
								text: `Hi ${result.data.name}, Thank you for sending us a message. We'll get back to you as soon as possible.`,
								type: 'info',
								closeButton: false
							}
						};
					});
					form.reset();
					break;

				default:
					break;
			}

			loading = false;
			form.disabled = false;
			update();
		};
	}

	let loading = false;
	let disabled = true;
</script>

<div class="max-w-[1200px] mx-auto pt-[20px] px-2">
	<div class="mt-4" />

	<div class="grid lg:grid-cols-2 gap-4 lf:gap-1 grid-cols-1">
		<div class="map h-full w-full p-2 flex items-center justify-center">
			<img
				src="/assets/teti-map.png"
				alt="teti's location"
				class="max-w-[500px] lg:max-w-full rounded-md object-cover w-full"
			/>
		</div>
		<form
			on:input={(ev) => {
				disabled = !ev.currentTarget.checkValidity();
			}}
			action="?/contact"
			method="POST"
			use:enhance={enhanceFormSubmission}
			class="tt-card shadow-xl border w-full relative overflow-hidden dark:border-gray-600"
		>
			{#if loading}
				<div class="bg-transparent z-20 backdrop-blur-[3px] w-full h-full absolute top-0 left-0">
					<Loading />
				</div>
			{/if}
			<div class="pb-4 tracking-wide">
				<h2 class="text-center font-semibold text-xl">Contact Teti</h2>
				<p class="text-center text-sm pb-2 dark:text-slate-400">We'll be happy to hear from you</p>
			</div>
			<div class="input-field">
				<label for="name"
					>Name <span title="Name is required" class="text-[var(--secondary)]">*</span></label
				>
				<input
					class="dark:border-secondary-surface-dark-muted tt-surface"
					type="text"
					required
					name="name"
					id="name"
					placeholder="Your full name"
				/>
			</div>
			<div class="input-field">
				<label for="email"
					>Email <span title="Email is required" class="text-[var(--secondary)] ">*</span></label
				>
				<input
					class="dark:border-secondary-surface-dark-muted tt-surface"
					type="email"
					required
					name="email"
					id="email"
					placeholder="Email address"
				/>
			</div>
			<div class="input-field">
				<label for="name"
					>Subject <span
						title="This field is optional"
						class="text-slate-500 dark:text-slate-400 text-xs">(Optional)</span
					></label
				>
				<input
					class="dark:border-secondary-surface-dark-muted tt-surface"
					type="text"
					name="subject"
					id="subject"
					placeholder="Message subject"
				/>
			</div>
			<div class="input-field">
				<label for="message"
					>Message <span title="Message is required" class="text-[var(--secondary)] ">*</span
					></label
				>
				<textarea
					class="dark:border-secondary-surface-dark-muted tt-surface"
					name="message"
					required
					id="message"
					placeholder="Message body"
				/>
			</div>
			<div class="flex justify-center">
				<button
					disabled={disabled || loading}
					class="text-lg w-full py-2 bg-primary rounded-xl transition hover:shadow-md opacity-90 hover:opacity-100 disabled:bg-opacity-40 disabled:cursor-not-allowed"
					>Submit</button
				>
			</div>
			<div class="pt-8 text-center">
				<p class="text-sm opacity-80">
					<span class="block pb-1 text-center"> Or call: </span>
					<span class="font-semibold text-base">
						+220 778 2759
						<span class="inline-block px-4 font-medium">|</span>
						+ 220 376 2965
					</span>
				</p>
			</div>
		</form>
	</div>
</div>

<style>
	:global(.dark) input,
	:global(.dark) textarea {
		background-color: var(--surface);
		border-color: var(--surface);
		border-width: 1px;
	}

	form {
		min-width: 300px;
		max-width: 480px;
		padding: 2em;
		padding-top: 1em;
		border-radius: 1em;
		margin: 0 auto;
	}
	.input-field {
		margin-bottom: 1em;
		display: flex;
		flex-direction: column;
	}
	label {
		margin-left: 2px;
	}
	input,
	textarea {
		border-radius: 1em;
		padding: 0.6em 0.4em;
		border: none;
		border: 2px solid gray;
		transition: 150ms;
	}

	input:focus,
	textarea:focus {
		border-color: var(--primary);
		/* border: 0; */
		outline: 2px solid var(--primary);
	}
	:global(.dark) input:focus,
	:global(.dark) textarea:focus {
		background-color: var(--surface);
		border-width: 1px;
	}
	textarea {
		resize: none;
		max-height: 150px;
		overflow: hidden;
		height: 120px;
		overflow-y: auto;
	}
	input {
		z-index: auto;
	}
	/* #map { */
	/* width: 100%;
		height: 100%;
		position: relative;
		font-family: 'Roboto', sans-serif;
		box-sizing: border-box;
	}

	#map a {
		text-decoration: none;
		color: #1967d2;
	} */
</style>
