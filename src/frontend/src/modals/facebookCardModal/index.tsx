// import { useEffect, useState } from "react";
// import IconComponent from "../../components/genericIconComponent";
// import { Button } from "../../components/ui/button";
// import BaseModal from "../baseModal";

// export default function MyTextModal({
//   value,
//   setValue,
//   children,
//   disabled,
//   readonly = false,
// }: any): JSX.Element {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [inputValue, setInputValue] = useState(value);
//   const [cards, setCards] = useState([{ id: 1, buttonSections: [], showExtraFields: false, webviewHeightRatio: 'tall' }]); // Cards with Button sections

//   useEffect(() => {
//     if (typeof value === "string") setInputValue(value);
//   }, [value, modalOpen]);


//   //log every time the input value changes
//   useEffect(() => {
//     console.log(inputValue);
//   }, [inputValue]);

//   // Function to handle adding a new card
//   const handleAddCard = () => {
//     const newCard = {
//       id: cards.length + 1,
//       buttonSections: [],
//       showExtraFields: false, 
//       webviewHeightRatio: 'tall', // Default value for the ratio
//     };
//     setCards([...cards, newCard]);
//   };

//   // Function to handle adding a button section within a card
//   const handleAddButtonSection = (cardIndex: number) => {
//     const updatedCards = cards.map((card, index) => {
//       if (index === cardIndex) {
//         return {
//           ...card,
//           buttonSections: [...card.buttonSections, { id: card.buttonSections.length + 1, type: "web_url" }],
//         };
//       }
//       return card;
//     });
//     setCards(updatedCards);
//   };

//   // Function to handle removing a card
//   const handleRemoveCard = (cardIndex: number) => {
//     setCards(cards.filter((_, index) => index !== cardIndex));
//   };

//   // Function to handle removing a button section within a card
//   const handleRemoveButtonSection = (cardIndex: number, sectionIndex: number) => {
//     const updatedCards = cards.map((card, index) => {
//       if (index === cardIndex) {
//         const updatedSections = card.buttonSections.filter((_, sIndex) => sIndex !== sectionIndex);
//         return { ...card, buttonSections: updatedSections };
//       }
//       return card;
//     });
//     setCards(updatedCards);
//   };

//   const handleTypeChange = (cardIndex: number, sectionIndex: number, newType: string) => {
//     const updatedCards = cards.map((card, index) => {
//       if (index === cardIndex) {
//         const updatedSections = card.buttonSections.map((section, sIndex) => {
//           if (sIndex === sectionIndex) {
//             return { ...section, type: newType };
//           }
//           return section;
//         });
//         return { ...card, buttonSections: updatedSections };
//       }
//       return card;
//     });
//     setCards(updatedCards);
//   };

//   // Function to handle checkbox toggle for extra fields
//   const handleCheckboxToggle = (cardIndex: number) => {
//     const updatedCards = cards.map((card, index) => {
//       if (index === cardIndex) {
//         return { ...card, showExtraFields: !card.showExtraFields };
//       }
//       return card;
//     });
//     setCards(updatedCards);
//   };

//   // Function to handle webview height ratio change
//   const handleWebviewHeightRatioChange = (cardIndex: number, ratio: string) => {
//     const updatedCards = cards.map((card, index) => {
//       if (index === cardIndex) {
//         return { ...card, webviewHeightRatio: ratio };
//       }
//       return card;
//     });
//     setCards(updatedCards);
//   };

//   return (
//     <BaseModal
//       onChangeOpenModal={(open) => {}}
//       open={modalOpen}
//       setOpen={setModalOpen}
//       size="x-large"
//     >
//       <BaseModal.Trigger disable={disabled} asChild>
//         {children}
//       </BaseModal.Trigger>
//       <BaseModal.Header description="Edit Text">
//         <div className="flex w-full items-start gap-3">
//           <div className="flex">
//             <span className="pr-2" data-testid="modal-title">
//               Edit Text
//             </span>
//             <IconComponent
//               name={"FileText"}
//               className="h-6 w-6 pl-1 text-primary"
//               aria-hidden="true"
//             />
//           </div>
//         </div>
//       </BaseModal.Header>

