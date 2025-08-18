<script lang="ts">
	import api from "$lib/api";
	import Icon from "@iconify/svelte";
	import Spinner from "../components/Spinner.svelte";
	import { chrismastGifts } from "$lib/fixtures";

	type Gift = {
		id: string;
		name: string;
		adressee: string;
		quantity: number;
		price: number;
		imageUrl?: string;
	}

	const INITIAL_GIFT: Partial<Gift> = {
		id: '',
		name: '',
		adressee: '',
		price: 0,
		quantity: 0,
		imageUrl: '',
	}

	const DEFAULT_IMAGE: string = 'https://lh4.googleusercontent.com/rV7j2cc-_2vwsVxR26zKDYwnwLgDk3k8dXkKwm7ZPDQonHc1dyfLe8E0qOgb4lpWRujGY6W-XtkGLROQ6VxGolTsfFSqJFAq8VhxbTDDxMo6cdkIeDsYQ3LPWzk_Tzj4-ZDIS7hMhGeTMIh6bO_s6HV9YtX4ogfgvmfsPwfQCyFR9WAOUacD9ouzjQ';


	let gifts = $state<Gift[]>([]);
	let gift = $state<Partial<Gift>>(structuredClone(INITIAL_GIFT));
	let showModal = $state<boolean>(false);
	let giftsExist = $state<boolean>(true);
	let totalPrice = $state<number>(0);

	const handleSubmit = (e: Event) => {
		e.preventDefault();
		

		// Build the new gift or rebuild the existing one.
		const giftStructure: Gift = {
			id: (gifts.length + 1).toString(),
			name: gift.name || '',
			adressee: gift.adressee || '',
			quantity: gift.quantity || 0,
			price: gift.price || 0,
			imageUrl: gift.imageUrl || DEFAULT_IMAGE,
		};

		// Create new Gift
		if(!gift.id) {
			if( !gift.name || gifts.some(item => item.name.toLowerCase() === gift.name.toLowerCase())) return;
			if(gift.name.length >= 3) {
				gifts.push(giftStructure); // saving the new gift	
			} else {
				alert('El nombre del regalo debe tener al menos 3 caracteres');
			}
		}
		
		// Update existing Gift
		if(gift.id) {
			const getIndex = gifts.findIndex((item) => item.id === gift.id);
			gifts[getIndex] = giftStructure;
		}

		gift = structuredClone(INITIAL_GIFT); // exact clone of the empty gift
		localStorage.setItem('gifts', JSON.stringify(gifts)); // save in local storage
		showModal = false; 
	}

	// Remove a gift
	const handleRemoveOneItem = (id: string) => {
		gifts = gifts.filter(item => item.id !== id);
		localStorage.setItem('gifts', JSON.stringify(gifts)); // save in local storage
	}

	// update a gift
	const handleUpdate = (element: Gift) => {
		gift = {...element};
		showModal = true;
	}

	// Delete all gifts
	const handleDeleteAll = () => {
		gifts.splice(0, gifts.length);
		
	}

	// show modal method
	const handleModal = () => {
		showModal = !showModal;
	}

	// random gifts names
	const handleRandomGifts = () => {
		const randomGifts = chrismastGifts.sort(() => Math.random() - 0.5);
		gift.name = randomGifts[0];
	}

	// handle total price for all gifts
	$effect(() => {
		totalPrice = gifts.reduce((acc: number, current: Gift) => acc + (current.quantity * current.price), 0);
	})


	// api call
	$effect(() => {
		api.gifts.getAll().then(data => {
			// setting the gifts
			if(data.length > 0) {
				gifts = data;
			}
		});
		giftsExist = false;
	})
</script>


<div class="flex gap-x-4 items-center">
	<h1 class="font-bold font-chrismast text-4xl">Regalos</h1>
	<Icon icon="ic:outline-add" color="black" width="18" height="18" class="cursor-pointer" onclick={handleModal} />
</div>

<dialog open={showModal} class="m-auto p-4 rounded-lg shadow-black min-w-[350px] min-h-[220px]">
	<form onsubmit={handleSubmit} class="flex flex-col gap-y-2 bg-white">
		<div class="flex gap-x-2 w-full h-full items-center">
			<input required bind:value={gift.name} type="text" class="border border-black text-center h-[45px] flex-1" placeholder="gift name" />
			<Icon icon="fad:random-2dice" color="black" width="30" height="30" class="cursor-pointer" onclick={handleRandomGifts} />
		</div>
		<input required bind:value={gift.adressee} type="text" class="border border-black text-center h-[45px]" placeholder="adressee" />
		<input required bind:value={gift.quantity} type="number" class="border border-black w-[50px] h-[45px] text-center" />
		<input required bind:value={gift.imageUrl} type="text" class="border border-black w-full h-[45px] text-center" placeholder="Image url"  />
		<input required bind:value={gift.price} type="number" class="border border-black w-[50px] h-[45px] text-center" />
		<button class="cursor-pointer primary w-full" type="submit">
			{#if gift.id}
				Actualizar
			{:else}
				Agregar
			{/if}
		</button>
	</form>
</dialog>

<div>
	<span>Total: {totalPrice}</span>
</div>
{#if gifts.length > 0}
	<ul class="mt-2 min-w-[320px] min-h-[220px] p-4 {showModal ? 'bg-transparent' : 'bg-white'}">
		{#each gifts as item, index}
			<li class="font-chrismast flex gap-x-5 items-center w-full justify-around mb-2">
				{#if item.imageUrl}
					<img src={item.imageUrl} alt="gift" class="w-10 h-10 rounded-full" />
				{/if}
				<div class="flex flex-col gap-y-1">
					<span class="flex-1">{item.name}({item.quantity} - {item.quantity * item.price})</span>
					<span class="text-sm opacity-70">{item.adressee}</span>
				</div>
				<div class="flex gap-x-2">
					<Icon icon="pajamas:remove" color="red" width="18" height="18" class="cursor-pointer" onclick={() => handleRemoveOneItem(item.id)} />
					<Icon icon="openmoji:pencil" color="blue" width="20" height="20" class="cursor-pointer" onclick={() => handleUpdate(item)} />
				</div>
			</li>
		{/each}
	</ul>
{:else}
	<div class="flex w-full justify-center items-center">
		{#if giftsExist === true}
				<Spinner />
			{:else}
			<p class="text-center">No tienes regalos, puedes agregar unos a continuacion</p>
		{/if}
	</div>
{/if}

<button class="danger cursor-pointer" onclick={handleDeleteAll}>
	Eliminar todo
</button>