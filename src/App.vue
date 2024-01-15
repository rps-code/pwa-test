<template>
	<div>
		<h1>{{ apiData?.message }}</h1>
		<button @click="fetchApiData">Refresh Data</button>
		<img src="/images/cat.jpg" style="display: block; margin-top: 50px;"/>
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
			const cacheName = 'pwa-test-v4';
			const isOnline = window.navigator.onLine;

			// You can also use event listeners like so. Ref: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine
			window.addEventListener('offline', () => {
				console.log('You are offline');
			});

			window.addEventListener('online', () => {
				console.log('You are online');
			});


			if (isOnline) {
				console.log('You are ONLINE, calling from API.');

				const response = await fetch(`${apiUrl}/api/exampleMessage`);
				if (!response.ok) throw new Error('Network response was not ok');

				const responseClone = response.clone();
				const data = await response.json();
				const cache = await caches.open(cacheName);

				cache.put(`${apiUrl}/api/exampleMessage`, responseClone);
				console.log('Added fetchApiData to cache', responseClone);

				data ? (apiData.value = data) : (apiData.value.message = 'No data received');
			} else {
				console.log('You are OFFLINE, calling from cache.');
				const cacheResponse = await caches.match(`${apiUrl}/api/exampleMessage`);

				if (cacheResponse) {
					const data = await cacheResponse.json();
					data ? (apiData.value = data) : (apiData.value.message = 'No cached data available');
				} else {
					apiData.value.message = 'No cached data available';
				}
			}
		} catch (error) {
			console.error('There was a problem with the fetch operation:', error);
			apiData.value.message = 'Error fetching data';
		}
	};

	onMounted(fetchApiData);
</script>