//       <BaseModal.Content overflowHidden>
//         <div className="flex h-full w-full rounded-lg border p-4 overflow-y-auto max-h-[70vh]">
//           {/* Card Section */}
//           <div className="flex flex-col w-full space-y-4">
//             {cards.map((card, cardIndex) => (
//               <div key={card.id} className="relative flex flex-col space-y-4 p-4 border rounded-lg">
//                 {/* X Button to Remove the Card */}
//                 <button
//                   className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
//                   onClick={() => handleRemoveCard(cardIndex)}
//                 >
//                   X
//                 </button>

//                 {/* Card Header */}
//                 <div className="flex justify-between items-center">
//                   <a href="#" className="text-blue-500 underline">
//                     Card {cardIndex + 1}
//                   </a>
//                 </div>

//                 {/* Static Card Section: 3 Span text and 3 Input fields */}
//                 <div className="flex flex-col space-y-2">
//                   <div className="flex items-center space-x-2">
//                     <span className="w-1/4 font-semibold">Гарчиг</span>
//                     <input
//                       type="text"
//                       className="w-full p-2 border rounded bg-gray-200 h-10 text-black"
//                       placeholder="Enter text"
//                     />
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <span className="w-1/4 font-semibold">Зургийн холбоос</span>
//                     <input
//                       type="text"
//                       className="w-full p-2 border rounded bg-gray-200 h-10 text-black"
//                       placeholder="Enter text"
//                     />
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <span className="w-1/4 font-semibold">Дэд гарчиг</span>
//                     <input
//                       type="text"
//                       className="w-full p-2 border rounded bg-gray-200 h-10 text-black"
//                       placeholder="Enter text"
//                     />
//                   </div>
//                 </div>

//                 {/* Checkbox to Toggle Extra Fields */}
//                 <div className="flex items-center space-x-2">
//                   <input
//                     type="checkbox"
//                     checked={card.showExtraFields}
//                     onChange={() => handleCheckboxToggle(cardIndex)}
//                   />
//                   <span>Show Extra Fields</span>
//                 </div>

//                 {/* Conditionally render extra fields if checkbox is checked */}
//                 {card.showExtraFields && (
//                   <div className="flex flex-col space-y-2">
//                     <div className="flex items-center space-x-2">
//                       <span className="w-1/4 font-semibold">type</span>
//                       <input
//                         type="text"
//                         className="w-full p-2 border rounded bg-gray-200 h-10 text-black"
//                         placeholder="Enter text"
//                       />
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <span className="w-1/4 font-semibold">url</span>
//                       <input
//                         type="text"
//                         className="w-full p-2 border rounded bg-gray-200 h-10 text-black"
//                         placeholder="Enter text"
//                       />
//                     </div>

//                     {/* Webview Height Ratio (Switcher between 'tall' and 'short') */}
//                     <div className="flex items-center space-x-2">
//                       <span className="w-1/4 font-semibold">Webview Height Ratio</span>
//                       <select
//                         className="w-full p-2 border rounded bg-gray-200 h-10 text-black"
//                         value={card.webviewHeightRatio}
//                         onChange={(e) => handleWebviewHeightRatioChange(cardIndex, e.target.value)}
//                       >
//                         <option value="tall">Tall</option>
//                         <option value="short">Short</option>
//                       </select>
//                     </div>
//                   </div>
//                 )}

//                 {/* "Buttons:" Section */}
//                 <div className="flex flex-col space-y-2">
//                   <span className="font-semibold">Buttons:</span>

