import Fact from "./Fact";

function FactContainer({ onSetFacts, categories, facts }) {
  if (facts.length === 0)
    return (
      <p className="message">
        No facts for this category yet! Create the first one 🤩
      </p>
    );

  return (
    <section>
      <ul className="facts-list">
        {facts.map((fact) => (
          <Fact
            onSetFacts={onSetFacts}
            fact={fact}
            key={fact.id}
            categories={categories}
          />
        ))}
      </ul>
      <p>There are {facts.length} facts in the database.</p>
    </section>
  );
}

export default FactContainer;
