import React, { useState, useEffect, useCallback } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";

function Ingredients() {
  const [userIndgredients, setUserIngredients] = useState([]);

  ////We can not use this fetch cos we already use fetch ingrediens from search component
  ////
  // useEffect(() => {
  //   fetch(
  //     "https://react-app-81b61-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json"
  //   )
  //     .then((response) => response.json())
  //     .then((responseData) => {
  //       const loadedIngredients = [];
  //       for (const key in responseData) {
  //         loadedIngredients.push({
  //           id: key,
  //           title: responseData[key].title,
  //           amount: responseData[key].amount,
  //         });
  //       }
  //       setUserIngredients(loadedIngredients);
  //     });
  // }, []);

  useEffect(() => {
    console.log("Rendering ingredients", userIndgredients);
  }, [userIndgredients]);

  const filteredIngredientsHandler = useCallback((filtredIngredients) => {
    setUserIngredients(filtredIngredients);
  }, []);

  const addIngredientHandler = (ingredient) => {
    fetch(
      "https://react-app-81b61-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json",
      {
        method: "POST",
        body: JSON.stringify(ingredient),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        console.log(responseData.name);
        setUserIngredients((prevIngredients) => [
          ...prevIngredients,
          {
            id: responseData.name,
            ...ingredient,
          },
        ]);
      });
  };

  const removeIngredientHandler = (ingredientId) => {
    fetch(
      `https://react-app-81b61-default-rtdb.europe-west1.firebasedatabase.app/ingredients/${ingredientId}.json`,
      {
        method: "DELETE",
      }
    ).then((response) => {
      setUserIngredients((prevIngredients) =>
        prevIngredients.filter((ing) => ing.id !== ingredientId)
      );
    });
  };

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList
          ingredients={userIndgredients}
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
}

export default Ingredients;
