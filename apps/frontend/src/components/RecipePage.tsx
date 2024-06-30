import React from 'react';
import FoodCard from './Food/FoodCard';

export const RecipePage: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <FoodCard
        name="Soft-Boiled Egg with Soldiers: OT Meal Plan"
        source="rte.ie"
        imageUrl="/11bc21ba5384996d42f6c3503a07b94a-t.jpg" 
        // path_to_egg_image.jpg
        ingredientsCount={3}
        totalIngredients={3}
      />
      <FoodCard
        name="Garlic Croutons"
        source="food.com"
        imageUrl="/396701-t.jpg"
        // path_to_croutons_image.jpg
        ingredientsCount={3}
        totalIngredients={3}
      />
      {/* Add more FoodCard components as needed */}
    </div>
  );
};

