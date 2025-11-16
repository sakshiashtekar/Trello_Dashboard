import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import List from "./List";
import { DragDropContext } from "@hello-pangea/dnd";
import { useSocket } from "../context/SocketContext";

export default function Board() {
  const [lists, setLists] = useState([]);
  const socket = useSocket();

  const loadBoard = async () => {
    try {
      const res = await apiClient.get("/boards/default");
      setLists(res.data.lists || []);
    } catch (err) {
      console.error("Failed to load board:", err);
    }
  };

  useEffect(() => {
    loadBoard();
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on("trello-event", loadBoard);
    return () => socket.off("trello-event");
  }, [socket]);

  const addList = async () => {
    const name = prompt("List Name");
    if (!name) return;

    try {
      await apiClient.post("/lists", { name });
      loadBoard();
    } catch (err) {
      console.error(err);
      alert("Failed to create list");
    }
  };

  const deleteList = async (listId) => {
    if (!confirm("Delete this list and all its cards?")) return;

    try {
      await apiClient.delete(`/lists/${listId}`);
      loadBoard();
    } catch (err) {
      console.error(err);
      alert("Failed to delete list");
    }
  };

  const addCard = async (listId) => {
    const name = prompt("Card Title");
    if (!name) return;

    try {
      await apiClient.post("/tasks", { listId, name, desc: "" });
      loadBoard();
    } catch (err) {
      console.error(err);
      alert("Failed to create card");
    }
  };

  const updateCard = async (cardId) => {
    const name = prompt("New Card Title");
    if (!name) return;

    try {
      await apiClient.put(`/tasks/${cardId}`, { name });
      loadBoard();
    } catch (err) {
      console.error(err);
      alert("Failed to update card");
    }
  };

  const deleteCard = async (cardId) => {
    if (!confirm("Delete this card?")) return;

    try {
      await apiClient.delete(`/tasks/${cardId}`);
      loadBoard();
    } catch (err) {
      console.error(err);
      alert("Failed to delete card");
    }
  };

  const onDragEnd = async (result) => {
    const { draggableId, source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    try {
      await apiClient.put(`/tasks/${draggableId}`, {
        idList: destination.droppableId,
        pos: destination.index,
      });

      loadBoard();
    } catch (err) {
      console.error("Drag move failed:", err);
    }
  };

  return (
    <>
      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-center mt-6 mb-4 text-gray-800">
        Trello Dashboard
      </h1>

      <DragDropContext onDragEnd={onDragEnd}>
        <div
          className="
            flex flex-wrap md:flex-nowrap 
            gap-4 md:gap-6 
            p-3 md:p-6 
            h-auto md:h-screen 
            overflow-x-auto 
            items-start
          "
        >
          {lists.map((list) => (
            <List
              key={list.id}
              list={list}
              onAddCard={() => addCard(list.id)}
              onUpdateCard={updateCard}
              onDeleteCard={deleteCard}
              onDeleteList={() => deleteList(list.id)}
            />
          ))}

          <button
            onClick={addList}
            className="min-w-full md:min-w-[320px] p-6 border border-gray-400 rounded-3xl text-gray-600 hover:bg-gray-200 text-lg font-semibold"
          >
            + Add List
          </button>
        </div>
      </DragDropContext>
    </>
  );
}
