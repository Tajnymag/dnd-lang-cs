<script setup lang="ts">
import { useRegisterSW } from 'virtual:pwa-register/vue';

const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW();

const close = async () => {
	offlineReady.value = false;
	needRefresh.value = false;
};
</script>

<template>
	<div v-if="offlineReady || needRefresh" class="pwa-toast" role="alert">
		<div class="message">
			<span v-if="offlineReady">
				Aplikace je připravena fungovat offline.
			</span>
			<span v-else>Pro překladač existuje aktualizace.</span>
		</div>
		<button v-if="needRefresh" @click="updateServiceWorker()">
			Aktualizovat
		</button>
		<button @click="close">Zavřít</button>
	</div>
</template>

<style>
.pwa-toast {
	position: fixed;
	right: 0;
	bottom: 0;
	margin: 16px;
	padding: 12px;
	border: 1px solid #8885;
	border-radius: 4px;
	z-index: 1;
	text-align: left;
	box-shadow: 3px 4px 5px 0px #8885;
}
.pwa-toast .message {
	margin-bottom: 8px;
}
.pwa-toast button {
	border: 1px solid #8885;
	outline: none;
	margin-right: 5px;
	border-radius: 2px;
	padding: 3px 10px;
}
</style>
