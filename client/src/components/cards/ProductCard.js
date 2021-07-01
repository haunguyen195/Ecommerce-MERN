import React, { Fragment } from 'react';
import Card from 'antd/lib/card';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import laptop from '../../images/laptop.png';
const { Meta } = Card;

const ProductCard = ({ product }) => {
  const { images, slug, title, description } = product;
  return (
    <Card
      cover={
        <img
          src={images && images.length > 0 ? images[0].url : laptop}
          alt='product'
        />
      }
      style={{ objectFit: 'cover' }}
      className='p-1'
      actions={[
        <Link to={`/product/${slug}`}>
          <EyeOutlined className='text-warning' /> <br /> View Product
        </Link>,
        <Fragment>
          <ShoppingCartOutlined className='text-danger' />
          <br /> Add to Cart{' '}
        </Fragment>,
      ]}
    >
      <Meta
        title={title}
        description={`${description && description.substring(0, 30)}...`}
      />
    </Card>
  );
};

export default ProductCard;
