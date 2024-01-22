// import React, { useState } from "react";

import { useState } from "react";
import supabase from "../supabase";

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
  const [isUploading, setIsUploading] = useState(false);
  const textMaxLength = text.length;

  const handleSubmit = async function (e) {
    e.preventDefault();
    //1 Check if data is valid, if so create a new fact
    if (text && isValidURL(textSource) && category && text.length <= 200) {
      //2 Create a new fact object
      // const newFact = {
      //   id: Math.round(Math.random() * 1000000),
      //   text,
      //   source: textSource,
      //   category,
      //   votesInteresting: 0,
      //   votesMindblowing: 0,
      //   votesFalse: 0,
      //   createdIn: new Date().getFullYear(),
      // };

      //2 Upload fact to supabase and receive new fact obj.
      setIsUploading(true);
      const { data: newFact, error } = await supabase
        .from("facts")
        .insert([{ text, source: textSource, category }])
        .select(); //select command to receive the current uploaded data
      setIsUploading(false);

      //3 Add the new fact to the UI
      // to avoid refetching and get the data just created
      if (!error) onSetFacts((facts) => [newFact[0], ...facts]);

      //4 Reset input
      setText("");
      setTextSource("");
      setCategory("");

      //5 Close form
      onSetIsFormOpen(false);
    }
  };

  return (
    <form className="fact-form" onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        type="text"
        placeholder="Share a fact to the community."
        disabled={isUploading}
      />
      <span>{200 - textMaxLength}</span>
      <input
        value={textSource}
        onChange={(e) => setTextSource(e.target.value)}
        type="text"
        placeholder="Share the source."
        disabled={isUploading}
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        disabled={isUploading}
      >
        <option value="">Choose category :</option>

        {categories.map((cat) => (
          <option value={cat.name} key={cat.name}>
            {cat.name[0].toUpperCase() + cat.name.slice(1)}
          </option>
        ))}
      </select>
      <button className="btn btn-large" disabled={isUploading}>
        post
      </button>
    </form>
  );
}

export default ShareFactForm;
