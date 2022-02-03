import { useState, useRef, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import '../App.css'

function List() {

  const [query, setQuery] = useState('')  
  const [apiData, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [pageCount, setPageCount] = useState(0)

  const loadRef = useRef()
//   const observer = useRef()

  useEffect(() => {
    const option = {
        root: document,
        rootMargin: '20px',
        threshold: 1
    }

    let callback = (entries, observer) => {
        console.log(entries)
        entries.forEach(entry => {
            console.log(entry.isIntersecting)
            if (entry.isIntersecting) {
                setPageCount((p) => p + 1)
                const p = pageCount + 1
                fetchData(p)
              }
        });
    };

    const observer = new IntersectionObserver(callback, option)

    if (loadRef.current) {
        observer.observe(loadRef.current)
    }

    return () => {
        observer.disconnect()
    }

  }, [])

  const onTextChange = (e) => {
      console.log(e.target.value)
      if (e.target.value) {
        setQuery(e.target.value)
      }
  }  

  const fetchData = (count) => {
     setLoading(true)
     fetch(`https://openlibrary.org/search.json?q=${query}&page=${count}&limit=5`).then((res) => {
          res.json().then((data) => {
            setLoading(false)
            const resData = data.docs
            console.log(apiData, resData)
            setData(apiData => [...apiData, ...resData])
          }).catch((err) => {
              throw new Error('Error while fetching data for query' + query )
          })
      })
  }

  const onSubmit = () => {
      fetchData(pageCount)
  }

  const renderData = apiData.map((item, index) => {
    return (
        <div key={item.key} className="list-container">
            <Link to={`${item.key}`} key={item.key}>{item.title}</Link>
        </div> 
     )
  })

  
  
  return (
    <div>
        <section style={{ margin: "20px" }}>
            <input value={query} onInput={onTextChange}></input>
            <button onClick={onSubmit}>Submit</button>
        </section>

        <section style={{ margin: "20px" }}>
            {loading && apiData.length === 0 ? <div>Loading data......</div> : renderData}
            
        </section>
        <div ref={loadRef} className="loadRef">
            {loading && apiData.length > 0 ? <div>Loading More data......</div> : <div></div>}
        </div>
    </div>
  );
}

export default List
