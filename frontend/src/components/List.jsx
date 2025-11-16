import Card from "./Card";
import { Droppable } from "@hello-pangea/dnd";
import { Trash2 } from "lucide-react";

export default function List({
  list,
  onAddCard,
  onUpdateCard,
  onDeleteCard,
  onDeleteList,
}) {
  return (
    <div
      className="
      bg-gray-100 
      p-4 
      rounded-3xl 
      shadow-lg 
      w-full md:min-w-[320px] md:max-w-[320px] 
      flex flex-col flex-shrink-0 
      relative 
      border border-gray-300
    "
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg md:text-xl">{list.name}</h2>

        <button onClick={onDeleteList}>
          <Trash2 size={20} className="text-red-500 hover:text-red-700" />
        </button>
      </div>

      <Droppable droppableId={list.id}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex flex-col gap-3 min-h-[200px] flex-1"
          >
            {list.cards?.map((card, index) => (
              <Card
                key={card.id}
                card={card}
                index={index}
                onUpdate={() => onUpdateCard(card.id)}
                onDelete={() => onDeleteCard(card.id)}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <button
        className="mt-4 text-gray-700 font-semibold hover:text-gray-900 text-sm"
        onClick={onAddCard}
      >
        + Add Card
      </button>
    </div>
  );
}
