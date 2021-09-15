import React, { useState } from 'react';
import styled from 'styled-components';

const ProdTile = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  padding: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Thumbnails = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2%;

  .current-style {
    border: solid green 3px;
  }
`;

const Thumbnail = styled.div`
  border-radius: 50%;
  width: 5vw;
  height: 5vw;
  cursor: pointer;
  background-image: url(${props => props.src});
  background-size: cover;
`;

const CartForm = styled.div`
  display: flex;
  gap 2%;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  justify-content: center;
  align-items: center;
`;

const Select = styled.select`
  width: 30%;
  height: 35px;
  background: white;
  padding-left: 5px;
  font-size: 14px;
`;

const CartBtn = styled.button`
  margin: auto;
`;
export default function ProductTile({ info, styles, currStyle, setCurrStyle }) {
  const [sale, setSale] = useState(styles[currStyle].sale_price ? true : false);
  const [price, setPrice] = useState(sale ? styles[currStyle].sale_price : styles[currStyle].original_price);
  const [quantity, setQuantity] =useState('');
  const [size, setSize] = useState('');
  const [skus, setSkus] = useState(styles[currStyle].skus);
  const [maxQuantity, setMaxQuantity] = useState('');
  const [styleName, setStyleName] = useState(styles[currStyle].name);
  const photos = styles.map((k, i) => k.photos[0].thumbnail_url);

  const handleSize = (e) => {
    e.preventDefault();
    let [s, q] = e.target.value.split(' ');
    if (parseInt(q) < 15) {
      q = Array.from(Array(parseInt(q) + 1).keys()).slice(1);
    } else {
      q = Array.from(Array(16).keys()).slice(1)
    }
    setMaxQuantity(q);
    setSize(s);
  }

  const handleThumbnailClick = (e) => {
    e.preventDefault();
    const id = e.target.id;
    setCurrStyle(id);
    const s = styles[id].sale_price;
    setSale(s ? true : false);
    setPrice(s ? s : styles[id].original_price);

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    //Add in add to cart functionality, need to talk to Crystal
  }

  return (
    <ProdTile className='card'>
      <div className='ProdText card'>
        <p><a href='#RatingsAndReviews'>Read all Reviews</a></p>
        <p>CATEGORY > <em>{info.category}</em></p>
        <h1>{info.name}</h1>
        <p>{info.description}</p>
        {sale ?
        (<p><strong style={{color: 'red'}}>${price}</strong> <strike>${styles[currStyle].original_price}</strike></p>) :
        (<p>${price}</p>) }

      </div>
      <div className='card'>
        <div><strong>Style ></strong> {styles[currStyle].name}</div>
        <Thumbnails>
          {photos.map((url, index) => (
            index === currStyle ?
            (<Thumbnail className='current-style' key={index} id={index} src={url} onClick={(e) => handleThumbnailClick(e)}/>)
            : (<Thumbnail key={index} id={index} src={url} onClick={(e) => handleThumbnailClick(e)}/>)
          ))}
        </Thumbnails>
      </div>

      <CartForm className='card' onSubmit={(e) => handleSubmit(e)}>
        <Select id='sizeSelect' onChange={(e) => handleSize(e)} required>
          <option value="">Select Size</option>
          {Object.keys(skus).map((sku) =>
            <option value={skus[sku].size + ' ' + skus[sku].quantity} key={sku}>{skus[sku].size}</option>
          )}
        </Select>
        {size === "" ? <Select><option>-</option></Select> : <Select onChange={(e) => setQuantity(e.target.value)} required>
          {maxQuantity.map((x, i) => {
            return(<option value={x} key={x}>{x}</option>);
          })}
        </Select>}
        <CartBtn type='submit'>Add to Cart</CartBtn>
      </CartForm>
    </ProdTile>
   );
}
