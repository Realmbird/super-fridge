import React from 'react';

interface FoodCardProps {
  name: string;
  source: string;
  imageUrl: string;
  ingredientsCount: number;
  totalIngredients: number;
}

const FoodCard: React.FC<FoodCardProps> = ({ name, source, imageUrl, ingredientsCount, totalIngredients }) => {
  return (
    <div style={{
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      overflow: 'hidden',
      width: '300px',
      margin: '10px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <img src={imageUrl} alt={name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
      <div style={{ padding: '15px' }}>
        <h3 style={{ margin: '0 0 5px 0', fontSize: '18px' }}>{name}</h3>
        <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#666' }}>{source}</p>
        <p style={{ margin: '0', fontSize: '14px', color: '#4CAF50' }}>
          You have all {ingredientsCount} ingredients
        </p>
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '10px'
      }}>
        <button style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          marginRight: '10px'
        }}>♡</button>
        <button style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer'
        }}>↗</button>
      </div>
    </div>
  );
};

export default FoodCard;