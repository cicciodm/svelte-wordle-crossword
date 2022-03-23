<script lang="ts">
	import Crossword from "./game/Crossword.svelte";
</script>

<main>
	<h1>Welcome to CrossWordle</h1>
	<p>Solve the Crossword on the left by solving a Wordle puzzle per definition. Will this make sense?</p>

	<div class="gameContainer">
		<Crossword />
	</div>

</main>

<style>
	main {
		text-align: center;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

	.gameContainer {
		display: flex;
		justify-content: center;
	}
</style>