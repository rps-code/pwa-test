<template>
	<div>
		<h1>{{ apiData?.message }}</h1>
		<button @click="fetchApiData">Refresh API Data</button>
		<img src="/images/cat.jpg" style="display: block;"/>
	</div>
</template>
	
<script setup lang="ts">
	import { ref, onMounted } from 'vue';
	
	interface ApiData {
		message: string;
	}
	
	const apiData = ref<ApiData>({ message: 'Loading...' });
	
	const fetchApiData = async () => {
		try {
			const apiUrl = import.meta.env.VITE_API_BASE_URL;
			const response = await fetch(`${apiUrl}/api/exampleMessage`);
			if (!response.ok) throw new Error('Network response was not ok');

			// Clone the response
			const responseClone = response.clone();

			const data = await response.json();
			
			// Open the desired cache
			const cache = await caches.open('PWA-TEST');

			// Put the response clone into the cache
			cache.put(`${apiUrl}/api/exampleMessage`, responseClone);

			console.log('Added fetchApiData to cache', responseClone)

			// Updating your Vue component's data
			data ? apiData.value = data : apiData.value.message = 'No data received';
		} catch (error) {
			console.error('There was a problem with the fetch operation:', error);
			apiData.value.message = 'Error fetching data';
		}
	};


	onMounted(fetchApiData);
</script>