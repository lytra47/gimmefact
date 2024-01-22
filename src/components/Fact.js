import React, { useState } from "react";
import supabase from "../supabase";

function Fact({ fact, categories, onSetFacts }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const isDisputed =
    fact.votesInteresting + fact.votesMindblowing < fact.votesFalse;
  const handleVote = async function (columnName) {
    setIsUpdating(true);
    //generalised for 3 buttons using [] in objects.
    const { data: updatedFact, error } = await supabase
      .from("facts")
      .update({ [columnName]: fact[columnName] + 1 })
      .eq("id", fact.id)
      .select(); //selecting to update local fact array.
    setIsUpdating(false); //to avoid multiple clicks

    if (!error)
      onSetFacts((facts) =>
        facts.map((f) => (f.id === fact.id ? updatedFact[0] : f))
      );
  };

  return (
    <li className="fact">
      <p>
        {isDisputed ? <span className="disputed">🛑[DISPUTED]</span> : null}
        {fact.text}
        <a
          className="source"
          href={fact.source}
          target="_blank"
          rel="noopener noreferrer"
        >
          [Source]
        </a>
      </p>
      <span
        className="tag"
        style={{
          backgroundColor: categories.find((cat) => cat.name === fact.category)
            .color,
        }}
      >
        {fact.category}
      </span>
      <div className="vote-buttons">
        <button
          onClick={() => handleVote("votesInteresting")}
          disabled={isUpdating}
        >
          👍{fact.votesInteresting}
        </button>
        <button
          onClick={() => handleVote("votesMindblowing")}
          disabled={isUpdating}
        >
          🤯{fact.votesMindblowing}
        </button>
        <button onClick={() => handleVote("votesFalse")} disabled={isUpdating}>
          ❌{fact.votesFalse}
        </button>
      </div>
    </li>
  );
}

export default Fact;
