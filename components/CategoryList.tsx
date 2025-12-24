
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../constants';

interface CategoryListProps {
  onSearchChange: (query: string) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ onSearchChange }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName: string) => {
    onSearchChange(categoryName);
    navigate('/shop');
  };

  return (
    <section className="relative w-full py-10 bg-background-light dark:bg-background-dark">
      <div className="flex items-center justify-between px-6 mb-6">
        <h3 className="text-neutral-900 dark:text-white text-lg font-bold tracking-widest uppercase">Categories</h3>
        <button 
          onClick={() => navigate('/shop')}
          className="text-primary text-xs font-bold tracking-wider uppercase hover:text-primary/80"
        >
          View All
        </button>
      </div>
      
      <div className="flex w-full overflow-x-auto no-scrollbar px-6 pb-4">
        <div className="flex flex-row gap-5">
          {CATEGORIES.map((cat) => (
            <div 
              key={cat.id} 
              onClick={() => handleCategoryClick(cat.name)}
              className="flex flex-col gap-3 w-28 group cursor-pointer"
            >
              <div 
                className="w-full aspect-[3/4] bg-cover bg-center rounded-xl overflow-hidden shadow-md dark:shadow-none transition-transform group-active:scale-95"
                style={{ backgroundImage: `url("${cat.image}")` }}
              >
                <div className="w-full h-full bg-black/0 group-hover:bg-black/10 transition-colors"></div>
              </div>
              <p className="text-neutral-900 dark:text-white text-sm font-semibold tracking-wide text-center group-hover:text-primary transition-colors">
                {cat.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryList;
