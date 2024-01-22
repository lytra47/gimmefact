import React, { useEffect, useState } from "react";
import "./style.css";
import Header from "./components/Header";
import Category from "./components/Category";
import FactContainer from "./components/FactContainer";
import ShareFactForm from "./components/ShareFactForm";
import supabase from "./supabase";
import Loading from "./components/Loading";

const categories = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [facts, setFacts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  useEffect(
    function () {
      async function getFacts() {
        setIsLoading(true);

        let query = supabase.from("facts").select("*");

        if (selectedCategory !== "all") {
          query = query.eq("category", selectedCategory);
        }

        const { data: facts, error } = await query
          .order("votesInteresting", { ascending: false })
          .limit(1000);
        if (!error) {
          setFacts(facts);
        } else {
          alert("There was a problem getting data.");
        }
        setIsLoading(false);
      }

      getFacts();
    },
    [selectedCategory]
  ); //empty array ensure that it runs only once. - dependency array.

  return (
    <>
      <Header onIsFormOpen={isFormOpen} onSetIsFormOpen={setIsFormOpen} />
      {isFormOpen && (
        <ShareFactForm
          onSetFacts={setFacts}
          onSetIsFormOpen={setIsFormOpen}
          categories={categories}
        />
      )}
      <main className="main">
        <Category onSelect={setSelectedCategory} categories={categories} />
        {isLoading ? (
          <Loading />
        ) : (
          <FactContainer
            onSetFacts={setFacts}
            facts={facts}
            categories={categories}
          />
        )}
      </main>
    </>
  );
}

export default App;
