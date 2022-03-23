<script lang="ts">
  export let solution: string;

  const allowedTries = 6;
  let tries: string[] = [];
  $: tryIndex = tries.length;
  $: currentTry = tries[tryIndex];

  function itsSolved(completeTry: string): boolean {
    return completeTry === solution;
  }

</script>


<div class="container">
  {#each Array(allowedTries) as _, i}
    {#each Array(5) as _, i}
      <div class="letterEntry"></div>
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