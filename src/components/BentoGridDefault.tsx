import React, { useState, useEffect } from 'react';
import BentoCardContent from './BentoCardContent';
import BentoCard from './BentoCard';
import { useCellNumbers } from '../contexts/CellNumbersContext';

interface CustomCell {
  row: number;
  col: number;
  colSpan?: number;
  rowSpan?: number;
  content: React.ReactNode;
  clickable?: boolean; // Keep for backward compatibility
  type?: 'deboss' | 'flat' | 'emboss';
  style?: React.CSSProperties;
  className?: string;
}

interface BentoGridDefaultProps {
  className?: string;
  customCells?: CustomCell[];
  showCellNumbers?: boolean;
  setShowCellNumbers?: React.Dispatch<React.SetStateAction<boolean>>;
  maxRows?: number;
}

const BentoGridDefault: React.FC<BentoGridDefaultProps> = ({ 
  className = '', 
  customCells = [], 
  showCellNumbers: propShowCellNumbers,
  setShowCellNumbers: propSetShowCellNumbers,
  maxRows
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const { showCellNumbers: globalShowCellNumbers, setShowCellNumbers: globalSetShowCellNumbers } = useCellNumbers();
  
  // Use props if provided, otherwise use global state
  const showCellNumbers = propShowCellNumbers !== undefined ? propShowCellNumbers : globalShowCellNumbers;
  const setShowCellNumbers = propSetShowCellNumbers || globalSetShowCellNumbers;
  


  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 959);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);



  // Calculate the maximum row needed based on custom cells
  const maxRowNeeded = customCells.length > 0 
    ? Math.max(...customCells.map(cell => cell.row + (cell.rowSpan || 1) - 1))
    : 16; // Default to 16 rows (8 + 8 more) if no custom cells

  // Create cells for the 2D grid (4 columns, dynamic rows for desktop, 2 columns for mobile)
  const gridCells = [];

  for (let row = 1; row <= maxRowNeeded; row++) {
    for (let col = 1; col <= 4; col++) {
      // Check if there's custom content for this cell
      const customCell = customCells.find(cell => cell.row === row && cell.col === col);
      
      if (customCell) {
        gridCells.push({
          key: `cell-custom-${row}-${col}`,
          row,
          col,
          colSpan: customCell.colSpan || 1,
          rowSpan: customCell.rowSpan || 1,
          content: customCell.content,
          clickable: customCell.clickable,
          type: customCell.type,
          style: customCell.style,
          className: customCell.className
        });
      } else {
        // Check if this cell is covered by a spanning card (horizontal, vertical, or both)
        const isCoveredBySpanningCard = customCells.some(cell => {
          // Check if this cell position is within the bounds of any spanning card
          const isInHorizontalRange = col >= cell.col && col < cell.col + (cell.colSpan || 1);
          const isInVerticalRange = row >= cell.row && row < cell.row + (cell.rowSpan || 1);
          
          // Cell is covered if it's within both the horizontal and vertical range of a spanning card
          return isInHorizontalRange && isInVerticalRange;
        });
        
        if (!isCoveredBySpanningCard) {
          gridCells.push({
            key: `cell-default-${row}-${col}`,
            row,
            col,
            content: (
              <BentoCardContent sectionHeader="--">
                <div></div>
              </BentoCardContent>
            ),
            clickable: true, // All default cards are clickable
            type: 'deboss' as const
          });
        }
      }
    }
  }



  // Filter out completely empty cards and create row mapping for cards below row 2
  const nonEmptyCards = gridCells.filter(cell => {
    // Only for opportunity-space-ghg grid, remove all empty cards
    if (className === 'opportunity-space-ghg') {
      // Check if the card has meaningful content
      const hasContent = cell.content && cell.content !== (
        <BentoCardContent sectionHeader="--">
          <div></div>
        </BentoCardContent>
      );
      
      return hasContent;
    }
    
    // For other grids, use the original logic
    const hasContent = cell.content && cell.content !== (
      <BentoCardContent sectionHeader="--">
        <div></div>
      </BentoCardContent>
    );
    
    return hasContent;
  });

  // Create row mapping for all cards to place them in consecutive order
  let rowMapping: { [key: number]: number };
  
  if (className === 'opportunity-space-ghg') {
    // For opportunity-space-ghg grid, handle empty rows and consolidate cards
    const rowGroups: { [key: number]: typeof nonEmptyCards } = {};
    
    // Group cards by their original row
    nonEmptyCards.forEach(card => {
      if (!rowGroups[card.row]) {
        rowGroups[card.row] = [];
      }
      rowGroups[card.row].push(card);
    });
    
    // Create mapping with special handling for opportunity-space-ghg
    rowMapping = {};
    let currentRow = 2; // Start from row 2 (row 1 is blank)
    
    // Sort rows and process each row
    const sortedRows = Object.keys(rowGroups).map(Number).sort((a, b) => a - b);
    
    sortedRows.forEach(originalRow => {
      const cardsInRow = rowGroups[originalRow];
      
      if (cardsInRow.length === 0) {
        // Empty row - skip
        return;
      } else if (cardsInRow.length === 1) {
        // Single card - place normally
        rowMapping[originalRow] = currentRow;
        currentRow++;
      } else {
        // Multiple cards - consolidate into single row
        rowMapping[originalRow] = currentRow;
        currentRow++;
      }
    });
  } else {
    // For other grids, use normal consecutive ordering
    rowMapping = nonEmptyCards.reduce((acc, card, index) => {
      acc[card.row] = index + 1; // Start from row 1 (no blank row)
      return acc;
    }, {} as { [key: number]: number });
  }

  // Add a blank card at the beginning for row 1 only for opportunity-space-ghg grid
  const allGridCells = className === 'opportunity-space-ghg' ? [
    {
      key: 'cell-blank-row1',
      row: 1,
      col: 1,
      colSpan: 4,
      rowSpan: 1,
      content: (
        <BentoCardContent sectionHeader="">
          <div></div>
        </BentoCardContent>
      ),
      clickable: false,
      type: 'flat' as const,
      style: undefined,
      className: undefined
    },
    ...nonEmptyCards
  ] : nonEmptyCards;

  return (
    <div className={`bento-container-default relative ${className}`}>
      {/* Default Bento Grid */}
      <div 
        className="bento-grid-default"
      >
        {/* Actual cards - positioned on top */}
        {allGridCells.map((cell, index) => {
          // For mobile, each card takes full width and stacks vertically
          
          let gridRow: number, gridColumn: number, colSpan: number, rowSpan: number;
          if (isMobile) {
            // Mobile: 1 column, so each card is on its own row
            gridRow = index + 1;
            gridColumn = 1;
            colSpan = 1; // All cards span 1 column on mobile
            rowSpan = 1; // All cards span 1 row on mobile
          } else {
            // Desktop: 4 columns, maintain row relationships but eliminate empty rows
            if (cell.key === 'cell-blank-row1') {
              // Blank card always goes in row 1
              gridRow = 1;
              gridColumn = 1;
              colSpan = 4;
              rowSpan = 1;
            } else {
              // Use consecutive ordering for all cards
              if (className === 'opportunity-space-ghg') {
                gridRow = rowMapping[cell.row] || 2; // Start from row 2 (row 1 is blank)
                gridColumn = 1;
                colSpan = 4; // Span full width
              } else {
                gridRow = rowMapping[cell.row] || 1; // Start from row 1 (no blank row)
                gridColumn = cell.col;
                colSpan = cell.colSpan || 1;
              }
              
              rowSpan = 1; // Force all cards to span only 1 row
            }
          }

          // Calculate cell number for display
          const getCellNumber = (): string => {
            if (isMobile) {
              return (index + 1).toString();
            } else {
              const baseCellNumber = (gridRow - 1) * 4 + gridColumn;
              if (colSpan && colSpan > 1) {
                const endCellNumber = baseCellNumber + colSpan - 1;
                return `R${gridRow}:${baseCellNumber}-${endCellNumber}`;
              }
              return `R${gridRow}:${baseCellNumber}`;
            }
          };

          return (
            <div
              key={cell.key}
              className="bento-grid-cell-default"
              style={{
                gridRow: `${gridRow} / span ${rowSpan}`,
                gridColumn: `${gridColumn} / span ${colSpan}`,
                width: '100%',
                display: 'flex',
                alignItems: 'stretch',
                justifyContent: 'stretch',
                position: 'relative'
              }}
            >
              <BentoCard 
                type={cell.type || (cell.clickable !== false ? "deboss" : "flat")}
                className={`w-full h-full flex ${cell.className || ''}`}
                style={cell.style}
              >
                {cell.content}
              </BentoCard>
              
              {/* Cell number positioned on this card */}
              {showCellNumbers && (
                <div
                  className="bento-cell-number"
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(0, 0, 0, 0.8)',
                    borderRadius: '12px',
                    width: 'auto',
                    height: '24px',
                    padding: '0 8px',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: 'white',
                    zIndex: 30,
                    pointerEvents: 'none',
                    minWidth: 'auto',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {getCellNumber()}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Cell numbers are now positioned inside each card */}
    </div>
  );
};

export default BentoGridDefault; 