//                   {/* Dynamically Added Button Fields */}
//                   {card.buttonSections.map((section, sectionIndex) => (
//                     <div key={section.id} className="flex items-center justify-between">
//                       <div className="flex-1">
//                         <div className="flex items-center space-x-2">
//                           <span className="w-1/4 font-semibold">type</span>
//                           <select
//                             className="w-full p-2 border rounded bg-gray-200 h-10 text-black"
//                             value={section.type}
//                             onChange={(e) => handleTypeChange(cardIndex, sectionIndex, e.target.value)}
//                           >
//                             <option value="web_url">Web URL</option>
//                             <option value="postback">Postback</option>
//                           </select>
//                         </div>
//                         {/* Conditionally render fields based on the selected type */}
//                         {section.type === "web_url" ? (
//                           <>
//                             <div className="flex items-center space-x-2">
//                               <span className="w-1/4 font-semibold">url</span>
//                               <input
//                                 type="text"
//                                 className="w-full p-2 border rounded bg-gray-200 h-10 text-black"
//                                 placeholder="Enter URL"
//                               />
//                             </div>
//                             <div className="flex items-center space-x-2">
//                               <span className="w-1/4 font-semibold">title</span>
//                               <input
//                                 type="text"
//                                 className="w-full p-2 border rounded bg-gray-200 h-10 text-black"
//                                 placeholder="Enter title"
//                               />
//                             </div>
//                           </>
//                         ) : (
//                           <>
//                             <div className="flex items-center space-x-2">
//                               <span className="w-1/4 font-semibold">title</span>
//                               <input
//                                 type="text"
//                                 className="w-full p-2 border rounded bg-gray-200 h-10 text-black"
//                                 placeholder="Enter title"
//                               />
//                             </div>
//                             <div className="flex items-center space-x-2">
//                               <span className="w-1/4 font-semibold">payload</span>
//                               <input
//                                 type="text"
//                                 className="w-full p-2 border rounded bg-gray-200 h-10 text-black"
//                                 placeholder="Enter payload"
//                               />
//                             </div>
//                           </>
//                         )}
//                       </div>

//                       {/* X Button */}
//                       <button
//                         className="bg-red-800 text-white p-1 rounded-full w-6 h-6 flex items-center justify-center ml-2"
//                         onClick={() => handleRemoveButtonSection(cardIndex, sectionIndex)}
//                       >
//                         X
//                       </button>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Add Button Section */}
//                 <div className="flex justify-end mt-4">
//                   <button
//                     className="bg-gray-200 p-2 rounded-full"
//                     onClick={() => handleAddButtonSection(cardIndex)}
//                   >
//                     <span className="text-black font-bold text-xl">+</span>
//                   </button>
//                 </div>
//               </div>
//             ))}

//             {/* Add Card Button */}
//             <div className="flex justify-center mt-4">
//               <button className="bg-gray-200 p-3 rounded-full" onClick={handleAddCard}>
//                 <span className="text-black font-bold text-xl">+</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </BaseModal.Content>

//       <BaseModal.Footer>
//         <div className="flex w-full shrink-0 items-end justify-end">
//           <Button
//             data-testid="genericModalBtnSave"
//             id="genericModalBtnSave"
//             disabled={readonly}
//             onClick={() => {
//               setValue(inputValue);
//               setModalOpen(false);
//             }}
//             type="submit"
//           >
//             Finish Editing
//           </Button>
//         </div>
//       </BaseModal.Footer>
//     </BaseModal>
//   );
// }
import { useEffect, useState } from "react";
import IconComponent from "../../components/genericIconComponent";
import { Button } from "../../components/ui/button";
import BaseModal from "../baseModal";

