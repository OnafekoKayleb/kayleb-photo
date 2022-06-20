import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

function Gallery() {
let API_KEY = '563492ad6f91700001000001aef7f7510370476eb56e32da963a2943'
let [perPage, setPerPage] = useState(12)

let [url, setUrl] = useState( `https://api.pexels.com/v1/curated?per_page=${perPage}`)
let [loading, setLoading] = useState(false)
let [photos, setPhotos] = useState([])
let storeText = useSelector((state) => {return state.text})

let user = useSelector(state => state.user.value)

const navigate = useNavigate()

if (user === null){navigate('/login')}



    async function fetchImages(){
     try {
      let res = await fetch(url, {
        method: 'GET',
        headers:{
            Accept: 'application/json',
            Authorization: API_KEY
        }
    })
    let data = await res.json()
    // console.log(data)
    setPhotos(data.photos)
    setLoading(true)
     } catch (error) {
      toast.error('pls check internet connecton and reload')
     }
        
          
        
    
    }

useEffect(() => {
  fetchImages()
},[url])

useEffect(() => {
  setPhotos([])
  if (storeText.value.length>0){
    setUrl( `https://api.pexels.com/v1/search?query=${storeText.value}&per_page=${perPage}`)
  }
  setLoading(false)
  console.log('anything')
}, [storeText])

function loadMore(){
  // setPerPage(perPage + 12)
  if (storeText.value.length>0){
    setPerPage(perPage+12)
    setUrl( `https://api.pexels.com/v1/search?query=${storeText.value}&per_page=${perPage + 12}`)
  }else{
    setPerPage(perPage+12)
    setUrl( `https://api.pexels.com/v1/curated?per_page=${perPage + 12}`)
    
  }
  setLoading(false)

}
  return (
    <>
    


    <div className='gallery'>
       {/* <div className="item">
          <a href="http">
            <img src="images/2.jpg" alt="image"/>
            <h3>name</h3>
          </a>
        </div>
     */}
     {
       photos.map((photo) => {
         return(
          <div className = 'item' key={photo. id}>
            <img src={photo.src.medium}/>
            <h3>{photo.photographer}</h3>
          </div>
         )
       })
     }
       
    </div>
    <button
     type="button"
     className="load-more" 
     data-img="curated"
     onClick={loadMore}

    
     >
          {loading ? 'load more': 'Loading...'}
</button>
    </>
  )
}

export default Gallery
