import axios from 'axios';
import React, { useEffect, useState } from 'react'

const About = () => {

  // const [carts, setCarts] = useState([]);

  // useEffect(() => {
  //   fetch('https://dummyjson.com/carts')
  //     // .then((res) => res.json())
  //     // .then((data) => setCarts(data.carts))
  //     .then(res => res.json())
  //     .then(data => setCarts(data.carts))

  //     .catch((error) => console.error('Api Not Found', error));
  // }
  //   , []);

  const [person, setPerson] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/person')
      .then(resp => {
        setPerson(resp.data)
      })
      .catch((error) => console.error('api not found', error))
  }, [])
  return (
    <>

      {person.map((innerArray, index) => (
        <div key={index}>
          <h1> Group {index + 1}</h1>

          {innerArray.map((user) => (
            <div key={user.id}>
              <h4>{user.name}</h4>
            </div>
          ))}
        </div>
      ))}



      <div className="main_layout">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit.
      </div>

      {/* {carts.map((cart) =>
        <div key={cart.id}>
          {cart.products.map((item) =>
            <div key={item.id}>
              <p>{item.title}</p>
            </div>
          )}
        </div>
      )} */}

    </>
  )
}

export default About;