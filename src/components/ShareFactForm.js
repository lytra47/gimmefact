// import React, { useState } from "react";

import { useState } from "react";

function isValidURL(str) {
  // Regular expression for a simple URL pattern
  var urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/;

  // Test the string against the pattern
  return urlPattern.test(str);
}

function ShareFactForm({ onSetFacts, categories, onSetIsFormOpen }) {
  const [text, setText] = useState("");
  const [textSource, setTextSource] = useState("");
  const [category, setCategory] = useState("");
  const textMaxLength = text.length;

  const handleSubmit = function (e) {
    e.preventDefault();
    //1 Check if data is valid, if so create a new fact
    if (text && isValidURL(textSource) && category && text.length <= 200) {
      //2 Create a new fact object
      const newFact = {
        id: Math.round(Math.random() * 1000000),
        text,
        source: textSource,
        category,
        votesInteresting: 0,
        votesMindblowing: 0,
        votesFalse: 0,
        createdIn: new Date().getFullYear(),
      };
      //3 Add the new fact to the UI
      onSetFacts((facts) => [newFact, ...facts]);

      //4 Reset input
      setText("");
      setTextSource("");
      setCategory("");
      //5 Close form
      onSetIsFormOpen((isOpen) => !isOpen);
    } else console.log("Invalid data");
  };

  return (
    <form className="fact-form" onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        type="text"
        placeholder="Share a fact to the community."
      />
      <span>{200 - textMaxLength}</span>
      <input
        value={textSource}
        onChange={(e) => setTextSource(e.target.value)}
        type="text"
        placeholder="Share the source."
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Choose category :</option>

        {categories.map((cat) => (
          <option value={cat.name} key={cat.name}>
            {cat.name[0].toUpperCase() + cat.name.slice(1)}
          </option>
        ))}
      </select>
      <button className="btn btn-large">post</button>
    </form>
  );
}

export default ShareFactForm;
