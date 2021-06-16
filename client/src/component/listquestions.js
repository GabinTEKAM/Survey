import React from 'react';
import Question from './question';
import Reorder from "react-reorder";

function Listquestions(props) {
    const { questions, setQuestions } = props

    const onReorder = (e, from, to) => {
        setQuestions(old => {

            const movedItem = old.find((item, index) => index === from);
            const remainingItems = old.filter((item, index) => index !== from);
            console.log(`movedItem, remainingItems`, movedItem, remainingItems)
            return [
                ...remainingItems.slice(0, to),
                movedItem,
                ...remainingItems.slice(to)
            ];
        })

    };


    return (
        <Reorder
            reorderId="my-list" // Unique ID that is used internally to track this list (required)
            reorderGroup="reorder-group" // A group ID that allows items to be dragged between lists of the same group (optional)
            // getRef={this.storeRef.bind(this)} // Function that is passed a reference to the root node when mounted (optional)
            placeholderClassName="placeholder" // Class name to be applied to placeholder elements (optional), defaults to 'placeholder'
            draggedClassName="dragged" // Class name to be applied to dragged elements (optional), defaults to 'dragged'
            lock="horizontal" // Lock the dragging direction (optional): vertical, horizontal (do not use with groups)
            holdTime={500} // Default hold time before dragging begins (mouse & touch) (optional), defaults to 0
            touchHoldTime={500} // Hold time before dragging begins on touch devices (optional), defaults to holdTime
            mouseHoldTime={200} // Hold time before dragging begins with mouse (optional), defaults to holdTime
            onReorder={onReorder} // Callback when an item is dropped (you will need this to update your state)
            autoScroll={true} // Enable auto-scrolling when the pointer is close to the edge of the Reorder component (optional), defaults to true
            disabled={false} // Disable reordering (optional), defaults to false
            disableContextMenus={true} // Disable context menus when holding on touch devices (optional), defaults to true
            placeholder={
                <div className="custom-placeholder" /> // Custom placeholder element (optional), defaults to clone of dragged element
            }
        >
            {questions.map((question, index) =>
                <div

                    key={index}
                >
                    <Question key={index} index={index} question={question}
                        questions={questions} setQuestions={setQuestions}
                    /> </div>)
            }

        </Reorder>

    );
}



export default Listquestions;