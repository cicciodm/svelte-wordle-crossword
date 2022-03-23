<script lang="ts">
  export let selectedElement: CrosswordElementSelection;
  export let setSelection: (x: number, y: number) => void;

  let crosswordStatus: string[] = ["     ","     ","     ","     ","     "];
</script>


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