export default function MyTextModal({
  value,
  setValue,
  children,
  disabled,
  readonly = false,
}: any): JSX.Element {
  const [modalOpen, setModalOpen] = useState(false);
  const [cards, setCards] = useState([
    {
      id: 1,
      buttonSections: [],
      showExtraFields: false,
      webviewHeightRatio: 'tall',
      title: '',
      imageLink: '',
      subtitle: '',
      extraFields: {
        type: '',
        url: '',
      },
    },
  ]);

  // Function to handle adding a new card
  const handleAddCard = () => {
    const newCard = {
      id: cards.length + 1,
      buttonSections: [],
      showExtraFields: false,
      webviewHeightRatio: 'tall',
      title: '',
      imageLink: '',
      subtitle: '',
      extraFields: {
        type: '',
        url: '',
      },
    };
    setCards([...cards, newCard]);
  };

  // Function to handle adding a button section within a card
  const handleAddButtonSection = (cardIndex: number) => {
    const updatedCards = cards.map((card, index) => {
      if (index === cardIndex) {
        return {
          ...card,
          buttonSections: [
            ...card.buttonSections,
            {
              id: card.buttonSections.length + 1,
              type: "web_url",
              url: '',
              title: '',
              payload: '',
            },
          ],
        };
      }
      return card;
    });
    setCards(updatedCards);
  };

  // Function to handle removing a card
  const handleRemoveCard = (cardIndex: number) => {
    setCards(cards.filter((_, index) => index !== cardIndex));
  };

  // Function to handle removing a button section within a card
  const handleRemoveButtonSection = (cardIndex: number, sectionIndex: number) => {
    const updatedCards = cards.map((card, index) => {
      if (index === cardIndex) {
        const updatedSections = card.buttonSections.filter((_, sIndex) => sIndex !== sectionIndex);
        return { ...card, buttonSections: updatedSections };
      }
      return card;
    });
    setCards(updatedCards);
  };

  const handleTypeChange = (cardIndex: number, sectionIndex: number, newType: string) => {
    const updatedCards = cards.map((card, index) => {
      if (index === cardIndex) {
        const updatedSections = card.buttonSections.map((section, sIndex) => {
          if (sIndex === sectionIndex) {
            return { ...section, type: newType };
          }
          return section;
        });
        return { ...card, buttonSections: updatedSections };
      }
      return card;
    });
    setCards(updatedCards);
  };

  // Function to handle checkbox toggle for extra fields
  const handleCheckboxToggle = (cardIndex: number) => {
    const updatedCards = cards.map((card, index) => {
      if (index === cardIndex) {
        return { ...card, showExtraFields: !card.showExtraFields };
      }
      return card;
    });
    setCards(updatedCards);
  };

  // Function to handle webview height ratio change
  const handleWebviewHeightRatioChange = (cardIndex: number, ratio: string) => {
    const updatedCards = cards.map((card, index) => {
      if (index === cardIndex) {
        return { ...card, webviewHeightRatio: ratio };
      }
      return card;
    });
    setCards(updatedCards);
  };

  return (
    <BaseModal
      onChangeOpenModal={(open) => {}}
      open={modalOpen}
      setOpen={setModalOpen}
      size="x-large"
    >
      <BaseModal.Trigger disable={disabled} asChild>
        {children}
      </BaseModal.Trigger>
      <BaseModal.Header description="Edit Text">
        <div className="flex w-full items-start gap-3">
          <div className="flex">
            <span className="pr-2" data-testid="modal-title">
              Edit Text
            </span>
            <IconComponent
              name={"FileText"}
              className="h-6 w-6 pl-1 text-primary"
              aria-hidden="true"
            />
          </div>
        </div>
      </BaseModal.Header>

      <BaseModal.Content overflowHidden>
        <div className="flex h-full w-full rounded-lg border p-4 overflow-y-auto max-h-[70vh]">
          {/* Card Section */}
          <div className="flex flex-col w-full space-y-4">
            {cards.map((card, cardIndex) => (
              <div key={card.id} className="relative flex flex-col space-y-4 p-4 border rounded-lg">
                {/* X Button to Remove the Card */}
                <button
                  className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                  onClick={() => handleRemoveCard(cardIndex)}
                >
                  X
                </button>

                {/* Card Header */}
                <div className="flex justify-between items-center">
                  <a href="#" className="text-blue-500 underline">
                    Card {cardIndex + 1}
                  </a>
                </div>

                {/* Static Card Section: 3 Span text and 3 Input fields */}
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="w-1/4 font-semibold">Гарчиг</span>
                    <input
                      type="text"
                      className="w-full p-2 border rounded bg-gray-200 h-10 text-black"
                      placeholder="Enter text"
                      value={card.title}
                      onChange={(e) => {
                        const updatedCards = cards.map((c, index) => {
                          if (index === cardIndex) {
                            return { ...c, title: e.target.value };
                          }
                          return c;
                        });
                        setCards(updatedCards);
                      }}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-1/4 font-semibold">Зургийн холбоос</span>
                    <input
                      type="text"
                      className="w-full p-2 border rounded bg-gray-200 h-10 text-black"
                      placeholder="Enter text"
                      value={card.imageLink}
                      onChange={(e) => {
                        const updatedCards = cards.map((c, index) => {
                          if (index === cardIndex) {
                            return { ...c, imageLink: e.target.value };
                          }
                          return c;
                        });
                        setCards(updatedCards);
                      }}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-1/4 font-semibold">Дэд гарчиг</span>
                    <input
                      type="text"
                      className="w-full p-2 border rounded bg-gray-200 h-10 text-black"
                      placeholder="Enter text"
                      value={card.subtitle}
                      onChange={(e) => {
                        const updatedCards = cards.map((c, index) => {
                          if (index === cardIndex) {
                            return { ...c, subtitle: e.target.value };
                          }
                          return c;
                        });
                        setCards(updatedCards);
                      }}
                    />
                  </div>
                </div>

                {/* Checkbox to Toggle Extra Fields */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={card.showExtraFields}
                    onChange={() => handleCheckboxToggle(cardIndex)}
                  />
                  <span>Show Extra Fields</span>
                </div>

                {/* Conditionally render extra fields if checkbox is checked */}
                {card.showExtraFields && (
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="w-1/4 font-semibold">type</span>
                      <input
                        type="text"
                        className="w-full p-2 border rounded bg-gray-200 h-10 text-black"
                        placeholder="Enter text"
                        value={card.extraFields.type}
                        onChange={(e) => {
                          const updatedCards = cards.map((c, index) => {
                            if (index === cardIndex) {
                              return {
                                ...c,
                                extraFields: { ...c.extraFields, type: e.target.value },
                              };
                            }
                            return c;
                          });
                          setCards(updatedCards);
                        }}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-1/4 font-semibold">url</span>
                      <input
                        type="text"
                        className="w-full p-2 border rounded bg-gray-200 h-10 text-black"
                        placeholder="Enter text"
                        value={card.extraFields.url}
                        onChange={(e) => {
                          const updatedCards = cards.map((c, index) => {
                            if (index === cardIndex) {
                              return {
                                ...c,
                                extraFields: { ...c.extraFields, url: e.target.value },
                              };
                            }
                            return c;
                          });
                          setCards(updatedCards);
                        }}
                      />
                    </div>

                    {/* Webview Height Ratio (Switcher between 'tall' and 'short') */}
                    <div className="flex items-center space-x-2">
                      <span className="w-1/4 font-semibold">Webview Height Ratio</span>
                      <select
                        className="w-full p-2 border rounded bg-gray-200 h-10 text-black"
                        value={card.webviewHeightRatio}
                        onChange={(e) => handleWebviewHeightRatioChange(cardIndex, e.target.value)}
                      >
                        <option value="tall">Tall</option>
                        <option value="short">Short</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* "Buttons:" Section */}
                <div className="flex flex-col space-y-2">
                  <span className="font-semibold">Buttons:</span>

                  {/* Dynamically Added Button Fields */}
                  {card.buttonSections.map((section, sectionIndex) => (
                    <div key={section.id} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="w-1/4 font-semibold">type</span>
                          <select
                            className="w-full p-2 border rounded bg-gray-200 h-10 text-black"
                            value={section.type}
                            onChange={(e) => handleTypeChange(cardIndex, sectionIndex, e.target.value)}
                          >
                            <option value="web_url">Web URL</option>
                            <option value="postback">Postback</option>
                          </select>
                        </div>
                        {/* Conditionally render fields based on the selected type */}
                        {section.type === "web_url" ? (
                          <>
                            <div className="flex items-center space-x-2">
                              <span className="w-1/4 font-semibold">url</span>
                              <input
                                type="text"
                                className="w-full p-2 border rounded bg-gray-200 h-10 text-black"
                                placeholder="Enter URL"
                                value={section.url}
                                onChange={(e) => {
                                  const updatedCards = cards.map((card, index) => {
                                    if (index === cardIndex) {
                                      const updatedSections = card.buttonSections.map(
                                        (section, sIndex) => {
                                          if (sIndex === sectionIndex) {
                                            return { ...section, url: e.target.value };
                                          }
                                          return section;
                                        }
                                      );
                                      return { ...card, buttonSections: updatedSections };
                                    }
                                    return card;
                                  });
                                  setCards(updatedCards);
                                }}
                              />
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="w-1/4 font-semibold">title</span>
                              <input
                                type="text"
                                className="w-full p-2 border rounded bg-gray-200 h-10 text-black"
                                placeholder="Enter title"
                                value={section.title}
                                onChange={(e) => {
                                  const updatedCards = cards.map((card, index) => {
                                    if (index === cardIndex) {
                                      const updatedSections = card.buttonSections.map(
                                        (section, sIndex) => {
                                          if (sIndex === sectionIndex) {
                                            return { ...section, title: e.target.value };
                                          }
                                          return section;
                                        }
                                      );
                                      return { ...card, buttonSections: updatedSections };
                                    }
                                    return card;
                                  });
                                  setCards(updatedCards);
                                }}
                              />
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex items-center space-x-2">
                              <span className="w-1/4 font-semibold">title</span>
                              <input
                                type="text"
                                className="w-full p-2 border rounded bg-gray-200 h-10 text-black"
                                placeholder="Enter title"
                                value={section.title}
                                onChange={(e) => {
                                  const updatedCards = cards.map((card, index) => {
                                    if (index === cardIndex) {
                                      const updatedSections = card.buttonSections.map(
                                        (section, sIndex) => {
                                          if (sIndex === sectionIndex) {
                                            return { ...section, title: e.target.value };
                                          }
                                          return section;
                                        }
                                      );
                                      return { ...card, buttonSections: updatedSections };
                                    }
                                    return card;
                                  });
                                  setCards(updatedCards);
                                }}
                              />
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="w-1/4 font-semibold">payload</span>
                              <input
                                type="text"
                                className="w-full p-2 border rounded bg-gray-200 h-10 text-black"
                                placeholder="Enter payload"
                                value={section.payload}
                                onChange={(e) => {
                                  const updatedCards = cards.map((card, index) => {
                                    if (index === cardIndex) {
                                      const updatedSections = card.buttonSections.map(
                                        (section, sIndex) => {
                                          if (sIndex === sectionIndex) {
                                            return { ...section, payload: e.target.value };
                                          }
                                          return section;
                                        }
                                      );
                                      return { ...card, buttonSections: updatedSections };
                                    }
                                    return card;
                                  });
                                  setCards(updatedCards);
                                }}
                              />
                            </div>
                          </>
                        )}
                      </div>

                      {/* X Button */}
                      <button
                        className="bg-red-800 text-white p-1 rounded-full w-6 h-6 flex items-center justify-center ml-2"
                        onClick={() => handleRemoveButtonSection(cardIndex, sectionIndex)}
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add Button Section */}
                <div className="flex justify-end mt-4">
                  <button
                    className="bg-gray-200 p-2 rounded-full"
                    onClick={() => handleAddButtonSection(cardIndex)}
                  >
                    <span className="text-black font-bold text-xl">+</span>
                  </button>
                </div>
              </div>
            ))}

            {/* Add Card Button */}
            <div className="flex justify-center mt-4">
              <button className="bg-gray-200 p-3 rounded-full" onClick={handleAddCard}>
                <span className="text-black font-bold text-xl">+</span>
              </button>
            </div>
          </div>
        </div>
      </BaseModal.Content>

      <BaseModal.Footer>
        <div className="flex w-full shrink-0 items-end justify-end">
          <Button
            data-testid="genericModalBtnSave"
            id="genericModalBtnSave"
            disabled={readonly}
            onClick={() => {
              setValue(JSON.stringify(cards));
              setModalOpen(false);
            }}
            type="submit"
          >
            Finish Editing
          </Button>
        </div>
      </BaseModal.Footer>
    </BaseModal>
  );
}
