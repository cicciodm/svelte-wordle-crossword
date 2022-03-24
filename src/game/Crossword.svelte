<script lang="ts">
  import { CrosswordElementSelection } from "../Types";

  export let selectedElement: CrosswordElementSelection;
  export let setSelection: (x: number, y: number) => void;
  export let crosswordState: string[];

</script>


<div class="container">
  {#each crosswordState as entry, y}
    {#each entry as letter, x}
      <div class="letterEntry {(selectedElement.element === 'row' ? y === selectedElement.y : x === selectedElement.x) ? 'selected' :''}" on:click={() => setSelection(x,y)}>{letter}</div>
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

  .selected {
    background-color: lightskyblue;
  }
</style>