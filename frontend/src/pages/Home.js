import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Carousel from '../components/Carousel';

export default function Home() {
  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);

  const loadData = async () => {
    try {
      let response = await fetch(`http://localhost:5000/api/foodData`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });

      response = await response.json();

      setFoodCat(response[0][1]);
      setFoodItems(response[0][0]);

      //console.log(response[0],response[1]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div><Navbar /></div>
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
          <div className="carousel-inner" id='carousel' style={{ "maxHeight": "700px" }}>
            <div className='carousel-caption ' style={{ "zIndex": "10" }}>
              <div className="d-flex justify-content-center">
                <input className="form-control me-2 text-white" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
              </div>
            </div>
            <div className="carousel-item active" >
              <img src="https://source.unsplash.com/random/300*100/?burger" className="d-block w-100 h-200" style={{ "filter": "brightness(30%)", "height": "80vh", "objectFit": "fill" }} />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/300*100/?donuts" className="d-block w-100 " style={{ "filter": "brightness(30%)", "height": "80vh", "objectFit": "fill" }} />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/300*100/?noodle" className="d-block w-100" style={{ "filter": "brightness(30%)", "height": "80vh", "objectFit": "fill" }} />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className='container'>
        {
          foodCat.length === 0 ? <div>No such Data</div> :
            foodCat.map((data) => {
              return (
                <div key={data._id} className='m-3 row'>
                  <h2>{data.name}</h2>
                  <hr />
                  {foodItems.filter((item) => (item.categoryName === data.name) && item.name.toLowerCase().includes(search.toLowerCase())).map((filterItem) => {
                    return (
                      <div key={filterItem._id} className='m-3 col-12 col-md-6 col-lg-3'>
                        <Card foodItem={filterItem} options={filterItem.options?.[0]} />
                      </div>
                    )
                  })}
                </div>
              )
            })
        }
      </div>
      <div><Footer /></div>
    </div>
  )
}
