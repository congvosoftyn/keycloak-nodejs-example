import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios'

function Protected({ token }) {
  const isRun = useRef(false);
  const [list, setList] = useState([])

  useEffect(() => {
    if (isRun.current) return;

    isRun.current = true;
    axios.get("http://localhost:4000/api/documents", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      setList(res.data)
    }).catch((err) => {
      console.error(err)
    })


  }, [token])


  return list.length > 0 ? (
    list.map((value, index) => {
      return (
        <h3 key={index} >{value}</h3>
      )
    })
  ) : <div>Protected</div>;
}

export default Protected