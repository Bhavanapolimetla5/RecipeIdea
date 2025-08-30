import React from 'react'
import { useState,useEffect } from 'react'
import './App.css'
function CallingApi(props){
    const[data,setData] = useState(null); //state to store fetched data
    const [selectedMeal, setSelectedMeal] = useState(null); //state to store selected meal for modal
    //useEffect to fetch data when component mounts or props.value changes
   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${props.value}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.log(err);
      } 
    };

    fetchData();
  }, [props.value]);
  //function to fetch full meal details by id
  const viewDesciption  = async (id) => {
    try {
      //console.log("Mealid:", id);
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const result = await response.json();
      //console.log(result);
      setSelectedMeal(result.meals[0]);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    //render fetched meals or loading message
    <div>
  <h1>Fetched Meals</h1>
  {!data ? (
    <p>Loading...</p>
  ) : data.meals ? (
    <div className="meal-list">
      {data.meals.map((meal) => (
        <div key={meal.idMeal} className="meal-item">
          <img src={meal.strMealThumb} alt={meal.strMeal} />
          <h3>{meal.strMeal}</h3>
          <button onClick={() => viewDesciption(meal.idMeal)}>
            View full details
          </button>
        </div>
      ))}
    </div>
  ) : (
    <p>No meals found for "{props.value}"</p>
  )}
  {selectedMeal && (
    <div className="modal-overlay" onClick={() => setSelectedMeal(null)}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={() => setSelectedMeal(null)}>
          X
        </button>
        <h2>{selectedMeal.strMeal}</h2>
        <img src={selectedMeal.strMealThumb} alt={selectedMeal.strMeal} />
        <p>
          <b>Instructions:</b>
        </p>
        <p>{selectedMeal.strInstructions}</p>
        {selectedMeal.strYoutube && (
          <p>
            <a
              href={selectedMeal.strYoutube}
              target="_blank"
              rel="noreferrer"
            >
              Watch on YouTube
            </a>
          </p>
        )}
        //displaying ingredients and measurements
      </div>

    </div>
  )}
</div>

  )
 
}
export default CallingApi
