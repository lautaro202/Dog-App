import React, { useEffect, useState } from "react";
import Dog from "./DogCard";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "./Pagination";
import { getDogs } from "../Redux/actions";
import { Link } from "react-router-dom";
import "./css/Home.scss";
export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDogs());
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(6);
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const dog = useSelector((state) => state.dogs);
  if (Object.keys(dog).length === 0)
    return (
      <div style={{ marginTop: 100, textAlign: "center" }}>
        Loading puppies!
      </div>
    );
  const currentPosts = dog.slice(indexOfFirstPost, indexOfLastPost);
  console.log(currentPosts);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="App">
      <div className="text">
        <h1>PuppyPedia</h1>
        <div>{!dog ? <div>No existen perros</div> : null}</div>
      </div>
      <div className="breed">Breeds</div>

      <div className="container-dogs">
        <div className="dog-card">
          {currentPosts.map((dogs) => (
            <Dog
              key={dogs.id}
              id={dogs.id}
              name={dogs.name}
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
