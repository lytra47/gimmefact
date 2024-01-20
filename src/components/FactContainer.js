import React, { useState } from "react";
import Fact from "./Fact";

function FactContainer({ categories, facts }) {
  return (
    <section>
      <ul className="facts-list">
        {facts.map((fact) => (
          <Fact fact={fact} key={fact.id} categories={categories} />
        ))}
      </ul>
      <p>There are {facts.length} facts in the database.</p>
    </section>
  );
}

export default FactContainer;
