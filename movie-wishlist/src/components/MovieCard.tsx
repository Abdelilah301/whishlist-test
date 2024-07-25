import React from 'react';
import './MovieCard.scss';

interface MovieCardProps {
  title: string;
  cover: string;
  categories: string[];
  bestQuality: string;
  isNew?: boolean;
  selected: boolean;
  onSelect: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, cover, categories, bestQuality, isNew, selected, onSelect }) => {
  return (
    <div className={`movie-card ${selected ? 'selected' : ''}`} onClick={onSelect}>
      <img src={process.env.PUBLIC_URL + '/' + cover} alt={title} />
      {isNew && <div className="new-badge">NEW</div>}
      <input type="checkbox" checked={selected} readOnly className="select-checkbox" />
      <div className="movie-info">
        <h3>{title}</h3>
        <div className="tags">
          {categories.map((category, index) => (
            <span key={index} className="tag">{category}</span>
          ))}
          <span className="tag">{bestQuality}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
