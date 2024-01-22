import React from "react";

function Category({ onSelect, categories }) {
  return (
    <aside>
      <ul>
        <li className="category">
          <button
            className="btn btn-all-categories"
            onClick={() => onSelect("all")}
          >
            All
          </button>
        </li>
        {categories.map((cat) => (
          <li className="category" key={cat.name}>
            <button
              onClick={() => onSelect(cat.name)}
              className="btn btn-category"
              style={{ backgroundColor: cat.color }}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Category;
