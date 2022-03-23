<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { WordleElement, WordleTry } from "../Types";

  export let solution: string;
  export let complete: () => void;

  const allowedTries = 6;

  let tries: WordleTry[] = [];
  let currentTryIndex = 0;

  $: solutionMap = mapifyString(solution);
  $: currentTry = tries[currentTryIndex] ?? [];
  $: currentLetterIndex = tries[currentTryIndex]?.length;

  function mapifyString(original: string): {[key: string]: number[]} {
    var map = {};
    [...original].forEach((letter, index) => {
      map[letter] = [...(map[letter] || []), index];
    });

    console.log("mapped", map);
    return map;
  }

  function keyPressed(event: KeyboardEvent): void {
    let char = event.key.toLocaleUpperCase();

    if (char === "BACKSPACE") {
      tries[currentTryIndex].pop();
      tries[currentTryIndex] = tries[currentTryIndex];
      return;
    }

    if (currentLetterIndex === 5 && char === "ENTER") {
      validateCurrentGuess();
      return;
    }

    if (currentTry?.length === 5 || !char.match(/[A-Z]/)) {
      console.log("Invalid char or string too long");
      return;
    }

    var newTry: WordleTry = [...currentTry, {category: "guess", value: char}];
    tries[currentTryIndex] = newTry;
    tries = tries;

    console.log("tries", tries);
  }

  function validateCurrentGuess(): void {
    var solutionMapCopy = {...solutionMap};
    var validatedTry = [...currentTry].map((wt, i) => {
      var char = wt.value;

      var validatedLetterTry: WordleElement = {
        value: char,
        category: "guess"
      };

      var correctLetterEntry = solutionMapCopy[char];

      if (correctLetterEntry && correctLetterEntry.length) {
        validatedLetterTry.category = "almost";
        console.log("Checking", wt, i, "against", correctLetterEntry);

        if (correctLetterEntry.filter(correct => correct === i).length) {
          validatedLetterTry.category = "correct";
          console.log("found a correct letter, before", wt.value, solutionMapCopy[char]);
          solutionMapCopy[char] = solutionMapCopy[char].filter(idx => idx !== i);
          console.log("found a correct letter, after", solutionMapCopy[char]);
        }
      }
      return validatedLetterTry;
    });

    tries[currentTryIndex] = validatedTry;
    tries = tries;
    currentTryIndex = currentTryIndex + 1;

    if (validatedTry.every(t => t.category === "correct")) {
      console.log("We are correct, completing");
      document.onkeydown = null;
      complete();
    }
  }

  onMount(() => {
    document.onkeydown = keyPressed;
  });

  onDestroy(() => {
    document.onkeydown = null;
  });

</script>

<div>
  <span>Wordle nr {solutionMap["a"]}</span>
<div class="container">
  {#each Array(allowedTries) as _, tryIndex}
    {#each Array(5) as _, tryLetterIndex}
      <div class="letterEntry {tries?.[tryIndex]?.[tryLetterIndex]?.category}">{tries?.[tryIndex]?.[tryLetterIndex]?.value || ""}</div>
    {/each}
  {/each}
</div>
</div>

<style>
  .container {
    padding: 1em;
    width: 300px;
    height: 350px;
    display: grid;
    grid-template-rows: repeat(6, 1fr) ;
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

  .almost {
    background-color: #b59f3b;
  }

  .correct {
    background-color: #538d4e;
  }
</style>