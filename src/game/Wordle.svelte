<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { WordleElement, WordleTry } from "../Types";
  import { wordSet } from "./wordList";

  export let solution: string;
  export let complete: () => void;

  const allowedTries = 6;
  
  const keyboardRows = [
    "QWERTYUIOP",
    "ASDFGHJKL",
    "ZXCVBNM"
  ];

  let tries: WordleTry[] = [];
  let currentTryIndex = 0;

  $: solutionMap = mapifyString(solution);
  $: currentTry = tries[currentTryIndex] ?? [];
  $: currentLetterIndex = tries[currentTryIndex]?.length;
  $: lettersMap = tries.slice(0, currentTryIndex).reduce((map, wordleTry) => {
    wordleTry.forEach(t => {
      map[t.value] = t.category;
    });
    return map;
  }, {});

  $: console.log("Re-calculating", lettersMap);

  function mapifyString(original: string): {[key: string]: number[]} {
    var map = {};
    [...original].forEach((letter, index) => {
      map[letter] = [...(map[letter] || []), index];
    });

    return map;
  }

  function keyPressed(event: KeyboardEvent): void {
    let char = event.key.toLocaleUpperCase();

    if (char === "BACKSPACE") {
      tries[currentTryIndex].pop();
      tries[currentTryIndex] = tries[currentTryIndex].map(t => ({...t, category: "guess"}));
      return;
    }

    if (currentLetterIndex === 5 && char === "ENTER") {
      validateCurrentGuess();
      return;
    }

    if (currentTry?.length === 5 || !char.match(/^[A-Z]{1}$/)) {
      return;
    }

    var newTry: WordleTry = [...currentTry, {category: "guess", value: char}];
    tries[currentTryIndex] = newTry;
    tries = tries;
  }

  function validateCurrentGuess(): void {
    const fullTry = currentTry.map(t => t.value).join("");
    
    if (!wordSet.has(fullTry)) {
      // Invalid word
      tries[currentTryIndex] = currentTry.map(t => ({...t, category: "error" }));
      tries = tries;
      return;
    }

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

        if (correctLetterEntry.filter(correct => correct === i).length) {
          validatedLetterTry.category = "correct";
          solutionMapCopy[char] = solutionMapCopy[char].filter(idx => idx !== i);
        } else {
          solutionMapCopy[char] = solutionMapCopy[char].filter(idx => idx > i);
        } 
      }
      return validatedLetterTry;
    });

    tries[currentTryIndex] = validatedTry;
    tries = tries;
    currentTryIndex = currentTryIndex + 1;

    if (validatedTry.every(t => t.category === "correct")) {
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

<div class="container">
  {#each Array(allowedTries) as _, tryIndex}
    {#each Array(5) as _, tryLetterIndex}
      <div class="letterEntry {tries?.[tryIndex]?.[tryLetterIndex]?.category !== 'guess' ? tries?.[tryIndex]?.[tryLetterIndex]?.category : '' }">{tries?.[tryIndex]?.[tryLetterIndex]?.value || ""}</div>
    {/each}
  {/each}
</div>
<div class="keyboardContainer">
  {#each keyboardRows as row }
    <div class="rowContainer">
      {#each row as letter}
        <div class="{lettersMap[letter] !== undefined ? lettersMap[letter] : ''} keyboardLetterContainer">{letter}</div>
      {/each}
    </div>
  {/each}
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
    background-color: #e6cd62 !important;
  }

  .correct {
    background-color: #75c56d !important;
  }
  
  .error {
    color: red;
  }
  
  .guess {
    background-color: grey !important;
  }

  .keyboardContainer {
    position: fixed;
    bottom: 350px;
    display: flex;
    width: 500px;
    justify-content: center;
    flex-direction: column;
  }

  .rowContainer {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .keyboardLetterContainer {
    height: 53px;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    background-color: #bdbdbd;
    font-size: 1em;
    margin: 5px;
  }
</style>