<script lang="ts">
	import Crossword from "./game/Crossword.svelte";
	import Wordle from "./game/Wordle.svelte";
	import {CrosswordElementSelection} from "./Types";

	const crosswordConfig: string[] =
	[
		"GRADE",
		"LOVED",
		"AMONG",
		"RAISE",
		"ENDED",
	];

  let selectedElement: CrosswordElementSelection = {
    element: "column",
    x: null,
    y: null
  };

  let crosswordState: string[] = ["     ","     ","     ","     ","     "];

	$: wordleSolution = selectedElement.element === "row" ?
		crosswordConfig[selectedElement.y] :
		crosswordConfig.map(s => s[selectedElement.x]).join("");

		function setSelection(x: number, y: number): void {
    if (selectedElement.x === null) {
      // first selection
      selectedElement = {
        element: "row",
        x,
        y
      }
      return;
    }

    if (selectedElement.element === "row") {
      selectedElement = {
        element: selectedElement.y === y ? "column" : "row",
          x,
          y
      }
    } else {
      selectedElement = {
        element: selectedElement.x === x ? "row" : "column",
          x,
          y
      }
    }
  }

	function fillSolutionForSelection(): void {
		if (selectedElement.element === "row") {
			crosswordState[selectedElement.y] = crosswordConfig[selectedElement.y];
		} else {
			crosswordState.forEach((entry, i) => {
				const selectedIndex = selectedElement.x;
				const replaced =
					entry.substring(0, selectedIndex) +
				 	crosswordConfig[i][selectedIndex] +
					entry.substring(selectedIndex + 1);
				crosswordState[i] = replaced;
			});
		}
		crosswordState = crosswordState;
	}

</script>

<main>
	<h1>Welcome to CrossWordle</h1>
	<p>Solve the Crossword on the left by solving a Wordle puzzle per definition. Will this make sense?</p>

	<div class="gameContainer">
		<Crossword
			crosswordState={crosswordState}
			selectedElement={selectedElement}
			setSelection={setSelection}/>
		{#if selectedElement.x !== null}
			{#key wordleSolution}	
				<Wordle
					solution={wordleSolution}
					complete={fillSolutionForSelection} />
			{/key}
		{/if}
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