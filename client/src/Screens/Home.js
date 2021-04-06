import React, { useEffect, useState } from "react";
import Dog from "./DogCard";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "./Pagination";
import { getDogs, getDogsByTemp, getTemperaments } from "../Redux/actions";
import "./css/Home.scss";
export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments());
  }, []);
  const [input, setInput] = useState({
    temperaments: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(6);
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const dog = useSelector((state) => state.dogs);
  const temperaments = useSelector((state) => state.temperaments);

  const filterCategory = (e) => {
    e.preventDefault();
    console.log(input.temperaments);
    dispatch(getDogsByTemp(input.temperaments));
  };

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  if (Object.keys(dog).length === 0)
    return (
      <div style={{ marginTop: 100, textAlign: "center" }}>
        Loading puppies!
      </div>
    );
  const currentPosts = dog.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="App">
      {console.log(dog)}
      <div className="text">
        <h1>PuppyPedia</h1>
        <div>{!dog ? <div>No existen perros</div> : null}</div>
      </div>
      <h3>Buscar tus perros creados por temperamento</h3>

      <form onSubmit={filterCategory} className="form-group">
        <span className="temp">
          <label for="temperaments">Temperaments: </label>
        </span>
        <select
          key={temperaments.id}
          onChange={handleInputChange}
          value={input.temperaments}
          id="temperaments"
          name="temperaments"
        >
          {temperaments.map((temp) => {
            return <option value={temp.name}>{temp.name}</option>;
          })}
          {console.log(input.temperaments)}
        </select>

        <div>
          <input
            className="btn btn-info"
            type="submit"
            onSubmit={filterCategory}
            value="Search"
            disabled={!input.temperaments || false}
          ></input>
        </div>
      </form>

      <div className="breed">Breeds</div>
      <div className="container-dogs">
        <div className="dog-card">
          {currentPosts.map((dogs) => (
            <Dog
              key={dogs.id}
              id={dogs.id}
              name={dogs.name}
              image={dogs.image}
              temperaments={dogs.temperaments}
              temperament={dogs.temperament}
              img={dogs.img}
            ></Dog>
          ))}
          <Pagination
            postPerPage={postPerPage}
            paginate={paginate}
            totalPosts={dog.length}
          />
        </div>
      </div>
    </div>
  );
}
