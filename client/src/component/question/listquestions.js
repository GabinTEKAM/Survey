import React from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {Question} from '../exportpkg'

function Listquestions(props) {
    const { questions, setQuestions } = props

   
      
      const getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: "blue",
        // padding: grid * 2,
        // margin: `0 0 ${grid}px 0`,
      
        // change background colour if dragging
        background: isDragging ? "lightgreen" : "",
      
        // styles we need to apply on draggables
        ...draggableStyle
      });
      
      const getListStyle = isDraggingOver => ({
        background: isDraggingOver ? "lightblue" : "",
      });

     const  onDragEnd = (result) => {

        console.log(`result`, result)
        //destructure the event 
        const { destination, source, } = result
    
        // if no destination we return out
        if (!destination) {
          return
        }
    
        // if location of the destination and source id's are the same, we return out
        if (
          destination.droppableId === source.droppableId &&
          destination.index === source.index
        ) {
          return 
        }
    
        
     setQuestions(old => {

            //find our dropped questions
            const movedItem = old.find((item, index) => index === source.index);
             // use filter to remove item from it's position 
            const remainingItems = old.filter((item, index) => index !== source.index);
           
           //return the array qyestion update
            return [
                ...remainingItems.slice(0, destination.index),
                movedItem,
                ...remainingItems.slice(destination.index)
            ];
        })
      }


    return (

    /**
     * DragDropContext is a container where we define the principal area of  our DnD question
     * Droppable define a column where are draggable element
     * draggable define component we want to apply DnD to
     */
       
        <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {questions.map((question, index) => (
                <Draggable key={index} draggableId={String(index) } index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                        <Question key={index} index={index} question={question}
                        questions={questions} setQuestions={setQuestions} />
                   
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
   


  );
}



export default Listquestions;