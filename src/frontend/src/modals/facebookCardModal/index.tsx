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
      buttons: [],
      title: '',
      image_url: '',
      subtitle: '',
      showDefaultAction: false,
      default_action: {
        type: 'web_url',
        url: '',
        webview_height_ratio: 'TALL',
      },
    },
  ]);

  // useEffect to initialize cards from value when modal opens
  useEffect(() => {
    if (modalOpen) {
      if (value) {
        try {
          const parsedValue = JSON.parse(value);

          // Initialize any missing fields in each card
          const initializedCards = parsedValue.map((card: any) => ({
            buttons: card.buttons || [],
            title: card.title || '',
            image_url: card.image_url || '',
            subtitle: card.subtitle || '',
            showDefaultAction: card.default_action ? true : false,
            default_action: card.default_action || {
              type: 'web_url',
              url: '',
              webview_height_ratio: 'TALL',
            },
          }));

          setCards(initializedCards);
        } catch (e) {
          console.error('Invalid JSON in value:', value);
          // Handle invalid JSON, set to default state or show error
          setCards([
            {
              buttons: [],
              title: '',
              image_url: '',
              subtitle: '',
              showDefaultAction: false,
              default_action: {
                type: 'web_url',
                url: '',
                webview_height_ratio: 'TALL',
              },
            },
          ]);
        }
      } else {
        // If value is empty, set to default state
        setCards([
          {
            buttons: [],
            title: '',
            image_url: '',
            subtitle: '',
            showDefaultAction: false,
            default_action: {
              type: 'web_url',
              url: '',
              webview_height_ratio: 'TALL',
            },
          },
        ]);
      }
    }
  }, [value, modalOpen]);

  // Function to handle adding a new card
  const handleAddCard = () => {
    const newCard = {
      buttons: [],
      title: '',
      image_url: '',
      subtitle: '',
      showDefaultAction: false,
      default_action: {
        type: 'web_url',
        url: '',
        webview_height_ratio: 'TALL',
      },
    };
    setCards([...cards, newCard]);
  };

  // Function to handle adding a button within a card
  const handleAddButton = (cardIndex: number) => {
    const updatedCards = cards.map((card, index) => {
      if (index === cardIndex) {
        return {
          ...card,
          buttons: [
            ...card.buttons,
            {
              type: 'web_url',
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

  // Function to handle removing a button within a card
  const handleRemoveButton = (cardIndex: number, buttonIndex: number) => {
    const updatedCards = cards.map((card, index) => {
      if (index === cardIndex) {
        const updatedButtons = card.buttons.filter((_, bIndex) => bIndex !== buttonIndex);
        return { ...card, buttons: updatedButtons };
      }
      return card;
    });
    setCards(updatedCards);
  };

  // Function to handle type change of a button
  const handleTypeChange = (cardIndex: number, buttonIndex: number, newType: string) => {
    const updatedCards = cards.map((card, index) => {
      if (index === cardIndex) {
        const updatedButtons = card.buttons.map((button, bIndex) => {
          if (bIndex === buttonIndex) {
            let updatedButton = { ...button, type: newType };
            // Reset fields based on newType
            if (newType === 'web_url') {
              updatedButton = { ...updatedButton, url: '', title: '', payload: undefined };
            } else if (newType === 'postback') {
              updatedButton = { ...updatedButton, title: '', payload: '', url: undefined };
            } else if (newType === 'phone_number') {
              updatedButton = { ...updatedButton, title: '', payload: '+976', url: undefined };
            }
            return updatedButton;
          }
          return button;
        });
        return { ...card, buttons: updatedButtons };
      }
      return card;
    });
    setCards(updatedCards);
  };

  // Function to toggle showDefaultAction
  const handleToggleDefaultAction = (cardIndex: number) => {
    const updatedCards = cards.map((card, index) => {
      if (index === cardIndex) {
        return { ...card, showDefaultAction: !card.showDefaultAction };
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
              <div
                key={cardIndex}
                className="relative flex flex-col space-y-4 p-4 border rounded-lg"
              >
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

                {/* Static Card Section: Title, Image URL, Subtitle */}
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="w-1/4 font-semibold">Title</span>
                    <input
                      type="text"
                      className="w-full p-2 border rounded bg-gray-200 h-10 text-black"
                      placeholder="Enter title"
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
                    <span className="w-1/4 font-semibold">Image URL</span>
                    <input
                      type="text"
                      className="w-full p-2 border rounded bg-gray-200 h-10 text-black"
                      placeholder="Enter image URL"
                      value={card.image_url}
                      onChange={(e) => {
                        const updatedCards = cards.map((c, index) => {
                          if (index === cardIndex) {
                            return { ...c, image_url: e.target.value };
                          }
                          return c;
                        });
                        setCards(updatedCards);
                      }}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-1/4 font-semibold">Subtitle</span>
                    <input
                      type="text"
                      className="w-full p-2 border rounded bg-gray-200 h-10 text-black"
                      placeholder="Enter subtitle"
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

                {/* Checkbox to Toggle Default Action */}
                <div className="flex items-center space-x-2 mt-2">
                  <input
                    type="checkbox"
                    checked={card.showDefaultAction}
                    onChange={() => handleToggleDefaultAction(cardIndex)}
                  />
                  <span>Include Default Action</span>
                </div>

                {/* Conditionally Render Default Action Fields */}
                {card.showDefaultAction && (
                  <div className="flex flex-col space-y-2 mt-2">
                    <div className="flex items-center space-x-2">
                      <span className="w-1/4 font-semibold">Default Action Type</span>
                      <input
                        type="text"
                        className="w-full p-2 border rounded bg-gray-200 h-10 text-black"
                        placeholder="Enter action type"
                        value={card.default_action.type}
                        onChange={(e) => {
                          const updatedCards = cards.map((c, index) => {
                            if (index === cardIndex) {
                              return {
                                ...c,
                                default_action: { ...c.default_action, type: e.target.value },
                              };
                            }
                            return c;
                          });
                          setCards(updatedCards);
                        }}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-1/4 font-semibold">Default Action URL</span>
                      <input
                        type="text"
                        className="w-full p-2 border rounded bg-gray-200 h-10 text-black"
                        placeholder="Enter action URL"
                        value={card.default_action.url}
                        onChange={(e) => {
                          const updatedCards = cards.map((c, index) => {
                            if (index === cardIndex) {
                              return {
                                ...c,
                                default_action: { ...c.default_action, url: e.target.value },
                              };
                            }
                            return c;
                          });
                          setCards(updatedCards);
                        }}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-1/4 font-semibold">Webview Height Ratio</span>
                      <select
                        className="w-full p-2 border rounded bg-gray-200 h-10 text-black"
                        value={card.default_action.webview_height_ratio}
                        onChange={(e) => {
                          const updatedCards = cards.map((c, index) => {
                            if (index === cardIndex) {
                              return {
                                ...c,
                                default_action: {
                                  ...c.default_action,
                                  webview_height_ratio: e.target.value,
                                },
                              };
                            }
                            return c;
                          });
                          setCards(updatedCards);
                        }}
                      >
                        <option value="FULL">FULL</option>
                        <option value="TALL">TALL</option>
                        <option value="COMPACT">COMPACT</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Buttons Section */}
                <div className="flex flex-col space-y-2 mt-4">
                  <span className="font-semibold">Buttons:</span>

                  {/* Dynamically Added Button Fields */}
                  {card.buttons.map((button: any, buttonIndex: number) => (
                    <div key={buttonIndex} className="flex items-center justify-between">
                      <div className="flex-1">
                        {/* Type Selection */}
                        <div className="flex items-center space-x-2">
                          <span className="w-1/4 font-semibold">Type</span>
                          <select
                            className="w-full p-2 border rounded bg-gray-200 h-10 text-black"
                            value={button.type}
                            onChange={(e) =>
                              handleTypeChange(cardIndex, buttonIndex, e.target.value)
                            }
                          >
                            <option value="web_url">Web URL</option>
                            <option value="postback">Postback</option>
                            {/* Added phone_number option */}
                            <option value="phone_number">Phone Number</option>
                          </select>
                        </div>

                        {/* Conditionally render fields based on the selected type */}
                        {(() => {
                          if (button.type === 'web_url') {
                            return (
                              <>
                                <div className="flex items-center space-x-2">
                                  <span className="w-1/4 font-semibold">URL</span>
                                  <input
                                    type="text"
                                    className="w-full p-2 border rounded bg-gray-200 h-10 text-black"
                                    placeholder="Enter URL"
                                    value={button.url}
                                    onChange={(e) => {
                                      const updatedCards = cards.map((card, index) => {
                                        if (index === cardIndex) {
                                          const updatedButtons = card.buttons.map((btn, bIndex) => {
                                            if (bIndex === buttonIndex) {
                                              return { ...btn, url: e.target.value };
                                            }
                                            return btn;
                                          });
                                          return { ...card, buttons: updatedButtons };
                                        }
                                        return card;
                                      });
                                      setCards(updatedCards);
                                    }}
                                  />
                                </div>
                                <div className="flex items-center space-x-2">
                                  <span className="w-1/4 font-semibold">Title</span>
                                  <input
                                    type="text"
                                    className="w-full p-2 border rounded bg-gray-200 h-10 text-black"
                                    placeholder="Enter title"
                                    value={button.title}
                                    onChange={(e) => {
                                      const updatedCards = cards.map((card, index) => {
                                        if (index === cardIndex) {
                                          const updatedButtons = card.buttons.map((btn, bIndex) => {
                                            if (bIndex === buttonIndex) {
                                              return { ...btn, title: e.target.value };
                                            }
                                            return btn;
                                          });
                                          return { ...card, buttons: updatedButtons };
                                        }
                                        return card;
                                      });
                                      setCards(updatedCards);
                                    }}
                                  />
                                </div>
                              </>
                            );
                          } else if (button.type === 'postback') {
                            return (
                              <>
                                <div className="flex items-center space-x-2">
                                  <span className="w-1/4 font-semibold">Title</span>
                                  <input
                                    type="text"
                                    className="w-full p-2 border rounded bg-gray-200 h-10 text-black"
                                    placeholder="Enter title"
                                    value={button.title}
                                    onChange={(e) => {
                                      const updatedCards = cards.map((card, index) => {
                                        if (index === cardIndex) {
                                          const updatedButtons = card.buttons.map((btn, bIndex) => {
                                            if (bIndex === buttonIndex) {
                                              return { ...btn, title: e.target.value };
                                            }
                                            return btn;
                                          });
                                          return { ...card, buttons: updatedButtons };
                                        }
                                        return card;
                                      });
                                      setCards(updatedCards);
                                    }}
                                  />
                                </div>
                                <div className="flex items-center space-x-2">
                                  <span className="w-1/4 font-semibold">Payload</span>
                                  <input
                                    type="text"
                                    className="w-full p-2 border rounded bg-gray-200 h-10 text-black"
                                    placeholder="Enter payload"
                                    value={button.payload}
                                    onChange={(e) => {
                                      const updatedCards = cards.map((card, index) => {
                                        if (index === cardIndex) {
                                          const updatedButtons = card.buttons.map((btn, bIndex) => {
                                            if (bIndex === buttonIndex) {
                                              return { ...btn, payload: e.target.value };
                                            }
                                            return btn;
                                          });
                                          return { ...card, buttons: updatedButtons };
                                        }
                                        return card;
                                      });
                                      setCards(updatedCards);
                                    }}
                                  />
                                </div>
                              </>
                            );
                          } else if (button.type === 'phone_number') {
                            return (
                              <>
                                {/* Fields for phone_number */}
                                <div className="flex items-center space-x-2">
                                  <span className="w-1/4 font-semibold">Title</span>
                                  <input
                                    type="text"
                                    className="w-full p-2 border rounded bg-gray-200 h-10 text-black"
                                    placeholder="Enter title"
                                    value={button.title}
                                    onChange={(e) => {
                                      const updatedCards = cards.map((card, index) => {
                                        if (index === cardIndex) {
                                          const updatedButtons = card.buttons.map((btn, bIndex) => {
                                            if (bIndex === buttonIndex) {
                                              return { ...btn, title: e.target.value };
                                            }
                                            return btn;
                                          });
                                          return { ...card, buttons: updatedButtons };
                                        }
                                        return card;
                                      });
                                      setCards(updatedCards);
                                    }}
                                  />
                                </div>
                                <div className="flex items-center space-x-2">
                                  <span className="w-1/4 font-semibold">Phone Number</span>
                                  <input
                                    type="text"
                                    className="w-full p-2 border rounded bg-gray-200 h-10 text-black"
                                    placeholder="Enter phone number"
                                    value={button.payload}
                                    onChange={(e) => {
                                      const updatedCards = cards.map((card, index) => {
                                        if (index === cardIndex) {
                                          const updatedButtons = card.buttons.map((btn, bIndex) => {
                                            if (bIndex === buttonIndex) {
                                              return { ...btn, payload: e.target.value };
                                            }
                                            return btn;
                                          });
                                          return { ...card, buttons: updatedButtons };
                                        }
                                        return card;
                                      });
                                      setCards(updatedCards);
                                    }}
                                  />
                                </div>
                              </>
                            );
                          }
                        })()}
                      </div>

                      {/* Remove Button */}
                      <button
                        className="bg-red-800 text-white p-1 rounded-full w-6 h-6 flex items-center justify-center ml-2"
                        onClick={() => handleRemoveButton(cardIndex, buttonIndex)}
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
                    onClick={() => handleAddButton(cardIndex)}
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
              // Prepare the output to match the desired structure
              const outputCards = cards.map((card) => {
                const outputCard: any = {
                  title: card.title,
                  image_url: card.image_url,
                  subtitle: card.subtitle,
                };
                if (card.showDefaultAction) {
                  outputCard.default_action = card.default_action;
                }
                if (card.buttons && card.buttons.length > 0) {
                  outputCard.buttons = card.buttons;
                }
                return outputCard;
              });
              setValue(JSON.stringify(outputCards));
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