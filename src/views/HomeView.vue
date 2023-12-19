<template>
	<div>
		<h1>{{ apiData?.message }}</h1>
		<button @click="fetchApiData">Refresh Data</button>
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
			const response = await fetch('http://localhost:3000/api/exampleMessage');
			if (!response.ok) throw new Error('Network response was not ok');

			const data: ApiData | null = await response.json();

			data ? apiData.value = data : apiData.value.message = 'No data received';
		} catch (error) {
			console.error('There was a problem with the fetch operation:', error);
			apiData.value.message = 'Error fetching data';
		}
	};

	onMounted(fetchApiData);
</script>