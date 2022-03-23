<script lang="ts">

  type GridElement = "row" | "column";
  interface Selection {
    element: GridElement;
    x: number;
    y: number;
  };

  let selectedElement: Selection = {
    element: "column",
    x: null,
    y: null
  };

  const crosswordConfig: string[] =
  [
    "GRADE",
    "LOVED",
    "AMONG",
    "RAISE",
    "ENDED",
  ];

  let crosswordStatus: string[] = ["     ","     ","     ","     ","     "];

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

</script>


<div>
  <div>Game state: {JSON.stringify(selectedElement)}</div>
  <div class="container">
  {#each crosswordStatus as entry, y}
    {#each entry as letter, x}
      {#if selectedElement.element === "row" ? y === selectedElement.y : x === selectedElement.x}
        <div class="selectedLetterEntry" on:click={() => setSelection(x,y)}>{letter}</div>
      {:else}
        <div class="letterEntry" on:click={() => setSelection(x,y)}>{letter}</div>
      {/if}
    {/each}
  {/each}
  </div>
</div>

<style>
  .container {
    padding: 1em;
    width: 300px;
    height: 300px;
    display: grid;
    grid-template-rows: repeat(5, 1fr) ;
    grid-template-columns: repeat(5, 1fr) ;
  }

  .letterEntry {
    border: solid 1px black;
    margin: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
		font-size: 2em;
  }

  .selectedLetterEntry {
    background-color: lightskyblue;
    border: solid 1px black;
    margin: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
		font-size: 2em;
  }
</style>