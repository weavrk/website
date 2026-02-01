import React, { useState } from 'react';
import BentoCardContent from './BentoCardContent';
import BentoCard from './BentoCard';
import { useCellNumbers } from '../contexts/CellNumbersContext';


interface BentoGridComponentProps {
  className?: string;
}

const BentoGridComponent: React.FC<BentoGridComponentProps> = ({ className = '' }) => {
  const { showCellNumbers } = useCellNumbers();

  // Create cells for the 2D grid (4 columns, 8 rows)
  const gridCells = [];
  
  for (let row = 1; row <= 8; row++) {
    for (let col = 1; col <= 4; col++) {
      gridCells.push({
        key: `cell-${row}-${col}`,
        row,
        col,
        content: (
          <BentoCardContent sectionHeader="--">
            <div></div>
          </BentoCardContent>
        )
      });
    }
  }

  const numRows = 8;
  const numCols = 4;

  return (
    <div className={`bento-container relative ${className}`}>
      {/* 2D Bento Grid */}
      <div 
        className="bento-grid-new"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '8px',
          minHeight: '600px'
        }}
      >
        {/* Actual cards - positioned on top */}
        {gridCells.map(cell => (
          <div
            key={cell.key}
            className="bento-grid-cell-new"
            style={{
              gridRow: `${cell.row} / span 1`,
              gridColumn: `${cell.col} / span 1`,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'stretch',
              justifyContent: 'stretch'
            }}
          >
            <BentoCard 
              type="deboss"
              className="w-full h-full flex"
            >
              {cell.content}
            </BentoCard>
          </div>
        ))}
      </div>

      {/* Cell Numbers Grid - positioned behind cards */}
      {showCellNumbers && (
        <div 
          className="bento-grid-numbers"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridTemplateRows: 'repeat(8, 1fr)',
            gap: '8px',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1
          }}
        >
          {Array.from({ length: numRows * numCols }, (_, index) => {
            const row = Math.floor(index / numCols) + 1;
            const col = (index % numCols) + 1;
            return (
              <div
                key={`grid-number-${index + 1}`}
                className={`bento-cell-number ${!showCellNumbers ? 'hidden' : ''}`}
                style={{
                  gridRow: `${row} / span 1`,
                  gridColumn: `${col} / span 1`
                }}
              >
                {index + 1}
              </div>
            );
          })}
        </div>
      )}


    </div>
  );
};

export default BentoGridComponent; 