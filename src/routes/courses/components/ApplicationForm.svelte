<script lang="ts">
	import { normalize } from '$lib/helpers/text';
	import { onDestroy, onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import { scale, fade } from 'svelte/transition';
	import PayPal from './PayPal.svelte';
	import type { ElectricalApplicationFormInterface } from './types';

	export let applyForCourse: () => void = () => {};

	let form = {
		title: 'Electrical Installtion',
		price: '277.00',
		fields: {
			'Personal Information': {
				Name: {
					type: 'text',
					required: true,
					options: new Array<string>(),
					readonly: false,
					value: '',
					disabled: false
				},
				Nationality: {
					type: 'text',
					required: true,
					options: [],
					readonly: false,
					value: '',
					disabled: false
				},
				'Date of bath': {
					type: 'date',
					required: true,
					options: [],
					readonly: false,
					value: '',
					disabled: false
				},
				Email: {
					type: 'email',
					required: true,
					options: [],
					readonly: false,
					value: '',
					disabled: false
				},
				'Phone Number': {
					type: 'number',
					required: true,
					options: [],
					readonly: false,
					value: '',
					disabled: false
				},
				Address: {
					type: 'text',
					required: true,
					options: [],
					readonly: false,
					value: '',
					disabled: false
				},
				Gender: {
					type: 'radio',
					required: true,
					options: ['Male', 'Female', 'Other'],
					readonly: false,
					value: '',
					disabled: false
				}
			},
			'Professional Experience': {
				'Education Level': {
					type: 'text',
					required: true,
					options: [],
					readonly: false,
					value: '',
					disabled: false
				},
				Qualification: {
					type: 'text',
					required: false,
					options: [],
					readonly: false,
					value: '',
					disabled: false
				},
				'Present position': {
					type: 'text',
					required: false,
					options: [],
					readonly: false,
					value: '',
					disabled: false
				},

				'Date Filled': {
					type: 'date',
					options: [],
					readonly: true,
					required: false,
					disabled: true,
					value: new Date().toISOString().substr(0, 10)
				}
			}
		}
	} as ElectricalApplicationFormInterface;

	let formElm: HTMLFormElement;

	onMount(() => {
		document.body.style.overflow = 'hidden';

		return () => {
			document.body.style.overflow = 'auto';
		};
	});

	function buyCourseForm() {
		if (!makePayment) {
			const valid = formElm.reportValidity();

			if (!valid) return;
		}
		makePayment = !makePayment;
	}

	function enhanceRequest({ form, data, action, cancel, submitter }: any) {
		console.log(data);
		return async ({ result, update }: any) => {
			update();
		};
	}

	let makePayment = false;
</script>

<div
	in:scale
	out:fade
	class="fixed z-50 top-0 left-0 bg-red-300 w-[100vw] h-[100vh] bg-opacity-10 backdrop-blur-[5px] p-2 md:p-4 flex justify-center items-center"
>
	<div
		class="wrapper relative rounded-lg overflow-hidden shadow-2xl w-full h-full block max-w-[900px] max-h-[95vh]"
	>
		<div
			class="tt-card h-full w-full rounded-lg overflow-hidden overflow-y-auto mx-auto max-w-[900px] max-h-[95vh] pb-4"
		>
			<div class="header py-2 pl-4">
				<p class="mobile:text-center text-sm font-light">STUDENT APPLICATION FORM</p>
				<p class="text-lg mobile:text-center font-light">
					Tec Electrical Training Institute <span class="font-normal hidden mobile:inline"
						>(TETI)</span
					>
				</p>
				<h2 class="mobile:text-center font-semibold text-xl pt-1">
					{form.title}
				</h2>

				<button
					on:click={applyForCourse}
					class="absolute z-50 right-6 top-2 w-8 h-8 bg-opacity-60 hover:bg-opacity-100 transition bg-red-500 inline-flex justify-center items-center rounded-full text-white font-semibold"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"
						><path
							d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
						/></svg
					>
				</button>
			</div>
			<div class="p-2 md:p-4 xl:p-8">
				<form
					method="POST"
					action="?/buyForm"
					on:submit={(ev) => {
						ev.preventDefault();
					}}
					bind:this={formElm}
					class="block"
				>
					<!-- <form
					method="POST"
					action="?/buyForm"
					use:enhance={enhanceRequest}
					bind:this={formElm}
					class="block"
				> -->
					{#each [...Object.entries(form.fields)] as [fieldType, fields]}
						<div class="py-4 ">
							<h4 class="pb-4 font-semibold pl-0 text-center mobile:text-left">{fieldType}</h4>
							<div
								class="grid grid-cols-[1fr] mobile:grid-cols-[1fr,1fr] md:grid-cols-[1fr,1fr,1fr] gap-4"
							>
								{#each [...Object.entries(fields)] as [label, fieldsData]}
									{#if ['radio', 'checkbox'].includes(fieldsData.type)}
										<div class="flex flex-col py-1">
											<div class="">
												{label}
												<span class="text-red-400" title="Required"
													>{!fieldsData.required ? '(optional)' : '*'}</span
												>
											</div>
											<div class="inline-flex gap-6 mobile:gap-2 mobile:justify-between">
												{#each fieldsData.options as option}
													<div class="w-max inline-flex gap-1">
														<label
															for={normalize(option)}
															class="text-light dark:text-gray-400 text-gray-700">{option}</label
														>
														<input
															required={fieldsData.required}
															id={normalize(option)}
															type="radio"
															name={normalize(label)}
															value="{option}}"
															class="w-max dark:bg-transparent"
															style="width: max-content;"
														/>
													</div>
												{/each}
											</div>
										</div>
									{:else}
										<div class="mb-1 inline-flex flex-col .input-field">
											<label for={normalize(label)} class="min-w-[100px]">{label} </label>
											<input
												id={normalize(label)}
												name={normalize(label)}
												required={fieldsData.required}
												type={fieldsData.type}
												readonly={fieldsData.readonly}
												disabled={fieldsData.disabled}
												value={fieldsData.value}
												class="outline dark:bg-transparent disabled:opacity-60 disabled:cursor-not-allowed outline-[2px] outline-gray-500 rounded-lg focus:outline-[3px] border-none focus:outline-green-400 transition focus:border-none p-2"
											/>
										</div>
									{/if}
								{/each}
							</div>
						</div>
					{/each}

					<div class="flex justify-center mt-4 py-4 max-w-[250px] mx-auto flex-col">
						<p class="text-center text-xl pb-4 opacity-80">
							<b>D{form.price}</b>
						</p>
						<button
							on:click={buyCourseForm}
							class="bg-primary opacity-90 transition hover:opacity-100 rounded-md px-6 py-2 text-white shadow"
							>Buy This Form?</button
						>
					</div>
				</form>
			</div>
		</div>
	</div>
	{#if makePayment}
		<PayPal
			onCheckoutComplete={buyCourseForm}
			onClosePayment={applyForCourse}
			data={[
				{
					_id: 'd9f80740-38f0-11e8-b467-0ed5f89f718b',
					product: 'Application Form (TETI)',
					price: Number(form.price),
					quantity: '1'
				}
			]}
		/>
	{/if}
</div>

<style>
	input {
		width: 100%;
	}
	svg {
		fill: currentColor;
	}
</style>
