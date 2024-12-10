import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { fetchProducts, updateProductCategory } from '../services/api';
import '../App.css';

const KanbanBoard = () => {
  const [categories, setCategories] = useState({
    Uncategorized: [],
    Category1: [],
    Category2: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await fetchProducts();
        const grouped = data.products.reduce((acc, product) => {
          acc[product.category] = acc[product.category] || [];
          acc[product.category].push(product);
          return acc;
        }, {});

        setCategories({
          Uncategorized: grouped.Uncategorized || [],
          Category1: grouped.Category1 || [],
          Category2: grouped.Category2 || [],
        });
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchData();
  }, []);

  const onDragEnd = async (result) => {
    const { source, destination } = result;

    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      return;
    }

    const sourceCategory = categories[source.droppableId];
    const destinationCategory = categories[destination.droppableId];

    const sourceItems = [...sourceCategory];
    const [movedItem] = sourceItems.splice(source.index, 1);

    const destinationItems = [...destinationCategory];
    destinationItems.splice(destination.index, 0, movedItem);

    setCategories((prev) => ({
      ...prev,
      [source.droppableId]: sourceItems,
      [destination.droppableId]: destinationItems,
    }));

    try {
      await updateProductCategory(movedItem._id, destination.droppableId);
    } catch (err) {
      console.error('Error updating product category:', err);

      setCategories((prev) => ({
        ...prev,
        [source.droppableId]: sourceCategory,
        [destination.droppableId]: destinationCategory,
      }));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='kanban-board'>
        {Object.keys(categories).map((category) => (
          <Droppable droppableId={category} key={category}>
            {(provided) => (
              <div
                className='kanban-column'
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h3>{category}</h3>
                {categories[category].map((product, index) => (
                  <Draggable
                    key={product._id}
                    draggableId={product._id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className='kanban-item'
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <p>{product.description}</p>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
